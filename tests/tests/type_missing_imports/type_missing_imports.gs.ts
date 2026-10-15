// Generated file based on type_missing_imports.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class file {
	public declare name: string

	public declare data: $.Slice<number>

	constructor(init?: Partial<{name?: string, data?: $.Slice<number>}>, __goscriptValue?: boolean) {
		this.name = init?.name ?? ("" as string)
		this.data = init?.data ?? (null! as $.Slice<number>)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): file {
		return new file(this, true)
	}

	public __goscriptAssign(source: file): this {
		this.name = source.name
		this.data = source.data
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.file",
		() => new file(),
		() => [],
		file,
		() => [{ name: "name", key: "name", type: /* @__PURE__ */ $.basicType("string") }, { name: "data", key: "data", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }]
	)
}

export class storage {
	public declare files: globalThis.Map<string, file | $.VarRef<file> | null> | null

	public declare children: globalThis.Map<string, globalThis.Map<string, file | $.VarRef<file> | null> | null> | null

	constructor(init?: Partial<{files?: globalThis.Map<string, file | $.VarRef<file> | null> | null, children?: globalThis.Map<string, globalThis.Map<string, file | $.VarRef<file> | null> | null> | null}>, __goscriptValue?: boolean) {
		this.files = init?.files ?? (null! as globalThis.Map<string, file | $.VarRef<file> | null> | null)
		this.children = init?.children ?? (null! as globalThis.Map<string, globalThis.Map<string, file | $.VarRef<file> | null> | null> | null)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): storage {
		return new storage(this, true)
	}

	public __goscriptAssign(source: storage): this {
		this.files = source.files
		this.children = source.children
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.storage",
		() => new storage(),
		() => [],
		storage,
		() => [{ name: "files", key: "files", type: /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.pointerType("main.file")) }, { name: "children", key: "children", type: /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.pointerType("main.file"))) }]
	)
}

export async function main(): globalThis.Promise<void> {
	let s = new storage({files: $.makeMap<string, file | $.VarRef<file> | null>(), children: $.makeMap<string, globalThis.Map<string, file | $.VarRef<file> | null> | null>()}, true)

	let f = new file({name: "test.txt", data: new Uint8Array([104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100])})

	$.mapSet(s.files, "test", f)

	await $.println("Created storage with file:", $.pointerValue<file>($.mapGet<string, file | $.VarRef<file> | null, file | $.VarRef<file> | null>(s.files, "test", null)[0]).name)
}

if ($.isMainScript(import.meta)) {
	await main()
}
