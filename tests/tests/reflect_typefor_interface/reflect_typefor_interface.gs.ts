// Generated file based on reflect_typefor_interface.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as fmt from "@goscript/fmt/index.js"

import * as io from "@goscript/io/index.js"

import * as reflect from "@goscript/reflect/index.js"
import "@goscript/fmt/index.js"
import "@goscript/io/index.js"
import "@goscript/reflect/index.js"

export type Stringy = string

$.registerNamedValueType(
	"main.Stringy",
	{String: (receiver: any, ...args: any[]) => (Stringy_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]
);

$.registerNamedValueType(
	"*main.Stringy",
	{String: (receiver: any, ...args: any[]) => (Stringy_String as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]
);

export type namer = {
	Name(): string
}

$.registerInterfaceType(
	"main.namer",
	null,
	[$.methodSignature("Name", [], [/* @__PURE__ */ $.basicType("string")])]
);

export class myErr {
	public _fields: {
	}

	constructor(init?: Partial<{}>) {
		this._fields = {
		}
	}

	public clone(): myErr {
		return $.markAsStructValue(new myErr(this))
	}

	public Error(): string {
		return "myErr"
	}

	static __typeInfo = $.registerStructType(
		"main.myErr",
		() => new myErr(),
		() => [$.methodSignature("Error", [], [/* @__PURE__ */ $.basicType("string")], true)],
		myErr,
		() => []
	)
}

export function Stringy_String(s: Stringy): string {
	return s
}

export async function main(): globalThis.Promise<void> {
	let errorType = reflect.TypeFor({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "error", zero: () => null, methods: {Error: (receiver: any, ...args: any[]) => receiver.Error(...$.stripGenericTypeArgs(args))} }})
	await $.println("error:", await $.pointerValue<Exclude<reflect.Type, null>>(errorType).Kind() == 20, await $.pointerValue<Exclude<reflect.Type, null>>(errorType).String(), await $.pointerValue<Exclude<reflect.Type, null>>(errorType).Name(), await $.pointerValue<Exclude<reflect.Type, null>>(errorType).PkgPath())
	await $.println("error implements:", await $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.interfaceValue(new myErr(), "*main.myErr", /* @__PURE__ */ $.pointerType("main.myErr")))).Implements($.pointerValueOrNil(errorType)!), await $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.basicInterfaceValue(1, "int"))).Implements($.pointerValueOrNil(errorType)!))

	let stringerType = reflect.TypeFor({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "fmt.Stringer", zero: () => null, methods: {String: (receiver: any, ...args: any[]) => receiver.String(...$.stripGenericTypeArgs(args))} }})
	await $.println("Stringer:", await $.pointerValue<Exclude<reflect.Type, null>>(stringerType).Kind() == 20, await $.pointerValue<Exclude<reflect.Type, null>>(stringerType).String(), await $.pointerValue<Exclude<reflect.Type, null>>(stringerType).Name(), await $.pointerValue<Exclude<reflect.Type, null>>(stringerType).PkgPath())
	await $.println("Stringer implements:", await $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.namedValueInterfaceValue<any>("s", "main.Stringy", {String: (receiver: any, ...args: any[]) => (Stringy_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))}, /* @__PURE__ */ $.basicType("string", "main.Stringy"), [$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]))).Implements($.pointerValueOrNil(stringerType)!), await $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf("s")).Implements($.pointerValueOrNil(stringerType)!))

	let readerType = reflect.TypeFor({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "io.Reader", zero: () => null, methods: {Read: (receiver: any, ...args: any[]) => receiver.Read(...$.stripGenericTypeArgs(args))} }})
	await $.println("Reader:", await $.pointerValue<Exclude<reflect.Type, null>>(readerType).Kind() == 20, await $.pointerValue<Exclude<reflect.Type, null>>(readerType).String())

	let namerType = reflect.TypeFor({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.namer", zero: () => null, methods: {Name: (receiver: any, ...args: any[]) => receiver.Name(...$.stripGenericTypeArgs(args))} }})
	await $.println("namer:", await $.pointerValue<Exclude<reflect.Type, null>>(namerType).Kind() == 20, await $.pointerValue<Exclude<reflect.Type, null>>(namerType).String(), await $.pointerValue<Exclude<reflect.Type, null>>(namerType).NumMethod())

	let anyType = reflect.TypeFor({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: { kind: $.TypeKind.Interface, methods: [] }, zero: () => null }})
	await $.println("any:", await $.pointerValue<Exclude<reflect.Type, null>>(anyType).String(), $.stringEqual(await $.pointerValue<Exclude<reflect.Type, null>>(anyType).Name(), ""), await $.pointerValue<Exclude<reflect.Type, null>>(anyType).Kind() == 20)

	let s: any = $.namedValueInterfaceValue<any>("q", "main.Stringy", {String: (receiver: any, ...args: any[]) => (Stringy_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))}, /* @__PURE__ */ $.basicType("string", "main.Stringy"), [$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])])
	let [, ok] = $.typeAssertTuple<fmt.Stringer | null>(s, "fmt.Stringer")
	await $.println("assert fmt.Stringer:", ok)
}

if ($.isMainScript(import.meta)) {
	await main()
}
