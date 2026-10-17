// Generated file based on os_file_nil_receiver.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as errors from "@goscript/errors/index.js"
import * as fmt from "@goscript/fmt/index.js"
import * as io from "@goscript/io/index.js"
import * as os from "@goscript/os/index.js"
import * as strings from "@goscript/strings/index.js"
import type * as fs from "@goscript/io/fs/index.js"
import "@goscript/os/index.js"

export async function main(): globalThis.Promise<void> {
	// Methods of a nil *os.File report os.ErrInvalid, as Go's checkValid does.
	let f: os.File | $.VarRef<os.File> | null = null! as os.File | $.VarRef<os.File> | null
	let [n, err] = await os.File.prototype.Write.call($.pointerValueOrNil(f), new Uint8Array([120]))
	await $.println("Write:", n, errors.Is($.pointerValueOrNil(err)!, $.pointerValueOrNil(os.ErrInvalid)!))
	let __goscriptTuple0: any = await os.File.prototype.WriteString.call($.pointerValueOrNil(f), "x")
	n = __goscriptTuple0[0]
	err = __goscriptTuple0[1]
	await $.println("WriteString:", n, errors.Is($.pointerValueOrNil(err)!, $.pointerValueOrNil(os.ErrInvalid)!))
	let __goscriptTuple1: any = await os.File.prototype.Read.call($.pointerValueOrNil(f), $.makeSlice<number>(1, undefined, "byte"))
	n = __goscriptTuple1[0]
	err = __goscriptTuple1[1]
	await $.println("Read:", n, errors.Is($.pointerValueOrNil(err)!, $.pointerValueOrNil(os.ErrInvalid)!))
	let __goscriptTuple2: any = await os.File.prototype.Seek.call($.pointerValueOrNil(f), 0n, 0)
	err = __goscriptTuple2[1]
	await $.println("Seek:", errors.Is($.pointerValueOrNil(err)!, $.pointerValueOrNil(os.ErrInvalid)!))
	let __goscriptTuple3: any = await os.File.prototype.Stat.call($.pointerValueOrNil(f))
	err = __goscriptTuple3[1]
	await $.println("Stat:", errors.Is($.pointerValueOrNil(err)!, $.pointerValueOrNil(os.ErrInvalid)!))
	let __goscriptTuple4: any = await os.File.prototype.ReadDir.call($.pointerValueOrNil(f), -1)
	err = __goscriptTuple4[1]
	await $.println("ReadDir:", errors.Is($.pointerValueOrNil(err)!, $.pointerValueOrNil(os.ErrInvalid)!))
	await $.println("Close:", errors.Is($.pointerValueOrNil(await os.File.prototype.Close.call($.pointerValueOrNil(f)))!, $.pointerValueOrNil(os.ErrInvalid)!))
	await $.println("Sync:", errors.Is($.pointerValueOrNil(await os.File.prototype.Sync.call($.pointerValueOrNil(f)))!, $.pointerValueOrNil(os.ErrInvalid)!))
	await $.println("Fd:", os.File.prototype.Fd.call($.pointerValueOrNil(f)) == $.uint("18446744073709551615", 64))

	// fmt writes to a nil *os.File without panicking, and reports the error.
	let __goscriptTuple5: any = await fmt.Fprintln($.pointerValueOrNil($.interfaceValue<io.Writer | null>(f, "*os.File", __goscriptStatic0()))!, "lost")
	err = __goscriptTuple5[1]
	await $.println("Fprintln:", errors.Is($.pointerValueOrNil(err)!, $.pointerValueOrNil(os.ErrInvalid)!))
	let __goscriptTuple6: any = await io.Copy($.pointerValueOrNil($.interfaceValue<io.Writer | null>(f, "*os.File", __goscriptStatic0()))!, $.pointerValueOrNil($.interfaceValue<io.Reader | null>(strings.NewReader("lost"), "*strings.Reader", __goscriptStatic1()))!)
	err = __goscriptTuple6[1]
	await $.println("io.Copy:", errors.Is($.pointerValueOrNil(err)!, $.pointerValueOrNil(os.ErrInvalid)!))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ($.overrideTypeMethods(/* @__PURE__ */ $.pointerType("os.File"), "os.File", () => [$.methodSignature("Chdir", [], ["error"], true), $.methodSignature("Chmod", [["mode", /* @__PURE__ */ $.basicType("uint32", "fs.FileMode")]], ["error"], true), $.methodSignature("Chown", [["uid", /* @__PURE__ */ $.basicType("int")], ["gid", /* @__PURE__ */ $.basicType("int")]], ["error"], true), $.methodSignature("Close", [], ["error"], true), $.methodSignature("Fd", [], [/* @__PURE__ */ $.basicType("uintptr")], true), $.methodSignature("Name", [], [/* @__PURE__ */ $.basicType("string")], true), $.methodSignature("Read", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("ReadAt", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))], ["off", /* @__PURE__ */ $.basicType("int64")]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("ReadDir", [["n", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.sliceType("fs.DirEntry"), "error"], true), $.methodSignature("ReadFrom", [["r", "io.Reader"]], [["n", /* @__PURE__ */ $.basicType("int64")], ["err", "error"]], true), $.methodSignature("Readdir", [["n", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.sliceType("fs.FileInfo"), "error"], true), $.methodSignature("Readdirnames", [["n", /* @__PURE__ */ $.basicType("int")]], [["names", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string"))], ["err", "error"]], true), $.methodSignature("Seek", [["offset", /* @__PURE__ */ $.basicType("int64")], ["whence", /* @__PURE__ */ $.basicType("int")]], [["ret", /* @__PURE__ */ $.basicType("int64")], ["err", "error"]], true), $.methodSignature("SetDeadline", [["t", "time.Time"]], ["error"], true), $.methodSignature("SetReadDeadline", [["t", "time.Time"]], ["error"], true), $.methodSignature("SetWriteDeadline", [["t", "time.Time"]], ["error"], true), $.methodSignature("Stat", [], ["fs.FileInfo", "error"], true), $.methodSignature("Sync", [], ["error"], true), $.methodSignature("SyscallConn", [], ["syscall.RawConn", "error"], true), $.methodSignature("Truncate", [["size", /* @__PURE__ */ $.basicType("int64")]], ["error"], true), $.methodSignature("Write", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("WriteAt", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))], ["off", /* @__PURE__ */ $.basicType("int64")]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("WriteString", [["s", /* @__PURE__ */ $.basicType("string")]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("WriteTo", [["w", "io.Writer"]], [["n", /* @__PURE__ */ $.basicType("int64")], ["err", "error"]], true)]))
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ($.overrideTypeMethods(/* @__PURE__ */ $.pointerType("strings.Reader"), "strings.Reader", () => [$.methodSignature("Len", [], [/* @__PURE__ */ $.basicType("int")], true), $.methodSignature("Read", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("ReadAt", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))], ["off", /* @__PURE__ */ $.basicType("int64")]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("ReadByte", [], [/* @__PURE__ */ $.basicType("uint8"), "error"], true), $.methodSignature("ReadRune", [], [["ch", /* @__PURE__ */ $.basicType("int32")], ["size", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("Reset", [["s", /* @__PURE__ */ $.basicType("string")]], [], true), $.methodSignature("Seek", [["offset", /* @__PURE__ */ $.basicType("int64")], ["whence", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("int64"), "error"], true), $.methodSignature("Size", [], [/* @__PURE__ */ $.basicType("int64")], true), $.methodSignature("UnreadByte", [], ["error"], true), $.methodSignature("UnreadRune", [], ["error"], true), $.methodSignature("WriteTo", [["w", "io.Writer"]], [["n", /* @__PURE__ */ $.basicType("int64")], ["err", "error"]], true)]))
}

if ($.isMainScript(import.meta)) {
	await main()
}
