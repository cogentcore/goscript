package compiler

import (
	"go/ast"
	"go/token"
	"go/types"
	"slices"
)

// Moves of dead locals.
//
// Go copies a struct or array value at each assignment, argument, append,
// map or slice store, and so does the generated code, with clone. A copy is
// not needed when the value it copies is a local that nothing reads after
// the copy: the destination can take the local's own object, as in
//
//	tok := Token{Kind: k}
//	tok.Pos = pos
//	line = append(line, tok)
//
// A read of a local moves its value instead of copying it when it is the
// last reference to the local in the function, in source order, and the
// local owns its value: it is declared in the function's body, and is not a
// parameter of a function literal, which a caller such as a hand-written
// runtime package may pass without a copy, a named result of one, which a
// bare return reads, a range variable or a local that
// holds a borrowed result (see borrowCallFlag), and no reference other than
// the variable reaches it (see isUnaliasedLocalValue). Source order is execution order except in loops,
// so each loop around the read must declare the local in its body, where
// each iteration has its own. No other reference to the local may be in the
// statement of the read, which could change it after the read, as in
// v.X, w = 1, v. A function with defer or goto statements moves nothing.

// collectMoves records in state the reads of locals in decl's body that move
// their values (see above).
func collectMoves(ctx lowerFileContext, decl *ast.FuncDecl, state *borrowState) {
	// A function with defer or goto statements moves nothing.
	if decl.Body == nil || state.deferred || bodyHasGoto(decl.Body) {
		return
	}

	// The last reference to each value variable of the body, and the
	// parameters and results of its function literals.
	info := ctx.semPkg.source.TypesInfo
	last := make(map[*types.Var]*ast.Ident)
	litParams := make(map[types.Object]bool)
	ast.Inspect(decl.Body, func(node ast.Node) bool {
		switch typed := node.(type) {
		case *ast.FuncLit:
			fields := typed.Type.Params.List
			if typed.Type.Results != nil {
				fields = append(slices.Clip(fields), typed.Type.Results.List...)
			}
			for _, field := range fields {
				for _, name := range field.Names {
					litParams[info.Defs[name]] = true
				}
			}
		case *ast.Ident:
			if v, ok := info.Uses[typed].(*types.Var); ok && isValueCopyType(v.Type()) {
				if prev := last[v]; prev == nil || prev.Pos() < typed.Pos() {
					last[v] = typed
				}
			}
		}
		return true
	})

	// Each last reference of a local that owns its value moves it.
	for v, ident := range last {
		if ownsValue(ctx, decl, state, v) && !litParams[v] && lastReadMoves(ctx, decl.Body, v, ident) {
			if state.moves == nil {
				state.moves = make(map[*ast.Ident]bool)
			}
			state.moves[ident] = true
		}
	}
}

// ownsValue reports whether v, a variable that decl's body refers to, is
// declared in the body, and is neither boxed nor a local that holds a
// borrowed result.
func ownsValue(ctx lowerFileContext, decl *ast.FuncDecl, state *borrowState, v *types.Var) bool {
	return !ctx.model.needsVarRef[v] && state.locals[v] == nil &&
		v.Pos() > decl.Body.Lbrace && v.Pos() < decl.Body.Rbrace
}

// lastReadMoves reports whether ident, the last reference to v in body,
// moves v's value: v is unaliased, each loop around ident declares v in its
// body, and the statement of ident refers to v nowhere else.
func lastReadMoves(ctx lowerFileContext, body *ast.BlockStmt, v *types.Var, ident *ast.Ident) bool {
	// The variable is unaliased, and the read is in a simple statement.
	if !isUnaliasedLocalValue(ctx, ident) {
		return false
	}
	path := nodePath(body, ident.Pos())
	stmt := simpleStmtOf(path)
	if stmt == nil {
		return false
	}

	// Each loop around the read declares the variable in its body.
	for _, node := range path {
		var loopBody *ast.BlockStmt
		switch typed := node.(type) {
		case *ast.ForStmt:
			loopBody = typed.Body
		case *ast.RangeStmt:
			loopBody = typed.Body
		}
		if loopBody != nil && (v.Pos() < loopBody.Lbrace || v.Pos() > loopBody.Rbrace) {
			return false
		}
	}

	// No other reference to the variable is in the statement.
	info := ctx.semPkg.source.TypesInfo
	other := false
	ast.Inspect(stmt, func(node ast.Node) bool {
		if id, ok := node.(*ast.Ident); ok && id != ident && info.Uses[id] == v {
			other = true
		}
		return !other
	})
	return !other
}

// nodePath returns the nodes of body that contain pos, outermost first.
func nodePath(body *ast.BlockStmt, pos token.Pos) []ast.Node {
	var path []ast.Node
	ast.Inspect(body, func(node ast.Node) bool {
		if node == nil || pos < node.Pos() || pos >= node.End() {
			return false
		}
		path = append(path, node)
		return true
	})
	return path
}

// simpleStmtOf returns the innermost statement of path that is a simple
// statement, or nil when a statement with a body, such as an if statement,
// or a function literal, is more inner.
func simpleStmtOf(path []ast.Node) ast.Stmt {
	for idx := len(path) - 1; idx >= 0; idx-- {
		switch typed := path[idx].(type) {
		case *ast.AssignStmt, *ast.ExprStmt, *ast.ReturnStmt, *ast.SendStmt, *ast.IncDecStmt, *ast.GoStmt, *ast.DeclStmt:
			return typed.(ast.Stmt)
		case ast.Stmt, *ast.FuncLit:
			return nil
		}
	}
	return nil
}

// bodyHasGoto reports whether body has a goto statement.
func bodyHasGoto(body *ast.BlockStmt) bool {
	found := false
	ast.Inspect(body, func(node ast.Node) bool {
		if branch, ok := node.(*ast.BranchStmt); ok && branch.Tok == token.GOTO {
			found = true
		}
		return !found
	})
	return found
}

// movedLocalValue reports whether expr, a local or a field of one, is a read
// that moves the local's value (see collectMoves), so that it needs no copy.
func movedLocalValue(ctx lowerFileContext, expr ast.Expr) bool {
	// The expression reads the local through plain field selections.
	if ctx.borrow == nil || ctx.borrow.moves == nil {
		return false
	}
	info := ctx.semPkg.source.TypesInfo
	for {
		switch typed := ast.Unparen(expr).(type) {
		case *ast.Ident:
			return ctx.borrow.moves[typed]
		case *ast.SelectorExpr:
			selection := info.Selections[typed]
			if selection == nil || selection.Kind() != types.FieldVal || selection.Indirect() {
				return false
			}
			expr = typed.X
		default:
			return false
		}
	}
}
