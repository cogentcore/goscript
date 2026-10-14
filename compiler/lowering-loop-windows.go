package compiler

import (
	"go/ast"
	"go/token"
	"go/types"
	"slices"
	"strings"

	"golang.org/x/tools/go/ast/astutil"
)

// loopSliceWindow is a slice variable that a loop indexes and never assigns,
// with the name of the local that holds its window, which the loop reads once
// before its first iteration. Its elements s[i] and its length len(s) in the
// loop are then read from the window, rather than through the generic slice
// helpers, which see slices and arrays of every kind and are much slower.
type loopSliceWindow struct {
	slice  types.Object
	window string
}

// loopSliceWindows returns the windows of the slice variables that the parts
// of a loop index, and the declarations, without their keyword, of the locals
// that hold them. The parts are the loop's body, condition and init and post
// statements. A slice qualifies when it is a local that needs no variable
// reference, and that no part and no function literal assigns. A slice that
// an enclosing loop already holds the window of keeps that window. The slice
// ranged, if not nil, uses the range loop's own window, ranged.
func (o *LoweringOwner) loopSliceWindows(
	ctx lowerFileContext,
	loop ast.Stmt,
	ranged types.Object,
	rangedWindow string,
	parts ...ast.Node,
) ([]loopSliceWindow, []string) {
	// Find the slices indexed in the loop, outside function literals, and
	// declared before the loop.
	candidates, idents := loopIndexedSlices(ctx, parts)
	if len(candidates) == 0 {
		return nil, nil
	}
	from, to := loopDeclarationSpan(ctx, loop)

	// Drop the slices that the loop or a function literal assigns.
	assigned := loopAssignedVars(ctx, parts)
	var windows []loopSliceWindow
	var decls []string
	for _, slice := range candidates {
		if slice.Pos() < from || slice.Pos() >= to || assigned[slice] || sliceAssignedInFuncLit(ctx, loop, slice) {
			continue
		}

		// The ranged slice uses the range loop's window; another slice has a
		// window of its own.
		if slice == ranged {
			windows = append(windows, loopSliceWindow{slice: slice, window: rangedWindow})
			continue
		}
		name := ctx.tempName("SliceWindow")
		windows = append(windows, loopSliceWindow{slice: slice, window: name})
		decls = append(decls, name+" = "+o.runtimeOwner.QualifiedHelper(RuntimeHelperSliceRange)+"("+o.lowerIdent(ctx, idents[slice], false)+")")
	}
	return windows, decls
}

// loopDeclarationSpan returns the span of positions in which a variable
// must be declared to be windowed by loop: before the loop, and inside the
// innermost function literal that contains the loop, since the function that
// declares a variable that a function literal captures may assign it while
// the literal's loop runs. Without the syntax, no variable qualifies.
func loopDeclarationSpan(ctx lowerFileContext, loop ast.Stmt) (token.Pos, token.Pos) {
	// Without the syntax, assume the worst.
	if ctx.file == nil {
		return token.NoPos, token.NoPos
	}

	// The innermost function literal around the loop bounds its variables.
	path, _ := astutil.PathEnclosingInterval(ctx.file, loop.Pos(), loop.End())
	for _, node := range path {
		if lit, ok := node.(*ast.FuncLit); ok {
			return lit.Pos(), loop.Pos()
		}
	}
	return token.NoPos, loop.Pos()
}

// loopIndexedSlices returns the local slice variables, in order of first
// use, that the parts index outside function literals, that need no variable
// reference and that no enclosing loop holds the window of, and an identifier
// of each.
func loopIndexedSlices(ctx lowerFileContext, parts []ast.Node) ([]types.Object, map[types.Object]*ast.Ident) {
	// Each indexed slice is recorded once, at its first use.
	info := ctx.semPkg.source.TypesInfo
	var found []types.Object
	idents := make(map[types.Object]*ast.Ident)
	for _, part := range parts {
		if part == nil {
			continue
		}
		ast.Inspect(part, func(node ast.Node) bool {
			// Function literals may run after the slice changes.
			switch typed := node.(type) {
			case *ast.FuncLit:
				return false
			case *ast.IndexExpr:
				ident, ok := ast.Unparen(typed.X).(*ast.Ident)
				if !ok {
					return true
				}
				slice, ok := info.Uses[ident].(*types.Var)
				if ok && idents[slice] == nil && loopWindowCandidate(ctx, slice) {
					found = append(found, slice)
					idents[slice] = ident
				}
			}
			return true
		})
	}
	return found, idents
}

