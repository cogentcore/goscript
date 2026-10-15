package tsworkspace

import (
	"context"
	"maps"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func TestImportedPackages(t *testing.T) {
	// Write scripts that import packages in each import form.
	root := t.TempDir()
	files := map[string]string{
		"a/index.ts":       "import { ecb } from '@noble/ciphers/aes.js'\nimport * as $ from '@goscript/builtin/index.js'\n",
		"b/index.ts":       "import {\n  inflate,\n} from \"pako\"\nimport './local.js'\n",
		"c/main.gs.ts":     "import 'side-effect'\nconst m = await import('dynamic')\nconst s = \"read from 'quoted'\"\n",
		"d/types.d.ts":     "import { x } from 'declared-only'\n",
		"e/node.ts":        "import * as fs from 'node:fs'\n",
		"f/unrelated.json": "{\"from\": \"pako\"}\n",
	}
	for name, data := range files {
		path := filepath.Join(root, filepath.FromSlash(name))
		if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
			t.Fatal(err)
		}
		if err := os.WriteFile(path, []byte(data), 0o644); err != nil {
			t.Fatal(err)
		}
	}

	// Only declared packages imported by a script are reported.
	declared := map[string]string{
		"@noble/ciphers": "2.2.0",
		"pako":           "3.0.2",
		"dynamic":        "1.0.0",
		"side-effect":    "1.0.0",
		"declared-only":  "1.0.0",
		"globals":        "^17.4.0",
	}
	got, err := ImportedPackages(root, declared)
	if err != nil {
		t.Fatal(err)
	}
	want := map[string]string{
		"@noble/ciphers": "2.2.0",
		"pako":           "3.0.2",
		"dynamic":        "1.0.0",
		"side-effect":    "1.0.0",
	}
	if !maps.Equal(got, want) {
		t.Fatalf("imported packages = %v, want %v", got, want)
	}

	// A missing root imports nothing.
	missing, err := ImportedPackages(filepath.Join(root, "missing"), declared)
	if err != nil || len(missing) != 0 {
		t.Fatalf("missing root imported %v, %v", missing, err)
	}
}

func TestNPMPackageName(t *testing.T) {
	// Each specifier names its npm package, or none for a local or builtin
	// module.
	for specifier, want := range map[string]string{
		"pako":                     "pako",
		"pako/lib/inflate.js":      "pako",
		"@noble/hashes/sha2.js":    "@noble/hashes",
		"@noble":                   "",
		"./local.js":               "",
		"/abs/path.js":             "",
		"node:fs":                  "",
		"https://example.com/m.js": "",
	} {
		if got := npmPackageName(specifier); got != want {
			t.Fatalf("npmPackageName(%q) = %q, want %q", specifier, got, want)
		}
	}
}

func TestEnsurePackageJSONDependencies(t *testing.T) {
	// The package.json declares the module type and each dependency.
	dir := t.TempDir()
	owner := NewOwner(dir, dir)
	if result := owner.EnsurePackageJSON(map[string]string{"pako": "3.0.2"}); result.Failed() {
		t.Fatal(result.Error)
	}
	data, err := os.ReadFile(filepath.Join(dir, "package.json"))
	if err != nil {
		t.Fatal(err)
	}
	for _, want := range []string{`"type": "module"`, `"dependencies"`, `"pako": "3.0.2"`} {
		if !strings.Contains(string(data), want) {
			t.Fatalf("package.json %q does not contain %q", data, want)
		}
	}
}

func TestInstallDependenciesUsesResolvablePackages(t *testing.T) {
	// Make @noble/hashes resolvable from a parent project.
	project := t.TempDir()
	pkgDir := filepath.Join(project, "node_modules", "@noble", "hashes")
	if err := os.MkdirAll(pkgDir, 0o755); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(filepath.Join(pkgDir, "package.json"), []byte("{}"), 0o644); err != nil {
		t.Fatal(err)
	}

	// A package that already resolves needs no install command.
	workDir := filepath.Join(project, "work", "nested")
	owner := NewOwner(workDir, workDir)
	result := owner.InstallDependencies(context.Background(), map[string]string{"@noble/hashes": "2.2.0"})
	if result.Failed() {
		t.Fatal(result.Error)
	}
	if len(result.Command) != 0 {
		t.Fatalf("expected no install command for a resolvable package, ran %v", result.Command)
	}
	if packageResolves(workDir, "pako") {
		t.Fatal("pako should not resolve")
	}
}
