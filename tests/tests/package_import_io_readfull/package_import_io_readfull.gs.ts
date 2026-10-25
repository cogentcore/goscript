// Generated file based on package_import_io_readfull.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as bytes from "@goscript/bytes/index.js"
import * as io from "@goscript/io/index.js"

export class fixedReader {
	public declare data: $.Slice<number>

	public declare size: number

	constructor(__goscriptValue?: boolean, data$?: $.Slice<number>, size$?: number) {
		this.data = data$ ?? (null! as $.Slice<number>)
		this.size = size$ ?? 0
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): fixedReader {
		return new fixedReader(true, this.data, this.size)
	}

	public __goscriptAssign(source: fixedReader): this {
		this.data = source.data
		this.size = source.size
		return this
	}

	public Read(p: $.Slice<number>): [number, $.GoError] {
		const r: fixedReader | $.VarRef<fixedReader> | null = this;
		const r$: fixedReader = r == null ? $.pointerTarget<fixedReader>(r) : (r as any).__isVarRef === true ? (r as any).value : (r as any).__goValue === undefined ? (r as any) : $.pointerTarget<fixedReader>(r)
		if ($.sliceLen((r$ as fixedReader).data) == 0) {
			return [0, io.EOF]
		}
		if (((r$ as fixedReader).size > 0) && ($.sliceLen(p) > (r$ as fixedReader).size)) {
			p = $.goSlice(p, undefined, (r$ as fixedReader).size)
		}
		let n = $.copy(p, (r$ as fixedReader).data);
		;(r$ as fixedReader).data = $.goSlice((r$ as fixedReader).data, n, undefined)
		return [n, null]
	}

	static __typeInfo = $.registerStructType(
		"main.fixedReader",
		() => new fixedReader(),
		() => [{ name: "Read", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }, { type: "error" }], pointerReceiver: true }],
		fixedReader,
		() => [{ name: "data", key: "data", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }, { name: "size", key: "size", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let buf = $.makeSlice<number>(2, undefined, "byte")
	let [n, err] = await io.ReadFull($.pointerValueOrNil($.interfaceValue<io.Reader | null>(new fixedReader(false, new Uint8Array([97, 98, 99])), "*main.fixedReader", /* @__PURE__ */ $.pointerType("main.fixedReader")))!, buf)
	await $.println("read:", n, $.bytesToString(buf), err == null)
	let __goscriptTuple0: any = await io.ReadFull($.pointerValueOrNil($.interfaceValue<io.Reader | null>(bytes.NewReader(null), "*bytes.Reader", __goscriptStatic0()))!, buf)
	n = __goscriptTuple0[0]
	err = __goscriptTuple0[1]
	await $.println("empty:", n, $.comparableEqual(err, io.EOF))
	let __goscriptTuple1: any = await io.ReadFull($.pointerValueOrNil($.interfaceValue<io.Reader | null>(bytes.NewReader(new Uint8Array([120])), "*bytes.Reader", __goscriptStatic0()))!, buf)
	n = __goscriptTuple1[0]
	err = __goscriptTuple1[1]
	await $.println("short:", n, $.bytesToString($.goSlice(buf, undefined, 1)), $.comparableEqual(err, io.ErrUnexpectedEOF))
	let __goscriptTuple2: any = await io.ReadAll($.pointerValueOrNil($.interfaceValue<io.Reader | null>(new fixedReader(false, new Uint8Array([97, 98, 99, 68, 69, 70, 103, 104, 105]), 3), "*main.fixedReader", /* @__PURE__ */ $.pointerType("main.fixedReader")))!)
	let all: $.Slice<number> = __goscriptTuple2[0]
	err = __goscriptTuple2[1]
	await $.println("readall:", $.bytesToString(all), err == null)
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ($.overrideTypeMethods(/* @__PURE__ */ $.pointerType("bytes.Reader"), "bytes.Reader", () => [$.methodSignature("Len", [], [/* @__PURE__ */ $.basicType("int")], true), $.methodSignature("Read", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("ReadAt", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))], ["off", /* @__PURE__ */ $.basicType("int64")]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("ReadByte", [], [/* @__PURE__ */ $.basicType("uint8"), "error"], true), $.methodSignature("ReadRune", [], [["ch", /* @__PURE__ */ $.basicType("int32")], ["size", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("Reset", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], [], true), $.methodSignature("Seek", [["offset", /* @__PURE__ */ $.basicType("int64")], ["whence", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("int64"), "error"], true), $.methodSignature("Size", [], [/* @__PURE__ */ $.basicType("int64")], true), $.methodSignature("UnreadByte", [], ["error"], true), $.methodSignature("UnreadRune", [], ["error"], true), $.methodSignature("WriteTo", [["w", "io.Writer"]], [["n", /* @__PURE__ */ $.basicType("int64")], ["err", "error"]], true)]))
}

if ($.isMainScript(import.meta)) {
	await main()
}
