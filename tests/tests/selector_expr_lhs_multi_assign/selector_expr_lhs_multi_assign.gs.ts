// Generated file based on selector_expr_lhs_multi_assign.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class Point {
	public get X(): number {
		return this._fields.X
	}

	public set X(value: number) {
		this._fields.X = value
	}

	public get Y(): number {
		return this._fields.Y
	}

	public set Y(value: number) {
		this._fields.Y = value
	}

	public _fields: {
		X: number
		Y: number
	}

	constructor(init?: Partial<{X?: number, Y?: number}>) {
		this._fields = {
			X: init?.X ?? (0 as number),
			Y: init?.Y ?? (0 as number)
		}
	}

	public clone(): Point {
		return $.markAsStructValue(new Point(this))
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
	let p: Point = $.markAsStructValue(new Point())
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
