// Generated file based on package_import_text_template.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as os from "@goscript/os/index.js"
import * as template from "@goscript/text/template/index.js"
import type * as io from "@goscript/io/index.js"
import "@goscript/os/index.js"

export class item {
	public declare Name: string

	public declare Count: number

	constructor(__goscriptValue?: boolean, Name$?: string, Count$?: number) {
		this.Name = Name$ ?? ""
		this.Count = Count$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): item {
		return new item(true, this.Name, this.Count)
	}

	public __goscriptAssign(source: item): this {
		this.Name = source.Name
		this.Count = source.Count
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.item",
		() => new item(),
		() => [],
		item,
		() => [/* @__PURE__ */ $.structField("Name", /* @__PURE__ */ $.basicType("string"), [0], 0, true), /* @__PURE__ */ $.structField("Count", /* @__PURE__ */ $.basicType("int"), [1], 16, true)]
	)
}

export async function main(): globalThis.Promise<void> {
	let t = template.Must(...(template.Template.prototype.Parse.call(template.New("x"), "{{range $i, $e := .}}{{$i}}:{{$e.Name}}={{$e.Count}}{{if gt $e.Count 1}} many{{end}}\n{{end}}") as [template.Template | $.VarRef<template.Template> | null, $.GoError]))
	{
		let err = await template.Template.prototype.Execute.call(t, $.interfaceValue<io.Writer | null>(os.Stdout, "*os.File", __goscriptStatic0()), $.interfaceValue($.arrayToSlice<item>([new item(true, "a", 1), new item(true, "b", 2)]), "[]main.item", /* @__PURE__ */ $.sliceType("main.item")))
		if (err != null) {
			await $.println((__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
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
