// Generated file based on func_var_sort_callback.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as cmp from "@goscript/cmp/index.js"

import * as slices from "@goscript/slices/index.js"
import "@goscript/cmp/index.js"
import "@goscript/slices/index.js"

export async function order(prev: $.Slice<string>, hosts: $.Slice<string>): globalThis.Promise<$.Slice<string>> {
	let ranks: globalThis.Map<string, number> | null = $.makeMap<string, number>([])
	for (let i = $.sliceLen(prev) - 1; i >= 0; i--) {
		$.mapSet(ranks, $.arrayIndex(prev!, i), i)
	}
	let known = $.sliceLen(prev)

	let rank: ((host: string) => number | globalThis.Promise<number>) | null = $.functionValue((host: string): number => {
		{
			let [__goscriptShadow0, ok] = $.mapGet<string, number, number>(ranks, host, 0)
			if (ok) {
				return __goscriptShadow0
			}
		}
		return known
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))
	let ordered: $.Slice<string> = (slices.Clone(hosts) as $.Slice<string>)
	await slices.SortStableFunc(ordered, $.functionValue(async (a: string, b: string): globalThis.Promise<number> => {
		return cmp.Compare(await rank!(a), await rank!(b))
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo)))
	return ordered
}

export async function main(): globalThis.Promise<void> {
	for (let __goscriptRangeTarget0 = await order($.arrayToSlice<string>(["c", "a"]), $.arrayToSlice<string>(["x", "a", "y", "c"])), __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let host = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as string)
		await $.println(host)
	}
}

if ($.isMainScript(import.meta)) {
	await main()
}
