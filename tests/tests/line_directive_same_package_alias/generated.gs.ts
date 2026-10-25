// Generated file based on generated.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class yySymType {
	public declare value: number

	constructor(__goscriptValue?: boolean, value$?: number) {
		this.value = value$ ?? 0
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): yySymType {
		return new yySymType(true, this.value)
	}

	public __goscriptAssign(source: yySymType): this {
		this.value = source.value
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.yySymType",
		() => new yySymType(),
		() => [],
		yySymType,
		() => [{ name: "value", key: "value", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class yyParserImpl {
	constructor(__goscriptValue?: boolean) {
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): yyParserImpl {
		return new yyParserImpl(true)
	}

	public __goscriptAssign(source: yyParserImpl): this {
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.yyParserImpl",
		() => new yyParserImpl(),
		() => [],
		yyParserImpl,
		() => []
	)
}

export function yyNewParser(): yyParserImpl | $.VarRef<yyParserImpl> | null {
	return new yyParserImpl()
}
