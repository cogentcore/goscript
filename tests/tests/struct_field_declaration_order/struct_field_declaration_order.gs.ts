// Generated file based on struct_field_declaration_order.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class inner {
	public declare value: number

	constructor(__goscriptValue?: boolean, value$?: number) {
		this.value = value$ ?? 0
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): inner {
		return new inner(true, this.value)
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

	constructor(__goscriptValue?: boolean, inner$?: inner) {
		this.inner = inner$ ?? new inner(true)
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): outer {
		return new outer(true, this.inner.clone())
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

export class pair {
	public declare first: inner

	public declare second: number

	public declare third: string

	constructor(__goscriptValue?: boolean, first$?: inner, second$?: number, third$?: string) {
		this.first = first$ ?? new inner(true)
		this.second = second$ ?? 0
		this.third = third$ ?? ""
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): pair {
		return new pair(true, this.first.clone(), this.second, this.third)
	}

	public __goscriptAssign(source: pair): this {
		this.first.__goscriptAssign(source.first)
		this.second = source.second
		this.third = source.third
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.pair",
		() => new pair(),
		() => [],
		pair,
		() => [{ name: "first", key: "first", type: "main.inner" }, { name: "second", key: "second", type: /* @__PURE__ */ $.basicType("int") }, { name: "third", key: "third", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export let defaultOuter: outer = new outer(true)

export function __goscript_set_defaultOuter(__goscriptValue: outer): void {
	$.assignStruct(defaultOuter, __goscriptValue)
}

export let calls: $.Slice<string> = null! as $.Slice<string>

export function __goscript_set_calls(__goscriptValue: $.Slice<string>): void {
	calls = __goscriptValue
}

export function next(name: string, v: number): number {
	calls = $.appendOne(calls, name)
	return v
}

export async function main(): globalThis.Promise<void> {
	defaultOuter.inner.value = 7
	await $.println(defaultOuter.inner.value)

	// Keys out of field order evaluate their calls in source order.
	let p = (() => { const __goscriptLiteralField0 = next("second", 2); return new pair(true, (() => { const __goscriptLiteralField1 = next("first", 1); return new inner(true, __goscriptLiteralField1) })(), __goscriptLiteralField0, "t") })()
	for (let __goscriptRangeTarget0 = calls, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let call = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as string)
		await $.println(call)
	}
	await $.println(p.first.value, p.second, p.third)

	// A stored struct value in a literal is copied.
	let _in = new inner(true, 3)
	let q = new pair(true, (_in).clone())
	_in.value = 4
	await $.println(q.first.value, _in.value, q.second, $.stringEqual(q.third, ""))
}

if ($.isMainScript(import.meta)) {
	await main()
}
