package compiler

import (
	"go/ast"
	"go/importer"
	"go/parser"
	"go/token"
	"go/types"
	"testing"
)

// TestFuncValueShapesMatch checks that shapes match exactly for concrete
// types and structurally where a type parameter stands for any type.
func TestFuncValueShapesMatch(t *testing.T) {
	// Type-check the function types of a small package.
	src := `package p
type Named func(int) string
type Rule struct{}
func concrete(func(int) string, Named, func(*Rule, int) int, func(...int), func([]int), func(map[string]int) error) {}
func generic[T any, S ~[]T](func(T) string, func(*T, int) int, func(S), func(map[string]T) error) {}
`
	fset := token.NewFileSet()
	file, err := parser.ParseFile(fset, "p.go", src, 0)
	if err != nil {
		t.Fatal(err)
	}
	pkg, err := (&types.Config{Importer: importer.Default()}).Check("p", fset, []*ast.File{file}, nil)
	if err != nil {
		t.Fatal(err)
	}
	params := func(name string) []*funcShapeNode {
		signature := pkg.Scope().Lookup(name).Type().(*types.Signature)
		var nodes []*funcShapeNode
		for v := range signature.Params().Variables() {
			node := parseFuncShape(funcValueShape(v.Type()))
			if node == nil {
				t.Fatalf("%s: shape of %s does not parse: %q", name, v.Type(), funcValueShape(v.Type()))
			}
			nodes = append(nodes, node)
		}
		return nodes
	}
	concrete, generic := params("concrete"), params("generic")

	// A named func type has the shape of its underlying signature, and a
	// variadic signature differs from one taking a slice.
	for _, tc := range []struct {
		name string
		a, b *funcShapeNode
		want bool
	}{
		{"named and literal", concrete[0], concrete[1], true},
		{"different params", concrete[0], concrete[2], false},
		{"variadic and slice", concrete[3], concrete[4], false},
		{"type parameter param", generic[0], concrete[0], true},
		{"pointer to type parameter", generic[1], concrete[2], true},
		{"type parameter element", generic[3], concrete[5], true},
		{"wrong arity", generic[0], concrete[2], false},
		{"constrained slice", generic[2], concrete[4], true},
	} {
		if got := funcShapesMatch(tc.a, tc.b); got != tc.want {
			t.Errorf("%s: match %v, want %v", tc.name, got, tc.want)
		}
	}
}
