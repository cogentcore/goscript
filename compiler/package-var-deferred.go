package compiler

import (
	"go/ast"
	"go/token"
	"go/types"
)

// deferredInitMinElements is the number of composite literal elements from
// which a constant package variable initializer is deferred to its first read.
// Smaller tables are cheap to build at package initialization, and reading
// them directly is cheaper than reading them through a getter.
const deferredInitMinElements = 256

// packageVarInitIsDeferred reports whether the package variable initializer
// value is built on the first read of its variable instead of at package
// initialization: a large table of constant data, such as the symbol tables
// of golang.org/x/tools/internal/stdlib. Building such a value has no effects
// and gives the same value whenever it is built, so a program cannot tell when
// that happens, and a program that never reads it never builds it.
func packageVarInitIsDeferred(info *types.Info, value ast.Expr) bool {
	elements, ok := constantDataElements(info, value)
	return ok && elements >= deferredInitMinElements
}

// constantDataElements returns the number of composite literal elements in
// expr, and whether expr is constant data: literals, constants, composite
// literals and their addresses, and conversions of constant data, with no
// calls, variables or function literals.
func constantDataElements(info *types.Info, expr ast.Expr) (int, bool) {
	switch typed := expr.(type) {
	case *ast.BasicLit:
		return 0, true
	case *ast.Ident:
		// Constants, including true, false and iota values, and nil.
		switch info.Uses[typed].(type) {
		case *types.Const, *types.Nil:
			return 0, true
		}
		return 0, false
	case *ast.SelectorExpr:
		// A constant of another package.
		_, ok := info.Uses[typed.Sel].(*types.Const)
		return 0, ok
	case *ast.ParenExpr:
		return constantDataElements(info, typed.X)
	case *ast.UnaryExpr:
		// The address of a composite literal, or an operation on a constant.
		if typed.Op == token.AND {
			if _, ok := ast.Unparen(typed.X).(*ast.CompositeLit); !ok {
				return 0, false
			}
		}
		return constantDataElements(info, typed.X)
	case *ast.BinaryExpr:
		return constantDataBinary(info, typed)
	case *ast.CallExpr:
		return constantDataConversion(info, typed)
	case *ast.CompositeLit:
		return constantDataComposite(info, typed)
	}
	return 0, false
}

// constantDataBinary returns the elements of a binary operation on constant
// data, which is constant data.
func constantDataBinary(info *types.Info, expr *ast.BinaryExpr) (int, bool) {
	left, ok := constantDataElements(info, expr.X)
	if !ok {
		return 0, false
	}
	right, ok := constantDataElements(info, expr.Y)
	return left + right, ok
}

// constantDataConversion returns the elements of a conversion of constant
// data to a type, which is constant data. Other calls are not.
func constantDataConversion(info *types.Info, call *ast.CallExpr) (int, bool) {
	if len(call.Args) != 1 || call.Ellipsis.IsValid() {
		return 0, false
	}
	if tv, ok := info.Types[call.Fun]; !ok || !tv.IsType() {
		return 0, false
	}
	return constantDataElements(info, call.Args[0])
}

// constantDataComposite returns the elements of a composite literal whose
// elements, and keys of maps, arrays and slices, are constant data.
func constantDataComposite(info *types.Info, lit *ast.CompositeLit) (int, bool) {
	// The keys of a struct literal, also one whose & is elided in a table of
	// pointers, are field names, not values.
	litType := types.Unalias(info.TypeOf(lit)).Underlying()
	if pointer, ok := litType.(*types.Pointer); ok {
		litType = types.Unalias(pointer.Elem()).Underlying()
	}
	_, isStruct := litType.(*types.Struct)
	count := len(lit.Elts)
	for _, elt := range lit.Elts {
		// A keyed element has a constant key, unless it names a field.
		value := elt
		if kv, ok := elt.(*ast.KeyValueExpr); ok {
			value = kv.Value
			if !isStruct {
				keyCount, ok := constantDataElements(info, kv.Key)
				if !ok {
					return 0, false
				}
				count += keyCount
			}
		}

		// Each element is constant data.
		elements, ok := constantDataElements(info, value)
		if !ok {
			return 0, false
		}
		count += elements
	}
	return count, true
}
