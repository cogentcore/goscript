// Generated file based on generic_cache_pointer_callbacks.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class cache {
	public get stored(): any {
		return this._fields.stored
	}

	public set stored(value: any) {
		this._fields.stored = value
	}

	public _fields: {
		stored: any
	}

	constructor(init?: Partial<{stored?: any}>, __goscriptValue?: boolean) {
		this._fields = {
			stored: init?.stored ?? (null! as any)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): cache {
		return new cache(this, true)
	}

	public __goscriptAssign(source: cache): void {
		const target = this._fields
		const values = source._fields
		target.stored = values.stored
	}

	public Get(__typeArgs: $.GenericTypeArgs | undefined, k: any, _new: (() => [any, $.GoError] | globalThis.Promise<[any, $.GoError]>) | null, check: ((_p0: any) => boolean | globalThis.Promise<boolean>) | null): [any, $.GoError] {
		let c: cache | $.VarRef<cache> | null = this;
		const c$: cache = c == null ? $.pointerTarget<cache>(c) : (c as any).__isVarRef === true ? (c as any).value : (c as any).__goValue === undefined ? (c as any) : $.pointerTarget<cache>(c)
		if (((c$ as cache).stored != null) && (check!((c$ as cache).stored) as boolean)) {
			return [(c$ as cache).stored, null]
		}
		let [v, err] = (_new!() as [any, $.GoError])
		if (err != null) {
			return [null, err]
		}
		;(c$ as cache).stored = v
		return [v, null]
	}

	static __typeInfo = $.registerStructType(
		"main.cache",
		() => new cache(),
		() => [{ name: "Get", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }, { type: { kind: $.TypeKind.Basic, name: "unknown" } }, { type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.pointerType({ kind: $.TypeKind.Interface, methods: [] }) }, { type: "error" }], pointerReceiver: true }],
		cache,
		() => [{ name: "stored", key: "stored", type: /* @__PURE__ */ $.pointerType({ kind: $.TypeKind.Interface, methods: [] }) }]
	)
}

export class key {
	public get N(): number {
		return this._fields.N
	}

	public set N(value: number) {
		this._fields.N = value
	}

	public _fields: {
		N: number
	}

	constructor(init?: Partial<{N?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			N: init?.N ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): key {
		return new key(this, true)
	}

	public __goscriptAssign(source: key): void {
		const target = this._fields
		const values = source._fields
		target.N = values.N
	}

	static __typeInfo = $.registerStructType(
		"main.key",
		() => new key(),
		() => [],
		key,
		() => [{ name: "N", key: "N", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class privateKey {
	public get D(): number {
		return this._fields.D
	}

	public set D(value: number) {
		this._fields.D = value
	}

	public _fields: {
		D: number
	}

	constructor(init?: Partial<{D?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			D: init?.D ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): privateKey {
		return new privateKey(this, true)
	}

	public __goscriptAssign(source: privateKey): void {
		const target = this._fields
		const values = source._fields
		target.D = values.D
	}

	static __typeInfo = $.registerStructType(
		"main.privateKey",
		() => new privateKey(),
		() => [],
		privateKey,
		() => [{ name: "D", key: "D", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export let privateKeyCache = $.varRef($.markAsStructValue(new cache()))

export function __goscript_set_privateKeyCache(__goscriptValue: cache): void {
	$.assignStruct(privateKeyCache.value, __goscriptValue)
}

export function privateKeyToCache(k: key | $.VarRef<key> | null): [privateKey | $.VarRef<privateKey> | null, $.GoError] {
	const k$: key = k == null ? $.pointerTarget<key>(k) : (k as any).__isVarRef === true ? (k as any).value : (k as any).__goValue === undefined ? (k as any) : $.pointerTarget<key>(k)
	const __goscriptReturn0 = privateKeyCache.value.Get(__goscriptStatic0(), k, $.functionValue((): [privateKey | $.VarRef<privateKey> | null, $.GoError] => {
		return [new privateKey({D: (k$ as key).N}), null]
	}, ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.pointerType("main.privateKey"), "error"] } as $.FunctionTypeInfo)), $.functionValue((v: privateKey | $.VarRef<privateKey> | null): boolean => {
		return $.pointerValue<privateKey>(v).D == (k$ as key).N
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.pointerType("main.privateKey")], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo)))
	return [(__goscriptReturn0[0] as privateKey | $.VarRef<privateKey> | null), __goscriptReturn0[1]]
	throw new globalThis.Error("goscript: unreachable return")
}

export async function main(): globalThis.Promise<void> {
	let k = new key({N: 7})
	let __goscriptTuple0: any = privateKeyToCache(k)
	let v: privateKey | $.VarRef<privateKey> | null = __goscriptTuple0[0]
	let err = __goscriptTuple0[1]
	if (err != null) {
		$.panic((err as any))
	}
	await $.println("cached:", $.pointerValue<privateKey>(v).D)
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, K: { type: "main.key", zero: () => new key(undefined, true) }, V: { type: "main.privateKey", zero: () => new privateKey(undefined, true) }})
}

if ($.isMainScript(import.meta)) {
	await main()
}
