// Generated file based on helper.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class token {
	public get value(): number {
		return this._fields.value
	}

	public set value(value: number) {
		this._fields.value = value
	}

	public _fields: {
		value: number
	}

	constructor(init?: Partial<{value?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			value: init?.value ?? (0 as number)
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): token {
		return new token(this, true)
	}

	public __goscriptAssign(source: token): void {
		const target = this._fields
		const values = source._fields
		target.value = values.value
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
	return new token({value: value})
}

export function consumeToken(tok: token | $.VarRef<token> | null): number {
	return $.pointerValue<token>(tok).value
}
