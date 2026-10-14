// Generated file based on fs_file_read_byte_slice.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as fs from "@goscript/io/fs/index.js"

import * as fstest from "@goscript/testing/fstest/index.js"
import "@goscript/io/fs/index.js"
import "@goscript/testing/fstest/index.js"

export async function show(v: any): globalThis.Promise<void> {
	{
		let __goscriptTuple0: any = $.typeAssertTuple<$.Slice<number>>(v, /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")))
		let b: $.Slice<number> = __goscriptTuple0[0]
		let ok = __goscriptTuple0[1]
		if (ok) {
			await $.println("show:", $.bytesToString(b))
		}
	}
}

export async function main(): globalThis.Promise<void> {
	let fsys: fs.FS | null = $.namedValueInterfaceValue<fs.FS | null>($.makeMap<string, fstest.MapFile | $.VarRef<fstest.MapFile> | null>([["a.txt", new fstest.MapFile({Data: new Uint8Array([98, 97, 114])})]]), "fstest.MapFS", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2())
	let [file, err] = await $.pointerValue<Exclude<fs.FS, null>>(fsys).Open("a.txt")
	if (err != null) {
		await $.println("open error:", await $.pointerValue<Exclude<$.GoError, null>>(err).Error())
		return
	}
	let data: $.Slice<number> = $.makeSlice<number>(3, undefined, "byte")
	let __goscriptTuple1: any = await $.pointerValue<Exclude<fs.File, null>>(file).Read(data)
	let n = __goscriptTuple1[0]
	err = __goscriptTuple1[1]
	await $.println(n, err == null, $.bytesToString(data))
	await show($.interfaceValue(data, "[]byte", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({Glob: (receiver: any, ...args: any[]) => (fstest.MapFS_Glob as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), Lstat: (receiver: any, ...args: any[]) => (fstest.MapFS_Lstat as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), Open: (receiver: any, ...args: any[]) => (fstest.MapFS_Open as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), ReadDir: (receiver: any, ...args: any[]) => (fstest.MapFS_ReadDir as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), ReadFile: (receiver: any, ...args: any[]) => (fstest.MapFS_ReadFile as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), ReadLink: (receiver: any, ...args: any[]) => (fstest.MapFS_ReadLink as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), Stat: (receiver: any, ...args: any[]) => (fstest.MapFS_Stat as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), Sub: (receiver: any, ...args: any[]) => (fstest.MapFS_Sub as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), lstat: (receiver: any, ...args: any[]) => (fstest.MapFS_lstat as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), resolveSymlinks: (receiver: any, ...args: any[]) => (fstest.MapFS_resolveSymlinks as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ("fstest.MapFS")
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ([$.methodSignature("Glob", [["pattern", /* @__PURE__ */ $.basicType("string")]], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string")), "error"]), $.methodSignature("Lstat", [["name", /* @__PURE__ */ $.basicType("string")]], ["fs.FileInfo", "error"]), $.methodSignature("Open", [["name", /* @__PURE__ */ $.basicType("string")]], ["fs.File", "error"]), $.methodSignature("ReadDir", [["name", /* @__PURE__ */ $.basicType("string")]], [/* @__PURE__ */ $.sliceType("fs.DirEntry"), "error"]), $.methodSignature("ReadFile", [["name", /* @__PURE__ */ $.basicType("string")]], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")), "error"]), $.methodSignature("ReadLink", [["name", /* @__PURE__ */ $.basicType("string")]], [/* @__PURE__ */ $.basicType("string"), "error"]), $.methodSignature("Stat", [["name", /* @__PURE__ */ $.basicType("string")]], ["fs.FileInfo", "error"]), $.methodSignature("Sub", [["dir", /* @__PURE__ */ $.basicType("string")]], ["fs.FS", "error"]), $.methodSignature("lstat", [["name", /* @__PURE__ */ $.basicType("string")]], [/* @__PURE__ */ $.pointerType("fstest.mapFileInfo"), "error"]), $.methodSignature("resolveSymlinks", [["name", /* @__PURE__ */ $.basicType("string")]], [["_", /* @__PURE__ */ $.basicType("string")], ["ok", /* @__PURE__ */ $.basicType("bool")]])])
}

if ($.isMainScript(import.meta)) {
	await main()
}
