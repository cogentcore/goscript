// Generated file based on transient_field_pointer.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as atomic from "@goscript/sync/atomic/index.js"

export type flags = bigint

$.registerNamedValueType(
	"*main.flags",
	{has: (receiver: any, ...args: any[]) => (flags_has as any)(receiver, ...$.stripGenericTypeArgs(args)), keepWith: (receiver: any, ...args: any[]) => (flags_keepWith as any)(receiver, ...$.stripGenericTypeArgs(args)), set: (receiver: any, ...args: any[]) => (flags__set as any)(receiver, ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("has", [["bit", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("keepWith", [["n", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int"))]]), $.methodSignature("set", [["bit", /* @__PURE__ */ $.basicType("int")]])]
);

export class state {
	public declare fl: flags

	public declare n: number

	public declare m: number

	public declare c: bigint

	constructor(__goscriptValue?: boolean, fl$?: flags, n$?: number, m$?: number, c$?: bigint) {
		this.fl = fl$ ?? 0n
		this.n = n$ ?? 0
		this.m = m$ ?? 0
		this.c = c$ ?? 0n
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): state {
		return new state(true, this.fl, this.n, this.m, this.c)
	}

	public __goscriptAssign(source: state): this {
		this.fl = source.fl
		this.n = source.n
		this.m = source.m
		this.c = source.c
		return this
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
	return ($.int64And($.pointerValue<flags>(f), ($.int64Bit(bit)))) != 0n
}

export function flags__set(f: $.VarRef<flags> | null, bit: number): void {
	f!.value = $.int64Or(f!.value, $.int64Bit(bit))
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
	return (a === b || ($.pointerAliasesMade || (a as any)?.__goElementBacking !== undefined) && $.pointerEqual(a, b))
}

export let kept: $.VarRef<number> | null = null! as $.VarRef<number> | null

export function __goscript_set_kept(__goscriptValue: $.VarRef<number> | null): void {
	kept = __goscriptValue
}

export let keptFlags: $.VarRef<flags> | null = null! as $.VarRef<flags> | null

export function __goscript_set_keptFlags(__goscriptValue: $.VarRef<flags> | null): void {
	keptFlags = __goscriptValue
}

export function flags_keepWith(f: $.VarRef<flags> | null, n: $.VarRef<number> | null): void {
	keptFlags = f
	n!.value++
}

export function ret(p: $.VarRef<number> | null): $.VarRef<number> | null {
	return p
}

export function through(p: $.VarRef<number> | null): $.VarRef<number> | null {
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
	flags__set($.transientFieldRef((s$ as state), "fl"), 3)
	await $.println(flags_has($.transientFieldRef((s$ as state), "fl"), 3), flags_has($.transientFieldRef((s$ as state), "fl"), 2))
	incTwice($.transientFieldRef((s$ as state), "n"))
	await $.println((s$ as state).n)
	atomic.StoreInt64($.fieldRef((s$ as state), "c"), 7n)
	await $.println(load($.transientFieldRef((s$ as state), "c")))

	// Comparing or keeping a pointer sees the field's own address.
	await $.println(same($.fieldRef((s$ as state), "n"), $.fieldRef((s$ as state), "n")), same($.fieldRef((s$ as state), "n"), $.fieldRef((s$ as state), "m")))
	keep($.fieldRef((s$ as state), "n"))
	inc($.transientFieldRef((s$ as state), "n"))
	await $.println($.pointerValue<number>(kept), $.pointerEqual(kept, $.fieldRef((s$ as state), "n")))
	await $.println($.pointerEqual(ret($.fieldRef((s$ as state), "n")), $.fieldRef((s$ as state), "n")), $.pointerEqual(through($.fieldRef((s$ as state), "m")), $.fieldRef((s$ as state), "m")))

	// A method expression takes its receiver as its first argument.
	flags_keepWith($.fieldRef((s$ as state), "fl"), $.fieldRef((s$ as state), "n"))
	await $.println($.pointerEqual(keptFlags, $.fieldRef((s$ as state), "fl")), (s$ as state).n)

	// A struct value's fields work the same.
	let v: state = new state(true)
	flags__set($.transientFieldRef(v, "fl"), 1)
	incTwice($.transientFieldRef(v, "m"))
	await $.println(flags_has($.transientFieldRef(v, "fl"), 1), flags_has($.transientFieldRef(v, "fl"), 3), v.m)
}

if ($.isMainScript(import.meta)) {
	await main()
}
