package compiler

import (
	"context"
	"flag"
	"go/ast"
	"go/types"
	"os"
	"path"
	"path/filepath"
	"slices"
	"strconv"
	"strings"
	"testing"

	"golang.org/x/tools/go/packages"
)

// updateStubs rewrites the stub modules of the gs/ tree.
var updateStubs = flag.Bool("update", false, "rewrite the stub modules of the gs/ override packages")

// overrideStubFile names the module of an override package that declares the
// Go exports its hand-written TypeScript does not, and overrideStubExport is
// the line of its index.ts that re-exports it.
const (
	overrideStubFile   = "stubs.gs.ts"
	overrideStubExport = "export * from './stubs.gs.js'"
)

// overrideStub is one missing export of an override package: a package-level
// function, variable or type of its Go package, or the method function
// Type_Method of a method of one of its named non-struct types.
type overrideStub struct {
	name string
	// fn is the Go function or method.
	fn *types.Func
	// varType is the type of a variable.
	varType types.Type
	// typeName is the Go type.
	typeName *types.TypeName
	// class reports that the override declares the method's type as a class,
	// whose method the method function calls.
	class bool
}

// TestOverrideStubsCurrent checks that each standard library override package
// of the gs/ tree declares every export of its Go package that compiled code
// can refer to: the package-level functions, variables and types, and the
// method functions of its named non-struct types. Those its TypeScript lacks
// are declared by its generated stubs.gs.ts; run go generate to rewrite them.
func TestOverrideStubsCurrent(t *testing.T) {
	// Load the Go package of each override package.
	facts, diagnostics := buildOverrideFacts(context.Background(), nil)
	if diagnosticsHaveErrors(diagnostics) {
		t.Fatalf("override facts: %#v", diagnostics)
	}
	goPkgs := loadOverrideGoPackages(t, facts)

	// Render the stubs of each package, and rewrite or compare them.
	gsDir := filepath.Join("..", "gs")
	for _, goPkg := range goPkgs {
		exports, err := handWrittenTypeScriptExports(facts, goPkg.PkgPath)
		if err != nil {
			t.Fatal(err)
		}
		stubs := missingOverrideExports(goPkg.Types, facts.parityLedger(goPkg.PkgPath), exports)
		source := renderOverrideStubs(goPkg.PkgPath, stubs)
		pkgDir := filepath.Join(gsDir, filepath.FromSlash(goPkg.PkgPath))
		if *updateStubs {
			writeOverrideStubs(t, pkgDir, source)
			continue
		}
		checkOverrideStubs(t, pkgDir, goPkg.PkgPath, source)
	}
}

// TestOverrideStubsRender checks the declarations of each kind of stub.
func TestOverrideStubsRender(t *testing.T) {
	// Declare a package with a function, a variable and a string type with
	// methods, and an override that declares only the type as a class.
	src := strings.Join([]string{
		"package lib",
		"var Rate int",
		"var Total int64",
		"func Profile() bool { return false }",
		"type Case string",
		"func (Case) Upper() string { return \"\" }",
		"func (Case) lower() string { return \"\" }",
		"type Record struct{ N int }",
		"type Pair[K comparable, V any] struct{ k K; v V }",
		"type Flags uint8",
		"type Mode int",
		"func (Mode) String() string { return \"\" }",
		"func (Mode) Valid() bool { return true }",
		"",
	}, "\n")
	goPkg := checkOverrideStubFixture(t, src)
	exports := map[string]typeScriptExport{
		"Case":        {value: true, typ: true},
		"Mode":        {typ: true},
		"Mode_String": {value: true},
	}

	// Render the missing exports.
	got := renderOverrideStubs("example.test/lib", missingOverrideExports(goPkg, newOverrideParityLedger(), exports))
	for _, want := range []string{
		"export function Case_Upper(receiver: any, ...args: any[]): any {\n  return $.callOverrideMethod(receiver, \"Upper\", \"example.test/lib.Case.Upper\", args)\n}\n",
		"export function Case_lower(receiver: any, ...args: any[]): any {\n  return $.callOverrideMethod(receiver, \"lower\", \"example.test/lib.Case.lower\", args)\n}\n",
		"export function Mode_Valid(..._args: any[]): any {\n  return $.notImplemented(\"example.test/lib.Mode.Valid\")\n}\n",
		"export function Profile(..._args: any[]): any {\n  return $.notImplemented(\"example.test/lib.Profile\")\n}\n",
		"export let Rate: any = 0\n",
		"export let Total: any = 0n\n",
		"export class Record {\n  [field: string]: any\n\n  constructor(..._args: any[]) {\n    $.notImplemented(\"example.test/lib.Record\")\n  }\n}\n",
		"export class Pair<_T0 = any, _T1 = any> {\n",
		"export type Flags = any\n",
	} {
		if !strings.Contains(got, want) {
			t.Errorf("stubs lack %q:\n%s", want, got)
		}
	}
	if strings.Contains(got, "Mode_String") {
		t.Errorf("stubs declare the implemented Mode_String:\n%s", got)
	}

	// A blocked symbol has no stub, and a package without missing exports
	// has no module.
	ledger := newOverrideParityLedger()
	ledger.Symbols["Profile"] = overrideParityEntry{Status: overrideParityStatusBlocked, Reason: "test"}
	if got := renderOverrideStubs("example.test/lib", missingOverrideExports(goPkg, ledger, exports)); strings.Contains(got, "Profile") {
		t.Errorf("stubs declare the blocked Profile:\n%s", got)
	}
	if got := renderOverrideStubs("example.test/lib", nil); got != "" {
		t.Errorf("stubs of a complete package = %q, want none", got)
	}
}

