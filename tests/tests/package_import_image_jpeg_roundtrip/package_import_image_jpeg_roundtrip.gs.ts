// Generated file based on package_import_image_jpeg_roundtrip.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as bytes from "@goscript/bytes/index.js"
import * as image from "@goscript/image/index.js"
import * as color from "@goscript/image/color/index.js"
import * as jpeg from "@goscript/image/jpeg/index.js"
import type * as io from "@goscript/io/index.js"

export async function main(): globalThis.Promise<void> {
	let im = image.NewRGBA(image.Rect(0, 0, 16, 16))
	for (let y = 0; y < 16; y++) {
		for (let x = 0; x < 16; x++) {
			image.RGBA.prototype.Set.call(im, x, y, $.interfaceValue<color.Color | null>(new color.RGBA(true, $.uint(x * 16, 8), $.uint(y * 16, 8), 128, 255), "color.RGBA", "color.RGBA"))
		}
	}
	let buf = $.varRef($.markAsStructValue(new bytes.Buffer()))
	{
		let err = await jpeg.Encode($.interfaceValue<io.Writer | null>(buf, "*bytes.Buffer", /* @__PURE__ */ $.pointerType("bytes.Buffer")), $.interfaceValue<image.Image | null>(im, "*image.RGBA", /* @__PURE__ */ $.pointerType("image.RGBA")), new jpeg.Options(false, 90))
		if (err != null) {
			await $.println("encode error:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
			return
		}
	}
	let b = buf.value.Bytes()
	await $.println("len:", $.sliceLen(b))
	let sum = 0
	for (let __goscriptRangeTarget0 = b, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), i = 0; i < __goscriptRangeWindow0.length; i++) {
		let c = $.uint((__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + i] as number), 8)
		sum = ((sum * 31) + (c * (i + 1))) % 1000000007
	}
	await $.println("sum:", sum)
	let [m, err] = await jpeg.Decode($.interfaceValue<io.Reader | null>(bytes.NewReader(b), "*bytes.Reader", /* @__PURE__ */ $.pointerType("bytes.Reader")))
	if (err != null) {
		await $.println("decode error:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		return
	}
	let [r, g, bb, ] = await $.pointerValue<Exclude<color.Color, null>>((__goscriptAwait = (m !== null && (m as any).__isVarRef !== true && ((m as any).__goValue === undefined || (m as any).__goType?.charCodeAt(0) !== 42) ? (m as Exclude<image.Image, null>) : $.pointerValue<Exclude<image.Image, null>>(m)).At(5, 7), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)).RGBA()
	await $.println("bounds:", ((__goscriptAwait = (m !== null && (m as any).__isVarRef !== true && ((m as any).__goValue === undefined || (m as any).__goType?.charCodeAt(0) !== 42) ? (m as Exclude<image.Image, null>) : $.pointerValue<Exclude<image.Image, null>>(m)).Bounds(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as image.Rectangle).Dx(), ((__goscriptAwait = (m !== null && (m as any).__isVarRef !== true && ((m as any).__goValue === undefined || (m as any).__goType?.charCodeAt(0) !== 42) ? (m as Exclude<image.Image, null>) : $.pointerValue<Exclude<image.Image, null>>(m)).Bounds(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as image.Rectangle).Dy(), "px:", $.uint($.uintShr(r, 8, 32), 32), $.uint($.uintShr(g, 8, 32), 32), $.uint($.uintShr(bb, 8, 32), 32))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
