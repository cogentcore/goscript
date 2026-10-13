// Generated file based on package_import_encoding_json_byte_slice_field.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as json from "@goscript/encoding/json/index.js"
import "@goscript/encoding/json/index.js"

export class Enc {
	public declare Width: number

	public declare Image: $.Slice<number>

	public declare Frames: $.Slice<$.Slice<number>>

	public declare Named: globalThis.Map<string, $.Slice<number>> | null

	public declare Nested: Enc | $.VarRef<Enc> | null

	public _fields: {
		Width: number
		Image: $.Slice<number>
		Frames: $.Slice<$.Slice<number>>
		Named: globalThis.Map<string, $.Slice<number>> | null
		Nested: Enc | $.VarRef<Enc> | null
	}

	constructor(init?: Partial<{Width?: number, Image?: $.Slice<number>, Frames?: $.Slice<$.Slice<number>>, Named?: globalThis.Map<string, $.Slice<number>> | null, Nested?: Enc | $.VarRef<Enc> | null}>) {
		this._fields = {
			Width: init?.Width ?? (0 as number),
			Image: init?.Image ?? (null! as $.Slice<number>),
			Frames: init?.Frames ?? (null! as $.Slice<$.Slice<number>>),
			Named: init?.Named ?? (null! as globalThis.Map<string, $.Slice<number>> | null),
			Nested: init?.Nested ?? (null! as Enc | $.VarRef<Enc> | null)
		}
	}

	public clone(): Enc {
		return $.markAsStructValue(new Enc(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Width", "Image", "Frames", "Named", "Nested"])
	}

	static __typeInfo = $.registerStructType(
		"main.Enc",
		() => new Enc(),
		() => [],
		Enc,
		() => [{ name: "Width", key: "Width", type: /* @__PURE__ */ $.basicType("int") }, { name: "Image", key: "Image", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }, { name: "Frames", key: "Frames", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))) }, { name: "Named", key: "Named", type: /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))) }, { name: "Nested", key: "Nested", type: /* @__PURE__ */ $.pointerType("main.Enc") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let e: Enc | $.VarRef<Enc> | null = new Enc({Width: 2, Image: new Uint8Array([1, 2, 250]) as $.Slice<number>, Frames: $.arrayToSlice<$.Slice<number>>([new Uint8Array([3]) as $.Slice<number>, new Uint8Array([4, 5]) as $.Slice<number>]), Named: $.makeMap<string, $.Slice<number>>([["a", new Uint8Array([6, 7]) as $.Slice<number>]]), Nested: new Enc({Image: new Uint8Array([104, 105])})})
	let __goscriptTuple0: any = json.Marshal($.interfaceValue(e, "*main.Enc", /* @__PURE__ */ $.pointerType("main.Enc")))
	let b: $.Slice<number> = __goscriptTuple0[0]
	let err = __goscriptTuple0[1]
	await $.println($.bytesToString(b), err == null)

	let d: Enc | $.VarRef<Enc> | null = new Enc()
	err = json.Unmarshal(b, $.interfaceValue(d, "*main.Enc", /* @__PURE__ */ $.pointerType("main.Enc")))
	await $.println("err:", err == null, "width:", $.pointerValue<Enc>(d).Width)
	await $.println("image:", $.len($.pointerValue<Enc>(d).Image), $.uint($.arrayIndex($.pointerValue<Enc>(d).Image!, 0), 8), $.uint($.arrayIndex($.pointerValue<Enc>(d).Image!, 2), 8))
	await $.println("frames:", $.len($.pointerValue<Enc>(d).Frames), $.len($.arrayIndex($.pointerValue<Enc>(d).Frames!, 1)), $.uint($.arrayIndex($.arrayIndex($.pointerValue<Enc>(d).Frames!, 1)!, 1), 8))
	await $.println("named:", $.len($.mapGet<string, $.Slice<number>, $.Slice<number>>($.pointerValue<Enc>(d).Named, "a", null)[0]), $.uint($.arrayIndex($.mapGet<string, $.Slice<number>, $.Slice<number>>($.pointerValue<Enc>(d).Named, "a", null)[0]!, 1), 8))
	await $.println("nested:", $.bytesToString($.pointerValue<Enc>($.pointerValue<Enc>(d).Nested).Image))

	err = json.Unmarshal(new Uint8Array([123, 34, 73, 109, 97, 103, 101, 34, 58, 110, 117, 108, 108, 125]), $.interfaceValue(d, "*main.Enc", /* @__PURE__ */ $.pointerType("main.Enc")))
	await $.println("null image:", err == null, $.pointerValue<Enc>(d).Image == null)
}

if ($.isMainScript(import.meta)) {
	await main()
}
