package compiler

import (
	"go/ast"
	"go/token"
	"go/types"
)

// Borrowed results.
//
// A struct parameter that a function only reads may be the caller's own
// value rather than a copy (see funcParamsReadOnly), so a return statement
// that returns it copies it: the caller could otherwise change its value
// through the result, or the result through its value. Many callers only
// read such a result, or discard it, while the value they passed stays
// unchanged, as in
//
//	match, nscope, mpos := pr.Match(ps, parAST, scope, depth, optMap)
//
// where Match returns scope from most of its return statements. Such a
// function (see funcResultBorrows) takes one more argument, after its
// parameters, and returns the parameter as it is when the argument is true.
// A caller passes true only where every result that may be a parameter is
// discarded, or held by a new local that nothing changes while the argument
// it aliases stays unchanged, or is returned at once by a function that
// borrows the same result from the same parameter, which then passes its own
// argument on. Calls through interfaces, function values, method values and
// reflection pass no such argument and get copies, as before.

// borrowFlagName names the parameter that asks a function to return its
// parameters without copies.
const borrowFlagName = "__goscriptBorrow"

// borrowState holds the borrowed results of the function being lowered.
type borrowState struct {
	// results holds, for each result of the function, the parameter that it
	// may return without a copy, or -1 (see funcResultBorrows).
	results []int
	// calls maps the calls that ask to borrow results to the argument that
	// asks for it: true, or the function's own parameter.
	calls map[*ast.CallExpr]string
	// locals maps the locals that hold a borrowed result to the argument
	// whose value they may share.
	locals map[*types.Var]*ast.Ident
	// paramsReadOnly holds the read-only kinds of the function's parameters
	// (see funcParamsReadOnly).
	paramsReadOnly []valueReadOnlyKind
	// deferred reports whether the function has a defer statement.
	deferred bool
	// moves holds the reads of locals that move their values instead of
	// copying them (see collectMoves).
	moves map[*ast.Ident]bool
}

// borrowVarFacts holds what a function body does with its variables.
type borrowVarFacts struct {
	// changes holds the positions where each variable is assigned in part or
	// whole, incremented, ranged into, or where its address or a pointer
	// method of it or of a field is taken.
	changes map[*types.Var][]token.Pos
	// aliased holds the variables whose address, or the address of a part
	// of which, the body takes, as by &v.f, a pointer method call or a slice
	// of an array, through which any later code may change them.
	aliased map[*types.Var]bool
	// captured holds the variables that a function literal refers to.
	captured map[*types.Var]bool
	// rangeVars holds the key and value variables of range loops.
	rangeVars map[*types.Var]bool
	// loops holds the loops of the body.
	loops []ast.Node
}

// borrowFlagParam returns the parameter that asks a function with borrowed
// results (see funcResultBorrows) to return its parameters without copies,
// and whether the function has one.
func (o *LoweringOwner) borrowFlagParam(ctx lowerFileContext, fn *types.Func) (loweredParam, bool) {
	// Only a function with borrowed results takes the parameter.
	semFn := semanticFunctionFor(ctx.model, fn)
	if semFn == nil || semFn.resultBorrows == nil {
		return loweredParam{}, false
	}
	return loweredParam{name: borrowFlagName + "?", typ: "boolean"}, true
}

// withBorrowedResults returns ctx for the body of decl, the declaration of
// fn, with the borrowed results of fn and the calls in the body that borrow
// results.
func (o *LoweringOwner) withBorrowedResults(ctx lowerFileContext, decl *ast.FuncDecl, fn *types.Func) lowerFileContext {
	// The function's own borrowed results, if any.
	state := &borrowState{deferred: bodyHasDefer(decl.Body)}
	if semFn := semanticFunctionFor(ctx.model, fn); semFn != nil {
		state.results = semFn.resultBorrows
		state.paramsReadOnly = semFn.paramsReadOnly
	}

	// The calls of the body that may borrow results, and the reads of locals
	// that move their values.
	o.collectBorrowCalls(ctx, decl, state)
	collectMoves(ctx, decl, state)
	ctx.borrow = state
	return ctx
}

