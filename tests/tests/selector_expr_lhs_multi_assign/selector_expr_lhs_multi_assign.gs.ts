// Generated file based on selector_expr_lhs_multi_assign.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class Point {
	public declare X: number

	public declare Y: number

	constructor(__goscriptValue?: boolean, X$?: number, Y$?: number) {
		this.X = X$ ?? 0
		this.Y = Y$ ?? 0
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): Point {
		return new Point(true, this.X, this.Y)
	}

	public __goscriptAssign(source: Point): this {
		this.X = source.X
		this.Y = source.Y
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Point",
		() => new Point(),
		() => [],
		Point,
		() => [{ name: "X", key: "X", type: /* @__PURE__ */ $.basicType("int") }, { name: "Y", key: "Y", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export function getCoords(): [number, number] {
	return [10, 20]
}

export async function main(): globalThis.Promise<void> {
	let p: Point = new Point(true)
	// p.X and p.Y are *ast.SelectorExpr
	// test writeMultiVarAssignFromCall in WriteStmtAssign
	let __goscriptTuple0: any = getCoords()
	p.X = __goscriptTuple0[0]
	p.Y = __goscriptTuple0[1]
	await $.println(p.X, p.Y)
}

if ($.isMainScript(import.meta)) {
	await main()
}
