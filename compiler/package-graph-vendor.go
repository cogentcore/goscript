package compiler

import (
	"bufio"
	"bytes"
	"errors"
	"go/build"
	"os"
	"path"
	"path/filepath"
	"slices"
	"strings"

	"golang.org/x/mod/modfile"
	"golang.org/x/tools/go/packages"
)

// loadVendorPackages loads the package identity graph the way
// "go list -mod=vendor -deps" does, reading only the main module, its vendor
// directory and GOROOT. It serves hosts without a go command, such as the
// compiler itself compiled to JavaScript. It fills the fields of
// packageGraphLoadMode and supports package patterns without "...", the -tags
// build flag, and no test variants.
func loadVendorPackages(cfg *packages.Config, patterns ...string) ([]*packages.Package, error) {
	// Reject the requests only the go command can answer.
	if cfg.Tests {
		return nil, errors.New("vendor loader: test variants need the go command")
	}
	tags, err := vendorBuildTags(cfg.BuildFlags)
	if err != nil {
		return nil, err
	}

	// Find the main module and the modules it vendors.
	dir, err := filepath.Abs(cfg.Dir)
	if err != nil {
		return nil, err
	}
	main, err := findMainModule(dir)
	if err != nil {
		return nil, err
	}
	vendored, err := readVendorModules(main.Dir)
	if err != nil {
		return nil, err
	}

	// Select files as go list does for js/wasm without cgo.
	ctxt := build.Default
	ctxt.GOOS, ctxt.GOARCH, ctxt.CgoEnabled = "js", "wasm", false
	ctxt.GOROOT = vendorGOROOT(cfg.Env)
	ctxt.BuildTags = tags
	ctxt.ToolTags = jsWasmToolTags(ctxt.ToolTags)

	// Load each pattern's package and its imports.
	l := &vendorLoader{
		ctxt:     &ctxt,
		main:     main,
		vendored: vendored,
		loaded:   make(map[string]*packages.Package),
	}
	roots := make([]*packages.Package, 0, len(patterns))
	for _, pattern := range patterns {
		if cfg.Context != nil {
			if err := cfg.Context.Err(); err != nil {
				return nil, err
			}
		}
		importPath, err := l.patternImportPath(dir, pattern)
		if err != nil {
			return nil, err
		}
		roots = append(roots, l.load(importPath, false))
	}
	return roots, nil
}

// vendorLoader resolves and loads packages for loadVendorPackages.
type vendorLoader struct {
	ctxt *build.Context
	main *packages.Module
	// vendored maps each vendored package path to its module.
	vendored map[string]*packages.Module
	// loaded maps each package path to its loaded package.
	loaded map[string]*packages.Package
}

// patternImportPath returns the import path a package pattern names.
func (l *vendorLoader) patternImportPath(dir, pattern string) (string, error) {
	// An import path names itself; only a directory needs mapping.
	if strings.Contains(pattern, "...") {
		return "", errors.New("vendor loader: pattern " + pattern + " needs the go command")
	}
	if !build.IsLocalImport(pattern) && !filepath.IsAbs(pattern) {
		return pattern, nil
	}

	// Map the directory to its import path in the main module.
	if !filepath.IsAbs(pattern) {
		pattern = filepath.Join(dir, pattern)
	}
	rel, err := filepath.Rel(l.main.Dir, pattern)
	if err != nil || rel == ".." || strings.HasPrefix(rel, ".."+string(filepath.Separator)) {
		return "", errors.New("vendor loader: directory " + pattern + " is outside the main module")
	}
	if rel == "." {
		return l.main.Path, nil
	}
	return path.Join(l.main.Path, filepath.ToSlash(rel)), nil
}

// load returns the package for an import path, loading it and its imports
// once. fromStd marks imports written in the standard library, which resolve
// third-party paths to GOROOT's own vendor directory.
func (l *vendorLoader) load(importPath string, fromStd bool) *packages.Package {
	// Return the package loaded earlier, or record it before its imports so
	// an import cycle ends.
	pkgPath, dir, module := l.resolve(importPath, fromStd)
	if pkg := l.loaded[pkgPath]; pkg != nil {
		return pkg
	}
	pkg := &packages.Package{ID: pkgPath, PkgPath: pkgPath, Module: module}
	l.loaded[pkgPath] = pkg
	if dir == "" {
		pkg.Errors = append(pkg.Errors, packages.Error{
			Msg:  "package " + importPath + " is not in the main module, GOROOT or vendor/modules.txt",
			Kind: packages.ListError,
		})
		return pkg
	}

	// Select the package's files.
	bp, err := l.ctxt.ImportDir(dir, 0)
	if err != nil {
		pkg.Errors = append(pkg.Errors, packages.Error{Msg: err.Error(), Kind: packages.ListError})
		if bp == nil || len(bp.GoFiles) == 0 {
			return pkg
		}
	}
	pkg.Name = bp.Name
	pkg.GoFiles = make([]string, len(bp.GoFiles))
	for i, name := range bp.GoFiles {
		pkg.GoFiles[i] = filepath.Join(dir, name)
	}

	// go list compiles no files for unsafe, which has no implementation.
	if pkgPath != "unsafe" {
		pkg.CompiledGoFiles = slices.Clone(pkg.GoFiles)
	}

	// Load the imports. A package outside every module is in the standard
	// library.
	pkg.Imports = make(map[string]*packages.Package, len(bp.Imports))
	std := module == nil
	for _, imp := range bp.Imports {
		pkg.Imports[imp] = l.load(imp, std)
	}
	return pkg
}

