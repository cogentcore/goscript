// Generated file based on issue_120_generic_zero_value.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as strconv from "@goscript/strconv/index.js"

export type Stringer = {
	String(): string
}

$.registerInterfaceType(
	"main.Stringer",
	null,
	[{ name: "String", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }]
);

export type IntVal = number

$.registerNamedValueType(
	"main.IntVal",
	{String: (receiver: any, ...args: any[]) => (IntVal_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]
);

$.registerNamedValueType(
	"*main.IntVal",
	{String: (receiver: any, ...args: any[]) => (IntVal_String as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]
);

export type StringVal = string

$.registerNamedValueType(
	"main.StringVal",
	{String: (receiver: any, ...args: any[]) => (StringVal_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]
);

$.registerNamedValueType(
	"*main.StringVal",
	{String: (receiver: any, ...args: any[]) => (StringVal_String as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]
);

export type Pair = number[]

$.registerNamedType("main.Pair", /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int"), 2));

export function IntVal_String(i: IntVal): string {
	return strconv.Itoa(i)
}

export function StringVal_String(s: StringVal): string {
	return s
}

export function ZeroValue(__typeArgs: $.GenericTypeArgs | undefined): any {
	let zero: any = $.genericZero(__typeArgs, "T", null)
	return $.copyElement(zero)
}

export function ZeroArrayLiteral(__typeArgs: $.GenericTypeArgs | undefined): any {
	return $.genericZero(__typeArgs, "T", null)
}

export async function CallString(__typeArgs: $.GenericTypeArgs | undefined, v: any): globalThis.Promise<string> {
	return $.callGenericMethod(__typeArgs, "T", "String", v)
}

export function Sum<T>(__typeArgs: $.GenericTypeArgs | undefined, vals: $.Slice<T>): any {
	let sum: any = $.genericZero(__typeArgs, "T", null)
	// Note: We can't actually add T values in Go without more constraints
	// This just tests that sum has the right zero value and String() works
	return $.copyElement(sum)
}

export async function main(): globalThis.Promise<void> {
	// Test 1: Zero value of IntVal should be 0
	let zeroInt = (ZeroValue(__goscriptStatic0()) as IntVal)
	await $.println("ZeroValue[IntVal]:", IntVal_String(zeroInt))

	// Test 2: Zero value of StringVal should be ""
	let zeroStr = (ZeroValue(__goscriptStatic1()) as StringVal)
	await $.println("ZeroValue[StringVal] len:", $.stringLen(StringVal_String(zeroStr)))

	// Test 3: CallString on zero value
	await $.println("CallString on zero IntVal:", await CallString(__goscriptStatic0(), zeroInt))
	await $.println("CallString on zero StringVal len:", $.stringLen(await CallString(__goscriptStatic1(), zeroStr)))

	// Test 4: Sum returns zero value
	let sumInt = (Sum(__goscriptStatic0(), null) as IntVal)
	await $.println("Sum[IntVal]():", IntVal_String(sumInt))

	let sumStr = (Sum(__goscriptStatic1(), null) as StringVal)
	await $.println("Sum[StringVal]() len:", $.stringLen(StringVal_String(sumStr)))

	// Test 5: Verify the actual values
	await $.println("zeroInt == 0:", zeroInt == 0)
	await $.println("zeroStr == \"\":", $.stringEqual(zeroStr, ""))

	// Test 6: T{} returns the instantiated array zero value.
	let zeroPair = ($.cloneArrayValue(ZeroArrayLiteral(__goscriptStatic2()), "main.Pair") as Pair)
	await $.println("ZeroArrayLiteral[Pair] len:", 2)
	await $.println("ZeroArrayLiteral[Pair] zero:", ($.arrayIndex(zeroPair, 0) == 0) && ($.arrayIndex(zeroPair, 1) == 0))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int", "main.IntVal"), zero: () => 0, methods: {String: (receiver: any, ...args: any[]) => (IntVal_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))}, methodSignatures: [$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])] }})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("string", "main.StringVal"), zero: () => "", methods: {String: (receiver: any, ...args: any[]) => (StringVal_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))}, methodSignatures: [$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])] }})
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.Pair", zero: () => $.arrayValue(globalThis.Array.from({ length: 2 }, () => 0)) }})
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
