// Generated file based on generic_range_map_type_param.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as slices from "@goscript/slices/index.js"
import "@goscript/slices/index.js"

export type Named = globalThis.Map<string, number> | null

export function Keys<K>(__typeArgs: $.GenericTypeArgs | undefined, m: any): $.Slice<K> {
	let r: $.Slice<K> = $.makeSlice<K>(0, $.len(m), undefined, () => ($.genericZero(__typeArgs, "K", null) as K))
	for (const [k, __rangeValue] of m?.entries() ?? []) {
		r = $.append(r, k, $.appendZero(() => ($.genericZero(__typeArgs, "K", null) as K)))
	}
	return r
}

export function Values<V>(__typeArgs: $.GenericTypeArgs | undefined, m: any): $.Slice<V> {
	let r: $.Slice<V> = $.makeSlice<V>(0, $.len(m), undefined, () => ($.genericZero(__typeArgs, "V", null) as V))
	for (const [__rangeKey, v] of m?.entries() ?? []) {
		r = $.append(r, v, $.appendZero(() => ($.genericZero(__typeArgs, "V", null) as V)))
	}
	return r
}

export function Sum(__typeArgs: $.GenericTypeArgs | undefined, s: any): any {
	let t: any = $.genericZero(__typeArgs, "E", null)
	for (let __goscriptRangeTarget0 = s, __rangeIndex = 0; __rangeIndex < $.len(__goscriptRangeTarget0); __rangeIndex++) {
		let v = __goscriptRangeTarget0![__rangeIndex]
		t = t + (v)
	}
	return t
}

export async function main(): globalThis.Promise<void> {
	let m: globalThis.Map<string, $.Slice<number>> | null = $.makeMap<string, $.Slice<number>>([["a", $.arrayToSlice<number>([1])], ["b", $.arrayToSlice<number>([2, 3])], ["c", null]])
	let ks: $.Slice<string> = (Keys({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, M: { type: /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"))), zero: () => null }, K: { type: /* @__PURE__ */ $.basicType("string"), zero: () => "" }, V: { type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")), zero: () => null }}, m) as $.Slice<string>)
	slices.Sort(ks)
	await $.println($.len(ks), $.arrayIndex(ks!, 0), $.arrayIndex(ks!, 1), $.arrayIndex(ks!, 2))
	let n: Named = $.makeMap<string, number>([["x", 1], ["y", 2]])
	let vs: $.Slice<number> = (Values({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, M: { type: "main.Named", zero: () => null }, K: { type: /* @__PURE__ */ $.basicType("string"), zero: () => "" }, V: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }}, n) as $.Slice<number>)
	slices.Sort(vs)
	await $.println($.len(vs), $.arrayIndex(vs!, 0), $.arrayIndex(vs!, 1))
	let nk: $.Slice<string> = (Keys({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, M: { type: "main.Named", zero: () => null }, K: { type: /* @__PURE__ */ $.basicType("string"), zero: () => "" }, V: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }}, n) as $.Slice<string>)
	slices.Sort(nk)
	await $.println($.arrayIndex(nk!, 0), $.arrayIndex(nk!, 1))
	await $.println(Sum({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, S: { type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")), zero: () => null }, E: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }}, $.arrayToSlice<number>([1, 2, 3])))
}

if ($.isMainScript(import.meta)) {
	await main()
}
