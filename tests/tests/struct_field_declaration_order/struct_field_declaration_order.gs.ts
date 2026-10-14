// Generated file based on struct_field_declaration_order.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class inner {
	public get value(): number {
		return this._fields.value
	}

	public set value(value: number) {
		this._fields.value = value
	}

	public _fields: {
		value: number
	}

	constructor(init?: Partial<{value?: number}>) {
		this._fields = {
			value: init?.value ?? (0 as number)
		}
	}

	public clone(): inner {
		return $.markAsStructValue(new inner(this))
	}

	public __goscriptAssign(source: inner): void {
		const target = this._fields
		const values = source._fields
		target.value = values.value
	}

	static __typeInfo = $.registerStructType(
		"main.inner",
		() => new inner(),
		() => [],
		inner,
		() => [{ name: "value", key: "value", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class outer {
	public get inner(): inner {
		return this._fields.inner
	}

	public set inner(value: inner) {
		this._fields.inner = value
	}

	public _fields: {
		inner: inner
	}

	constructor(init?: Partial<{inner?: inner}>) {
		this._fields = {
			inner: init?.inner ? $.markAsStructValue($.cloneStructValue(init.inner)) : $.markAsStructValue(new inner())
		}
	}

	public clone(): outer {
		return $.markAsStructValue(new outer(this))
	}

	public __goscriptAssign(source: outer): void {
		const target = this._fields
		const values = source._fields
		$.assignStruct(target.inner, values.inner)
	}

	static __typeInfo = $.registerStructType(
		"main.outer",
		() => new outer(),
		() => [],
		outer,
		() => [{ name: "inner", key: "inner", type: "main.inner" }]
	)
}

export let defaultOuter: outer = $.markAsStructValue(new outer())

export function __goscript_set_defaultOuter(__goscriptValue: outer): void {
	$.assignStruct(defaultOuter, __goscriptValue)
}

export async function main(): globalThis.Promise<void> {
	defaultOuter.inner.value = 7
	await $.println(defaultOuter.inner.value)
}

if ($.isMainScript(import.meta)) {
	await main()
}
