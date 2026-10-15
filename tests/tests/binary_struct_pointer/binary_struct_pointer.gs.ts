// Generated file based on binary_struct_pointer.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as bytes from "@goscript/bytes/index.js"
import * as binary from "@goscript/encoding/binary/index.js"
import type * as io from "@goscript/io/index.js"

export class inner {
	public declare A: number

	public declare B: Uint8Array

	constructor(__goscriptValue?: boolean, A$?: number, B$?: Uint8Array) {
		this.A = A$ ?? 0
		this.B = B$ ?? $.arrayValue(new Uint8Array(2))
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): inner {
		return new inner(true, this.A, $.cloneArrayValue(this.B, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 2)))
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

	constructor(__goscriptValue?: boolean, Sig$?: Uint8Array, Size$?: number, Res$?: number[], In$?: inner, Width$?: number) {
		this.Sig = Sig$ ?? $.arrayValue(new Uint8Array(2))
		this.Size = Size$ ?? 0
		this.Res = Res$ ?? $.arrayValue(globalThis.Array.from({ length: 2 }, () => 0))
		this.In = In$ ?? new inner(true)
		this.Width = Width$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): header {
		return new header(true, $.cloneArrayValue(this.Sig, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 2)), this.Size, $.cloneArrayValue(this.Res, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint16"), 2)), this.In.clone(), this.Width)
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
	let h = new header(false, $.arrayValue(new Uint8Array([66, 77])), 70, $.arrayValue([1, 2]), new inner(true, 0x0102, $.arrayValue(new Uint8Array([3, 4]))), -5)
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
	let r: $.VarRef<header> = $.varRef(new header(true))
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
