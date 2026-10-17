// Generated file based on package_import_archive_zip_writer.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as zip from "@goscript/archive/zip/index.js"
import * as bytes from "@goscript/bytes/index.js"
import * as io from "@goscript/io/index.js"

export async function main(): globalThis.Promise<void> {
	let buf = $.varRef($.markAsStructValue(new bytes.Buffer()))
	let zw = zip.NewWriter($.interfaceValue<io.Writer | null>(buf, "*bytes.Buffer", __goscriptStatic0()))
	let [w, err] = await (zw !== null && (zw as any).__isVarRef !== true && (zw as any).__goValue === undefined ? ((zw as any) as zip.Writer).Create("hello.txt") : zip.Writer.prototype.Create.call(zw, "hello.txt"))
	await $.println("create", err == null)
	let __goscriptTuple0: any = await (w !== null && (w as any).__isVarRef !== true && ((w as any).__goValue === undefined || (w as any).__goType?.charCodeAt(0) !== 42) ? (w as Exclude<io.Writer, null>) : $.pointerValue<Exclude<io.Writer, null>>(w)).Write(new Uint8Array([104, 101, 108, 108, 111]))
	let n: number = __goscriptTuple0[0]
	err = __goscriptTuple0[1]
	await $.println("write", n, err == null)
	err = await (zw !== null && (zw as any).__isVarRef !== true && (zw as any).__goValue === undefined ? ((zw as any) as zip.Writer).Close() : zip.Writer.prototype.Close.call(zw))
	await $.println("close", err == null, buf.value.Len() > 0)

	let __goscriptTuple1: any = await zip.NewReader($.interfaceValue<io.ReaderAt | null>(bytes.NewReader(buf.value.Bytes()), "*bytes.Reader", __goscriptStatic1()), $.int64(buf.value.Len()))
	let zr: zip.Reader | $.VarRef<zip.Reader> | null = __goscriptTuple1[0]
	err = __goscriptTuple1[1]
	let zr$: zip.Reader = zr == null ? $.pointerTarget<zip.Reader>(zr) : (zr as any).__isVarRef === true ? (zr as any).value : (zr as any).__goValue === undefined ? (zr as any) : $.pointerTarget<zip.Reader>(zr)
	if (err != null) {
		await $.println("open error", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		return
	}
	await $.println("open", err == null, $.sliceLen((zr$ as zip.Reader).File))
	let __goscriptTuple2: any = await zip.File.prototype.Open.call($.arrayIndex((zr$ as zip.Reader).File!, 0))
	let rc: io.ReadCloser | null = __goscriptTuple2[0]
	err = __goscriptTuple2[1]
	await $.println("file open", err == null)
	let __goscriptTuple3: any = await io.ReadAll($.pointerValueOrNil((rc as io.Reader | null))!)
	let data: $.Slice<number> = __goscriptTuple3[0]
	err = __goscriptTuple3[1]
	await $.println("file", $.pointerValue<zip.File>($.arrayIndex((zr$ as zip.Reader).File!, 0)).FileHeader.Name, $.bytesToString(data), err == null)
	err = await (rc !== null && (rc as any).__isVarRef !== true && ((rc as any).__goValue === undefined || (rc as any).__goType?.charCodeAt(0) !== 42) ? (rc as Exclude<io.ReadCloser, null>) : $.pointerValue<Exclude<io.ReadCloser, null>>(rc)).Close()
	await $.println("file close", err == null)
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ($.overrideTypeMethods(/* @__PURE__ */ $.pointerType("bytes.Buffer"), "bytes.Buffer", () => [$.methodSignature("Available", [], [/* @__PURE__ */ $.basicType("int")], true), $.methodSignature("AvailableBuffer", [], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))], true), $.methodSignature("Bytes", [], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))], true), $.methodSignature("Cap", [], [/* @__PURE__ */ $.basicType("int")], true), $.methodSignature("Grow", [["n", /* @__PURE__ */ $.basicType("int")]], [], true), $.methodSignature("Len", [], [/* @__PURE__ */ $.basicType("int")], true), $.methodSignature("Next", [["n", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))], true), $.methodSignature("Peek", [["n", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")), "error"], true), $.methodSignature("Read", [["p", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("ReadByte", [], [/* @__PURE__ */ $.basicType("uint8"), "error"], true), $.methodSignature("ReadBytes", [["delim", /* @__PURE__ */ $.basicType("uint8")]], [["line", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))], ["err", "error"]], true), $.methodSignature("ReadFrom", [["r", "io.Reader"]], [["n", /* @__PURE__ */ $.basicType("int64")], ["err", "error"]], true), $.methodSignature("ReadRune", [], [["r", /* @__PURE__ */ $.basicType("int32")], ["size", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("ReadString", [["delim", /* @__PURE__ */ $.basicType("uint8")]], [["line", /* @__PURE__ */ $.basicType("string")], ["err", "error"]], true), $.methodSignature("Reset", [], [], true), $.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")], true), $.methodSignature("Truncate", [["n", /* @__PURE__ */ $.basicType("int")]], [], true), $.methodSignature("UnreadByte", [], ["error"], true), $.methodSignature("UnreadRune", [], ["error"], true), $.methodSignature("Write", [["p", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("WriteByte", [["c", /* @__PURE__ */ $.basicType("uint8")]], ["error"], true), $.methodSignature("WriteRune", [["r", /* @__PURE__ */ $.basicType("int32")]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("WriteString", [["s", /* @__PURE__ */ $.basicType("string")]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("WriteTo", [["w", "io.Writer"]], [["n", /* @__PURE__ */ $.basicType("int64")], ["err", "error"]], true)]))
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ($.overrideTypeMethods(/* @__PURE__ */ $.pointerType("bytes.Reader"), "bytes.Reader", () => [$.methodSignature("Len", [], [/* @__PURE__ */ $.basicType("int")], true), $.methodSignature("Read", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("ReadAt", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))], ["off", /* @__PURE__ */ $.basicType("int64")]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("ReadByte", [], [/* @__PURE__ */ $.basicType("uint8"), "error"], true), $.methodSignature("ReadRune", [], [["ch", /* @__PURE__ */ $.basicType("int32")], ["size", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("Reset", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], [], true), $.methodSignature("Seek", [["offset", /* @__PURE__ */ $.basicType("int64")], ["whence", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("int64"), "error"], true), $.methodSignature("Size", [], [/* @__PURE__ */ $.basicType("int64")], true), $.methodSignature("UnreadByte", [], ["error"], true), $.methodSignature("UnreadRune", [], ["error"], true), $.methodSignature("WriteTo", [["w", "io.Writer"]], [["n", /* @__PURE__ */ $.basicType("int64")], ["err", "error"]], true)]))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
