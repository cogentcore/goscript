// Generated file based on generic_range_map_type_param.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as slices from "@goscript/slices/index.js"
import "@goscript/slices/index.js"

export type Named = globalThis.Map<string, number> | null

$.registerNamedType("main.Named", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int")));

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
	for (let __goscriptRangeTarget0 = s, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let v = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as any)
		t = t + (v)
	}
	return t
}

export async function main(): globalThis.Promise<void> {
	let m: globalThis.Map<string, $.Slice<number>> | null = $.makeMap<string, $.Slice<number>>([["a", $.arrayToSlice<number>([1])], ["b", $.arrayToSlice<number>([2, 3])], ["c", null]])
	let ks: $.Slice<string> = (Keys(__goscriptStatic0(), m) as $.Slice<string>)
	slices.Sort(ks)
	await $.println($.sliceLen(ks), $.arrayIndex(ks!, 0), $.arrayIndex(ks!, 1), $.arrayIndex(ks!, 2))
	let n: Named = $.makeMap<string, number>([["x", 1], ["y", 2]])
	let vs: $.Slice<number> = (Values(__goscriptStatic1(), n) as $.Slice<number>)
	slices.Sort(vs)
	await $.println($.sliceLen(vs), $.arrayIndex(vs!, 0), $.arrayIndex(vs!, 1))
	let nk: $.Slice<string> = (Keys(__goscriptStatic1(), n) as $.Slice<string>)
	slices.Sort(nk)
	await $.println($.arrayIndex(nk!, 0), $.arrayIndex(nk!, 1))
	await $.println(Sum(__goscriptStatic2(), $.arrayToSlice<number>([1, 2, 3])))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, M: { type: /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"))), zero: () => null }, K: { type: /* @__PURE__ */ $.basicType("string"), zero: () => "" }, V: { type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")), zero: () => null }})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, M: { type: "main.Named", zero: () => null }, K: { type: /* @__PURE__ */ $.basicType("string"), zero: () => "" }, V: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }})
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, S: { type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")), zero: () => null }, E: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }})
}

if ($.isMainScript(import.meta)) {
	await main()
}
