// Generated file based on struct_field_declaration_order.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class inner {
	public declare value: number

	constructor(init?: Partial<{value?: number}>, __goscriptValue?: boolean) {
		this.value = init?.value ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): inner {
		return new inner(this, true)
	}

	public __goscriptAssign(source: inner): this {
		this.value = source.value
		return this
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
	public declare inner: inner

	constructor(init?: Partial<{inner?: inner}>, __goscriptValue?: boolean) {
		this.inner = init?.inner ? init.inner.clone() : new inner(undefined, true)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): outer {
		return new outer(this, true)
	}

	public __goscriptAssign(source: outer): this {
		this.inner.__goscriptAssign(source.inner)
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.outer",
		() => new outer(),
		() => [],
		outer,
		() => [{ name: "inner", key: "inner", type: "main.inner" }]
	)
}

export let defaultOuter: outer = new outer(undefined, true)

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