// resolve returns the package path, source directory and module of an import
// path. The directory is empty when no module provides the package.
func (l *vendorLoader) resolve(importPath string, fromStd bool) (pkgPath, dir string, module *packages.Module) {
	// Resolve the standard library and the main module from their trees.
	src := filepath.Join(l.ctxt.GOROOT, "src")
	switch {
	case fromStd && !isStdImportPath(importPath):
		pkgPath = "vendor/" + importPath
		return pkgPath, filepath.Join(src, filepath.FromSlash(pkgPath)), nil
	case importPath == l.main.Path || strings.HasPrefix(importPath, l.main.Path+"/"):
		rel := strings.TrimPrefix(importPath, l.main.Path)
		return importPath, filepath.Join(l.main.Dir, filepath.FromSlash(rel)), l.main
	case isStdImportPath(importPath):
		return importPath, filepath.Join(src, filepath.FromSlash(importPath)), nil
	}

	// Resolve other packages through vendor/modules.txt.
	module = l.vendored[importPath]
	if module == nil {
		return importPath, "", nil
	}
	return importPath, filepath.Join(l.main.Dir, "vendor", filepath.FromSlash(importPath)), module
}

// isStdImportPath reports whether an import path names a standard library
// package: its first element has no dot, as the go command decides.
func isStdImportPath(importPath string) bool {
	first, _, _ := strings.Cut(importPath, "/")
	return !strings.Contains(first, ".")
}

// findMainModule returns the module whose go.mod is in dir or its nearest
// parent.
func findMainModule(dir string) (*packages.Module, error) {
	for root := dir; ; {
		gomod := filepath.Join(root, "go.mod")
		data, err := os.ReadFile(gomod)
		if err == nil {
			file, err := modfile.ParseLax(gomod, data, nil)
			if err != nil {
				return nil, err
			}
			if file.Module == nil {
				return nil, errors.New("vendor loader: " + gomod + " has no module directive")
			}
			module := &packages.Module{Path: file.Module.Mod.Path, Main: true, Dir: root, GoMod: gomod}
			if file.Go != nil {
				module.GoVersion = file.Go.Version
			}
			return module, nil
		}
		if !errors.Is(err, os.ErrNotExist) {
			return nil, err
		}
		parent := filepath.Dir(root)
		if parent == root {
			return nil, errors.New("vendor loader: no go.mod in " + dir + " or its parents")
		}
		root = parent
	}
}

// readVendorModules parses vendor/modules.txt into a map from each vendored
// package path to its module. A module line "# path version [=> replacement]"
// starts a module, "## explicit; go 1.N" gives its Go version, and each other
// line names one of its packages.
func readVendorModules(root string) (map[string]*packages.Module, error) {
	// A module without dependencies has no vendor/modules.txt.
	data, err := os.ReadFile(filepath.Join(root, "vendor", "modules.txt"))
	if errors.Is(err, os.ErrNotExist) {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}

	// Assign each package line to the module line above it.
	vendored := make(map[string]*packages.Module)
	var module *packages.Module
	scanner := bufio.NewScanner(bytes.NewReader(data))
	for scanner.Scan() {
		line := scanner.Text()
		switch {
		case strings.HasPrefix(line, "## "):
			if module == nil {
				continue
			}
			for annotation := range strings.SplitSeq(strings.TrimPrefix(line, "## "), ";") {
				if version, ok := strings.CutPrefix(strings.TrimSpace(annotation), "go "); ok {
					module.GoVersion = version
				}
			}
		case strings.HasPrefix(line, "# "):
			fields := strings.Fields(strings.TrimPrefix(line, "# "))
			module = &packages.Module{Path: fields[0]}
			if len(fields) > 1 && fields[1] != "=>" {
				module.Version = fields[1]
			}
		case line != "" && module != nil:
			vendored[line] = module
		}
	}
	return vendored, scanner.Err()
}

// vendorBuildTags returns the tags of the -tags build flags, rejecting every
// other flag since only the go command implements them.
func vendorBuildTags(flags []string) ([]string, error) {
	var tags []string
	for i := 0; i < len(flags); i++ {
		value, ok := strings.CutPrefix(flags[i], "-tags=")
		if !ok && flags[i] == "-tags" && i+1 < len(flags) {
			i++
			value, ok = flags[i], true
		}
		if !ok {
			return nil, errors.New("vendor loader: build flag " + flags[i] + " needs the go command")
		}
		tags = append(tags, strings.FieldsFunc(value, func(r rune) bool {
			return r == ',' || r == ' '
		})...)
	}
	return tags, nil
}

// jsWasmToolTags returns the tool tags go list uses for js/wasm, given the
// host's. The host's tags name its own architecture levels, and the experiment
// defaults that depend on the platform differ: as internal/buildcfg decides,
// wasm has no register ABI and js supports DWARF 5.
func jsWasmToolTags(host []string) []string {
	tags := []string{"goexperiment.dwarf5"}
	for _, tag := range host {
		switch tag {
		case "goexperiment.dwarf5", "goexperiment.regabiwrappers", "goexperiment.regabiargs":
		default:
			if strings.HasPrefix(tag, "goexperiment.") {
				tags = append(tags, tag)
			}
		}
	}
	return tags
}

// vendorGOROOT returns GOROOT from the loader environment, or the default.
func vendorGOROOT(env []string) string {
	for _, kv := range slices.Backward(env) {
		if value, ok := strings.CutPrefix(kv, "GOROOT="); ok && value != "" {
			return value
		}
	}
	return build.Default.GOROOT
}
