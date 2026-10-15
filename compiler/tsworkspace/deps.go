package tsworkspace

import (
	"context"
	"io/fs"
	"maps"
	"os"
	"path/filepath"
	"regexp"
	"slices"
	"strings"

	"github.com/pkg/errors"
)

// importSpecifierPattern matches the module specifiers of static imports and
// exports, side-effect imports, and dynamic imports.
var importSpecifierPattern = regexp.MustCompile(`(?m)(?:\bfrom\s*|^\s*import\s*|\bimport\(\s*)['"]([^'"\n]+)['"]`)

// ImportedPackages returns the npm packages from packages, which maps package
// names to versions, that are imported by the TypeScript and JavaScript files
// under root. A missing root imports nothing.
func ImportedPackages(root string, packages map[string]string) (map[string]string, error) {
	// With no candidate packages, nothing can be imported.
	imported := make(map[string]string)
	if len(packages) == 0 {
		return imported, nil
	}
	if err := scanImportedPackages(root, packages, imported); err != nil {
		return nil, errors.Wrap(err, "scan imported npm packages")
	}
	return imported, nil
}

// scanImportedPackages adds the packages imported by the script files under
// root to imported.
func scanImportedPackages(root string, packages, imported map[string]string) error {
	return filepath.WalkDir(root, func(path string, d fs.DirEntry, err error) error {
		// Skip a missing root and everything that is not a script.
		if errors.Is(err, fs.ErrNotExist) {
			return nil
		}
		if err != nil || d.IsDir() || !scriptFile(path) {
			return err
		}

		// Record each candidate package that the script imports.
		data, err := os.ReadFile(path)
		if err != nil {
			return err
		}
		for _, match := range importSpecifierPattern.FindAllSubmatch(data, -1) {
			name := npmPackageName(string(match[1]))
			if version, ok := packages[name]; ok {
				imported[name] = version
			}
		}
		return nil
	})
}

// scriptFile reports whether path is a TypeScript or JavaScript source file.
func scriptFile(path string) bool {
	switch filepath.Ext(path) {
	case ".ts", ".js", ".mts", ".mjs":
		return !strings.HasSuffix(path, ".d.ts")
	}
	return false
}

// npmPackageName returns the npm package name of a bare module specifier,
// or "" for a relative, absolute, or scheme-qualified specifier.
func npmPackageName(specifier string) string {
	if specifier == "" || strings.HasPrefix(specifier, ".") || strings.HasPrefix(specifier, "/") || strings.Contains(specifier, ":") {
		return ""
	}
	parts := strings.Split(specifier, "/")
	if strings.HasPrefix(specifier, "@") {
		if len(parts) < 2 {
			return ""
		}
		return parts[0] + "/" + parts[1]
	}
	return parts[0]
}

// EnsurePackageJSON writes the module package metadata used by Bun, with the
// given npm dependencies, which map package names to versions.
func (o *Owner) EnsurePackageJSON(dependencies map[string]string) Result {
	manifest := map[string]any{"type": "module"}
	if len(dependencies) > 0 {
		manifest["dependencies"] = dependencies
	}
	return o.WriteJSON(PhaseWorkspace, "package.json", manifest)
}

// InstallDependencies installs the given npm dependencies into the workspace
// with bun install, unless they already resolve from the workspace, such as
// from a node_modules directory of an enclosing project.
func (o *Owner) InstallDependencies(ctx context.Context, dependencies map[string]string) Result {
	// Install only when some dependency does not resolve.
	missing := slices.DeleteFunc(slices.Sorted(maps.Keys(dependencies)), func(name string) bool {
		return packageResolves(o.workDir, name)
	})
	if len(missing) == 0 {
		return Result{Phase: PhaseWorkspace}
	}

	// Install from the workspace package.json, naming what was missing.
	result := o.RunTool(ctx, PhaseWorkspace, o.workDir, "bun", "install", "--no-progress")
	if result.Failed() {
		result.Error = "install npm dependencies " + strings.Join(missing, ", ") + ": " + result.Error
	}
	return result
}

// packageResolves reports whether the npm package resolves from dir through
// a node_modules directory of dir or one of its ancestors.
func packageResolves(dir, name string) bool {
	for {
		info, err := os.Stat(filepath.Join(dir, "node_modules", filepath.FromSlash(name), "package.json"))
		if err == nil && !info.IsDir() {
			return true
		}
		parent := filepath.Dir(dir)
		if parent == dir {
			return false
		}
		dir = parent
	}
}
