// Generated file based on range_shadow_rhs.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class holder {
	public declare values: globalThis.Map<string, number> | null

	public declare items: $.Slice<item>

	constructor(init?: Partial<{values?: globalThis.Map<string, number> | null, items?: $.Slice<item>}>, __goscriptValue?: boolean) {
		this.values = init?.values ?? (null! as globalThis.Map<string, number> | null)
		this.items = init?.items ?? (null! as $.Slice<item>)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): holder {
		return new holder(this, true)
	}

	public __goscriptAssign(source: holder): this {
		this.values = source.values
		this.items = source.items
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.holder",
		() => new holder(),
		() => [],
		holder,
		() => [{ name: "values", key: "values", type: /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int")) }, { name: "items", key: "items", type: /* @__PURE__ */ $.sliceType("main.item") }]
	)
}

export class item {
	public declare value: number

	constructor(init?: Partial<{value?: number}>, __goscriptValue?: boolean) {
		this.value = init?.value ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): item {
		return new item(this, true)
	}

	public __goscriptAssign(source: item): this {
		this.value = source.value
		return this
	}

	public increment(): number {
		let i: item | $.VarRef<item> | null = this;
		const i$: item = i == null ? $.pointerTarget<item>(i) : (i as any).__isVarRef === true ? (i as any).value : (i as any).__goValue === undefined ? (i as any) : $.pointerTarget<item>(i);
		;(i$ as item).value++
		return (i$ as item).value
	}

	static __typeInfo = $.registerStructType(
		"main.item",
		() => new item(),
		() => [{ name: "increment", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }],
		item,
		() => [{ name: "value", key: "value", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let k = new holder({values: $.makeMap<string, number>([["a", 1], ["b", 2]])}, true)
	let sum = 0
	for (const [__goscriptRangeShadow0, v] of k.values?.entries() ?? []) {
		sum += $.stringLen(__goscriptRangeShadow0) + v
	}
	await $.println(sum)
	let items = new holder({items: $.arrayToSlice<item>([new item({value: 3}, true), new item({value: 7}, true)])}, true)
	for (let __goscriptRangeTarget0 = items.items, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let __goscriptRangeShadow1 = $.varRef(((__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as item)).clone())
		await $.println(__goscriptRangeShadow1.value.increment())
	}
	await $.println($.arrayIndex(items.items!, 0).value, $.arrayIndex(items.items!, 1).value)
}

if ($.isMainScript(import.meta)) {
	await main()
}
