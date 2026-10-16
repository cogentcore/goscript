package compiler

import (
	"fmt"
	"go/parser"
	"go/token"
	"strings"
	"testing"
)

func TestIntegerBitHelpersHandleNilTypes(t *testing.T) {
	if bits, ok := unsignedIntegerBits(nil); ok || bits != 0 {
		t.Fatalf("unsignedIntegerBits(nil) = %d, %v; want 0, false", bits, ok)
	}
	if bits, ok := signedIntegerBits(nil); ok || bits != 0 {
		t.Fatalf("signedIntegerBits(nil) = %d, %v; want 0, false", bits, ok)
	}
	if bits, ok := integerBits(nil); ok || bits != 0 {
		t.Fatalf("integerBits(nil) = %d, %v; want 0, false", bits, ok)
	}
	if isRuntimeWideIntegerType(nil) {
		t.Fatalf("isRuntimeWideIntegerType(nil) = true; want false")
	}
}

func TestPointerToArrayTypeHandlesNilTypes(t *testing.T) {
	if array := pointerToArrayType(nil); array != nil {
		t.Fatalf("pointerToArrayType(nil) = %v; want nil", array)
	}
}

func TestDeclTooLargeForFlowAnalysis(t *testing.T) {
	// A function with a branch for each statement is too large past the limit.
	source := func(branches int) string {
		var b strings.Builder
		b.WriteString("package p\n\nfunc f(v int) (n int) {\n")
		for idx := range branches {
			fmt.Fprintf(&b, "\tif v > %d {\n\t\tn++\n\t}\n", idx)
		}
		b.WriteString("\treturn n\n}\n")
		return b.String()
	}
	for _, test := range []struct {
		branches int
		want     bool
	}{{10, false}, {maxFlowBranches, false}, {maxFlowBranches + 1, true}} {
		file, err := parser.ParseFile(token.NewFileSet(), "p.go", source(test.branches), 0)
		if err != nil {
			t.Fatal(err)
		}
		if got := declTooLargeForFlowAnalysis(file.Decls[0]); got != test.want {
			t.Errorf("declTooLargeForFlowAnalysis with %d branches = %v; want %v", test.branches, got, test.want)
		}
	}
}
