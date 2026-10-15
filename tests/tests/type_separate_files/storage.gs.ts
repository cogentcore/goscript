// Generated file based on storage.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as __goscript_memory from "./memory.gs.ts"
import "./memory.gs.ts"

export class storage {
	public declare files: globalThis.Map<string, __goscript_memory.file | $.VarRef<__goscript_memory.file> | null> | null

	public declare children: globalThis.Map<string, globalThis.Map<string, __goscript_memory.file | $.VarRef<__goscript_memory.file> | null> | null> | null

	constructor(init?: Partial<{files?: globalThis.Map<string, __goscript_memory.file | $.VarRef<__goscript_memory.file> | null> | null, children?: globalThis.Map<string, globalThis.Map<string, __goscript_memory.file | $.VarRef<__goscript_memory.file> | null> | null> | null}>, __goscriptValue?: boolean) {
		this.files = init?.files ?? (null! as globalThis.Map<string, __goscript_memory.file | $.VarRef<__goscript_memory.file> | null> | null)
		this.children = init?.children ?? (null! as globalThis.Map<string, globalThis.Map<string, __goscript_memory.file | $.VarRef<__goscript_memory.file> | null> | null> | null)
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