// checkOverrideStubFixture type-checks src as the package example.test/lib.
func checkOverrideStubFixture(t *testing.T, src string) *types.Package {
	t.Helper()

	// Write the package as a module and load its types.
	moduleDir := writePackageGraphFixture(t, map[string]string{
		"go.mod":     "module example.test\n\ngo 1.25.3\n",
		"lib/lib.go": src,
	})
	cfg := &packages.Config{Mode: packages.NeedName | packages.NeedTypes, Dir: moduleDir, Env: goScriptLoaderEnv()}
	pkgs, err := packages.Load(cfg, "example.test/lib")
	if err != nil || len(pkgs) != 1 || len(pkgs[0].Errors) != 0 {
		t.Fatalf("load fixture: %v %v", err, pkgs)
	}
	return pkgs[0].Types
}

// loadOverrideGoPackages returns the Go packages of the standard library
// override packages in facts, for the js/wasm port, in package path order.
// The builtin package has no Go package, the goscript module requires only
// some of the modules of the others, and a package of another Go release is
// skipped.
func loadOverrideGoPackages(t *testing.T, facts *OverrideFacts) []*packages.Package {
	t.Helper()

	// Name the standard library packages.
	var paths []string
	for pkgPath := range facts.packages {
		first, _, _ := strings.Cut(pkgPath, "/")
		if pkgPath != "builtin" && !strings.Contains(first, ".") {
			paths = append(paths, pkgPath)
		}
	}
	slices.Sort(paths)

	// Load their types, keeping those of this Go release.
	cfg := &packages.Config{Mode: packages.NeedName | packages.NeedTypes, Env: goScriptLoaderEnv()}
	pkgs, err := packages.Load(cfg, paths...)
	if err != nil {
		t.Fatal(err)
	}
	pkgs = slices.DeleteFunc(pkgs, func(pkg *packages.Package) bool {
		if len(pkg.Errors) != 0 {
			t.Logf("skip %s: %v", pkg.PkgPath, pkg.Errors)
		}
		return len(pkg.Errors) != 0
	})
	slices.SortFunc(pkgs, func(a, b *packages.Package) int {
		return strings.Compare(a.PkgPath, b.PkgPath)
	})
	return pkgs
}

// handWrittenTypeScriptExports returns the exports of the override package
// pkgPath without those of its stub module.
func handWrittenTypeScriptExports(facts *OverrideFacts, pkgPath string) (map[string]typeScriptExport, error) {
	// Index the sources the package can re-export, with an empty stub module.
	files, err := facts.overrideExportFiles(pkgPath)
	if err != nil {
		return nil, err
	}
	files[path.Join(pkgPath, overrideStubFile)] = ""

	// Follow the exports from the package entry file.
	exports := make(map[string]typeScriptExport)
	err = collectTypeScriptExports(path.Join(pkgPath, "index.ts"), files, exports, make(map[string]bool))
	return exports, err
}

