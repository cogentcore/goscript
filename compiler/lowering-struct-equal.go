package compiler

import (
	"go/types"
	"regexp"
	"strings"
)

// structEqualInlineMax is the largest number of field comparisons that a
// struct comparison is expanded to inline.
const structEqualInlineMax = 8

// lowerInlineStructEqual returns the comparison of the struct values left
// and right of type typ, which can each be evaluated more than once, as the
// comparisons of their fields joined by &&, when typ is a generated struct
// class whose fields, and those of its struct fields, are compared with at
// most structEqualInlineMax comparisons of basic values, pointers and
// interfaces. Other structs are compared by the runtime's structEqual,
// which finds the type info of each field at each comparison.
func (o *LoweringOwner) lowerInlineStructEqual(typ types.Type, left string, right string) (string, bool) {
	comparisons, ok := o.appendStructFieldComparisons(nil, typ, left, right)
	if !ok || len(comparisons) > structEqualInlineMax {
		return "", false
	}
	if len(comparisons) == 0 {
		return "true", true
	}
	return strings.Join(comparisons, " && "), true
}

// appendStructFieldComparisons appends to comparisons the comparison of
// each field of the struct values left and right of type typ, recursing
// into fields of struct types, and reports false for a type it does not
// compare inline.
func (o *LoweringOwner) appendStructFieldComparisons(comparisons []string, typ types.Type, left string, right string) ([]string, bool) {
	// Only a comparable generated class has fields of known names.
	named := namedStructType(typ)
	if named == nil || !o.isGeneratedStructClass(named) || !types.Comparable(named) {
		return nil, false
	}
	structType, ok := named.Underlying().(*types.Struct)
	if !ok {
		return nil, false
	}

	// Each field is compared by its kind; Go does not compare blank fields.
	for idx := range structType.NumFields() {
		field := structType.Field(idx)
		if field.Name() == "_" {
			continue
		}
		name := "." + tsStructFieldName(field.Name(), idx)
		comparisons, ok = o.appendFieldComparison(comparisons, field.Type(), left+name, right+name)
		if !ok || len(comparisons) > structEqualInlineMax {
			return nil, false
		}
	}
	return comparisons, true
}

// appendFieldComparison appends the comparison of the field values left and
// right of type typ.
func (o *LoweringOwner) appendFieldComparison(comparisons []string, typ types.Type, left string, right string) ([]string, bool) {
	// Basic values other than complex numbers and unsafe pointers are
	// JavaScript primitives that === compares as Go does, as it does
	// channels. The runtime compares pointers, which may alias other
	// storage, and interfaces.
	switch typed := types.Unalias(typ).Underlying().(type) {
	case *types.Basic:
		if typed.Info()&types.IsComplex != 0 || typed.Kind() == types.UnsafePointer {
			return nil, false
		}
		return append(comparisons, left+" === "+right), true
	case *types.Chan:
		return append(comparisons, left+" === "+right), true
	case *types.Pointer:
		return append(comparisons, o.runtimeOwner.QualifiedHelper(RuntimeHelperPointerEqual)+"("+left+", "+right+")"), true
	case *types.Interface:
		return append(comparisons, o.runtimeOwner.QualifiedHelper(RuntimeHelperComparableEqual)+"("+left+", "+right+")"), true
	case *types.Struct:
		return o.appendStructFieldComparisons(comparisons, typ, left, right)
	}
	return nil, false
}

// isRereadableStructOperand reports whether a lowered struct value can be
// evaluated once for each field compared: a simple operand (see
// isSimpleLoweredOperand), which may also read an element of a loop's slice
// window at its offset plus an index, with type assertions.
func isRereadableStructOperand(value string) bool {
	value = typeAssertionSuffix.ReplaceAllString(value, ")")
	return isSimpleLoweredOperand(windowElementRead.ReplaceAllString(value, "[$1]"))
}

// windowElementRead matches the index of a read from a slice window's
// backing array, such as [w.offset + i].
var windowElementRead = regexp.MustCompile(`\[([\w$]+\.offset) \+ [\w$]+\]`)

// typeAssertionSuffix matches a TypeScript type assertion of a plain or array
// type at the end of a parenthesized expression, such as " as any[])".
var typeAssertionSuffix = regexp.MustCompile(` as [\w$.]+(\[\])?\)`)
