// Generated file based on named_non_struct_interface_assertions.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type adder = {
	Add(_p0: number): number | globalThis.Promise<number>
}

$.registerInterfaceType(
	"main.adder",
	null,
	[{ name: "Add", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }]
);

export type namedSlice = $.Slice<number>

$.registerNamedType("main.namedSlice", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")));

$.registerNamedValueType(
	"main.namedSlice",
	{Add: (receiver: any, ...args: any[]) => (namedSlice_Add as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Add", [["n", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("int")])]
);

$.registerNamedValueType(
	"*main.namedSlice",
	{Add: (receiver: any, ...args: any[]) => (namedSlice_Add as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Add", [["n", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("int")])]
);

export type namedMap = globalThis.Map<string, number> | null

$.registerNamedType("main.namedMap", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int")));

$.registerNamedValueType(
	"main.namedMap",
	{Add: (receiver: any, ...args: any[]) => (namedMap_Add as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Add", [["n", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("int")])]
);

$.registerNamedValueType(
	"*main.namedMap",
	{Add: (receiver: any, ...args: any[]) => (namedMap_Add as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Add", [["n", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("int")])]
);

export type namedArray = number[]

$.registerNamedType("main.namedArray", /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int"), 2));

$.registerNamedValueType(
	"main.namedArray",
	{Add: (receiver: any, ...args: any[]) => (namedArray_Add as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Add", [["n", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("int")])]
);

$.registerNamedValueType(
	"*main.namedArray",
	{Add: (receiver: any, ...args: any[]) => (namedArray_Add as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Add", [["n", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("int")])]
);

export type namedInt = number

$.registerNamedValueType(
	"main.namedInt",
	{Add: (receiver: any, ...args: any[]) => (namedInt_Add as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Add", [["n", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("int")])]
);

$.registerNamedValueType(
	"*main.namedInt",
	{Add: (receiver: any, ...args: any[]) => (namedInt_Add as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Add", [["n", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("int")])]
);

export type namedFunc = (() => number | globalThis.Promise<number>) | null

$.registerNamedValueType(
	"main.namedFunc",
	{Add: (receiver: any, ...args: any[]) => (namedFunc_Add as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Add", [["n", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("int")])]
);

$.registerNamedValueType(
	"*main.namedFunc",
	{Add: (receiver: any, ...args: any[]) => (namedFunc_Add as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Add", [["n", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("int")])]
);

export type namedChan = $.Channel<number> | null

$.registerNamedValueType(
	"main.namedChan",
	{Add: (receiver: any, ...args: any[]) => (namedChan_Add as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Add", [["n", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("int")])]
);

$.registerNamedValueType(
	"*main.namedChan",
	{Add: (receiver: any, ...args: any[]) => (namedChan_Add as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Add", [["n", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("int")])]
);

export type pointerSlice = $.Slice<number>

$.registerNamedType("main.pointerSlice", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")));

$.registerNamedValueType(
	"*main.pointerSlice",
	{Add: (receiver: any, ...args: any[]) => (pointerSlice_Add as any)(receiver, ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Add", [["n", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("int")])]
);

export type pointerMap = globalThis.Map<string, number> | null

$.registerNamedType("main.pointerMap", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int")));

$.registerNamedValueType(
	"*main.pointerMap",
	{Add: (receiver: any, ...args: any[]) => (pointerMap_Add as any)(receiver, ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Add", [["n", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("int")])]
);

export function namedSlice_Add(v: namedSlice, n: number): number {
	return $.sliceLen((v as namedSlice)) + n
}

export function namedMap_Add(v: namedMap, n: number): number {
	return $.len(v) + n
}

export function namedArray_Add(v: namedArray, n: number): number {
	return $.len(v) + n
}

export function namedInt_Add(v: namedInt, n: number): number {
	return $.int(v) + n
}

export async function namedFunc_Add(v: namedFunc | null, n: number): globalThis.Promise<number> {
	return (__goscriptAwait = v!(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) + n
}

export function namedChan_Add(v: namedChan, n: number): number {
	return $.cap(v) + n
}

export function pointerSlice_Add(v: $.VarRef<pointerSlice> | null, n: number): number {
	return $.sliceLen(($.pointerValue<pointerSlice>(v) as pointerSlice)) + n
}

export function pointerMap_Add(v: $.VarRef<pointerMap> | null, n: number): number {
	return $.len($.pointerValue<pointerMap>(v)) + n
}

export async function check(value: any): globalThis.Promise<void> {
	let __goscriptTuple0: any = $.typeAssertTuple<adder | null>(value, "main.adder")
	let __goscriptShadow0 = __goscriptTuple0[0]
	let ok = __goscriptTuple0[1]
	if (!ok) {
		await $.println(false)
		return
	}
	await $.println(ok, (__goscriptAwait = (__goscriptShadow0 !== null && (__goscriptShadow0 as any).__isVarRef !== true && (__goscriptShadow0 as any).__goValue === undefined ? (__goscriptShadow0 as Exclude<adder, null>) : $.pointerValue<Exclude<adder, null>>(__goscriptShadow0)).Add(3), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

export async function main(): globalThis.Promise<void> {
	await check($.namedValueInterfaceValue<any>($.arrayToSlice<number>([1, 2]), "main.namedSlice", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()))
	await check($.namedValueInterfaceValue<any>($.makeMap<string, number>([["one", 1], ["two", 2]]), "main.namedMap", __goscriptStatic3(), __goscriptStatic4(), __goscriptStatic2()))
	await check($.namedValueInterfaceValue<any>($.arrayValue([1, 2]), "main.namedArray", __goscriptStatic5(), __goscriptStatic6(), __goscriptStatic2()))
	await check($.namedValueInterfaceValue<any>(4, "main.namedInt", __goscriptStatic7(), __goscriptStatic8(), __goscriptStatic2()))
	await check($.namedValueInterfaceValue<any>($.namedFunction($.functionValue((): number => {
		return 2
	}, ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo)), "main.namedFunc", ({ kind: $.TypeKind.Function, name: "main.namedFunc", params: [], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo)), "main.namedFunc", __goscriptStatic9(), __goscriptStatic10(), __goscriptStatic2()))
	await check($.namedValueInterfaceValue<any>($.makeChannel<number>(2, 0, "both"), "main.namedChan", __goscriptStatic11(), __goscriptStatic12(), __goscriptStatic2()))
	let value: $.VarRef<pointerSlice> = $.varRef(($.arrayToSlice<number>([1, 2]) as pointerSlice))
	await check($.namedValueInterfaceValue<any>(value, "*main.pointerSlice", __goscriptStatic13(), __goscriptStatic14(), __goscriptStatic2()))
	let mapped: $.VarRef<pointerMap> = $.varRef($.makeMap<string, number>([["one", 1], ["two", 2]]))
	await check($.namedValueInterfaceValue<any>(mapped, "*main.pointerMap", __goscriptStatic15(), __goscriptStatic16(), __goscriptStatic2()))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({Add: (receiver: any, ...args: any[]) => (namedSlice_Add as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= (/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"), "main.namedSlice"))
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ([$.methodSignature("Add", [["n", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("int")])])
}

var __goscriptStatic3$value: any
function __goscriptStatic3(): any {
	return __goscriptStatic3$value ??= ({Add: (receiver: any, ...args: any[]) => (namedMap_Add as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic4$value: any
function __goscriptStatic4(): any {
	return __goscriptStatic4$value ??= ("main.namedMap")
}

var __goscriptStatic5$value: any
function __goscriptStatic5(): any {
	return __goscriptStatic5$value ??= ({Add: (receiver: any, ...args: any[]) => (namedArray_Add as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic6$value: any
function __goscriptStatic6(): any {
	return __goscriptStatic6$value ??= ("main.namedArray")
}

var __goscriptStatic7$value: any
function __goscriptStatic7(): any {
	return __goscriptStatic7$value ??= ({Add: (receiver: any, ...args: any[]) => (namedInt_Add as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic8$value: any
function __goscriptStatic8(): any {
	return __goscriptStatic8$value ??= (/* @__PURE__ */ $.basicType("int", "main.namedInt"))
}

var __goscriptStatic9$value: any
function __goscriptStatic9(): any {
	return __goscriptStatic9$value ??= ({Add: (receiver: any, ...args: any[]) => (namedFunc_Add as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic10$value: any
function __goscriptStatic10(): any {
	return __goscriptStatic10$value ??= (({ kind: $.TypeKind.Function, name: "main.namedFunc", params: [], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))
}

var __goscriptStatic11$value: any
function __goscriptStatic11(): any {
	return __goscriptStatic11$value ??= ({Add: (receiver: any, ...args: any[]) => (namedChan_Add as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic12$value: any
function __goscriptStatic12(): any {
	return __goscriptStatic12$value ??= ("main.namedChan")
}

var __goscriptStatic13$value: any
function __goscriptStatic13(): any {
	return __goscriptStatic13$value ??= ({Add: (receiver: any, ...args: any[]) => (pointerSlice_Add as any)(receiver, ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic14$value: any
function __goscriptStatic14(): any {
	return __goscriptStatic14$value ??= (/* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"), "main.pointerSlice")))
}

var __goscriptStatic15$value: any
function __goscriptStatic15(): any {
	return __goscriptStatic15$value ??= ({Add: (receiver: any, ...args: any[]) => (pointerMap_Add as any)(receiver, ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic16$value: any
function __goscriptStatic16(): any {
	return __goscriptStatic16$value ??= (/* @__PURE__ */ $.pointerType("main.pointerMap"))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
