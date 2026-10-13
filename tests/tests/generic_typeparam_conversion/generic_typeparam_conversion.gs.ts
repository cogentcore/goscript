// Generated file based on generic_typeparam_conversion.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Signed = any

$.registerInterfaceType(
	"main.Signed",
	null,
	[]
);

export type Unsigned = any

$.registerInterfaceType(
	"main.Unsigned",
	null,
	[]
);

export type Integer = any

$.registerInterfaceType(
	"main.Integer",
	null,
	[]
);

export type Enum = {
	String(): string
}

$.registerInterfaceType(
	"main.Enum",
	null,
	[{ name: "String", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }]
);

export type EnumConstraint = {
	String(): string
}

$.registerInterfaceType(
	"main.EnumConstraint",
	null,
	[{ name: "String", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }]
);

export type Base = number

$.registerNamedValueType(
	"main.Base",
	{String: (receiver: any, ...args: any[]) => (Base_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]
);

$.registerNamedValueType(
	"*main.Base",
	{String: (receiver: any, ...args: any[]) => (Base_String as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]
);

export type Extended = number

$.registerNamedValueType(
	"main.Extended",
	{String: (receiver: any, ...args: any[]) => (Extended_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]
);

$.registerNamedValueType(
	"*main.Extended",
	{String: (receiver: any, ...args: any[]) => (Extended_String as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]
);

export type Wide = bigint

$.registerNamedValueType(
	"main.Wide",
	{String: (receiver: any, ...args: any[]) => (Wide_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]
);

$.registerNamedValueType(
	"*main.Wide",
	{String: (receiver: any, ...args: any[]) => (Wide_String as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]
);

export function Base_String(b: Base): string {
	return "base"
}

export function Extended_String(e: Extended): string {
	return "extended"
}

export function valuesExtended<T, E>(__typeArgs: $.GenericTypeArgs | undefined, values: $.Slice<T>, extended: $.Slice<E>): $.Slice<T> {
	let res: $.Slice<T> = $.makeSlice<T>($.len(extended), undefined, undefined, () => ($.genericZero(__typeArgs, "T", null) as T))
	for (let __goscriptRangeTarget0 = extended, i = 0; i < $.len(__goscriptRangeTarget0); i++) {
		let e = $.copyElement(__goscriptRangeTarget0![i])
		res![i] = $.genericConvert<T>(__typeArgs, "T", e)
	}
	res = $.appendSlice(res, values, $.appendZero(() => ($.genericZero(__typeArgs, "T", null) as T)))
	return res
}

export function Wide_String(w: Wide): string {
	return "wide"
}

export function toWide(__typeArgs: $.GenericTypeArgs | undefined, e: any): any {
	return $.genericConvert<any>(__typeArgs, "T", e)
}

export function fromConst(__typeArgs: $.GenericTypeArgs | undefined, i: number): [any, any] {
	return [$.genericConvert<any>(__typeArgs, "T", 7), $.genericConvert<any>(__typeArgs, "T", i)]
}

export async function main(): globalThis.Promise<void> {
	let res: $.Slice<Base> = (valuesExtended(__goscriptStatic0(), $.arrayToSlice<Base>([0, 1]), $.arrayToSlice<Extended>([2, 3, 4])) as $.Slice<Base>)
	for (let __goscriptRangeTarget1 = res, __rangeIndex = 0; __rangeIndex < $.len(__goscriptRangeTarget1); __rangeIndex++) {
		let v = $.int(__goscriptRangeTarget1![__rangeIndex], 32)
		await $.println($.int(v), Base_String(v))
	}
	let w = (toWide(__goscriptStatic1(), 5) as Wide)
	await $.println($.int64Mul($.int64(w), 2n), Wide_String(w))
	let __goscriptTuple0: any = fromConst(__goscriptStatic2(), 9)
	let a = (__goscriptTuple0[0] as Wide)
	let b = (__goscriptTuple0[1] as Wide)
	await $.println($.int64Add($.int64(a), $.int64(b)))
	let __goscriptTuple1: any = fromConst(__goscriptStatic3(), 300)
	let c = ($.uint(__goscriptTuple1[0], 8) as number)
	let d = ($.uint(__goscriptTuple1[1], 8) as number)
	await $.println($.uint(c, 8), $.uint(d, 8))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int32", "main.Base"), zero: () => 0, methods: {String: (receiver: any, ...args: any[]) => (Base_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))}, methodSignatures: [$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])] }, E: { type: /* @__PURE__ */ $.basicType("int32", "main.Extended"), zero: () => 0, methods: {String: (receiver: any, ...args: any[]) => (Extended_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))}, methodSignatures: [$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])] }})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int64", "main.Wide"), zero: () => 0n, methods: {String: (receiver: any, ...args: any[]) => (Wide_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))}, methodSignatures: [$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])] }, E: { type: /* @__PURE__ */ $.basicType("int32", "main.Extended"), zero: () => 0, methods: {String: (receiver: any, ...args: any[]) => (Extended_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))}, methodSignatures: [$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])] }})
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int64", "main.Wide"), zero: () => 0n, methods: {String: (receiver: any, ...args: any[]) => (Wide_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))}, methodSignatures: [$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])] }})
}

var __goscriptStatic3$value: any
function __goscriptStatic3(): any {
	return __goscriptStatic3$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("uint8"), zero: () => 0 }})
}

if ($.isMainScript(import.meta)) {
	await main()
}
