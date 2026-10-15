// Generated file based on package_import_io_fs_readdir_varref.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as fs from "@goscript/io/fs/index.js"
import * as fstest from "@goscript/testing/fstest/index.js"

export class openOnlyFS {
	public get fsys(): fstest.MapFS {
		return this._fields.fsys
	}

	public set fsys(value: fstest.MapFS) {
		this._fields.fsys = value
	}

	public _fields: {
		fsys: fstest.MapFS
	}

	constructor(init?: Partial<{fsys?: fstest.MapFS}>, __goscriptValue?: boolean) {
		this._fields = {
			fsys: init?.fsys ?? (null! as fstest.MapFS)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): openOnlyFS {
		return new openOnlyFS(this, true)
	}

	public __goscriptAssign(source: openOnlyFS): void {
		const target = this._fields
		const values = source._fields
		target.fsys = values.fsys
	}

	public Open(name: string): [fs.File | null, $.GoError] {
		const o = this;
		return fstest.MapFS_Open(o.fsys, name)
	}

	static __typeInfo = $.registerStructType(
		"main.openOnlyFS",
		() => new openOnlyFS(),
		() => [{ name: "Open", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "fs.File" }, { type: "error" }] }],
		openOnlyFS,
		() => [{ name: "fsys", key: "fsys", type: "fstest.MapFS" }]
	)
}

export async function main(): globalThis.Promise<void> {
	let fsys = $.makeMap<string, fstest.MapFile | $.VarRef<fstest.MapFile> | null>([["b.txt", new fstest.MapFile({Data: new Uint8Array([98])})], ["a.txt", new fstest.MapFile({Data: new Uint8Array([97])})], ["dir/nested.txt", new fstest.MapFile({Data: new Uint8Array([110, 101, 115, 116, 101, 100])})]])

	let __goscriptTuple0: any = await fs.ReadDir($.interfaceValue<fs.FS | null>(new openOnlyFS({fsys: fsys}, true), "main.openOnlyFS", "main.openOnlyFS")!, ".")
	let entries: $.Slice<fs.DirEntry | null> = __goscriptTuple0[0]
	let err = __goscriptTuple0[1]
	if (err != null) {
		await $.println("err:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && (err as any).__goValue === undefined ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		return
	}
	for (let __goscriptRangeTarget0 = entries, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let entry = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as fs.DirEntry | null)
		await $.println((__goscriptAwait = (entry !== null && (entry as any).__isVarRef !== true && (entry as any).__goValue === undefined ? (entry as Exclude<fs.DirEntry, null>) : $.pointerValue<Exclude<fs.DirEntry, null>>(entry)).Name(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = (entry !== null && (entry as any).__isVarRef !== true && (entry as any).__goValue === undefined ? (entry as Exclude<fs.DirEntry, null>) : $.pointerValue<Exclude<fs.DirEntry, null>>(entry)).IsDir(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	}
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
