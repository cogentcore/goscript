// Generated file based on helper.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class token {
	public declare value: number

	constructor(__goscriptValue?: boolean, value$?: number) {
		this.value = value$ ?? 0
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): token {
		return new token(true, this.value)
	}

	public __goscriptAssign(source: token): this {
		this.value = source.value
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.token",
		() => new token(),
		() => [],
		token,
		() => [{ name: "value", key: "value", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export function newToken(value: number): token | $.VarRef<token> | null {
	return new token(false, value)
}

export function consumeToken(tok: token | $.VarRef<token> | null): number {
	return $.pointerValue<token>(tok).value
}
