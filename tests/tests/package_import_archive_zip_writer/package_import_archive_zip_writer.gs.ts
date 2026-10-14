// Generated file based on package_import_archive_zip_writer.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as zip from "@goscript/archive/zip/index.js"

import * as bytes from "@goscript/bytes/index.js"

import * as io from "@goscript/io/index.js"
import "@goscript/archive/zip/index.js"
import "@goscript/bytes/index.js"
import "@goscript/io/index.js"

export async function main(): globalThis.Promise<void> {
	let buf: $.VarRef<bytes.Buffer> = $.varRef($.markAsStructValue(new bytes.Buffer()))
	let zw: zip.Writer | $.VarRef<zip.Writer> | null = zip.NewWriter($.interfaceValue<io.Writer | null>(buf, "*bytes.Buffer", /* @__PURE__ */ $.pointerType("bytes.Buffer")))
	let [w, err] = await (zw !== null && (zw as any).__isVarRef !== true && (zw as any).__goValue === undefined ? (zw as unknown as zip.Writer).Create("hello.txt") : zip.Writer.prototype.Create.call(zw, "hello.txt"))
	await $.println("create", err == null)
	let __goscriptTuple0: any = await (w !== null && (w as any).__isVarRef !== true && (w as any).__goValue === undefined ? (w as Exclude<io.Writer, null>) : $.pointerValue<Exclude<io.Writer, null>>(w)).Write(new Uint8Array([104, 101, 108, 108, 111]))
	let n = __goscriptTuple0[0]
	err = __goscriptTuple0[1]
	await $.println("write", n, err == null)
	err = await (zw !== null && (zw as any).__isVarRef !== true && (zw as any).__goValue === undefined ? (zw as unknown as zip.Writer).Close() : zip.Writer.prototype.Close.call(zw))
	await $.println("close", err == null, buf.value.Len() > 0)

	let __goscriptTuple1: any = await zip.NewReader($.interfaceValue<io.ReaderAt | null>(bytes.NewReader(buf.value.Bytes()), "*bytes.Reader", /* @__PURE__ */ $.pointerType("bytes.Reader")), $.int64(buf.value.Len()))
	let zr: zip.Reader | $.VarRef<zip.Reader> | null = __goscriptTuple1[0]
	err = __goscriptTuple1[1]
	let zr$: zip.Reader = zr == null ? $.pointerTarget<zip.Reader>(zr) : (zr as any).__isVarRef === true ? (zr as any).value : (zr as any).__goValue === undefined ? (zr as any) : $.pointerTarget<zip.Reader>(zr)
	if (err != null) {
		await $.println("open error", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && (err as any).__goValue === undefined ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		return
	}
	await $.println("open", err == null, $.sliceLen((zr$ as zip.Reader).File))
	let __goscriptTuple2: any = await zip.File.prototype.Open.call($.arrayIndex((zr$ as zip.Reader).File!, 0))
	let rc = __goscriptTuple2[0]
	err = __goscriptTuple2[1]
	await $.println("file open", err == null)
	let __goscriptTuple3: any = await io.ReadAll($.pointerValueOrNil((rc as io.Reader | null))!)
	let data: $.Slice<number> = __goscriptTuple3[0]
	err = __goscriptTuple3[1]
	await $.println("file", $.pointerValue<zip.File>($.arrayIndex((zr$ as zip.Reader).File!, 0)).FileHeader.Name, $.bytesToString(data), err == null)
	err = await (rc !== null && (rc as any).__isVarRef !== true && (rc as any).__goValue === undefined ? (rc as Exclude<io.ReadCloser, null>) : $.pointerValue<Exclude<io.ReadCloser, null>>(rc)).Close()
	await $.println("file close", err == null)
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
