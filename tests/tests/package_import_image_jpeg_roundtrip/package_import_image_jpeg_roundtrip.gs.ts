// Generated file based on package_import_image_jpeg_roundtrip.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as bytes from "@goscript/bytes/index.js"

import * as image from "@goscript/image/index.js"

import * as color from "@goscript/image/color/index.js"

import * as jpeg from "@goscript/image/jpeg/index.js"

import type * as io from "@goscript/io/index.js"
import "@goscript/bytes/index.js"
import "@goscript/image/index.js"
import "@goscript/image/color/index.js"
import "@goscript/image/jpeg/index.js"

export async function main(): globalThis.Promise<void> {
	let im: image.RGBA | $.VarRef<image.RGBA> | null = image.NewRGBA($.markAsStructValue($.cloneStructValue(image.Rect(0, 0, 16, 16))))
	for (let y = 0; y < 16; y++) {
		for (let x = 0; x < 16; x++) {
			await image.RGBA.prototype.Set.call(im, x, y, $.interfaceValue<color.Color | null>($.markAsStructValue(new color.RGBA({R: $.uint($.uint(x * 16, 8), 8), G: $.uint($.uint(y * 16, 8), 8), B: 128, A: 255})), "color.RGBA", "color.RGBA"))
		}
	}
	let buf: $.VarRef<bytes.Buffer> = $.varRef($.markAsStructValue(new bytes.Buffer()))
	{
		let err = await jpeg.Encode($.interfaceValue<io.Writer | null>(buf, "*bytes.Buffer", /* @__PURE__ */ $.pointerType("bytes.Buffer")), $.interfaceValue<image.Image | null>(im, "*image.RGBA", /* @__PURE__ */ $.pointerType("image.RGBA")), new jpeg.Options({Quality: 90}))
		if (err != null) {
			await $.println("encode error:", await $.pointerValue<Exclude<$.GoError, null>>(err).Error())
			return
		}
	}
	let b: $.Slice<number> = buf.value.Bytes()
	await $.println("len:", $.len(b))
	let sum = 0
	for (let __goscriptRangeTarget0 = b, i = 0; i < $.len(__goscriptRangeTarget0); i++) {
		let c = $.uint(__goscriptRangeTarget0![i], 8)
		sum = ((sum * 31) + ($.int(c) * (i + 1))) % 1000000007
	}
	await $.println("sum:", sum)
	let [m, err] = await jpeg.Decode($.interfaceValue<io.Reader | null>(bytes.NewReader(b), "*bytes.Reader", /* @__PURE__ */ $.pointerType("bytes.Reader")))
	if (err != null) {
		await $.println("decode error:", await $.pointerValue<Exclude<$.GoError, null>>(err).Error())
		return
	}
	let __goscriptTuple0: any = await $.pointerValue<Exclude<color.Color, null>>((await $.pointerValue<Exclude<image.Image, null>>(m).At(5, 7))).RGBA()
	let r = $.uint(__goscriptTuple0[0], 32)
	let g = $.uint(__goscriptTuple0[1], 32)
	let bb = $.uint(__goscriptTuple0[2], 32)
	await $.println("bounds:", (await $.pointerValue<Exclude<image.Image, null>>(m).Bounds()).Dx(), (await $.pointerValue<Exclude<image.Image, null>>(m).Bounds()).Dy(), "px:", $.uint($.uintShr(r, 8, 32), 32), $.uint($.uintShr(g, 8, 32), 32), $.uint($.uintShr(bb, 8, 32), 32))
}

if ($.isMainScript(import.meta)) {
	await main()
}
