// Generated file based on transient_field_pointer.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as atomic from "@goscript/sync/atomic/index.js"

export type flags = bigint

$.registerNamedValueType(
	"*main.flags",
	{has: (receiver: any, ...args: any[]) => (flags_has as any)(receiver, ...$.stripGenericTypeArgs(args)), set: (receiver: any, ...args: any[]) => (flags__set as any)(receiver, ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("has", [["bit", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("set", [["bit", /* @__PURE__ */ $.basicType("int")]])]
);

export class state {
	public get fl(): flags {
		return this._fields.fl
	}

	public set fl(value: flags) {
		this._fields.fl = value
	}

	public get n(): number {
		return this._fields.n
	}

	public set n(value: number) {
		this._fields.n = value
	}

	public get m(): number {
		return this._fields.m
	}

	public set m(value: number) {
		this._fields.m = value
	}

	public get c(): bigint {
		return this._fields.c
	}

	public set c(value: bigint) {
		this._fields.c = value
	}

	public _fields: {
		fl: flags
		n: number
		m: number
		c: bigint
	}

	constructor(init?: Partial<{fl?: flags, n?: number, m?: number, c?: bigint}>, __goscriptValue?: boolean) {
		this._fields = {
			fl: init?.fl ?? (0n as flags),
			n: init?.n ?? (0 as number),
			m: init?.m ?? (0 as number),
			c: init?.c ?? (0n as bigint)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): state {
		return new state(this, true)
	}

	public __goscriptAssign(source: state): void {
		const target = this._fields
		const values = source._fields
		target.fl = values.fl
		target.n = values.n
		target.m = values.m
		target.c = values.c
	}

	static __typeInfo = $.registerStructType(
		"main.state",
		() => new state(),
		() => [],
		state,
		() => [{ name: "fl", key: "fl", type: /* @__PURE__ */ $.basicType("int64", "main.flags") }, { name: "n", key: "n", type: /* @__PURE__ */ $.basicType("int") }, { name: "m", key: "m", type: /* @__PURE__ */ $.basicType("int") }, { name: "c", key: "c", type: /* @__PURE__ */ $.basicType("int64") }]
	)
}

export function flags_has(f: $.VarRef<flags> | null, bit: number): boolean {
	return ($.int64And($.int64($.pointerValue<flags>(f)), ($.int64Shl(1n, bit)))) != 0n
}

export function flags__set(f: $.VarRef<flags> | null, bit: number): void {
	f!.value = $.int64Or(f!.value, $.int64Shl(1n, bit))
}

export function inc(p: $.VarRef<number> | null): void {
	p!.value++
}

export function incTwice(p: $.VarRef<number> | null): void {
	if (p != null) {
		inc(p)
		inc(p)
	}
}

export function same(a: $.VarRef<number> | null, b: $.VarRef<number> | null): boolean {
	return $.pointerEqual(a, b)
}

export let kept: $.VarRef<number> | null = null! as $.VarRef<number> | null

export function __goscript_set_kept(__goscriptValue: $.VarRef<number> | null): void {
	kept = __goscriptValue
}

export function ret(p: $.VarRef<number> | null): $.VarRef<number> | null {
	return p
}

export async function through(p: $.VarRef<number> | null): globalThis.Promise<$.VarRef<number> | null> {
	let _get = $.functionValue((): $.VarRef<number> | null => {
		return p
	}, ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int"))] } as $.FunctionTypeInfo))
	return _get()
}

export function keep(p: $.VarRef<number> | null): void {
	kept = p
}

export function load(p: $.VarRef<bigint> | null): bigint {
	return atomic.LoadInt64(p)
}

export async function main(): globalThis.Promise<void> {
	// Methods and functions that only read and write through a pointer.
	let s = new state()
	let s$: state = s == null ? $.pointerTarget<state>(s) : (s as any).__isVarRef === true ? (s as any).value : (s as any).__goValue === undefined ? (s as any) : $.pointerTarget<state>(s)
	flags__set($.transientFieldRef((s$ as state)._fields, "fl"), 3)
	await $.println(flags_has($.transientFieldRef((s$ as state)._fields, "fl"), 3), flags_has($.transientFieldRef((s$ as state)._fields, "fl"), 2))
	incTwice($.transientFieldRef((s$ as state)._fields, "n"))
	await $.println((s$ as state).n)
	atomic.StoreInt64($.fieldRef((s$ as state)._fields, "c"), 7n)
	await $.println(load($.transientFieldRef((s$ as state)._fields, "c")))

	// Comparing or keeping a pointer sees the field's own address.
	await $.println(same($.fieldRef((s$ as state)._fields, "n"), $.fieldRef((s$ as state)._fields, "n")), same($.fieldRef((s$ as state)._fields, "n"), $.fieldRef((s$ as state)._fields, "m")))
	keep($.fieldRef((s$ as state)._fields, "n"))
	inc($.transientFieldRef((s$ as state)._fields, "n"))
	await $.println($.pointerValue<number>(kept), $.pointerEqual(kept, $.fieldRef((s$ as state)._fields, "n")))
	await $.println($.pointerEqual(ret($.fieldRef((s$ as state)._fields, "n")), $.fieldRef((s$ as state)._fields, "n")), $.pointerEqual(await through($.fieldRef((s$ as state)._fields, "m")), $.fieldRef((s$ as state)._fields, "m")))

	// A struct value's fields work the same.
	let v: state = new state(undefined, true)
	flags__set($.transientFieldRef(v._fields, "fl"), 1)
	incTwice($.transientFieldRef(v._fields, "m"))
	await $.println(flags_has($.transientFieldRef(v._fields, "fl"), 1), flags_has($.transientFieldRef(v._fields, "fl"), 3), v.m)
}

if ($.isMainScript(import.meta)) {
	await main()
}
