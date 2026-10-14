// Generated file based on generated.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class yySymType {
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
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): yySymType {
		return new yySymType(this, true)
	}

	public __goscriptAssign(source: yySymType): void {
		const target = this._fields
		const values = source._fields
		target.value = values.value
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
	public _fields: {
	}

	constructor(init?: Partial<{}>, __goscriptValue?: boolean) {
		this._fields = {
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): yyParserImpl {
		return new yyParserImpl(this, true)
	}

	public __goscriptAssign(source: yyParserImpl): void {
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
