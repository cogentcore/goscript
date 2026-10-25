// Generated file based on reflect_named_value_methods.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as errors from "@goscript/errors/index.js"
import * as reflect from "@goscript/reflect/index.js"

export type Fruits = number

$.registerNamedValueType(
	"main.Fruits",
	{String: (receiver: any) => (Fruits_String as any)(($.isVarRef(receiver) ? receiver.value : receiver))},
	[$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]
);

$.registerNamedValueType(
	"*main.Fruits",
	{SetString: (receiver: any, ...args: any[]) => (Fruits_SetString as any)(receiver, ...$.stripGenericTypeArgs(args)), String: (receiver: any) => (Fruits_String as any)($.pointerValue(receiver))},
	[$.methodSignature("SetString", [["s", /* @__PURE__ */ $.basicType("string")]], ["error"]), $.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]
);

export type stringer = {
	String(): string
}

$.registerInterfaceType(
	"main.stringer",
	null,
	[$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]
);

export type setStringer = {
	SetString(s: string): $.GoError
}

$.registerInterfaceType(
	"main.setStringer",
	null,
	[$.methodSignature("SetString", [["s", /* @__PURE__ */ $.basicType("string")]], ["error"])]
);

export const Apple: Fruits = 0

export const Peach: Fruits = 1

export const Strawberry: Fruits = 2

export function Fruits_String(f: Fruits): string {
	return ($.arrayValue(["Apple", "Peach", "Strawberry"]))[$.checkArrayIndex(f, 3)]
}

export function Fruits_SetString(f: $.VarRef<Fruits> | null, s: string): $.GoError {
	if (!$.stringEqual(s, "Strawberry")) {
		return errors.New("bad fruit " + s)
	}
	f!.value = 2
	return null
}

export async function main(): globalThis.Promise<void> {
	// Values of a named basic type made by reflect keep their methods.
	let fruit = $.varRef(1)
	let ev = reflect.ValueOf($.namedValueInterfaceValue<any>(fruit, "*main.Fruits", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2())).Elem()
	let [st, ok] = $.typeAssertTuple<stringer | null>(ev.Interface(), "main.stringer")
	await $.println(ok)
	if (ok) {
		await $.println((__goscriptAwait = (st !== null && (st as any).__isVarRef !== true && ((st as any).__goValue === undefined || (st as any).__goType?.charCodeAt(0) !== 42) ? (st as Exclude<stringer, null>) : $.pointerValue<Exclude<stringer, null>>(st)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	}
	let __goscriptTuple0: any = $.typeAssertTuple<setStringer | null>(ev.Addr().Interface(), "main.setStringer")
	let ss: setStringer | null = __goscriptTuple0[0]
	ok = __goscriptTuple0[1]
	await $.println(ok)
	if (ok) {
		await $.println((__goscriptAwait = (ss !== null && (ss as any).__isVarRef !== true && ((ss as any).__goValue === undefined || (ss as any).__goType?.charCodeAt(0) !== 42) ? (ss as Exclude<setStringer, null>) : $.pointerValue<Exclude<setStringer, null>>(ss)).SetString("Strawberry"), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) == null, fruit.value == 2)
	}
	let __goscriptTuple1: any = $.typeAssertTuple<setStringer | null>(ev.Interface(), "main.setStringer")
	ok = __goscriptTuple1[1]
	await $.println(ok)

	let nv = reflect.New($.pointerValueOrNil(reflect.TypeFor(__goscriptStatic3()))!)
	nv.Elem().SetInt(1n)
	{
		let [s, __goscriptShadow0] = $.typeAssertTuple<stringer | null>(nv.Elem().Interface(), "main.stringer")
		if (__goscriptShadow0) {
			await $.println((__goscriptAwait = (s !== null && (s as any).__isVarRef !== true && ((s as any).__goValue === undefined || (s as any).__goType?.charCodeAt(0) !== 42) ? (s as Exclude<stringer, null>) : $.pointerValue<Exclude<stringer, null>>(s)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		}
	}
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({SetString: (receiver: any, ...args: any[]) => (Fruits_SetString as any)(receiver, ...$.stripGenericTypeArgs(args)), String: (receiver: any) => (Fruits_String as any)($.pointerValue(receiver))})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= (/* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int32", "main.Fruits")))
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ([$.methodSignature("SetString", [["s", /* @__PURE__ */ $.basicType("string")]], ["error"]), $.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])])
}

var __goscriptStatic3$value: any
function __goscriptStatic3(): any {
	return __goscriptStatic3$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int32", "main.Fruits"), zero: () => 0, methods: {String: (receiver: any) => (Fruits_String as any)(($.isVarRef(receiver) ? receiver.value : receiver))}, methodSignatures: [$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])] }})
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
