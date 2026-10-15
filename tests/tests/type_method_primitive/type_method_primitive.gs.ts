// Generated file based on type_method_primitive.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type MyInt = number

$.registerNamedValueType(
	"main.MyInt",
	{Double: (receiver: any, ...args: any[]) => (MyInt_Double as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Double", [], [/* @__PURE__ */ $.basicType("int")])]
);

$.registerNamedValueType(
	"*main.MyInt",
	{Double: (receiver: any, ...args: any[]) => (MyInt_Double as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Double", [], [/* @__PURE__ */ $.basicType("int")])]
);

export type Doubler = {
	Double(): number
}

$.registerInterfaceType(
	"main.Doubler",
	null,
	[{ name: "Double", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }]
);

export type Stringer = {
	String(): string
}

$.registerInterfaceType(
	"main.Stringer",
	null,
	[{ name: "String", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }]
);

export type MyBool = boolean

$.registerNamedValueType(
	"*main.MyBool",
	{String: (receiver: any, ...args: any[]) => (MyBool_String as any)(receiver, ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]
);

export function MyInt_Double(m: MyInt): number {
	return $.int(m) * 2
}

export function MyBool_String(b: $.VarRef<MyBool> | null): string {
	if ($.pointerValue<MyBool>(b)) {
		return "true"
	}
	return "false"
}

export function asDoubler(v: MyInt): Doubler | null {
	return $.namedValueInterfaceValue<Doubler | null>(v, "main.MyInt", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2())
}

export function sumDoublers(vals: $.Slice<Doubler | null>): number {
	return $.pointerValue<Exclude<Doubler, null>>($.arrayIndex(vals!, 0)).Double() + $.pointerValue<Exclude<Doubler, null>>($.arrayIndex(vals!, 1)).Double()
}

export function assertDoubler(__typeArgs: $.GenericTypeArgs | undefined, v: Doubler | null): [any, boolean] {
	let [out, ok] = $.typeAssertTuple<any>(v, __typeArgs?.["T"]?.type ?? { kind: $.TypeKind.Interface, methods: [$.methodSignature("Double", [], [/* @__PURE__ */ $.basicType("int")])] })
	return [$.copyElement(out), ok]
}

export function assertStringer(__typeArgs: $.GenericTypeArgs | undefined, v: Stringer | null): [any, boolean] {
	let [out, ok] = $.typeAssertTuple<any>(v, __typeArgs?.["T"]?.type ?? { kind: $.TypeKind.Interface, methods: [$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])] })
	return [$.copyElement(out), ok]
}

export function newMyBool(value: boolean, target: $.VarRef<boolean> | null): $.VarRef<MyBool> | null {
	target!.value = value
	return target
}

export async function main(): globalThis.Promise<void> {
	// Test direct method call on type conversion
	let result = MyInt_Double(5)
	await $.println("Direct call:", result)

	// Test storing method reference (this is the failing case)
	let fn: (() => number | globalThis.Promise<number>) | null = $.functionValue(((__receiver) => () => MyInt_Double(__receiver))(10), ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo), "main.MyInt.Double-fm")
	await $.println("Method ref call:", (__goscriptAwait = fn!(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	let d: Doubler | null = $.namedValueInterfaceValue<Doubler | null>(12, "main.MyInt", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2())
	await $.println("Interface method call:", (__goscriptAwait = (d !== null && (d as any).__isVarRef !== true && (d as any).__goValue === undefined ? (d as Exclude<Doubler, null>) : $.pointerValue<Exclude<Doubler, null>>(d)).Double(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	let ret = asDoubler(13)
	await $.println("Returned interface call:", (__goscriptAwait = (ret !== null && (ret as any).__isVarRef !== true && (ret as any).__goValue === undefined ? (ret as Exclude<Doubler, null>) : $.pointerValue<Exclude<Doubler, null>>(ret)).Double(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	let [asserted, ok] = $.typeAssertTuple<MyInt>(ret, /* @__PURE__ */ $.basicType("int", "main.MyInt"))
	await $.println("Interface assertion:", $.int(asserted), ok)

	let vals: $.Slice<Doubler | null> = null! as $.Slice<Doubler | null>
	vals = $.append(vals, $.namedValueInterfaceValue<Doubler | null>(14, "main.MyInt", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()), $.namedValueInterfaceValue<Doubler | null>(15, "main.MyInt", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()), $.appendZeros.nil)
	await $.println("Interface slice append:", sumDoublers(vals))

	let __goscriptTuple0: any = assertDoubler(__goscriptStatic3(), ret)
	let genericAsserted = (__goscriptTuple0[0] as MyInt)
	let genericOK = __goscriptTuple0[1]
	await $.println("Generic interface assertion:", $.int(genericAsserted), genericOK)

	let flag = $.varRef(false)
	let stringer: Stringer | null = $.namedValueInterfaceValue<Stringer | null>(newMyBool(true, flag), "*main.MyBool", __goscriptStatic4(), __goscriptStatic5(), __goscriptStatic6())
	await $.println("Pointer primitive interface:", (__goscriptAwait = (stringer !== null && (stringer as any).__isVarRef !== true && (stringer as any).__goValue === undefined ? (stringer as Exclude<Stringer, null>) : $.pointerValue<Exclude<Stringer, null>>(stringer)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), flag.value)

	let __goscriptTuple1: any = assertStringer(__goscriptStatic7(), stringer)
	let genericPointer: $.VarRef<MyBool> | null = (__goscriptTuple1[0] as $.VarRef<MyBool> | null)
	let genericPointerOK = __goscriptTuple1[1]
	await $.println("Generic pointer interface assertion:", MyBool_String(genericPointer), genericPointerOK)
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({Double: (receiver: any, ...args: any[]) => (MyInt_Double as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= (/* @__PURE__ */ $.basicType("int", "main.MyInt"))
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ([$.methodSignature("Double", [], [/* @__PURE__ */ $.basicType("int")])])
}

var __goscriptStatic3$value: any
function __goscriptStatic3(): any {
	return __goscriptStatic3$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int", "main.MyInt"), zero: () => 0, methods: {Double: (receiver: any, ...args: any[]) => (MyInt_Double as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))}, methodSignatures: [$.methodSignature("Double", [], [/* @__PURE__ */ $.basicType("int")])] }})
}

var __goscriptStatic4$value: any
function __goscriptStatic4(): any {
	return __goscriptStatic4$value ??= ({String: (receiver: any, ...args: any[]) => (MyBool_String as any)(receiver, ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic5$value: any
function __goscriptStatic5(): any {
	return __goscriptStatic5$value ??= (/* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("bool", "main.MyBool")))
}

var __goscriptStatic6$value: any
function __goscriptStatic6(): any {
	return __goscriptStatic6$value ??= ([$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])])
}

var __goscriptStatic7$value: any
function __goscriptStatic7(): any {
	return __goscriptStatic7$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("bool", "main.MyBool")), zero: () => null, methods: {String: (receiver: any, ...args: any[]) => (MyBool_String as any)(receiver, ...$.stripGenericTypeArgs(args))}, methodSignatures: [$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])] }})
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
