// Generated file based on map_index_type_shadow.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class item {
	public declare values: $.Slice<number>

	constructor(__goscriptValue?: boolean, values$?: $.Slice<number>) {
		this.values = values$ ?? (null! as $.Slice<number>)
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): item {
		return new item(true, this.values)
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
	let items = $.makeMap<string, item>([["one", new item(true, $.arrayToSlice<number>([1, 2, 3]))]])
	{
		let [__goscriptShadow0, ok] = $.mapGet<string, item, item>(items, "one", new item(true))
		if (ok) {
			await $.println("values:", $.sliceLen(__goscriptShadow0.values))
		}
	}
}

if ($.isMainScript(import.meta)) {
	await main()
}
