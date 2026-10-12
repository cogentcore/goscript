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
// under roots.
func ImportedPackages(roots []string, packages map[string]string) (map[string]string, error) {
	imported := make(map[string]string)
	if len(packages) == 0 {
		return imported, nil
	}
	seen := make(map[string]bool)
	for _, root := range roots {
		if root == "" || seen[root] {
			continue
		}
		seen[root] = true
		err := filepath.WalkDir(root, func(path string, d fs.DirEntry, err error) error {
			if err != nil {
				if errors.Is(err, fs.ErrNotExist) {
					return nil
				}
				return err
			}
			if d.IsDir() || !scriptFile(path) {
				return nil
			}
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
		if err != nil {
			return nil, errors.Wrap(err, "scan imported npm packages")
		}
	}
	return imported, nil
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
	missing := slices.DeleteFunc(slices.Sorted(maps.Keys(dependencies)), func(name string) bool {
		return PackageResolves(o.workDir, name)
	})
	if len(missing) == 0 {
		return Result{Phase: PhaseWorkspace}
	}
	result := o.RunTool(ctx, PhaseWorkspace, o.workDir, "bun", "install", "--no-progress")
	if result.Failed() {
		result.Error = "install npm dependencies " + strings.Join(missing, ", ") + ": " + result.Error
	}
	return result
}

// PackageResolves reports whether the npm package resolves from dir through
// a node_modules directory of dir or one of its ancestors.
func PackageResolves(dir, name string) bool {
	for current := dir; current != ""; current = filepath.Dir(current) {
		info, err := os.Stat(filepath.Join(current, "node_modules", filepath.FromSlash(name), "package.json"))
		if err == nil && !info.IsDir() {
			return true
		}
		if parent := filepath.Dir(current); parent == current {
			break
		}
	}
	return false
}
