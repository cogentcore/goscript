package compiler

import (
	"go/ast"
	"slices"
	"strconv"
	"strings"
	"unicode"

	"golang.org/x/tools/go/packages"
)

// PackageTestGraphVariant describes one Go test package variant.
type PackageTestGraphVariant struct {
	// ID is the go/packages package identity.
	ID string
	// PkgPath is the stable Go package path for this variant.
	PkgPath string
	// Name is the Go package name for this variant.
	Name string
	// ForTest is the package path this variant tests.
	ForTest string
	// GoFiles are the package source files.
	GoFiles []string
	// CompiledGoFiles are files selected by build constraints.
	CompiledGoFiles []string
	// Imports are packages imported directly by this test variant.
	Imports []string
	// Diagnostics are load diagnostics attached to this variant.
	Diagnostics []Diagnostic
	// Tests are ordinary TestXxx functions discovered in this variant.
	Tests []PackageTestFunction
	// Benchmarks are BenchmarkXxx functions discovered in this variant.
	Benchmarks []PackageTestFunction
}

func newPackageTestGraphVariant(pkg *packages.Package, diagnostics []Diagnostic) *PackageTestGraphVariant {
	imports := make([]string, 0, len(pkg.Imports))
	for importPath := range pkg.Imports {
		imports = append(imports, importPath)
	}
	slices.Sort(imports)
	return &PackageTestGraphVariant{
		ID:              pkg.ID,
		PkgPath:         packagePath(pkg),
		Name:            pkg.Name,
		ForTest:         pkg.ForTest,
		GoFiles:         slices.Clone(pkg.GoFiles),
		CompiledGoFiles: slices.Clone(pkg.CompiledGoFiles),
		Imports:         imports,
		Diagnostics:     slices.Clone(diagnostics),
		Tests:           discoverPackageTestFunctions(pkg, "Test", "T"),
		Benchmarks:      discoverPackageTestFunctions(pkg, "Benchmark", "B"),
	}
}

// discoverPackageTestFunctions returns the functions in the package whose
// names have the given prefix (such as Test) and that take a pointer to the
// given testing type (such as T).
func discoverPackageTestFunctions(pkg *packages.Package, prefix, testingType string) []PackageTestFunction {
	if pkg == nil {
		return nil
	}
	var tests []PackageTestFunction
	for _, file := range pkg.Syntax {
		testingAliases := fileTestingAliases(file)
		for _, decl := range file.Decls {
			fn, _ := decl.(*ast.FuncDecl)
			if !isOrdinaryTestFuncDecl(fn, testingAliases, prefix, testingType) {
				continue
			}
			tests = append(tests, PackageTestFunction{
				Name:        fn.Name.Name,
				PackagePath: packagePath(pkg),
			})
		}
	}
	return tests
}

func isOrdinaryTestFuncDecl(fn *ast.FuncDecl, testingAliases map[string]bool, prefix, testingType string) bool {
	if fn == nil || fn.Recv != nil || !isTestName(fn.Name.Name, prefix) || fn.Type == nil {
		return false
	}
	if fn.Type.Results != nil && len(fn.Type.Results.List) != 0 {
		return false
	}
	if fn.Type.Params == nil || len(fn.Type.Params.List) != 1 {
		return false
	}
	param := fn.Type.Params.List[0]
	if len(param.Names) > 1 {
		return false
	}
	ptr, ok := param.Type.(*ast.StarExpr)
	return ok && isTestingType(ptr.X, testingAliases, testingType)
}

func fileTestingAliases(file *ast.File) map[string]bool {
	aliases := make(map[string]bool)
	for _, imp := range file.Imports {
		path, err := strconv.Unquote(imp.Path.Value)
		if err != nil || path != "testing" {
			continue
		}
		name := "testing"
		if imp.Name != nil {
			name = imp.Name.Name
		}
		aliases[name] = true
	}
	return aliases
}

// isTestingType reports whether expr names the given type of the testing package.
func isTestingType(expr ast.Expr, aliases map[string]bool, testingType string) bool {
	switch typed := expr.(type) {
	case *ast.SelectorExpr:
		base, _ := typed.X.(*ast.Ident)
		return base != nil && aliases[base.Name] && typed.Sel.Name == testingType
	case *ast.Ident:
		return aliases["."] && typed.Name == testingType
	default:
		return false
	}
}

// isTestName reports whether name is a test function name with the given
// prefix (such as Test or Benchmark), following the go test rules.
func isTestName(name, prefix string) bool {
	if !strings.HasPrefix(name, prefix) || name == prefix {
		return false
	}
	for _, r := range strings.TrimPrefix(name, prefix) {
		return !unicode.IsLower(r)
	}
	return false
}
