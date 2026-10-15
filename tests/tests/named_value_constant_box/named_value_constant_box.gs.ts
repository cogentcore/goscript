// Generated file based on named_value_constant_box.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Flag = bigint

$.registerNamedValueType(
	"main.Flag",
	{Int64: (receiver: any) => (Flag_Int64 as any)(($.isVarRef(receiver) ? receiver.value : receiver)), Plus: (receiver: any, ...args: any[]) => (Flag_Plus as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Int64", [], [/* @__PURE__ */ $.basicType("int64")]), $.methodSignature("Plus", [["n", /* @__PURE__ */ $.basicType("int64")]], [/* @__PURE__ */ $.basicType("int64")])]
);

$.registerNamedValueType(
	"*main.Flag",
	{Int64: (receiver: any) => (Flag_Int64 as any)($.pointerValue(receiver)), Plus: (receiver: any, ...args: any[]) => (Flag_Plus as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Int64", [], [/* @__PURE__ */ $.basicType("int64")]), $.methodSignature("Plus", [["n", /* @__PURE__ */ $.basicType("int64")]], [/* @__PURE__ */ $.basicType("int64")])]
);

export type Kind = bigint

$.registerNamedValueType(
	"main.Kind",
	{Name: (receiver: any) => (Kind_Name as any)(($.isVarRef(receiver) ? receiver.value : receiver))},
	[$.methodSignature("Name", [], [/* @__PURE__ */ $.basicType("string")])]
);

$.registerNamedValueType(
	"*main.Kind",
	{Name: (receiver: any) => (Kind_Name as any)($.pointerValue(receiver))},
	[$.methodSignature("Name", [], [/* @__PURE__ */ $.basicType("string")])]
);

export type Name = string

$.registerNamedValueType(
	"main.Name",
	{Upper: (receiver: any) => (Name_Upper as any)(($.isVarRef(receiver) ? receiver.value : receiver))},
	[$.methodSignature("Upper", [], [/* @__PURE__ */ $.basicType("string")])]
);

$.registerNamedValueType(
	"*main.Name",
	{Upper: (receiver: any) => (Name_Upper as any)($.pointerValue(receiver))},
	[$.methodSignature("Upper", [], [/* @__PURE__ */ $.basicType("string")])]
);

export type Inter = {
	Int64(): bigint
	Plus(n: bigint): bigint
}

$.registerInterfaceType(
	"main.Inter",
	null,
	[{ name: "Int64", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int64") }] }, { name: "Plus", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int64") }] }]
);

export type Namer = {
	Upper(): string
}

$.registerInterfaceType(
	"main.Namer",
	null,
	[{ name: "Upper", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }]
);

export const FlagA: Flag = 0n

export const FlagB: Flag = 1n

export const FlagC: Flag = 2n

export function Flag_Int64(f: Flag): bigint {
	return f
}

export function Flag_Plus(f: Flag, n: bigint): bigint {
	return $.int64Add(f, n)
}

export function Kind_Name(k: Kind): string {
	return "kind"
}

export function Name_Upper(n: Name): string {
	return n + "!"
}

export function has(bits: $.VarRef<bigint> | null, f: Inter | null): boolean {
	return ($.int64And($.pointerValue<bigint>(bits), ($.int64Shl(1n, $.uint((f !== null && (f as any).__isVarRef !== true && (f as any).__goValue === undefined ? (f as Exclude<Inter, null>) : $.pointerValue<Exclude<Inter, null>>(f)).Int64(), 32))))) != 0n
}

export async function main(): globalThis.Promise<void> {
	// Constant flags boxed in a loop share their boxes but keep their values.
	let bits = $.varRef(2n)
	let n = 0
	for (let i = 0; i < 3; i++) {
		if (has(bits, __goscriptStatic3())) {
			n++
		}
		if (has(bits, __goscriptStatic4())) {
			n += 10
		}
	}
	await $.println("count", n)

	// Boxes of equal constants are equal, and of different constants not.
	let x: Inter | null = __goscriptStatic5()
	let y: Inter | null = __goscriptStatic5()
	let z: Inter | null = __goscriptStatic4()
	await $.println("equal", $.comparableEqual(x, y), $.comparableEqual(x, z))

	// Methods with and without arguments are called through the box.
	await $.println("methods", (__goscriptAwait = (z !== null && (z as any).__isVarRef !== true && (z as any).__goValue === undefined ? (z as Exclude<Inter, null>) : $.pointerValue<Exclude<Inter, null>>(z)).Int64(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = (z !== null && (z as any).__isVarRef !== true && (z as any).__goValue === undefined ? (z as Exclude<Inter, null>) : $.pointerValue<Exclude<Inter, null>>(z)).Plus(5n), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = (x !== null && (x as any).__isVarRef !== true && (x as any).__goValue === undefined ? (x as Exclude<Inter, null>) : $.pointerValue<Exclude<Inter, null>>(x)).Plus(-1n), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	// A boxed variable is not shared with a later value of the variable.
	let v = 1n
	let w: Inter | null = $.namedValueInterfaceValue<Inter | null>(v, "main.Flag", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2())
	v = 2n
	await $.println("variable", (__goscriptAwait = (w !== null && (w as any).__isVarRef !== true && (w as any).__goValue === undefined ? (w as Exclude<Inter, null>) : $.pointerValue<Exclude<Inter, null>>(w)).Int64(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), v)

	// Type switches see the dynamic type of a boxed constant.
	{
		const __goscriptTypeSwitchValue = z
		switch (true) {
			case $.typeAssert<Flag>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("int64", "main.Flag")).ok:
				{
					let t: Flag = $.typeAssert<Flag>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("int64", "main.Flag")).value
					await $.println("switch", t)
				}
				break
		}
	}

	// Strings and unsigned 64-bit values box the same way.
	let s: Namer | null = __goscriptStatic9()
	await $.println("string", (__goscriptAwait = (s !== null && (s as any).__isVarRef !== true && (s as any).__goValue === undefined ? (s as Exclude<Namer, null>) : $.pointerValue<Exclude<Namer, null>>(s)).Upper(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), $.comparableEqual(s, __goscriptStatic9()))

	// 64-bit conversions between named and basic types keep the value.
	let k = 9223372036854775813n
	let u = k
	let p = $.uint(u, 64)
	let i = -7n
	await $.println("convert", u, $.uint64(p) == u, i, Flag_Int64(i), Kind_Name(k))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({Int64: (receiver: any) => (Flag_Int64 as any)(($.isVarRef(receiver) ? receiver.value : receiver)), Plus: (receiver: any, ...args: any[]) => (Flag_Plus as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= (/* @__PURE__ */ $.basicType("int64", "main.Flag"))
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ([$.methodSignature("Int64", [], [/* @__PURE__ */ $.basicType("int64")]), $.methodSignature("Plus", [["n", /* @__PURE__ */ $.basicType("int64")]], [/* @__PURE__ */ $.basicType("int64")])])
}

var __goscriptStatic3$value: any
function __goscriptStatic3(): any {
	return __goscriptStatic3$value ??= ($.namedValueInterfaceValue<Inter | null>(1n, "main.Flag", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()))
}

var __goscriptStatic4$value: any
function __goscriptStatic4(): any {
	return __goscriptStatic4$value ??= ($.namedValueInterfaceValue<Inter | null>(2n, "main.Flag", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()))
}

var __goscriptStatic5$value: any
function __goscriptStatic5(): any {
	return __goscriptStatic5$value ??= ($.namedValueInterfaceValue<Inter | null>(0n, "main.Flag", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()))
}

var __goscriptStatic6$value: any
function __goscriptStatic6(): any {
	return __goscriptStatic6$value ??= ({Upper: (receiver: any) => (Name_Upper as any)(($.isVarRef(receiver) ? receiver.value : receiver))})
}

var __goscriptStatic7$value: any
function __goscriptStatic7(): any {
	return __goscriptStatic7$value ??= (/* @__PURE__ */ $.basicType("string", "main.Name"))
}

var __goscriptStatic8$value: any
function __goscriptStatic8(): any {
	return __goscriptStatic8$value ??= ([$.methodSignature("Upper", [], [/* @__PURE__ */ $.basicType("string")])])
}

var __goscriptStatic9$value: any
function __goscriptStatic9(): any {
	return __goscriptStatic9$value ??= ($.namedValueInterfaceValue<Namer | null>("go", "main.Name", __goscriptStatic6(), __goscriptStatic7(), __goscriptStatic8()))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
