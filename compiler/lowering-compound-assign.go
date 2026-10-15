package compiler

import (
	"go/ast"
	"go/token"
	"go/types"
)

// stableCompoundTarget prepares the target of a compound assignment or of an
// increment that lowers as target = target op value. Go evaluates the
// operands of the target once, but the lowered statement reads the target
// twice, so each operand with side effects (a call or a receive) is evaluated
// into a temporary first. It returns the statements that evaluate them and
// the context in which the target lowers to read the temporaries.
func (o *LoweringOwner) stableCompoundTarget(ctx lowerFileContext, target ast.Expr) (lowerFileContext, []loweredStmt, []Diagnostic) {
	// A target without side effects lowers as it is.
	if !exprHasSideEffects(ctx, target) {
		return ctx, nil, nil
	}

	// The operands lower into temporaries that the target reads, keeping
	// the temporaries of enclosing statements.
	temps := make(map[ast.Expr]string, len(ctx.exprTemps)+2)
	for expr, temp := range ctx.exprTemps {
		temps[expr] = temp
	}
	var stmts []loweredStmt
	diagnostics := o.stabilizeTargetOperands(ctx, target, temps, &stmts)
	ctx.exprTemps = temps
	return ctx, stmts, diagnostics
}

// stabilizeTargetOperands evaluates the operands of the addressable
// expression target that have side effects into temporaries, in the order Go
// evaluates them, recording each in temps.
func (o *LoweringOwner) stabilizeTargetOperands(
	ctx lowerFileContext,
	target ast.Expr,
	temps map[ast.Expr]string,
	stmts *[]loweredStmt,
) []Diagnostic {
	switch typed := unwrapParenExpr(target).(type) {
	case *ast.IndexExpr:
		// An array value is part of its own storage, whose operands are
		// stabilized in turn; a slice, map or array pointer is a value.
		diagnostics := o.stabilizeTargetBase(ctx, typed.X, temps, stmts)
		return append(diagnostics, o.stabilizeTargetOperand(ctx, typed.Index, temps, stmts)...)
	case *ast.SelectorExpr:
		// A field of a struct value is part of its storage; a field through
		// a pointer is read through the pointer value.
		if selection := ctx.semPkg.source.TypesInfo.Selections[typed]; selection == nil || selection.Kind() != types.FieldVal {
			return nil
		}
		return o.stabilizeTargetBase(ctx, typed.X, temps, stmts)
	case *ast.StarExpr:
		// A dereference of an address is the addressed storage; any other
		// dereference reads the pointer once.
		if addr, ok := unwrapParenExpr(typed.X).(*ast.UnaryExpr); ok && addr.Op == token.AND {
			return o.stabilizeTargetOperands(ctx, addr.X, temps, stmts)
		}
		return o.stabilizeTargetOperand(ctx, typed.X, temps, stmts)
	default:
		return nil
	}
}

// stabilizeTargetBase stabilizes the base expression of an index or field
// target: a value of array or struct type is storage whose own operands are
// stabilized, any other base (a slice, map or pointer) is evaluated once.
func (o *LoweringOwner) stabilizeTargetBase(
	ctx lowerFileContext,
	base ast.Expr,
	temps map[ast.Expr]string,
	stmts *[]loweredStmt,
) []Diagnostic {
	baseType := ctx.semPkg.source.TypesInfo.TypeOf(base)
	if baseType != nil {
		switch types.Unalias(baseType).Underlying().(type) {
		case *types.Array, *types.Struct:
			return o.stabilizeTargetOperands(ctx, base, temps, stmts)
		}
	}
	return o.stabilizeTargetOperand(ctx, base, temps, stmts)
}

// stabilizeTargetOperand evaluates the operand expr into a temporary when it
// has side effects.
func (o *LoweringOwner) stabilizeTargetOperand(
	ctx lowerFileContext,
	expr ast.Expr,
	temps map[ast.Expr]string,
	stmts *[]loweredStmt,
) []Diagnostic {
	if !exprHasSideEffects(ctx, expr) {
		return nil
	}
	value, diagnostics := o.lowerExpr(ctx, expr)
	temp := ctx.tempName("Operand")
	*stmts = append(*stmts, loweredStmt{text: "const " + temp + " = " + value})
	temps[unwrapParenExpr(expr)] = temp
	return diagnostics
}

// exprHasSideEffects reports whether evaluating expr may call a function or
// receive from a channel. Conversions are not calls, and function literals
// are not evaluated by their expression.
func exprHasSideEffects(ctx lowerFileContext, expr ast.Expr) bool {
	found := false
	ast.Inspect(expr, func(node ast.Node) bool {
		if found {
			return false
		}
		switch typed := node.(type) {
		case *ast.FuncLit:
			return false
		case *ast.CallExpr:
			found = !ctx.semPkg.source.TypesInfo.Types[unwrapParenExpr(typed.Fun)].IsType()
		case *ast.UnaryExpr:
			found = typed.Op == token.ARROW
		}
		return !found
	})
	return found
}

// isMapIndexExpr reports whether expr indexes a map.
func isMapIndexExpr(ctx lowerFileContext, expr ast.Expr) bool {
	index, ok := unwrapParenExpr(expr).(*ast.IndexExpr)
	return ok && isMapType(ctx.semPkg.source.TypesInfo.TypeOf(index.X))
}
