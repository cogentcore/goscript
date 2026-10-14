// Generated file based on map_index_type_shadow.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class item {
	public get values(): $.Slice<number> {
		return this._fields.values
	}

	public set values(value: $.Slice<number>) {
		this._fields.values = value
	}

	public _fields: {
		values: $.Slice<number>
	}

	constructor(init?: Partial<{values?: $.Slice<number>}>) {
		this._fields = {
			values: init?.values ?? (null! as $.Slice<number>)
		}
	}

	public clone(): item {
		return $.markAsStructValue(new item(this))
	}

	static __typeInfo = $.registerStructType(
		"main.item",
		() => new item(),
		() => [],
		item,
		() => [{ name: "values", key: "values", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")) }]
	)
}

export async function main(): globalThis.Promise<void> {
	let items: globalThis.Map<string, item> | null = $.makeMap<string, item>([["one", $.markAsStructValue(new item({values: $.arrayToSlice<number>([1, 2, 3])}))]])
	{
		let [__goscriptShadow0, ok] = $.mapGet<string, item, item>(items, "one", $.markAsStructValue(new item()))
		if (ok) {
			await $.println("values:", $.len(__goscriptShadow0.values))
		}
	}
}

if ($.isMainScript(import.meta)) {
	await main()
}