// collectBorrowCalls records in state the calls of decl's body, outside
// function literals and go and defer statements, that can borrow their
// results, with the locals that hold them.
func (o *LoweringOwner) collectBorrowCalls(ctx lowerFileContext, decl *ast.FuncDecl, state *borrowState) {
	// Look at what the body does with its variables only if it has calls of
	// functions with borrowed results.
	facts := (*borrowVarFacts)(nil)
	ast.Inspect(decl.Body, func(node ast.Node) bool {
		// Function literals and go and defer statements keep their calls.
		switch node.(type) {
		case *ast.FuncLit, *ast.GoStmt, *ast.DeferStmt:
			return false
		}

		// A statement whose results a call may borrow.
		call, uses := borrowCallUses(node)
		if call == nil {
			return true
		}
		borrows := o.calledResultBorrows(ctx, call)
		if borrows == nil {
			return true
		}
		if facts == nil {
			facts = collectBorrowVarFacts(ctx, decl.Body)
		}
		if flag, ok := o.borrowCallFlag(ctx, decl, facts, node, call, uses, borrows, state); ok {
			if state.calls == nil {
				state.calls = make(map[*ast.CallExpr]string)
			}
			state.calls[call] = flag
		}
		return true
	})
}

// borrowCallUses returns the call of a statement that may borrow its
// results, with the expressions that receive them: none for a call
// statement, the left-hand side of an assignment of one call, and nil for a
// return statement of one call.
func borrowCallUses(node ast.Node) (*ast.CallExpr, []ast.Expr) {
	switch typed := node.(type) {
	case *ast.ExprStmt:
		call, _ := ast.Unparen(typed.X).(*ast.CallExpr)
		return call, []ast.Expr{}
	case *ast.AssignStmt:
		if len(typed.Rhs) != 1 {
			return nil, nil
		}
		call, _ := ast.Unparen(typed.Rhs[0]).(*ast.CallExpr)
		return call, typed.Lhs
	case *ast.ReturnStmt:
		if len(typed.Results) != 1 {
			return nil, nil
		}
		call, _ := ast.Unparen(typed.Results[0]).(*ast.CallExpr)
		return call, nil
	}
	return nil, nil
}

// calledResultBorrows returns the borrowed results (see funcResultBorrows)
// of the function or method that call calls statically, or nil.
func (o *LoweringOwner) calledResultBorrows(ctx lowerFileContext, call *ast.CallExpr) []int {
	// The call names a declared function or calls a method of a value; a
	// method expression takes its receiver as an argument.
	info := ctx.semPkg.source.TypesInfo
	switch fun := ast.Unparen(call.Fun).(type) {
	case *ast.Ident:
	case *ast.SelectorExpr:
		if selection := info.Selections[fun]; selection != nil && selection.Kind() != types.MethodVal {
			return nil
		}
	default:
		return nil
	}

	// The function is not an interface method, and has borrowed results.
	fn := calledFunction(ctx.semPkg.source, ast.Unparen(call.Fun))
	if fn == nil || call.Ellipsis.IsValid() {
		return nil
	}
	if signature, _ := fn.Type().(*types.Signature); signature == nil ||
		(signature.Recv() != nil && types.IsInterface(signature.Recv().Type())) {
		return nil
	}
	semFn := semanticFunctionFor(ctx.model, fn)
	if semFn == nil || o.callUsesOverridePackage(ctx, call.Fun) {
		return nil
	}
	return semFn.resultBorrows
}

