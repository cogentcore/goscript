// Generated file based on package_import_json_marshaler_alias.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as template from "@goscript/html/template/index.js"
import * as os from "@goscript/os/index.js"
import type * as io from "@goscript/io/index.js"
import "@goscript/os/index.js"

export async function main(): globalThis.Promise<void> {
	// html/template, compiled from source, uses json.Marshaler, which is an
	// alias of a type of encoding/json/v2 since Go 1.27.
	let t = template.Must(...((await template.Template.prototype.Parse.call(template.New("t"), "<a title=\"{{.}}\">{{.}}</a>" + "\n")) as [template.Template | $.VarRef<template.Template> | null, $.GoError]))
	{
		let err = await (t !== null && (t as any).__isVarRef !== true && (t as any).__goValue === undefined ? ((t as any) as template.Template).Execute($.interfaceValue<io.Writer | null>(os.Stdout, "*os.File", __goscriptStatic0()), "x < y") : template.Template.prototype.Execute.call(t, $.interfaceValue<io.Writer | null>(os.Stdout, "*os.File", __goscriptStatic0()), "x < y"))
		if (err != null) {
			await $.println("error:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		}
	}
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ($.overrideTypeMethods(/* @__PURE__ */ $.pointerType("os.File"), "os.File", () => [$.methodSignature("Chdir", [], ["error"], true), $.methodSignature("Chmod", [["mode", /* @__PURE__ */ $.basicType("uint32", "fs.FileMode")]], ["error"], true), $.methodSignature("Chown", [["uid", /* @__PURE__ */ $.basicType("int")], ["gid", /* @__PURE__ */ $.basicType("int")]], ["error"], true), $.methodSignature("Close", [], ["error"], true), $.methodSignature("Fd", [], [/* @__PURE__ */ $.basicType("uintptr")], true), $.methodSignature("Name", [], [/* @__PURE__ */ $.basicType("string")], true), $.methodSignature("Read", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("ReadAt", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))], ["off", /* @__PURE__ */ $.basicType("int64")]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("ReadDir", [["n", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.sliceType("fs.DirEntry"), "error"], true), $.methodSignature("ReadFrom", [["r", "io.Reader"]], [["n", /* @__PURE__ */ $.basicType("int64")], ["err", "error"]], true), $.methodSignature("Readdir", [["n", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.sliceType("fs.FileInfo"), "error"], true), $.methodSignature("Readdirnames", [["n", /* @__PURE__ */ $.basicType("int")]], [["names", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string"))], ["err", "error"]], true), $.methodSignature("Seek", [["offset", /* @__PURE__ */ $.basicType("int64")], ["whence", /* @__PURE__ */ $.basicType("int")]], [["ret", /* @__PURE__ */ $.basicType("int64")], ["err", "error"]], true), $.methodSignature("SetDeadline", [["t", "time.Time"]], ["error"], true), $.methodSignature("SetReadDeadline", [["t", "time.Time"]], ["error"], true), $.methodSignature("SetWriteDeadline", [["t", "time.Time"]], ["error"], true), $.methodSignature("Stat", [], ["fs.FileInfo", "error"], true), $.methodSignature("Sync", [], ["error"], true), $.methodSignature("SyscallConn", [], ["syscall.RawConn", "error"], true), $.methodSignature("Truncate", [["size", /* @__PURE__ */ $.basicType("int64")]], ["error"], true), $.methodSignature("Write", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("WriteAt", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))], ["off", /* @__PURE__ */ $.basicType("int64")]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("WriteString", [["s", /* @__PURE__ */ $.basicType("string")]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("WriteTo", [["w", "io.Writer"]], [["n", /* @__PURE__ */ $.basicType("int64")], ["err", "error"]], true)]))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
