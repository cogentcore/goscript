// Generated file based on async_function_field.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as sync from "@goscript/sync/index.js"

export class loader {
	public get load(): ((_p0: string) => [any, boolean] | globalThis.Promise<[any, boolean]>) | null {
		return this._fields.load
	}

	public set load(value: ((_p0: string) => [any, boolean] | globalThis.Promise<[any, boolean]>) | null) {
		this._fields.load = value
	}

	public _fields: {
		load: ((_p0: string) => [any, boolean] | globalThis.Promise<[any, boolean]>) | null
	}

	constructor(init?: Partial<{load?: ((_p0: string) => [any, boolean] | globalThis.Promise<[any, boolean]>) | null}>, __goscriptValue?: boolean) {
		this._fields = {
			load: init?.load ?? (null! as ((_p0: string) => [any, boolean] | globalThis.Promise<[any, boolean]>) | null)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): loader {
		return new loader(this, true)
	}

	public __goscriptAssign(source: loader): void {
		const target = this._fields
		const values = source._fields
		target.load = values.load
	}

	public getLoad(): ((_p0: string) => [any, boolean] | globalThis.Promise<[any, boolean]>) | null {
		const l: loader | $.VarRef<loader> | null = this;
		return $.pointerValue<loader>(l).load
	}

	static __typeInfo = $.registerStructType(
		"main.loader",
		() => new loader(),
		() => [{ name: "getLoad", args: [], returns: [{ type: ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string")], results: [{ kind: $.TypeKind.Interface, methods: [] }, /* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo) }], pointerReceiver: true }],
		loader,
		() => [{ name: "load", key: "load", type: ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string")], results: [{ kind: $.TypeKind.Interface, methods: [] }, /* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo) }]
	)
}

export let cache = $.varRef($.markAsStructValue(new sync.Map()))

export function __goscript_set_cache(__goscriptValue: sync.Map): void {
	$.assignStruct(cache.value, __goscriptValue)
}

export let defaultLoader: loader | $.VarRef<loader> | null = new loader({load: $.functionValue((key: string): [any, boolean] => {
	return cache.value.Load(key)
}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string")], results: [{ kind: $.TypeKind.Interface, methods: [] }, /* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo))})

export function __goscript_set_defaultLoader(__goscriptValue: loader | $.VarRef<loader> | null): void {
	defaultLoader = __goscriptValue
}

export function lookup(key: string): [any, boolean] {
	return ($.pointerValue<loader>(defaultLoader).load!(key) as [any, boolean])
}

export function lookupViaGetter(key: string): [any, boolean] {
	return ((defaultLoader !== null && (defaultLoader as any).__isVarRef !== true && (defaultLoader as any).__goValue === undefined ? ((defaultLoader as any) as loader).getLoad() : loader.prototype.getLoad.call(defaultLoader))!(key) as [any, boolean])
}

export async function main(): globalThis.Promise<void> {
	cache.value.Store("answer", $.basicInterfaceValue(42, "int"))
	let [value, ok] = lookup("answer")
	if (ok) {
		await $.println("value:", $.mustTypeAssert<number>(value, /* @__PURE__ */ $.basicType("int")))
	}
	let [getterValue, getterOk] = lookupViaGetter("answer")
	if (getterOk) {
		await $.println("getter value:", $.mustTypeAssert<number>(getterValue, /* @__PURE__ */ $.basicType("int")))
	}
}

if ($.isMainScript(import.meta)) {
	await main()
}