// borrowCallFlag returns the argument that asks call, a statement node of
// decl's body that receives the results in uses (see borrowCallUses), to
// borrow its results, and whether it may. Each result that may be a
// parameter of the called function must be discarded, or held by a new
// local that the body never changes while the argument for that parameter
// is a local that the body does not change after the call, or returned at
// once as a result that decl borrows from the same parameter.
func (o *LoweringOwner) borrowCallFlag(
	ctx lowerFileContext,
	decl *ast.FuncDecl,
	facts *borrowVarFacts,
	node ast.Node,
	call *ast.CallExpr,
	uses []ast.Expr,
	borrows []int,
	state *borrowState,
) (string, bool) {
	// A returned call passes the function's own request on.
	if _, ok := node.(*ast.ReturnStmt); ok {
		return borrowFlagName, o.returnedCallBorrows(ctx, call, borrows, state)
	}

	// Each borrowed result is discarded or held by a new local.
	locals := make(map[*types.Var]*ast.Ident)
	for idx, param := range borrows {
		if param < 0 || len(uses) == 0 {
			continue
		}
		if idx >= len(uses) || param >= len(call.Args) {
			return "", false
		}
		if ident, ok := ast.Unparen(uses[idx]).(*ast.Ident); ok && ident.Name == "_" {
			continue
		}
		local, ok := borrowResultLocal(ctx, facts, node, uses[idx])
		arg, stable := borrowStableArg(ctx, decl, facts, call, call.Args[param])
		if !ok || !stable {
			return "", false
		}
		locals[local] = arg
	}

	// The locals share the arguments' values.
	if state.locals == nil && len(locals) != 0 {
		state.locals = make(map[*types.Var]*ast.Ident)
	}
	for local, arg := range locals {
		state.locals[local] = arg
	}
	return "true", true
}

// returnedCallBorrows reports whether call, whose results a return statement
// returns at once, can pass on the request of the function being lowered to
// borrow results: each result that call may borrow is one that the function
// borrows, from its own parameter that call gets as that argument.
func (o *LoweringOwner) returnedCallBorrows(ctx lowerFileContext, call *ast.CallExpr, borrows []int, state *borrowState) bool {
	// The function itself borrows results.
	if state.results == nil || ctx.signature == nil || len(borrows) != len(state.results) {
		return false
	}

	// Each result call borrows is the same result of the function, borrowed
	// from the parameter that call gets.
	info := ctx.semPkg.source.TypesInfo
	for idx, param := range borrows {
		if param < 0 {
			continue
		}
		own := state.results[idx]
		if own < 0 || param >= len(call.Args) || own >= ctx.signature.Params().Len() {
			return false
		}
		ident, ok := ast.Unparen(call.Args[param]).(*ast.Ident)
		if !ok || info.Uses[ident] != ctx.signature.Params().At(own) {
			return false
		}
	}
	return true
}

// borrowResultLocal returns the new local variable that lhs, a left-hand
// side of the assignment node, declares, if the body never changes it, takes
// its address, refers to it from a function literal, or needs a variable
// reference for it.
func borrowResultLocal(ctx lowerFileContext, facts *borrowVarFacts, node ast.Node, lhs ast.Expr) (*types.Var, bool) {
	// The assignment declares the variable.
	assign, ok := node.(*ast.AssignStmt)
	ident, isIdent := ast.Unparen(lhs).(*ast.Ident)
	if !ok || !isIdent || assign.Tok != token.DEFINE {
		return nil, false
	}
	local, ok := ctx.semPkg.source.TypesInfo.Defs[ident].(*types.Var)
	if !ok || local == nil {
		return nil, false
	}

	// Nothing changes or aliases it.
	if len(facts.changes[local]) != 0 || facts.captured[local] || ctx.model.needsVarRef[local] {
		return nil, false
	}
	return local, true
}

// borrowStableArg returns the variable that arg, the argument of call for a
// borrowed result, names, if it is a local variable or parameter of decl
// that is not a range variable, whose address the body never takes, that no
// function literal refers to, that needs no variable reference, and that
// the body does not change after the call, nor at all in a loop around the
// call.
func borrowStableArg(ctx lowerFileContext, decl *ast.FuncDecl, facts *borrowVarFacts, call *ast.CallExpr, arg ast.Expr) (*ast.Ident, bool) {
	// The argument is a local variable of decl.
	ident, ok := ast.Unparen(arg).(*ast.Ident)
	if !ok {
		return nil, false
	}
	obj, ok := ctx.semPkg.source.TypesInfo.Uses[ident].(*types.Var)
	if !ok || obj.Pos() < decl.Pos() || obj.Pos() >= decl.End() {
		return nil, false
	}
	if facts.aliased[obj] || facts.captured[obj] || facts.rangeVars[obj] || ctx.model.needsVarRef[obj] {
		return nil, false
	}

	// No change follows the call, or runs again in a loop around it.
	for _, pos := range facts.changes[obj] {
		if pos > call.Pos() {
			return nil, false
		}
		for _, loop := range facts.loops {
			if loop.Pos() <= call.Pos() && call.Pos() < loop.End() && loop.Pos() <= pos && pos < loop.End() {
				return nil, false
			}
		}
	}
	return ident, true
}

