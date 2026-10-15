// Generated file based on binary_struct_pointer.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as bytes from "@goscript/bytes/index.js"
import * as binary from "@goscript/encoding/binary/index.js"
import type * as io from "@goscript/io/index.js"

export class inner {
	public declare A: number

	public declare B: Uint8Array

	constructor(init?: Partial<{A?: number, B?: Uint8Array}>, __goscriptValue?: boolean) {
		this.A = init?.A ?? (0 as number)
		this.B = init?.B !== undefined ? $.cloneArrayValue(init.B, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 2)) : $.arrayValue(new Uint8Array(2))
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): inner {
		return new inner(this, true)
	}

	public __goscriptAssign(source: inner): this {
		this.A = source.A
		this.B = $.assignFieldValue(this.B, source.B, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 2))
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.inner",
		() => new inner(),
		() => [],
		inner,
		() => [{ name: "A", key: "A", type: /* @__PURE__ */ $.basicType("uint16") }, { name: "B", key: "B", type: /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 2) }]
	)
}

export class header {
	public declare Sig: Uint8Array

	public declare Size: number

	public declare Res: number[]

	public declare In: inner

	public declare Width: number

	constructor(init?: Partial<{Sig?: Uint8Array, Size?: number, Res?: number[], In?: inner, Width?: number}>, __goscriptValue?: boolean) {
		this.Sig = init?.Sig !== undefined ? $.cloneArrayValue(init.Sig, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 2)) : $.arrayValue(new Uint8Array(2))
		this.Size = init?.Size ?? (0 as number)
		this.Res = init?.Res !== undefined ? $.cloneArrayValue(init.Res, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint16"), 2)) : $.arrayValue(globalThis.Array.from({ length: 2 }, () => 0))
		this.In = init?.In ? init.In.clone() : new inner(undefined, true)
		this.Width = init?.Width ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): header {
		return new header(this, true)
	}

	public __goscriptAssign(source: header): this {
		this.Sig = $.assignFieldValue(this.Sig, source.Sig, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 2))
		this.Size = source.Size
		this.Res = $.assignFieldValue(this.Res, source.Res, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint16"), 2))
		this.In.__goscriptAssign(source.In)
		this.Width = source.Width
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.header",
		() => new header(),
		() => [],
		header,
		() => [{ name: "Sig", key: "Sig", type: /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 2) }, { name: "Size", key: "Size", type: /* @__PURE__ */ $.basicType("uint32") }, { name: "Res", key: "Res", type: /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint16"), 2) }, { name: "In", key: "In", type: "main.inner" }, { name: "Width", key: "Width", type: /* @__PURE__ */ $.basicType("int32") }]
	)
}

export async function main(): globalThis.Promise<void> {
	// A pointer to a struct is written field by field, as image/bmp does.
	let h = new header({Sig: $.arrayValue(new Uint8Array([66, 77])), Size: 70, Res: $.arrayValue([1, 2]), In: new inner({A: 0x0102, B: $.arrayValue(new Uint8Array([3, 4]))}, true), Width: -5})
	let buf = $.varRef($.markAsStructValue(new bytes.Buffer()))
	{
		let err = await binary.Write($.pointerValueOrNil($.interfaceValue<io.Writer | null>(buf, "*bytes.Buffer", /* @__PURE__ */ $.pointerType("bytes.Buffer")))!, $.interfaceValue<binary.ByteOrder | null>($.markAsStructValue($.cloneStructValue($.pointerValue<any>(binary.LittleEndian))), "binary.littleEndian", "binary.littleEndian")!, $.interfaceValue(h, "*main.header", /* @__PURE__ */ $.pointerType("main.header")))
		if (err != null) {
			await $.println("write error:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
			return
		}
	}
	await $.println("size:", binary.Size($.interfaceValue(h, "*main.header", /* @__PURE__ */ $.pointerType("main.header"))), "written:", buf.value.Len())
	await $.println("bytes:", $.uint($.arrayIndex(buf.value.Bytes()!, 0), 8), $.uint($.arrayIndex(buf.value.Bytes()!, 1), 8), $.uint($.arrayIndex(buf.value.Bytes()!, 2), 8), $.uint($.arrayIndex(buf.value.Bytes()!, 10), 8), $.uint($.arrayIndex(buf.value.Bytes()!, 12), 8))

	// Reading into a pointer to a struct fills its fields.
	let r: $.VarRef<header> = $.varRef(new header(undefined, true))
	{
		let err = await binary.Read($.pointerValueOrNil($.interfaceValue<io.Reader | null>(bytes.NewReader(buf.value.Bytes()), "*bytes.Reader", /* @__PURE__ */ $.pointerType("bytes.Reader")))!, $.interfaceValue<binary.ByteOrder | null>($.markAsStructValue($.cloneStructValue($.pointerValue<any>(binary.LittleEndian))), "binary.littleEndian", "binary.littleEndian")!, $.interfaceValue(r, "*main.header", /* @__PURE__ */ $.pointerType("main.header")))
		if (err != null) {
			await $.println("read error:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
			return
		}
	}
	await $.println("read:", $.bytesToString($.goSlice(r.value.Sig, undefined, undefined)), r.value.Size, $.arrayIndex(r.value.Res, 1), r.value.In.A, $.arrayIndex(r.value.In.B, 1), r.value.Width)
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
