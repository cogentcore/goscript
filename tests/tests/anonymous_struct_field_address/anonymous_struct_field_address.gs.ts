// Generated file based on anonymous_struct_field_address.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class entry {
	public declare value: number

	constructor(__goscriptValue?: boolean, value$?: number) {
		this.value = value$ ?? 0
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): entry {
		return new entry(true, this.value)
	}

	public __goscriptAssign(source: entry): this {
		this.value = source.value
		return this
	}

	public add(value: number): void {
		const e: entry | $.VarRef<entry> | null = this;
		const e$: entry = e == null ? $.pointerTarget<entry>(e) : (e as any).__isVarRef === true ? (e as any).value : (e as any).__goValue === undefined ? (e as any) : $.pointerTarget<entry>(e);
		;(e$ as entry).value += value
	}

	static __typeInfo = $.registerStructType(
		"main.entry",
		() => new entry(),
		() => [{ name: "add", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }],
		entry,
		() => [{ name: "value", key: "value", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class config {
	public declare core: {"bare": boolean, "name": string}

	constructor(__goscriptValue?: boolean, core$?: {"bare": boolean, "name": string}) {
		this.core = core$ ?? $.anonymousStructValue({"bare": false, "name": ""}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("bare", /* @__PURE__ */ $.basicType("bool"), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/anonymous_struct_field_address" }), /* @__PURE__ */ $.structField("name", /* @__PURE__ */ $.basicType("string"), [1], 8, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/anonymous_struct_field_address" })] })
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): config {
		return new config(true, $.markAsStructValue($.cloneStructValue(this.core)))
	}

	public __goscriptAssign(source: config): this {
		$.assignStruct(this.core, source.core)
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.config",
		() => new config(),
		() => [],
		config,
		() => [{ name: "core", key: "core", type: { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("bare", /* @__PURE__ */ $.basicType("bool"), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/anonymous_struct_field_address" }), /* @__PURE__ */ $.structField("name", /* @__PURE__ */ $.basicType("string"), [1], 8, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/anonymous_struct_field_address" })] } }]
	)
}

export let box: {"table": entry[]} = $.anonymousStructValue({"table": $.arrayValue(globalThis.Array.from({ length: 2 }, () => new entry(true)), /* @__PURE__ */ $.arrayType("main.entry", 2))}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("table", /* @__PURE__ */ $.arrayType("main.entry", 2), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/anonymous_struct_field_address" })] })

export function __goscript_set_box(__goscriptValue: {"table": entry[]}): void {
	$.assignStruct(box, __goscriptValue)
}

export function entries(): $.VarRef<entry[]> | null {
	return $.fieldRef(box, "table")
}

export function mergeCore(dst: $.VarRef<{"bare": boolean, "name": string}> | null, src: $.VarRef<{"bare": boolean, "name": string}> | null): void {
	if (!$.stringEqual($.pointerValue<{"bare": boolean, "name": string}>(src).name, "")) {
		$.pointerValue<{"bare": boolean, "name": string}>(dst).name = $.pointerValue<{"bare": boolean, "name": string}>(src).name
	}
	$.pointerValue<{"bare": boolean, "name": string}>(dst).bare = $.pointerValue<{"bare": boolean, "name": string}>(dst).bare || $.pointerValue<{"bare": boolean, "name": string}>(src).bare
}

export function merge(dst: config | $.VarRef<config> | null, src: config | $.VarRef<config> | null): void {
	mergeCore($.transientFieldRef($.pointerValue<config>(dst), "core"), $.transientFieldRef($.pointerValue<config>(src), "core"))
}

export async function main(): globalThis.Promise<void> {
	let table = entries()
	$.arrayIndex($.pointerValue<entry[]>(table), 0).add(5)
	await $.println($.arrayIndex($.pointerValue<entry[]>(table), 0).value)

	let dst = new config()
	let dst$: config = dst == null ? $.pointerTarget<config>(dst) : (dst as any).__isVarRef === true ? (dst as any).value : (dst as any).__goValue === undefined ? (dst as any) : $.pointerTarget<config>(dst)
	let src = new config()
	let src$: config = src == null ? $.pointerTarget<config>(src) : (src as any).__isVarRef === true ? (src as any).value : (src as any).__goValue === undefined ? (src as any) : $.pointerTarget<config>(src);
	;(src$ as config).core.bare = true;
	;(src$ as config).core.name = "origin"
	merge(dst, src)
	await $.println((dst$ as config).core.bare, (dst$ as config).core.name)
}

if ($.isMainScript(import.meta)) {
	await main()
}
