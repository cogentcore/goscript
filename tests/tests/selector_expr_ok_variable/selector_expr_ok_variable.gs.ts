// Generated file based on selector_expr_ok_variable.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class Result {
	public declare ok: boolean

	constructor(__goscriptValue?: boolean, ok$?: boolean) {
		this.ok = ok$ ?? false
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): Result {
		return new Result(true, this.ok)
	}

	public __goscriptAssign(source: Result): this {
		this.ok = source.ok
		return this
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
	let result = new Result(true)

	// This should trigger the error: ok expression is not an identifier: *ast.SelectorExpr
	// The 'ok' variable is result.ok (a selector expression) instead of a simple identifier
	let __goscriptTuple0: any = $.typeAssertTuple<number>(x, /* @__PURE__ */ $.basicType("int"))
	result.ok = __goscriptTuple0[1]

	await $.println("Type assertion successful:", result.ok)
}

if ($.isMainScript(import.meta)) {
	await main()
}
