package compiler

import (
	"go/ast"
	"go/token"
	"go/types"
	"slices"
	"strconv"
)

// gotoJump is what a goto to a label lowers to: the assignment of the state
// that runs the label, if any, and the branch that reaches it.
type gotoJump struct {
	assign string
	branch string
}

// appendTo appends the statements of the jump to out.
func (jump gotoJump) appendTo(out []loweredStmt) []loweredStmt {
	if jump.assign != "" {
		out = append(out, loweredStmt{text: jump.assign})
	}
	return append(out, loweredStmt{text: jump.branch})
}

// gotoHoist holds the variables that one state of a goto state machine
// declares and another uses. They are declared ahead of the machine, and
// their declarations assign them.
type gotoHoist struct {
	objects map[types.Object]bool
	keyword string
	names   map[string]bool
	decls   []loweredStmt
}

// gotoHoistedDecl reports whether obj is declared ahead of its goto state
// machine, recording its declaration under name the first time.
func (o *LoweringOwner) gotoHoistedDecl(ctx lowerFileContext, obj types.Object, name string) bool {
	hoist := ctx.gotoHoist
	if hoist == nil || obj == nil || !hoist.objects[obj] {
		return false
	}
	if !hoist.names[name] {
		hoist.names[name] = true
		hoist.decls = append(hoist.decls, loweredStmt{text: hoist.keyword + name + "!: " + o.declaredVariableType(ctx, obj)})
	}
	return true
}

// gotoHoistsAny reports whether any of the variables that lhs declares is
// declared ahead of its goto state machine.
func gotoHoistsAny(ctx lowerFileContext, lhs []ast.Expr) bool {
	if ctx.gotoHoist == nil {
		return false
	}
	return slices.ContainsFunc(lhs, func(expr ast.Expr) bool {
		ident, ok := expr.(*ast.Ident)
		return ok && ctx.gotoHoist.objects[ctx.semPkg.source.TypesInfo.Defs[ident]]
	})
}

// declaredVariableType returns the TypeScript type of the declaration of the
// variable obj.
func (o *LoweringOwner) declaredVariableType(ctx lowerFileContext, obj types.Object) string {
	// A function value is typed to hold both sync and async functions.
	needsVarRef := ctx.model.needsVarRef[obj]
	signature := unnamedSignatureForType(obj.Type())
	if signature == nil {
		return o.tsVariableTypeFor(ctx, obj.Type(), needsVarRef)
	}
	variableType := o.tsAsyncCompatibleFunctionTypeFor(ctx, signature)
	if needsVarRef {
		variableType = "$.VarRef<" + variableType + ">"
	}
	return variableType
}

// inspectGotos calls visit for each goto in stmts, outside function literals,
// whose labels are their own.
func inspectGotos(stmts []ast.Stmt, visit func(*ast.BranchStmt)) {
	for _, stmt := range stmts {
		ast.Inspect(stmt, func(node ast.Node) bool {
			switch typed := node.(type) {
			case *ast.FuncLit:
				return false
			case *ast.BranchStmt:
				if typed.Tok == token.GOTO && typed.Label != nil {
					visit(typed)
				}
			}
			return true
		})
	}
}

// gotoTargetLabels returns the index of each label of stmts that a goto in
// them names. The labels of a labeled statement share its index.
func gotoTargetLabels(stmts []ast.Stmt) map[string]int {
	// Labels label the statements of the list, or labeled ones.
	var labels map[string]int
	for idx, stmt := range stmts {
		for labeled, ok := stmt.(*ast.LabeledStmt); ok; labeled, ok = labeled.Stmt.(*ast.LabeledStmt) {
			if labels == nil {
				labels = make(map[string]int)
			}
			labels[safeIdentifier(labeled.Label.Name)] = idx
		}
	}
	if labels == nil {
		return nil
	}

	// Only labels that gotos name are targets.
	targets := make(map[string]int)
	inspectGotos(stmts, func(branch *ast.BranchStmt) {
		label := safeIdentifier(branch.Label.Name)
		if idx, ok := labels[label]; ok {
			targets[label] = idx
		}
	})
	return targets
}

// branchLabels returns the labels that the breaks and continues in stmts name.
func branchLabels(stmts []ast.Stmt) map[string]bool {
	labels := make(map[string]bool)
	for _, stmt := range stmts {
		ast.Inspect(stmt, func(node ast.Node) bool {
			switch typed := node.(type) {
			case *ast.FuncLit:
				return false
			case *ast.BranchStmt:
				if typed.Tok != token.GOTO && typed.Label != nil {
					labels[safeIdentifier(typed.Label.Name)] = true
				}
			}
			return true
		})
	}
	return labels
}

