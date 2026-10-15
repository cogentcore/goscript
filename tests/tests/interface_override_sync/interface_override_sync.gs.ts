// Generated file based on interface_override_sync.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as fmt from "@goscript/fmt/index.js"
import * as reflect from "@goscript/reflect/index.js"
import * as sort from "@goscript/sort/index.js"
import * as strconv from "@goscript/strconv/index.js"
import "@goscript/fmt/index.js"

export type Celsius = number

$.registerNamedValueType(
	"main.Celsius",
	{String: (receiver: any, ...args: any[]) => (Celsius_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]
);

$.registerNamedValueType(
	"*main.Celsius",
	{String: (receiver: any, ...args: any[]) => (Celsius_String as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]
);

export type Namer = {
	String(): string
}

$.registerInterfaceType(
	"main.Namer",
	null,
	[$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]
);

export type byLen = $.Slice<string>

$.registerNamedType("main.byLen", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string")));

$.registerNamedValueType(
	"main.byLen",
	{Len: (receiver: any, ...args: any[]) => (byLen_Len as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), Less: (receiver: any, ...args: any[]) => (byLen_Less as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), Swap: (receiver: any, ...args: any[]) => (byLen_Swap as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Len", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("Less", [["i", /* @__PURE__ */ $.basicType("int")], ["j", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Swap", [["i", /* @__PURE__ */ $.basicType("int")], ["j", /* @__PURE__ */ $.basicType("int")]])]
);

$.registerNamedValueType(
	"*main.byLen",
	{Len: (receiver: any, ...args: any[]) => (byLen_Len as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args)), Less: (receiver: any, ...args: any[]) => (byLen_Less as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args)), Swap: (receiver: any, ...args: any[]) => (byLen_Swap as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Len", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("Less", [["i", /* @__PURE__ */ $.basicType("int")], ["j", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Swap", [["i", /* @__PURE__ */ $.basicType("int")], ["j", /* @__PURE__ */ $.basicType("int")]])]
);

export function kindName(t: reflect.Type | null): string {
	if (((t !== null && (t as any).__isVarRef !== true && (t as any).__goValue === undefined ? (t as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(t)).Kind() as reflect.Kind) == 23) {
		return "slice of " + ($.pointerValue<Exclude<reflect.Type, null>>(((t !== null && (t as any).__isVarRef !== true && (t as any).__goValue === undefined ? (t as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(t)).Elem() as reflect.Type | null)).Name() as string)
	}
	return ((t !== null && (t as any).__isVarRef !== true && (t as any).__goValue === undefined ? (t as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(t)).Name() as string)
}

export function Celsius_String(c: Celsius): string {
	return strconv.FormatFloat(c, 102, 1, 64) + "C"
}

export function describeStringer(s: fmt.Stringer | null): string {
	return "[" + ((s !== null && (s as any).__isVarRef !== true && (s as any).__goValue === undefined ? (s as Exclude<fmt.Stringer, null>) : $.pointerValue<Exclude<fmt.Stringer, null>>(s)).String() as string) + "]"
}

export function describe(n: Namer | null): string {
	return "<" + (n !== null && (n as any).__isVarRef !== true && (n as any).__goValue === undefined ? (n as Exclude<Namer, null>) : $.pointerValue<Exclude<Namer, null>>(n)).String() + ">"
}

export function byLen_Len(s: byLen): number {
	return $.sliceLen((s as byLen))
}

export function byLen_Less(s: byLen, i: number, j: number): boolean {
	return $.stringLen($.arrayIndex(s!, i)) < $.stringLen($.arrayIndex(s!, j))
}

export function byLen_Swap(s: byLen, i: number, j: number): void {
	let __goscriptAssign0_0: string = $.arrayIndex(s!, j)
	let __goscriptAssign0_1: string = $.arrayIndex(s!, i)
	$.sliceElems(s!)[$.sliceSlot(s!, i)] = __goscriptAssign0_0
	$.sliceElems(s!)[$.sliceSlot(s!, j)] = __goscriptAssign0_1
}

export function firstShorter(data: sort.Interface | null): boolean {
	return (((data !== null && (data as any).__isVarRef !== true && (data as any).__goValue === undefined ? (data as Exclude<sort.Interface, null>) : $.pointerValue<Exclude<sort.Interface, null>>(data)).Len() as number) > 1) && ((data !== null && (data as any).__isVarRef !== true && (data as any).__goValue === undefined ? (data as Exclude<sort.Interface, null>) : $.pointerValue<Exclude<sort.Interface, null>>(data)).Less(0, 1) as boolean)
}

export async function main(): globalThis.Promise<void> {
	await $.println(kindName(reflect.TypeOf($.interfaceValue($.arrayToSlice<number>([]), "[]int", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"))))))
	await $.println(kindName(reflect.TypeOf($.namedValueInterfaceValue<any>(0, "main.Celsius", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()))))
	await $.println(describe($.namedValueInterfaceValue<Namer | null>(21.5, "main.Celsius", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2())))
	await $.println(describeStringer($.namedValueInterfaceValue<fmt.Stringer | null>(-3, "main.Celsius", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2())))
	let words = ($.arrayToSlice<string>(["ccc", "a", "bb"]) as byLen)
	await $.println(firstShorter($.namedValueInterfaceValue<sort.Interface | null>(words, "main.byLen", __goscriptStatic3(), __goscriptStatic4(), __goscriptStatic5())))
	await $.println(firstShorter(sort.Reverse($.pointerValueOrNil($.namedValueInterfaceValue<sort.Interface | null>(words, "main.byLen", __goscriptStatic3(), __goscriptStatic4(), __goscriptStatic5()))!)))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({String: (receiver: any, ...args: any[]) => (Celsius_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= (/* @__PURE__ */ $.basicType("float64", "main.Celsius"))
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ([$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])])
}

var __goscriptStatic3$value: any
function __goscriptStatic3(): any {
	return __goscriptStatic3$value ??= ({Len: (receiver: any, ...args: any[]) => (byLen_Len as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), Less: (receiver: any, ...args: any[]) => (byLen_Less as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), Swap: (receiver: any, ...args: any[]) => (byLen_Swap as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic4$value: any
function __goscriptStatic4(): any {
	return __goscriptStatic4$value ??= (/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string"), "main.byLen"))
}

var __goscriptStatic5$value: any
function __goscriptStatic5(): any {
	return __goscriptStatic5$value ??= ([$.methodSignature("Len", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("Less", [["i", /* @__PURE__ */ $.basicType("int")], ["j", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Swap", [["i", /* @__PURE__ */ $.basicType("int")], ["j", /* @__PURE__ */ $.basicType("int")]])])
}

if ($.isMainScript(import.meta)) {
	await main()
}
