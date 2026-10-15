package compiler

import (
	"context"
	"maps"
	"slices"
	"testing"

	"golang.org/x/tools/go/packages"
)

// TestVendorLoaderMatchesGoList checks that the vendor loader lists the same
// packages, files, imports and modules as go list for a vendored module that
// uses build constraints, build tags and GOROOT's own vendored packages.
func TestVendorLoaderMatchesGoList(t *testing.T) {
	// Vendor a module whose files depend on GOOS and build tags.
	moduleDir := writePackageGraphFixture(t, map[string]string{
		"go.mod": "module example.test/vendored\n\ngo 1.25.3\n\nrequire example.com/dep v1.0.0\n",
		"vendor/modules.txt": "# example.com/dep v1.0.0\n" +
			"## explicit; go 1.22\n" +
			"example.com/dep\n",
		"vendor/example.com/dep/dep.go":       "package dep\n\nconst Name = \"dep\"\n",
		"vendor/example.com/dep/dep_js.go":    "package dep\n\nconst OS = \"js\"\n",
		"vendor/example.com/dep/dep_linux.go": "package dep\n\nconst OS = \"linux\"\n",
		"main.go": "package main\n\n" +
			"import (\n\t\"fmt\"\n\t\"net/http\"\n\n\t\"example.com/dep\"\n\t\"example.test/vendored/lib\"\n)\n\n" +
			"func main() { fmt.Println(dep.Name, dep.OS, lib.Tagged, http.MethodGet) }\n",
		"lib/lib.go":      "package lib\n",
		"lib/tagged.go":   "//go:build custom\n\npackage lib\n\nconst Tagged = true\n",
		"lib/untagged.go": "//go:build !custom\n\npackage lib\n\nconst Tagged = false\n",
	})

	// Load the closure through go list and through the vendor loader.
	cfg := &packages.Config{
		Context:    context.Background(),
		Dir:        moduleDir,
		Env:        goScriptLoaderEnv(),
		BuildFlags: goScriptBuildFlags([]string{"-tags=custom"}),
		Mode:       packageGraphLoadMode,
	}
	listCfg := *cfg
	listCfg.Env = append(slices.Clone(cfg.Env), "GOFLAGS=-mod=vendor")
	want, err := packages.Load(&listCfg, ".")
	if err != nil {
		t.Fatal(err)
	}
	got, err := loadVendorPackages(cfg, ".")
	if err != nil {
		t.Fatal(err)
	}

	// Compare every field the compiler reads.
	wantByPath, gotByPath := vendorTestClosure(want), vendorTestClosure(got)
	if !slices.Equal(slices.Sorted(maps.Keys(gotByPath)), slices.Sorted(maps.Keys(wantByPath))) {
		t.Fatalf("packages = %v, want %v", slices.Sorted(maps.Keys(gotByPath)), slices.Sorted(maps.Keys(wantByPath)))
	}
	for pkgPath, w := range wantByPath {
		g := gotByPath[pkgPath]
		if len(w.Errors) != 0 || len(g.Errors) != 0 {
			t.Errorf("%s errors: got %v, want %v", pkgPath, g.Errors, w.Errors)
		}
		if g.ID != w.ID || g.Name != w.Name {
			t.Errorf("%s: got ID %q name %q, want ID %q name %q", pkgPath, g.ID, g.Name, w.ID, w.Name)
		}
		if !slices.Equal(slices.Sorted(slices.Values(g.GoFiles)), slices.Sorted(slices.Values(w.GoFiles))) {
			t.Errorf("%s GoFiles = %v, want %v", pkgPath, g.GoFiles, w.GoFiles)
		}
		if !slices.Equal(slices.Sorted(slices.Values(g.CompiledGoFiles)), slices.Sorted(slices.Values(w.CompiledGoFiles))) {
			t.Errorf("%s CompiledGoFiles = %v, want %v", pkgPath, g.CompiledGoFiles, w.CompiledGoFiles)
		}
		if gi, wi := vendorTestImports(g), vendorTestImports(w); !maps.Equal(gi, wi) {
			t.Errorf("%s imports = %v, want %v", pkgPath, gi, wi)
		}
		if gm, wm := vendorTestModule(g), vendorTestModule(w); gm != wm {
			t.Errorf("%s module = %+v, want %+v", pkgPath, gm, wm)
		}
	}
}

// vendorTestClosure maps the path of each package reachable from roots to the
// package.
func vendorTestClosure(roots []*packages.Package) map[string]*packages.Package {
	byPath := make(map[string]*packages.Package)
	packages.Visit(roots, nil, func(pkg *packages.Package) {
		byPath[pkg.PkgPath] = pkg
	})
	return byPath
}

// vendorTestImports maps each import path of pkg to the imported package path.
func vendorTestImports(pkg *packages.Package) map[string]string {
	imports := make(map[string]string, len(pkg.Imports))
	for importPath, imp := range pkg.Imports {
		imports[importPath] = imp.PkgPath
	}
	return imports
}

// vendorTestModule returns the module fields the compiler reads from pkg.
func vendorTestModule(pkg *packages.Package) packages.Module {
	if pkg.Module == nil {
		return packages.Module{}
	}
	return packages.Module{
		Path:      pkg.Module.Path,
		Version:   pkg.Module.Version,
		Main:      pkg.Module.Main,
		GoVersion: pkg.Module.GoVersion,
	}
}
