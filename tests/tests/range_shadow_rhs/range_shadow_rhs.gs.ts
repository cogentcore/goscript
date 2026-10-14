// Generated file based on range_shadow_rhs.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class holder {
	public get values(): globalThis.Map<string, number> | null {
		return this._fields.values
	}

	public set values(value: globalThis.Map<string, number> | null) {
		this._fields.values = value
	}

	public get items(): $.Slice<item> {
		return this._fields.items
	}

	public set items(value: $.Slice<item>) {
		this._fields.items = value
	}

	public _fields: {
		values: globalThis.Map<string, number> | null
		items: $.Slice<item>
	}

	constructor(init?: Partial<{values?: globalThis.Map<string, number> | null, items?: $.Slice<item>}>) {
		this._fields = {
			values: init?.values ?? (null! as globalThis.Map<string, number> | null),
			items: init?.items ?? (null! as $.Slice<item>)
		}
	}

	public clone(): holder {
		return $.markAsStructValue(new holder(this))
	}

	public __goscriptAssign(source: holder): void {
		const target = this._fields
		const values = source._fields
		target.values = values.values
		target.items = values.items
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

	public clone(): item {
		return $.markAsStructValue(new item(this))
	}

	public __goscriptAssign(source: item): void {
		const target = this._fields
		const values = source._fields
		target.value = values.value
	}

	public increment(): number {
		let i: item | $.VarRef<item> | null = this;
		$.pointerValue<item>(i).value++
		return $.pointerValue<item>(i).value
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
	let k = $.markAsStructValue(new holder({values: $.makeMap<string, number>([["a", 1], ["b", 2]])}))
	let sum = 0
	for (const [__goscriptRangeShadow0, v] of k.values?.entries() ?? []) {
		sum = sum + ($.stringLen(__goscriptRangeShadow0) + v)
	}
	await $.println(sum)
	let items = $.markAsStructValue(new holder({items: $.arrayToSlice<item>([$.markAsStructValue(new item({value: 3})), $.markAsStructValue(new item({value: 7}))])}))
	for (let __goscriptRangeTarget0 = items.items, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let __goscriptRangeShadow1 = $.varRef($.markAsStructValue($.cloneStructValue((__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as item))))
		await $.println(__goscriptRangeShadow1.value.increment())
	}
	await $.println($.arrayIndex(items.items!, 0).value, $.arrayIndex(items.items!, 1).value)
}

if ($.isMainScript(import.meta)) {
	await main()
}