// gotoShapesReach reports whether the gotos in stmts to labels of stmts all
// lower to breaks from labeled blocks that end at their labels, or to
// continues of labeled loops that start at them (see lowerStmtListAfter).
func gotoShapesReach(stmts []ast.Stmt) bool {
	targets := gotoTargetLabels(stmts)
	if len(targets) == 0 {
		return true
	}

	// The blocks and loops take the names of their labels, which a break or
	// continue may not then name.
	named := branchLabels(stmts)
	for label := range targets {
		if named[label] {
			return false
		}
	}

	// Every goto to a target must be reached.
	reached := make(map[*ast.BranchStmt]bool)
	markGotoShapes(stmts, reached)
	all := true
	inspectGotos(stmts, func(branch *ast.BranchStmt) {
		if _, ok := targets[safeIdentifier(branch.Label.Name)]; ok && !reached[branch] {
			all = false
		}
	})
	return all
}

// markGotoShapes adds to reached the gotos of stmts that the shapes that
// lowerStmtListAfter lowers stmts to reach.
func markGotoShapes(stmts []ast.Stmt, reached map[*ast.BranchStmt]bool) {
	backwardSpans := backwardGotoLabelSpans(stmts)
	forwardSpans := forwardGotoLabelSpans(stmts, backwardSpans)
	for idx := 0; idx < len(stmts); idx++ {
		// A goto that skips the first statement of a loop is reached, as are
		// the gotos in the loop to its label.
		if span, ok := leadingGotoBackwardLoopSpan(stmts, idx, backwardSpans); ok {
			reached[stmts[idx].(*ast.BranchStmt)] = true
			markGotosTo(stmts[span.labelIdx:span.endIdx+1], map[string]bool{span.label: true}, reached)
			markListGotos(stmts[span.labelIdx+1:span.endIdx+1], reached)
			idx = span.endIdx
			continue
		}

		// The gotos in nested blocks that end at forward labels reach them.
		if group, ok := forwardGotoLabelGroupAt(idx, forwardSpans); ok {
			markGotosTo(stmts[group.start:group.labelIdx], group.forwardLabels, reached)
			markListGotos(stmts[group.start:group.spans[0].labelIdx], reached)
			for spanIdx := 1; spanIdx < len(group.spans); spanIdx++ {
				prev := group.spans[spanIdx-1]
				labeled, _ := stmts[prev.labelIdx].(*ast.LabeledStmt)
				segment := append([]ast.Stmt{labeled.Stmt}, stmts[prev.labelIdx+1:group.spans[spanIdx].labelIdx]...)
				markListGotos(segment, reached)
			}
			idx = group.labelIdx
			continue
		}

		// The gotos in a loop to the label that starts it reach it.
		labeled, ok := stmts[idx].(*ast.LabeledStmt)
		if !ok {
			continue
		}
		label := safeIdentifier(labeled.Label.Name)
		if endIdx, ok := backwardSpans[label]; ok {
			markGotosTo(stmts[idx:endIdx+1], map[string]bool{label: true}, reached)
			markListGotos(stmts[idx+1:endIdx+1], reached)
			idx = endIdx
		}
	}
}

// markGotosTo adds to reached the gotos of stmts to labels.
func markGotosTo(stmts []ast.Stmt, labels map[string]bool, reached map[*ast.BranchStmt]bool) {
	inspectGotos(stmts, func(branch *ast.BranchStmt) {
		if labels[safeIdentifier(branch.Label.Name)] {
			reached[branch] = true
		}
	})
}

// markListGotos adds to reached the gotos of stmts to their own labels,
// which stmts reach when they lower as a list of their own.
func markListGotos(stmts []ast.Stmt, reached map[*ast.BranchStmt]bool) {
	targets := gotoTargetLabels(stmts)
	if len(targets) == 0 {
		return
	}
	labels := make(map[string]bool, len(targets))
	for label := range targets {
		labels[label] = true
	}
	markGotosTo(stmts, labels, reached)
}

// gotoDispatchStart returns the index of the first statement of stmts that is
// a goto target or holds a goto to one.
func gotoDispatchStart(stmts []ast.Stmt) int {
	targets := gotoTargetLabels(stmts)
	start := len(stmts)
	for _, idx := range targets {
		start = min(start, idx)
	}
	for idx, stmt := range stmts[:start] {
		found := false
		inspectGotos([]ast.Stmt{stmt}, func(branch *ast.BranchStmt) {
			_, ok := targets[safeIdentifier(branch.Label.Name)]
			found = found || ok
		})
		if found {
			return idx
		}
	}
	return start
}

