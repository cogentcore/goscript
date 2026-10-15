// Generated file based on generic_numeric_slice_xor.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export function xorLoop<T>(__typeArgs: $.GenericTypeArgs | undefined, dst: $.Slice<T>, x: $.Slice<T>, y: $.Slice<T>): void {
	x = $.goSlice(x, undefined, $.sliceLen(dst))
	y = $.goSlice(y, undefined, $.sliceLen(dst))
	for (let __goscriptRangeTarget0 = dst, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __goscriptSliceWindow0 = $.sliceRange(x), __goscriptSliceWindow1 = $.sliceRange(y), i = 0; i < __goscriptRangeWindow0.length; i++) {
		;(__goscriptRangeWindow0.backing as any[])[__goscriptRangeWindow0.offset + i] = (((__goscriptSliceWindow0.backing as any[])[$.windowSlot(__goscriptSliceWindow0, i)] as any) as any) ^ (((__goscriptSliceWindow1.backing as any[])[$.windowSlot(__goscriptSliceWindow1, i)] as any) as any)
	}
}

export async function main(): globalThis.Promise<void> {
	let dst: $.Slice<number> = new Uint8Array([0, 0]) as $.Slice<number>
	xorLoop(__goscriptStatic0(), dst, new Uint8Array([1, 3]) as $.Slice<number>, new Uint8Array([2, 1]) as $.Slice<number>)
	await $.println($.arrayIndex(dst!, 0), $.arrayIndex(dst!, 1))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("uint8"), zero: () => 0 }})
}

if ($.isMainScript(import.meta)) {
	await main()
}