// collectBorrowVarFacts records what body does with its variables (see
// borrowVarFacts).
func collectBorrowVarFacts(ctx lowerFileContext, body *ast.BlockStmt) *borrowVarFacts {
	// The facts start empty for each variable.
	info := ctx.semPkg.source.TypesInfo
	facts := &borrowVarFacts{
		changes:   make(map[*types.Var][]token.Pos),
		aliased:   make(map[*types.Var]bool),
		captured:  make(map[*types.Var]bool),
		rangeVars: make(map[*types.Var]bool),
	}

	// change records a change of the variable that expr reads a part of,
	// and alias also that the variable may change through a reference.
	change := func(expr ast.Expr, pos token.Pos) {
		if v, ok := info.Uses[exprRootIdent(expr)].(*types.Var); ok {
			facts.changes[v] = append(facts.changes[v], pos)
		}
	}
	alias := func(expr ast.Expr, pos token.Pos) {
		change(expr, pos)
		if v, ok := info.Uses[exprRootIdent(expr)].(*types.Var); ok {
			facts.aliased[v] = true
		}
	}

	// Record the changes and loops of the body, and the variables of its
	// range loops.
	ast.Inspect(body, func(node ast.Node) bool {
		switch typed := node.(type) {
		case *ast.FuncLit:
			collectCapturedVars(info, typed, facts.captured)
		case *ast.AssignStmt:
			for _, lhs := range typed.Lhs {
				change(lhs, typed.Pos())
			}
		case *ast.IncDecStmt:
			change(typed.X, typed.Pos())
		case *ast.UnaryExpr:
			if typed.Op == token.AND {
				alias(typed.X, typed.Pos())
			}
		case *ast.SliceExpr:
			alias(typed.X, typed.Pos())
		case *ast.SelectorExpr:
			if selection := info.Selections[typed]; selection != nil && selection.Kind() == types.MethodVal {
				if signature, ok := selection.Obj().Type().(*types.Signature); ok && signature.Recv() != nil {
					if _, ptr := signature.Recv().Type().(*types.Pointer); ptr {
						alias(typed.X, typed.Pos())
					}
				}
			}
		case *ast.ForStmt:
			facts.loops = append(facts.loops, typed)
		case *ast.RangeStmt:
			facts.loops = append(facts.loops, typed)
			collectRangeVars(info, typed, facts)
		}
		return true
	})
	return facts
}

// collectRangeVars records the key and value variables of loop, and records
// them as changed by the loop when it assigns existing variables.
func collectRangeVars(info *types.Info, loop *ast.RangeStmt, facts *borrowVarFacts) {
	for _, expr := range []ast.Expr{loop.Key, loop.Value} {
		ident, ok := expr.(*ast.Ident)
		if !ok {
			if expr != nil {
				if v, ok := info.Uses[exprRootIdent(expr)].(*types.Var); ok {
					facts.changes[v] = append(facts.changes[v], loop.Pos())
				}
			}
			continue
		}
		if v, ok := info.Defs[ident].(*types.Var); ok {
			facts.rangeVars[v] = true
		}
		if v, ok := info.Uses[ident].(*types.Var); ok {
			facts.changes[v] = append(facts.changes[v], loop.Pos())
		}
	}
}

// collectCapturedVars records the variables that lit refers to.
func collectCapturedVars(info *types.Info, lit *ast.FuncLit, captured map[*types.Var]bool) {
	ast.Inspect(lit.Body, func(node ast.Node) bool {
		if ident, ok := node.(*ast.Ident); ok {
			if v, ok := info.Uses[ident].(*types.Var); ok {
				captured[v] = true
			}
		}
		return true
	})
}

