// Generated file based on binary_uint32_slice_loop.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as binary from "@goscript/encoding/binary/index.js"
import "@goscript/encoding/binary/index.js"

export class attrs {
	public declare packedData: string

	constructor(__goscriptValue?: boolean, packedData$?: string) {
		this.packedData = packedData$ ?? ""
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): attrs {
		return new attrs(true, this.packedData)
	}

	public __goscriptAssign(source: attrs): this {
		this.packedData = source.packedData
		return this
	}

	public decode(): $.Slice<string> {
		const a = this;
		let result: $.Slice<string> = null! as $.Slice<string>
		if ($.stringEqual(a.packedData, "")) {
			return null
		}
		let bytes: $.Slice<number> = $.stringToBytes(a.packedData)
		while ($.sliceLen(bytes) > 0) {
			let kn: number = $.uint(((4 + $.markAsStructValue($.cloneStructValue($.pointerValue<any>(binary.LittleEndian))).Uint32($.goSlice(bytes, undefined, 4))) >>> 0), 32)
			let k = $.bytesToString($.goSlice(bytes, 4, kn))
			bytes = $.goSlice(bytes, kn, undefined)
			let vn: number = $.uint(((4 + $.markAsStructValue($.cloneStructValue($.pointerValue<any>(binary.LittleEndian))).Uint32($.goSlice(bytes, undefined, 4))) >>> 0), 32)
			let v = $.bytesToString($.goSlice(bytes, 4, vn))
			bytes = $.goSlice(bytes, vn, undefined)
			result = $.appendOne(result, k + "=" + v)
		}
		return result
	}

	static __typeInfo = $.registerStructType(
		"main.attrs",
		() => new attrs(),
		() => [{ name: "decode", args: [], returns: [{ type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string")) }] }],
		attrs,
		() => [{ name: "packedData", key: "packedData", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let a = new attrs(true, "\x01\x00\x00\x00a\x01\x00\x00\x00b")
	for (let __goscriptRangeTarget0 = a.decode(), __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let s = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as string)
		await $.println(s)
	}
}

if ($.isMainScript(import.meta)) {
	await main()
}
