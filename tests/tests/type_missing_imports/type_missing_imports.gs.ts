// Generated file based on type_missing_imports.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class file {
	public get name(): string {
		return this._fields.name
	}

	public set name(value: string) {
		this._fields.name = value
	}

	public get data(): $.Slice<number> {
		return this._fields.data
	}

	public set data(value: $.Slice<number>) {
		this._fields.data = value
	}

	public _fields: {
		name: string
		data: $.Slice<number>
	}

	constructor(init?: Partial<{name?: string, data?: $.Slice<number>}>, __goscriptValue?: boolean) {
		this._fields = {
			name: init?.name ?? ("" as string),
			data: init?.data ?? (null! as $.Slice<number>)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): file {
		return new file(this, true)
	}

	public __goscriptAssign(source: file): void {
		const target = this._fields
		const values = source._fields
		target.name = values.name
		target.data = values.data
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
	public get files(): globalThis.Map<string, file | $.VarRef<file> | null> | null {
		return this._fields.files
	}

	public set files(value: globalThis.Map<string, file | $.VarRef<file> | null> | null) {
		this._fields.files = value
	}

	public get children(): globalThis.Map<string, globalThis.Map<string, file | $.VarRef<file> | null> | null> | null {
		return this._fields.children
	}

	public set children(value: globalThis.Map<string, globalThis.Map<string, file | $.VarRef<file> | null> | null> | null) {
		this._fields.children = value
	}

	public _fields: {
		files: globalThis.Map<string, file | $.VarRef<file> | null> | null
		children: globalThis.Map<string, globalThis.Map<string, file | $.VarRef<file> | null> | null> | null
	}

	constructor(init?: Partial<{files?: globalThis.Map<string, file | $.VarRef<file> | null> | null, children?: globalThis.Map<string, globalThis.Map<string, file | $.VarRef<file> | null> | null> | null}>, __goscriptValue?: boolean) {
		this._fields = {
			files: init?.files ?? (null! as globalThis.Map<string, file | $.VarRef<file> | null> | null),
			children: init?.children ?? (null! as globalThis.Map<string, globalThis.Map<string, file | $.VarRef<file> | null> | null> | null)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): storage {
		return new storage(this, true)
	}

	public __goscriptAssign(source: storage): void {
		const target = this._fields
		const values = source._fields
		target.files = values.files
		target.children = values.children
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

	let f: file | $.VarRef<file> | null = new file({name: "test.txt", data: new Uint8Array([104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100])})

	$.mapSet(s.files, "test", f)

	await $.println("Created storage with file:", $.pointerValue<file>($.mapGet<string, file | $.VarRef<file> | null, file | $.VarRef<file> | null>(s.files, "test", null)[0]).name)
}

if ($.isMainScript(import.meta)) {
	await main()
}
