// Generated file based on package_import_io_fs_readlink.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as fs from "@goscript/io/fs/index.js"

export class emptyFS {
	constructor(init?: Partial<{}>, __goscriptValue?: boolean) {
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): emptyFS {
		return new emptyFS(this, true)
	}

	public __goscriptAssign(source: emptyFS): this {
		return this
	}

	public Open(name: string): [fs.File | null, $.GoError] {
		return [null, fs.ErrNotExist]
	}

	static __typeInfo = $.registerStructType(
		"main.emptyFS",
		() => new emptyFS(),
		() => [{ name: "Open", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "fs.File" }, { type: "error" }] }],
		emptyFS,
		() => []
	)
}

export class linkFS {
	constructor(init?: Partial<{}>, __goscriptValue?: boolean) {
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): linkFS {
		return new linkFS(this, true)
	}

	public __goscriptAssign(source: linkFS): this {
		return this
	}

	public Lstat(name: string): [fs.FileInfo | null, $.GoError] {
		return [null, fs.ErrNotExist]
	}

	public Open(name: string): [fs.File | null, $.GoError] {
		return [null, fs.ErrNotExist]
	}

	public ReadLink(name: string): [string, $.GoError] {
		return ["target.txt", null]
	}

	static __typeInfo = $.registerStructType(
		"main.linkFS",
		() => new linkFS(),
		() => [{ name: "Lstat", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "fs.FileInfo" }, { type: "error" }] }, { name: "Open", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "fs.File" }, { type: "error" }] }, { name: "ReadLink", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("string") }, { type: "error" }] }],
		linkFS,
		() => []
	)
}

export async function main(): globalThis.Promise<void> {
	let [target, err] = fs.ReadLink($.interfaceValue<fs.FS | null>(new linkFS(undefined, true), "main.linkFS", "main.linkFS")!, "link")
	await $.println("target:", target, err == null)

	let __goscriptTuple0: any = fs.ReadLink($.interfaceValue<fs.FS | null>(new emptyFS(undefined, true), "main.emptyFS", "main.emptyFS")!, "link")
	err = __goscriptTuple0[1]
	await $.println("unsupported:", err != null)
}

if ($.isMainScript(import.meta)) {
	await main()
}