// stmtsWrapGotoLoop reports whether lowering stmts puts some of them in a
// loop of its own for gotos, so that their unlabeled breaks, and with
// intoSwitches the continues of the statements in switches, need the label
// of the statement they leave. Nested loops and functions have their own.
func stmtsWrapGotoLoop(stmts []ast.Stmt, intoSwitches bool) bool {
	if !stmtListHasGoto(stmts) {
		return false
	}
	if len(backwardGotoLabelSpans(stmts)) != 0 || !gotoShapesReach(stmts) {
		return true
	}
	return slices.ContainsFunc(stmts, func(stmt ast.Stmt) bool {
		return stmtWrapsGotoLoop(stmt, intoSwitches)
	})
}

// stmtWrapsGotoLoop reports whether the statement lists that stmt holds
// wrap statements in a loop for gotos (see stmtsWrapGotoLoop).
func stmtWrapsGotoLoop(stmt ast.Stmt, intoSwitches bool) bool {
	switch typed := stmt.(type) {
	case *ast.LabeledStmt:
		return stmtWrapsGotoLoop(typed.Stmt, intoSwitches)
	case *ast.BlockStmt:
		return stmtsWrapGotoLoop(typed.List, intoSwitches)
	case *ast.IfStmt:
		return stmtsWrapGotoLoop(typed.Body.List, intoSwitches) ||
			typed.Else != nil && stmtWrapsGotoLoop(typed.Else, intoSwitches)
	case *ast.SwitchStmt:
		return intoSwitches && caseBodiesWrapGotoLoop(typed.Body, true)
	case *ast.TypeSwitchStmt:
		return intoSwitches && caseBodiesWrapGotoLoop(typed.Body, true)
	case *ast.SelectStmt:
		return intoSwitches && caseBodiesWrapGotoLoop(typed.Body, true)
	}
	return false
}

// caseBodiesWrapGotoLoop reports whether the case bodies of a switch or
// select wrap statements in a loop for gotos (see stmtsWrapGotoLoop).
func caseBodiesWrapGotoLoop(body *ast.BlockStmt, intoSwitches bool) bool {
	return slices.ContainsFunc(body.List, func(clause ast.Stmt) bool {
		switch typed := clause.(type) {
		case *ast.CaseClause:
			return stmtsWrapGotoLoop(typed.Body, intoSwitches)
		case *ast.CommClause:
			return stmtsWrapGotoLoop(typed.Body, intoSwitches)
		}
		return false
	})
}

// lowerGotoDispatch lowers stmts, whose gotos the structured shapes cannot
// all reach, to a state machine: a loop around a switch with a case for each
// label that a goto names, and one for the statements before the first. A
// goto sets the state and continues the loop, and each case falls through to
// the next, as the statements do.
func (o *LoweringOwner) lowerGotoDispatch(
	ctx lowerFileContext,
	stmts []ast.Stmt,
	prevEndLine int,
) ([]loweredStmt, []Diagnostic) {
	// Each target label starts a state.
	targets := gotoTargetLabels(stmts)
	starts := make(map[int]int, len(targets)+1)
	starts[0] = 0
	for _, idx := range targets {
		starts[idx] = 0
	}
	stateIdxs := slices.Sorted(func(yield func(int) bool) {
		for idx := range starts {
			if !yield(idx) {
				return
			}
		}
	})
	for state, idx := range stateIdxs {
		starts[idx] = state
	}

	// A goto sets the state of its label and continues the loop.
	stateVar := ctx.tempName("GotoState")
	loopLabel := ctx.tempName("GotoLoop")
	jumps := make(map[string]gotoJump, len(targets))
	for label, idx := range targets {
		jumps[label] = gotoJump{
			assign: stateVar + " = " + strconv.Itoa(starts[idx]),
			branch: "continue " + loopLabel,
		}
	}
	stateCtx := ctx.withGotoJumps(jumps)
	stateCtx.gotoHoist = &gotoHoist{
		objects: gotoHoistedObjects(ctx.semPkg.source.TypesInfo, stmts, starts),
		keyword: declarationKeyword(ctx),
		names:   make(map[string]bool),
	}

	// The statements of each state lower in order, so that the names they
	// declare reach the states that follow.
	named := branchLabels(stmts)
	cases := make([]loweredSwitchCase, 0, len(stateIdxs))
	var diagnostics []Diagnostic
	for idx, stmt := range stmts {
		if state, ok := starts[idx]; ok {
			cases = append(cases, loweredSwitchCase{values: []string{strconv.Itoa(state)}, fallsThrough: true})
			stmt, prevEndLine = gotoStateStmt(ctx, stmt, named, prevEndLine)
		}
		body := &cases[len(cases)-1].body
		var stmtDiagnostics []Diagnostic
		*body, stateCtx, prevEndLine, stmtDiagnostics = o.lowerListStmt(stateCtx, stmt, *body, prevEndLine)
		diagnostics = append(diagnostics, stmtDiagnostics...)
	}
	cases[len(cases)-1].fallsThrough = false

	// The hoisted declarations and the state precede the loop, which ends
	// when the last state does.
	loop := loweredStmt{
		hasBlock: true,
		text:     loopLabel + ": for (;;)",
		children: []loweredStmt{
			{switchStmt: &loweredSwitch{value: stateVar, cases: cases}},
			{text: "break"},
		},
	}
	lowered := append(stateCtx.gotoHoist.decls, loweredStmt{text: "let " + stateVar + " = 0"})
	return append(lowered, loop), diagnostics
}

