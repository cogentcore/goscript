// Generated file based on nil_slice_append_spread.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class item {
	public declare value: string

	constructor(__goscriptValue?: boolean, value$?: string) {
		this.value = value$ ?? ""
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): item {
		return new item(true, this.value)
	}

	public __goscriptAssign(source: item): this {
		this.value = source.value
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.item",
		() => new item(),
		() => [],
		item,
		() => [{ name: "value", key: "value", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export function clone(items: $.Slice<item | $.VarRef<item> | null>): $.Slice<item | $.VarRef<item> | null> {
	return $.appendSlice<item | $.VarRef<item> | null>(null, items, $.appendZeros.nil)
}

export async function main(): globalThis.Promise<void> {
	let first = new item(false, "first")
	let second = new item(false, "second")
	let items = $.arrayToSlice<item | $.VarRef<item> | null>([first, second])
	let cloned = clone(items)
	await $.println($.sliceLen(cloned), $.pointerValue<item>($.arrayIndex(cloned!, 0)).value, $.pointerValue<item>($.arrayIndex(cloned!, 1)).value)
}

if ($.isMainScript(import.meta)) {
	await main()
}
