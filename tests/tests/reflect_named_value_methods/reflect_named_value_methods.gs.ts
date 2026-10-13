// Generated file based on reflect_named_value_methods.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as errors from "@goscript/errors/index.js"

import * as reflect from "@goscript/reflect/index.js"
import "@goscript/errors/index.js"
import "@goscript/reflect/index.js"

export type Fruits = number

$.registerNamedValueType(
	"main.Fruits",
	{String: (receiver: any, ...args: any[]) => (Fruits_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]
);

$.registerNamedValueType(
	"*main.Fruits",
	{SetString: (receiver: any, ...args: any[]) => (Fruits_SetString as any)(receiver, ...$.stripGenericTypeArgs(args)), String: (receiver: any, ...args: any[]) => (Fruits_String as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
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
	return $.arrayIndex($.arrayValue(["Apple", "Peach", "Strawberry"]), f)
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
	let ev = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.namedValueInterfaceValue<any>(fruit, "*main.Fruits", {SetString: (receiver: any, ...args: any[]) => (Fruits_SetString as any)(receiver, ...$.stripGenericTypeArgs(args)), String: (receiver: any, ...args: any[]) => (Fruits_String as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))}, /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int32", "main.Fruits")), [$.methodSignature("SetString", [["s", /* @__PURE__ */ $.basicType("string")]], ["error"]), $.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])])))).Elem()))
	let [st, ok] = $.typeAssertTuple<stringer | null>($.markAsStructValue($.cloneStructValue(ev)).Interface(), "main.stringer")
	await $.println(ok)
	if (ok) {
		await $.println(await $.pointerValue<Exclude<stringer, null>>(st).String())
	}
	let __goscriptTuple0: any = $.typeAssertTuple<setStringer | null>($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(ev)).Addr())).Interface(), "main.setStringer")
	let ss = __goscriptTuple0[0]
	ok = __goscriptTuple0[1]
	await $.println(ok)
	if (ok) {
		await $.println(await $.pointerValue<Exclude<setStringer, null>>(ss).SetString("Strawberry") == null, $.int(fruit.value, 32) == 2)
	}
	let __goscriptTuple1: any = $.typeAssertTuple<setStringer | null>($.markAsStructValue($.cloneStructValue(ev)).Interface(), "main.setStringer")
	ok = __goscriptTuple1[1]
	await $.println(ok)

	let nv = $.markAsStructValue($.cloneStructValue(reflect.New($.pointerValueOrNil(reflect.TypeFor({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int32", "main.Fruits"), zero: () => 0, methods: {String: (receiver: any, ...args: any[]) => (Fruits_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))}, methodSignatures: [$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])] }}))!)))
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(nv)).Elem())).SetInt(1n)
	{
		let [s, __goscriptShadow0] = $.typeAssertTuple<stringer | null>($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(nv)).Elem())).Interface(), "main.stringer")
		if (__goscriptShadow0) {
			await $.println(await $.pointerValue<Exclude<stringer, null>>(s).String())
		}
	}
}

if ($.isMainScript(import.meta)) {
	await main()
}