// gotoStateStmt returns the statement that starts a state without its
// labels, which the state replaces, up to one that a break or continue names,
// and the line of the last label it drops.
func gotoStateStmt(ctx lowerFileContext, stmt ast.Stmt, named map[string]bool, prevEndLine int) (ast.Stmt, int) {
	for labeled, ok := stmt.(*ast.LabeledStmt); ok && !named[safeIdentifier(labeled.Label.Name)]; labeled, ok = stmt.(*ast.LabeledStmt) {
		stmt = labeled.Stmt
		prevEndLine = sourceLine(ctx, labeled.Colon)
	}
	return stmt, prevEndLine
}

// gotoHoistedObjects returns the variables that the statements of one state
// of a goto state machine declare and those of another use. A jump to a
// state skips the declarations of the states before it, so these are
// declared ahead of the machine. Each execution of such a declaration then
// assigns the same variable, which a function literal that captured it
// before a goto back to the declaration still sees.
func gotoHoistedObjects(info *types.Info, stmts []ast.Stmt, starts map[int]int) map[types.Object]bool {
	// Each variable belongs to the state that declares it.
	declared := make(map[types.Object]int)
	stateOf := make([]int, len(stmts))
	state := 0
	for idx, stmt := range stmts {
		if start, ok := starts[idx]; ok {
			state = start
		}
		stateOf[idx] = state
		for _, ident := range gotoDeclaredIdents(stmt) {
			if obj := info.Defs[ident]; obj != nil {
				declared[obj] = state
			}
		}
	}
	if len(declared) == 0 {
		return nil
	}

	// A use in another state hoists the variable.
	hoisted := make(map[types.Object]bool)
	for idx, stmt := range stmts {
		ast.Inspect(stmt, func(node ast.Node) bool {
			ident, ok := node.(*ast.Ident)
			if !ok {
				return true
			}
			if state, ok := declared[info.Uses[ident]]; ok && state != stateOf[idx] {
				hoisted[info.Uses[ident]] = true
			}
			return true
		})
	}

	// A declaration of several variables hoists all of them or none.
	for _, stmt := range stmts {
		idents := gotoDeclaredIdents(stmt)
		if !slices.ContainsFunc(idents, func(ident *ast.Ident) bool { return hoisted[info.Defs[ident]] }) {
			continue
		}
		for _, ident := range idents {
			if obj := info.Defs[ident]; obj != nil {
				hoisted[obj] = true
			}
		}
	}
	return hoisted
}

// gotoDeclaredIdents returns the identifiers of the variables that stmt, or the
// statement it labels, declares in its list.
func gotoDeclaredIdents(stmt ast.Stmt) []*ast.Ident {
	for labeled, ok := stmt.(*ast.LabeledStmt); ok; labeled, ok = stmt.(*ast.LabeledStmt) {
		stmt = labeled.Stmt
	}
	var idents []*ast.Ident
	switch typed := stmt.(type) {
	case *ast.AssignStmt:
		if typed.Tok != token.DEFINE {
			return nil
		}
		for _, lhs := range typed.Lhs {
			if ident, ok := lhs.(*ast.Ident); ok && ident.Name != "_" {
				idents = append(idents, ident)
			}
		}
	case *ast.DeclStmt:
		genDecl, ok := typed.Decl.(*ast.GenDecl)
		if !ok || genDecl.Tok != token.VAR {
			return nil
		}
		for _, spec := range genDecl.Specs {
			for _, ident := range spec.(*ast.ValueSpec).Names {
				if ident.Name != "_" {
					idents = append(idents, ident)
				}
			}
		}
	}
	return idents
}