// writeOverrideStubs writes source as the stub module of the package in
// pkgDir and re-exports it from index.ts, or removes both for an empty source.
func writeOverrideStubs(t *testing.T, pkgDir, source string) {
	t.Helper()

	// Write or remove the module.
	stubPath := filepath.Join(pkgDir, overrideStubFile)
	if source == "" {
		if err := os.Remove(stubPath); err != nil && !os.IsNotExist(err) {
			t.Fatal(err)
		}
	} else if err := os.WriteFile(stubPath, []byte(source), 0o644); err != nil {
		t.Fatal(err)
	}

	// Add or remove the re-export of index.ts.
	indexPath := filepath.Join(pkgDir, "index.ts")
	data, err := os.ReadFile(indexPath)
	if err != nil {
		t.Fatal(err)
	}
	index := strings.TrimRight(strings.ReplaceAll(string(data), overrideStubExport+"\n", ""), "\n") + "\n"
	if source != "" {
		// The line joins a final block of re-exports, or follows code.
		lines := strings.Split(strings.TrimRight(index, "\n"), "\n")
		if !strings.HasPrefix(lines[len(lines)-1], "export * from ") {
			index += "\n"
		}
		index += overrideStubExport + "\n"
	}
	if index != string(data) {
		if err := os.WriteFile(indexPath, []byte(index), 0o644); err != nil {
			t.Fatal(err)
		}
	}
}

// checkOverrideStubs reports a stub module of the package in pkgDir that
// differs from source, or an index.ts that does not re-export just a module
// that exists.
func checkOverrideStubs(t *testing.T, pkgDir, pkgPath, source string) {
	t.Helper()

	// Compare the module.
	got, err := os.ReadFile(filepath.Join(pkgDir, overrideStubFile))
	if err != nil && !os.IsNotExist(err) {
		t.Fatal(err)
	}
	if string(got) != source {
		t.Errorf("gs/%s/%s is stale; run go test ./compiler -run TestOverrideStubsCurrent -update", pkgPath, overrideStubFile)
	}

	// Check the re-export.
	index, err := os.ReadFile(filepath.Join(pkgDir, "index.ts"))
	if err != nil {
		t.Fatal(err)
	}
	if reexports := slices.Contains(strings.Split(string(index), "\n"), overrideStubExport); reexports != (source != "") {
		t.Errorf("gs/%s/index.ts re-exports %s: %v, want %v", pkgPath, overrideStubFile, reexports, source != "")
	}
}

// missingOverrideExports returns, in name order, the package-level functions,
// variables and types of goPkg and the method functions of its exported named
// non-struct types that exports does not provide, leaving out the symbols
// ledger blocks. Constants are inlined, so they have no stub.
func missingOverrideExports(
	goPkg *types.Package,
	ledger overrideParityLedger,
	exports map[string]typeScriptExport,
) []overrideStub {
	// Visit each exported object of the package scope.
	var stubs []overrideStub
	scope := goPkg.Scope()
	for _, name := range scope.Names() {
		if !ast.IsExported(name) || ledger.Symbols[name].Status == overrideParityStatusBlocked {
			continue
		}
		switch obj := scope.Lookup(name).(type) {
		case *types.Func:
			if !exports[name].value {
				stubs = append(stubs, overrideStub{name: name, fn: obj})
			}
		case *types.Var:
			if !exports[name].value {
				stubs = append(stubs, overrideStub{name: name, varType: obj.Type()})
			}
		case *types.TypeName:
			if !obj.IsAlias() && !exports[name].present() {
				stubs = append(stubs, overrideStub{name: name, typeName: obj})
			}
			stubs = append(stubs, missingOverrideMethodFunctions(obj, exports)...)
		}
	}
	slices.SortFunc(stubs, func(a, b overrideStub) int {
		return strings.Compare(a.name, b.name)
	})
	return stubs
}

// missingOverrideMethodFunctions returns the method functions of typeName,
// which compiled code calls for the methods of named non-struct types, that
// exports does not provide. They include unexported methods, which method
// tables list.
func missingOverrideMethodFunctions(typeName *types.TypeName, exports map[string]typeScriptExport) []overrideStub {
	// Struct and interface types, and aliases, have no method functions.
	named, _ := typeName.Type().(*types.Named)
	if typeName.IsAlias() || !namedNonInterfaceNonStructType(named) {
		return nil
	}

	// A class of the override provides the methods its functions call.
	class := exports[typeName.Name()].value
	var stubs []overrideStub
	for method := range named.Methods() {
		name := methodFunctionName(named, method.Name())
		if !exports[name].value {
			stubs = append(stubs, overrideStub{name: name, fn: method, class: class})
		}
	}
	return stubs
}

