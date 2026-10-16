package compiler

import (
	"go/ast"
	"go/token"
	"go/types"
)

// Local slice literals.
//
// A slice literal of fixed-size numbers is held in a typed array (see
// packedSliceExpr), whose memory unsafe views share, as GPU uploads do. A
// JavaScript engine makes a small typed array several times slower than an
// array, so a literal that no code but its function's own index expressions
// can see keeps an array: it initializes a local variable of the body that
// the body only indexes, without taking the address of an element, passes to
// len or cap, ranges over or assigns to, as in
//
//	v := []float32{x, y, z}
//	sum += v[0] + v[2]
//
// Stores still wrap or round each element as Go stores it, as they do for
// any slice that is not held in a typed array.

// collectLocalLiterals returns the slice literals of body that keep an array
// (see above), or nil if there are none.
func collectLocalLiterals(ctx lowerFileContext, body *ast.BlockStmt) map[*ast.CompositeLit]bool {
	// The locals that slice literals of typed elements initialize.
	info := ctx.semPkg.source.TypesInfo
	literals := make(map[*types.Var]*ast.CompositeLit)
	ast.Inspect(body, func(node ast.Node) bool {
		switch typed := node.(type) {
		case *ast.AssignStmt:
			if typed.Tok == token.DEFINE && len(typed.Lhs) == len(typed.Rhs) {
				for idx, lhs := range typed.Lhs {
					addLocalLiteral(ctx, literals, lhs, typed.Rhs[idx])
				}
			}
		case *ast.ValueSpec:
			if len(typed.Names) == len(typed.Values) {
				for idx, name := range typed.Names {
					addLocalLiteral(ctx, literals, name, typed.Values[idx])
				}
			}
		}
		return true
	})
	if len(literals) == 0 {
		return nil
	}

	// A local that any other use can pass on keeps its typed array.
	var path []ast.Node
	ast.Inspect(body, func(node ast.Node) bool {
		if node == nil {
			path = path[:len(path)-1]
			return true
		}
		if ident, ok := node.(*ast.Ident); ok {
			if v, ok := info.Uses[ident].(*types.Var); ok && literals[v] != nil && !isLocalLiteralUse(info, path, ident) {
				delete(literals, v)
			}
		}
		path = append(path, node)
		return true
	})

	// The literals of the locals left keep arrays.
	result := make(map[*ast.CompositeLit]bool, len(literals))
	for _, lit := range literals {
		result[lit] = true
	}
	return result
}

// addLocalLiteral records in literals that the local that name declares is
// initialized by value, if value is a slice literal of elements held in
// typed arrays other than bytes and the local is not boxed.
func addLocalLiteral(ctx lowerFileContext, literals map[*types.Var]*ast.CompositeLit, name ast.Expr, value ast.Expr) {
	// The name declares an unboxed local.
	ident, ok := name.(*ast.Ident)
	if !ok {
		return
	}
	v, ok := ctx.semPkg.source.TypesInfo.Defs[ident].(*types.Var)
	if !ok || ctx.model.needsVarRef[v] {
		return
	}

	// The value is a slice literal of such elements.
	lit, ok := ast.Unparen(value).(*ast.CompositeLit)
	if !ok {
		return
	}
	slice, ok := types.Unalias(ctx.semPkg.source.TypesInfo.TypeOf(lit)).Underlying().(*types.Slice)
	if !ok {
		return
	}
	if typedArray, hint := typedSliceArray(slice.Elem()); typedArray == "" || hint == "byte" {
		return
	}
	literals[v] = lit
}

// isLocalLiteralUse reports whether ident, a use of a local whose path from
// the body is path, only indexes it, without taking the address of the
// element, passes it to len or cap, ranges over it or assigns to it.
func isLocalLiteralUse(info *types.Info, path []ast.Node, ident *ast.Ident) bool {
	// An index expression must not be an operand of &.
	parent := path[len(path)-1]
	switch typed := parent.(type) {
	case *ast.IndexExpr:
		if typed.X != ident {
			return false
		}
		for idx := len(path) - 2; idx >= 0; idx-- {
			switch outer := path[idx].(type) {
			case *ast.ParenExpr:
				continue
			case *ast.UnaryExpr:
				return outer.Op != token.AND
			}
			return true
		}
		return true

	// The builtins len and cap only read the length.
	case *ast.CallExpr:
		fun, ok := ast.Unparen(typed.Fun).(*ast.Ident)
		if !ok {
			return false
		}
		builtin, ok := info.Uses[fun].(*types.Builtin)
		return ok && (builtin.Name() == "len" || builtin.Name() == "cap")

	// A range loop reads the elements, and an assignment replaces the local.
	case *ast.RangeStmt:
		return typed.X == ident
	case *ast.AssignStmt:
		if typed.Tok != token.ASSIGN && typed.Tok != token.DEFINE {
			return false
		}
		for _, lhs := range typed.Lhs {
			if lhs == ident {
				return true
			}
		}
	}
	return false
}
