// Generated file based on selector_expr_ok_variable.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class Result {
	public get ok(): boolean {
		return this._fields.ok
	}

	public set ok(value: boolean) {
		this._fields.ok = value
	}

	public _fields: {
		ok: boolean
	}

	constructor(init?: Partial<{ok?: boolean}>, __goscriptValue?: boolean) {
		this._fields = {
			ok: init?.ok ?? (false as boolean)
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): Result {
		return new Result(this, true)
	}

	public __goscriptAssign(source: Result): void {
		const target = this._fields
		const values = source._fields
		target.ok = values.ok
	}

	static __typeInfo = $.registerStructType(
		"main.Result",
		() => new Result(),
		() => [],
		Result,
		() => [{ name: "ok", key: "ok", type: /* @__PURE__ */ $.basicType("bool") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let x: any = $.basicInterfaceValue(42, "int")
	let result = new Result(undefined, true)

	// This should trigger the error: ok expression is not an identifier: *ast.SelectorExpr
	// The 'ok' variable is result.ok (a selector expression) instead of a simple identifier
	let __goscriptTuple0: any = $.typeAssertTuple<number>(x, /* @__PURE__ */ $.basicType("int"))
	result.ok = __goscriptTuple0[1]

	await $.println("Type assertion successful:", result.ok)
}

if ($.isMainScript(import.meta)) {
	await main()
}