// renderOverrideStubs returns the TypeScript module declaring stubs, the
// missing exports of the override package pkgPath, or "" when there are
// none. Each stub is a function or variable declaration, so a bundler drops
// those a program does not use.
func renderOverrideStubs(pkgPath string, stubs []overrideStub) string {
	// A package without missing exports needs no module.
	if len(stubs) == 0 {
		return ""
	}

	// Import the runtime when a function stub calls it.
	var b strings.Builder
	b.WriteString("// Code generated by go test ./compiler -run TestOverrideStubsCurrent -update. DO NOT EDIT.\n\n")
	b.WriteString("// The exports of Go package " + pkgPath + " that its override does not implement.\n")
	if slices.ContainsFunc(stubs, overrideStub.callsRuntime) {
		b.WriteString("\nimport * as $ from '@goscript/builtin/index.js'\n")
	}

	// Declare each stub.
	for _, stub := range stubs {
		b.WriteString("\n")
		b.WriteString(stub.render(pkgPath))
	}
	return b.String()
}

// callsRuntime reports whether the stub's declaration calls the runtime: all
// but those of variables and of types other than structs do.
func (stub overrideStub) callsRuntime() bool {
	return stub.fn != nil || stub.typeName != nil && typeNameRequiresValue(stub.typeName)
}

// render returns the TypeScript declaration of the stub in package pkgPath.
func (stub overrideStub) render(pkgPath string) string {
	// A variable holds its zero value, and a type is a stub type.
	if stub.typeName != nil {
		return renderOverrideTypeStub(pkgPath, stub.typeName)
	}
	if stub.fn == nil {
		return "export let " + stub.name + ": any = " + overrideStubZeroValue(stub.varType) + "\n"
	}

	// A method function of a class calls the class's method.
	goName := pkgPath + "." + stub.fn.Name()
	if recv := methodReceiverNamedType(stub.fn); recv != nil {
		goName = pkgPath + "." + recv.Obj().Name() + "." + stub.fn.Name()
	}
	if stub.class {
		return "export function " + stub.name + "(receiver: any, ...args: any[]): any {\n" +
			"  return $.callOverrideMethod(receiver, " + strconv.Quote(stub.fn.Name()) + ", " +
			strconv.Quote(goName) + ", args)\n}\n"
	}

	// Any other function panics when called.
	return "export function " + stub.name + "(..._args: any[]): any {\n" +
		"  return $.notImplemented(" + strconv.Quote(goName) + ")\n}\n"
}

// overrideStubZeroValue returns the zero value of a variable of type typ: that
// of a basic type, or null for any other, which is the zero value of a
// pointer, slice, map, channel, function or interface.
func overrideStubZeroValue(typ types.Type) string {
	if _, ok := types.Unalias(typ).Underlying().(*types.Basic); ok {
		return zeroValueExpr(typ)
	}
	return "null"
}

// renderOverrideTypeStub returns the stub of the type typeName of package
// pkgPath. A struct type, whose values are class instances, is a class that
// panics when constructed, with any fields; any other type is any.
func renderOverrideTypeStub(pkgPath string, typeName *types.TypeName) string {
	// Declare the type's parameters, which the stub ignores.
	params := ""
	if named, _ := typeName.Type().(*types.Named); named != nil && named.TypeParams().Len() != 0 {
		names := make([]string, named.TypeParams().Len())
		for idx := range names {
			names[idx] = "_T" + strconv.Itoa(idx) + " = any"
		}
		params = "<" + strings.Join(names, ", ") + ">"
	}

	// Declare a class for a struct type.
	if !typeNameRequiresValue(typeName) {
		return "export type " + typeName.Name() + params + " = any\n"
	}
	return "export class " + typeName.Name() + params + " {\n" +
		"  [field: string]: any\n\n" +
		"  constructor(..._args: any[]) {\n" +
		"    $.notImplemented(" + strconv.Quote(pkgPath+"."+typeName.Name()) + ")\n" +
		"  }\n}\n"
}
