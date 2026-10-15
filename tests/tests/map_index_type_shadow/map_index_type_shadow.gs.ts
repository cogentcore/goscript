// Generated file based on map_index_type_shadow.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class item {
	public declare values: $.Slice<number>

	constructor(init?: Partial<{values?: $.Slice<number>}>, __goscriptValue?: boolean) {
		this.values = init?.values ?? (null! as $.Slice<number>)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): item {
		return new item(this, true)
	}

	public __goscriptAssign(source: item): this {
		this.values = source.values
		return this
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
	let items = $.makeMap<string, item>([["one", new item({values: $.arrayToSlice<number>([1, 2, 3])}, true)]])
	{
		let [__goscriptShadow0, ok] = $.mapGet<string, item, item>(items, "one", new item(undefined, true))
		if (ok) {
			await $.println("values:", $.sliceLen(__goscriptShadow0.values))
		}
	}
}

if ($.isMainScript(import.meta)) {
	await main()
}
