// Generated file based on generic_array_typeset_index.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export function search<E>(__typeArgs: $.GenericTypeArgs | undefined, dictionary: $.Slice<E>, r: number): any {
	let result: any = $.genericZero(__typeArgs, "E", null)
	let _from = 0
	let to = $.sliceLen(dictionary)
	while (to > _from) {
		let middle: number = globalThis.Math.trunc((_from + to) / 2)
		let cpRange = $.copyElement($.arrayIndex(dictionary!, middle))
		if ($.int(r) < $.arrayIndex((cpRange as number[]), 0)) {
			to = middle
			continue
		}
		if ($.int(r) > $.arrayIndex((cpRange as number[]), 1)) {
			_from = middle + 1
			continue
		}
		return $.copyElement(cpRange)
	}
	return result
}

export async function main(): globalThis.Promise<void> {
	let three: $.Slice<number[]> = $.arrayToSlice<number[]>([$.arrayValue([0, 9, 1]), $.arrayValue([10, 19, 2]), $.arrayValue([20, 29, 3])])
	await $.println($.arrayIndex(search({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, E: { type: /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int"), 3), zero: () => $.arrayValue(globalThis.Array.from({ length: 3 }, () => 0)) }}, three, 15), 2), $.arrayIndex(search({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, E: { type: /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int"), 3), zero: () => $.arrayValue(globalThis.Array.from({ length: 3 }, () => 0)) }}, three, 25), 2), $.arrayIndex(search({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, E: { type: /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int"), 3), zero: () => $.arrayValue(globalThis.Array.from({ length: 3 }, () => 0)) }}, three, 40), 2))
	let four: $.Slice<number[]> = $.arrayToSlice<number[]>([$.arrayValue([0, 9, 1, 5]), $.arrayValue([10, 19, 2, 6])])
	let r = ($.cloneArrayValue(search({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, E: { type: /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int"), 4), zero: () => $.arrayValue(globalThis.Array.from({ length: 4 }, () => 0)) }}, four, 3), /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int"), 4)) as number[])
	await $.println($.arrayIndex(r, 2), $.arrayIndex(r, 3), 4)
}

if ($.isMainScript(import.meta)) {
	await main()
}