// loopWindowCandidate reports whether slice is a local variable of a slice
// type that needs no variable reference, and whose window no enclosing loop
// holds.
func loopWindowCandidate(ctx lowerFileContext, slice *types.Var) bool {
	// Only a slice type qualifies: not a string, array, map or type parameter.
	if _, ok := types.Unalias(slice.Type()).Underlying().(*types.Slice); !ok {
		return false
	}
	if _, ok := types.Unalias(slice.Type()).(*types.TypeParam); ok {
		return false
	}

	// A package variable may change in any call, and a variable reference
	// may change through a pointer.
	if slice.Parent() == nil || slice.Pkg() == nil || slice.Parent() == slice.Pkg().Scope() {
		return false
	}
	if ctx.model.needsVarRef[slice] || ctx.lazyPackageVars[slice] {
		return false
	}
	_, held := loopWindowFor(ctx, slice)
	return !held
}

// loopAssignedVars returns the variables that the parts assign, by an
// assignment, an increment or decrement, a range loop with =, or taking
// their address, outside function literals, which sliceAssignedInFuncLit
// checks.
func loopAssignedVars(ctx lowerFileContext, parts []ast.Node) map[types.Object]bool {
	// Each assigned variable is marked once, from any of the parts.
	info := ctx.semPkg.source.TypesInfo
	assigned := make(map[types.Object]bool)
	mark := func(expr ast.Expr) {
		if ident, ok := ast.Unparen(expr).(*ast.Ident); ok {
			if obj := info.ObjectOf(ident); obj != nil {
				assigned[obj] = true
			}
		}
	}
	for _, part := range parts {
		if part == nil {
			continue
		}
		ast.Inspect(part, func(node ast.Node) bool {
			// Each kind of statement that may change a variable marks it.
			switch typed := node.(type) {
			case *ast.AssignStmt:
				for _, lhs := range typed.Lhs {
					mark(lhs)
				}
			case *ast.IncDecStmt:
				mark(typed.X)
			case *ast.UnaryExpr:
				if typed.Op == token.AND {
					mark(typed.X)
				}
			case *ast.RangeStmt:
				if typed.Tok == token.ASSIGN {
					mark(typed.Key)
					mark(typed.Value)
				}
			}
			return true
		})
	}
	return assigned
}

// withLoopSliceWindows returns ctx with windows added to the windows of the
// enclosing loops.
func (ctx lowerFileContext) withLoopSliceWindows(windows []loopSliceWindow) lowerFileContext {
	if len(windows) == 0 {
		return ctx
	}
	ctx.loopWindows = append(slices.Clip(ctx.loopWindows), windows...)
	return ctx
}

// loopWindowFor returns the name of the window of slice that an enclosing
// loop holds, the innermost one first.
func loopWindowFor(ctx lowerFileContext, slice types.Object) (string, bool) {
	for idx := len(ctx.loopWindows) - 1; idx >= 0; idx-- {
		if ctx.loopWindows[idx].slice == slice {
			return ctx.loopWindows[idx].window, true
		}
	}
	return "", false
}

// loopWindowElement returns the element s[i] of a slice whose window an
// enclosing loop holds, read or written in place in the window's backing
// array, at an index checked against the window's length.
func (o *LoweringOwner) loopWindowElement(ctx lowerFileContext, expr *ast.IndexExpr) (string, []Diagnostic, bool) {
	// Only an index of a slice variable with a window can match.
	if len(ctx.loopWindows) == 0 {
		return "", nil, false
	}
	ident, ok := ast.Unparen(expr.X).(*ast.Ident)
	if !ok {
		return "", nil, false
	}
	window, ok := loopWindowFor(ctx, ctx.semPkg.source.TypesInfo.Uses[ident])
	if !ok {
		return "", nil, false
	}

	// The element is the slot of the backing array at the checked index.
	index, diagnostics := o.lowerExpr(ctx, expr.Index)
	index = o.lowerNumberIndexValue(ctx, expr.Index, index)
	slot := o.runtimeOwner.QualifiedHelper(RuntimeHelperWindowSlot) + "(" + window + ", " + index + ")"
	return "(" + window + ".backing as any[])[" + slot + "]", diagnostics, true
}

// loopWindowLen returns the length of the slice expr, when it is a slice
// variable whose window an enclosing loop holds.
func loopWindowLen(ctx lowerFileContext, expr ast.Expr) (string, bool) {
	// Only a slice variable can have a held window.
	ident, ok := ast.Unparen(expr).(*ast.Ident)
	if !ok || len(ctx.loopWindows) == 0 {
		return "", false
	}
	window, ok := loopWindowFor(ctx, ctx.semPkg.source.TypesInfo.Uses[ident])
	if !ok {
		return "", false
	}
	return window + ".length", true
}

// prependLoopInit returns the init clause of a for loop with the window
// declarations decls added before init, which must be empty or a let
// declaration, and false otherwise.
func prependLoopInit(init string, decls []string) (string, bool) {
	// No windows leave the init as it is.
	if len(decls) == 0 {
		return init, true
	}
	switch {
	case init == "":
		return "let " + strings.Join(decls, ", "), true
	case strings.HasPrefix(init, "let "):
		return "let " + strings.Join(decls, ", ") + ", " + strings.TrimPrefix(init, "let "), true
	default:
		return init, false
	}
}
