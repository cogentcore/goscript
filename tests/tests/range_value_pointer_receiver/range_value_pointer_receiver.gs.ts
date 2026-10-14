// Generated file based on range_value_pointer_receiver.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class item {
	public get name(): string {
		return this._fields.name
	}

	public set name(value: string) {
		this._fields.name = value
	}

	public _fields: {
		name: string
	}

	constructor(init?: Partial<{name?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			name: init?.name ?? ("" as string)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): item {
		return new item(this, true)
	}

	public __goscriptAssign(source: item): void {
		const target = this._fields
		const values = source._fields
		target.name = values.name
	}

	public Name(): string {
		const i: item | $.VarRef<item> | null = this;
		if (i == null) {
			return ""
		}
		return $.pointerValue<item>(i).name
	}

	static __typeInfo = $.registerStructType(
		"main.item",
		() => new item(),
		() => [{ name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }],
		item,
		() => [{ name: "name", key: "name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let items: $.Slice<item> = $.arrayToSlice<item>([new item({name: "alpha"}, true), new item({name: "beta"}, true)])
	for (let __goscriptRangeTarget0 = items, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let item = $.varRef(((__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as item)).clone())
		await $.println(item.value.Name())
	}
}

if ($.isMainScript(import.meta)) {
	await main()
}