// borrowCallArg returns the argument that asks call to borrow its results,
// if the function being lowered lets it (see collectBorrowCalls).
func borrowCallArg(ctx lowerFileContext, call *ast.CallExpr) (string, bool) {
	if ctx.borrow == nil {
		return "", false
	}
	flag, ok := ctx.borrow.calls[call]
	return flag, ok
}

// borrowedReturn returns the lowered result idx of a return statement with
// the given results, value lowered as it is and copied lowered as a copy.
// The parameter that the function borrows for the result (see
// funcResultBorrows) is returned as it is when the caller asks to borrow
// results, and a local that the function owns is returned as it is (see
// ownedReturnLocal). Any other result is copied.
func borrowedReturn(ctx lowerFileContext, results []ast.Expr, idx int, value string, copied string) string {
	// The result names a variable, and is copied.
	ident, ok := ast.Unparen(results[idx]).(*ast.Ident)
	if ctx.borrow == nil || ctx.signature == nil || !ok || copied == value {
		return copied
	}
	obj, ok := ctx.semPkg.source.TypesInfo.Uses[ident].(*types.Var)
	if !ok {
		return copied
	}

	// The parameter that the function borrows the result from.
	if idx < len(ctx.borrow.results) && ctx.borrow.results[idx] >= 0 &&
		ctx.borrow.results[idx] < ctx.signature.Params().Len() &&
		obj == ctx.signature.Params().At(ctx.borrow.results[idx]) {
		return "(" + borrowFlagName + " === true ? " + value + " : " + copied + ")"
	}

	// A local that the function owns.
	if ownedReturnLocal(ctx, results, idx, obj) {
		return value
	}
	return copied
}

// ownedReturnLocal reports whether obj, the variable that result idx of a
// return statement with the given results names, is a struct local or
// parameter that the function owns, which it can return without a copy,
// since no other reference reaches it and the function ends. It is not a
// receiver, a parameter that callers may pass without a copy, or a local
// that holds a borrowed result (see borrowCallFlag). No other result refers
// to it, no deferred call can run after the return, it has the result's
// type, and it is unaliased (see isUnaliasedLocalValue).
func ownedReturnLocal(ctx lowerFileContext, results []ast.Expr, idx int, obj *types.Var) bool {
	// The function defers nothing, and the result has the variable's type.
	signature := ctx.signature
	if ctx.borrow.deferred || idx >= signature.Results().Len() ||
		!isStructValueType(obj.Type()) || !types.Identical(obj.Type(), signature.Results().At(idx).Type()) {
		return false
	}

	// The variable is not a receiver, a shared parameter or a borrowed result.
	if (signature.Recv() != nil && obj == signature.Recv()) || ctx.borrow.locals[obj] != nil {
		return false
	}
	for p := range signature.Params().Len() {
		if obj == signature.Params().At(p) && p < len(ctx.borrow.paramsReadOnly) &&
			ctx.borrow.paramsReadOnly[p] != valueNotReadOnly {
			return false
		}
	}

	// No other result refers to it.
	info := ctx.semPkg.source.TypesInfo
	for other, result := range results {
		if other != idx && exprRefersTo(info, result, obj) {
			return false
		}
	}
	return isUnaliasedLocalValue(ctx, results[idx])
}

// exprRefersTo reports whether expr refers to obj.
func exprRefersTo(info *types.Info, expr ast.Expr, obj types.Object) bool {
	found := false
	ast.Inspect(expr, func(node ast.Node) bool {
		if ident, ok := node.(*ast.Ident); ok && info.Uses[ident] == obj {
			found = true
		}
		return !found
	})
	return found
}

// borrowedLocalArg returns the argument whose value a local that holds a
// borrowed result may share (see collectBorrowCalls).
func borrowedLocalArg(ctx lowerFileContext, obj *types.Var) (*ast.Ident, bool) {
	if ctx.borrow == nil {
		return nil, false
	}
	arg, ok := ctx.borrow.locals[obj]
	return arg, ok
}
