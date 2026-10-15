// Generated file based on reflect_typefor.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as fmt from "@goscript/fmt/index.js"
import * as io from "@goscript/io/index.js"
import * as reflect from "@goscript/reflect/index.js"
import * as time from "@goscript/time/index.js"
import * as __goscript_other from "./other.gs.ts"
import "@goscript/fmt/index.js"
import "@goscript/io/index.js"

export type MyInterface = {
	SomeMethod(): void
}

$.registerInterfaceType(
	"main.MyInterface",
	null,
	[$.methodSignature("SomeMethod")]
);

export type Stringy = string

$.registerNamedValueType(
	"main.Stringy",
	{String: (receiver: any) => (Stringy_String as any)(($.isVarRef(receiver) ? receiver.value : receiver))},
	[$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]
);

$.registerNamedValueType(
	"*main.Stringy",
	{String: (receiver: any) => (Stringy_String as any)($.pointerValue(receiver))},
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

export class MyStruct {
	public declare Name: string

	public declare Age: number

	constructor(init?: Partial<{Name?: string, Age?: number}>, __goscriptValue?: boolean) {
		this.Name = init?.Name ?? ("" as string)
		this.Age = init?.Age ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): MyStruct {
		return new MyStruct(this, true)
	}

	public __goscriptAssign(source: MyStruct): this {
		this.Name = source.Name
		this.Age = source.Age
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.MyStruct",
		() => new MyStruct(),
		() => [],
		MyStruct,
		() => [/* @__PURE__ */ $.structField("Name", /* @__PURE__ */ $.basicType("string"), [0], 0, true), /* @__PURE__ */ $.structField("Age", /* @__PURE__ */ $.basicType("int"), [1], 16, true)]
	)
}

export class myErr {
	constructor(init?: Partial<{}>, __goscriptValue?: boolean) {
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): myErr {
		return new myErr(this, true)
	}

	public __goscriptAssign(source: myErr): this {
		return this
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
	// Test TypeFor with named interface type
	let t1 = reflect.TypeFor(__goscriptStatic0())
	await $.println("TypeFor interface:", (__goscriptAwait = (t1 !== null && (t1 as any).__isVarRef !== true && ((t1 as any).__goValue === undefined || (t1 as any).__goType?.charCodeAt(0) !== 42) ? (t1 as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(t1)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	// Test TypeFor with struct type
	let t2 = reflect.TypeFor(__goscriptStatic1())
	await $.println("TypeFor struct:", (__goscriptAwait = (t2 !== null && (t2 as any).__isVarRef !== true && ((t2 as any).__goValue === undefined || (t2 as any).__goType?.charCodeAt(0) !== 42) ? (t2 as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(t2)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println("TypeFor struct kind:", (__goscriptAwait = (t2 !== null && (t2 as any).__isVarRef !== true && ((t2 as any).__goValue === undefined || (t2 as any).__goType?.charCodeAt(0) !== 42) ? (t2 as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(t2)).Kind(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) == 25)

	// Test TypeFor with int type
	let t3 = reflect.TypeFor(__goscriptStatic2())
	await $.println("TypeFor int:", (__goscriptAwait = (t3 !== null && (t3 as any).__isVarRef !== true && ((t3 as any).__goValue === undefined || (t3 as any).__goType?.charCodeAt(0) !== 42) ? (t3 as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(t3)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println("TypeFor int kind:", (__goscriptAwait = (t3 !== null && (t3 as any).__isVarRef !== true && ((t3 as any).__goValue === undefined || (t3 as any).__goType?.charCodeAt(0) !== 42) ? (t3 as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(t3)).Kind(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) == 2)

	// Test TypeFor with imported and cross-file named struct types
	let t4 = reflect.TypeFor(__goscriptStatic3())
	await $.println("TypeFor imported struct:", (__goscriptAwait = (t4 !== null && (t4 as any).__isVarRef !== true && ((t4 as any).__goValue === undefined || (t4 as any).__goType?.charCodeAt(0) !== 42) ? (t4 as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(t4)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	let t5 = reflect.TypeFor(__goscriptStatic4())
	await $.println("TypeFor cross-file struct:", (__goscriptAwait = (t5 !== null && (t5 as any).__isVarRef !== true && ((t5 as any).__goValue === undefined || (t5 as any).__goType?.charCodeAt(0) !== 42) ? (t5 as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(t5)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	// Test Pointer constant (should be same as Ptr)
	await $.println("Pointer constant:", (22 as number) == 22)

	// Test TypeFor with named interface types and Implements
	let errorType = reflect.TypeFor(__goscriptStatic5())
	await $.println("error:", (__goscriptAwait = (errorType !== null && (errorType as any).__isVarRef !== true && ((errorType as any).__goValue === undefined || (errorType as any).__goType?.charCodeAt(0) !== 42) ? (errorType as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(errorType)).Kind(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) == 20, (__goscriptAwait = (errorType !== null && (errorType as any).__isVarRef !== true && ((errorType as any).__goValue === undefined || (errorType as any).__goType?.charCodeAt(0) !== 42) ? (errorType as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(errorType)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = (errorType !== null && (errorType as any).__isVarRef !== true && ((errorType as any).__goValue === undefined || (errorType as any).__goType?.charCodeAt(0) !== 42) ? (errorType as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(errorType)).Name(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = (errorType !== null && (errorType as any).__isVarRef !== true && ((errorType as any).__goValue === undefined || (errorType as any).__goType?.charCodeAt(0) !== 42) ? (errorType as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(errorType)).PkgPath(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println("error implements:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.interfaceValue(new myErr(), "*main.myErr", /* @__PURE__ */ $.pointerType("main.myErr")))).Implements($.pointerValueOrNil(errorType)!), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.basicInterfaceValue(1, "int"))).Implements($.pointerValueOrNil(errorType)!), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	let stringerType = reflect.TypeFor(__goscriptStatic6())
	await $.println("Stringer:", (__goscriptAwait = (stringerType !== null && (stringerType as any).__isVarRef !== true && ((stringerType as any).__goValue === undefined || (stringerType as any).__goType?.charCodeAt(0) !== 42) ? (stringerType as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(stringerType)).Kind(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) == 20, (__goscriptAwait = (stringerType !== null && (stringerType as any).__isVarRef !== true && ((stringerType as any).__goValue === undefined || (stringerType as any).__goType?.charCodeAt(0) !== 42) ? (stringerType as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(stringerType)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = (stringerType !== null && (stringerType as any).__isVarRef !== true && ((stringerType as any).__goValue === undefined || (stringerType as any).__goType?.charCodeAt(0) !== 42) ? (stringerType as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(stringerType)).Name(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = (stringerType !== null && (stringerType as any).__isVarRef !== true && ((stringerType as any).__goValue === undefined || (stringerType as any).__goType?.charCodeAt(0) !== 42) ? (stringerType as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(stringerType)).PkgPath(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println("Stringer implements:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf(__goscriptStatic10())).Implements($.pointerValueOrNil(stringerType)!), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf("s")).Implements($.pointerValueOrNil(stringerType)!), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	let readerType = reflect.TypeFor(__goscriptStatic11())
	await $.println("Reader:", (__goscriptAwait = (readerType !== null && (readerType as any).__isVarRef !== true && ((readerType as any).__goValue === undefined || (readerType as any).__goType?.charCodeAt(0) !== 42) ? (readerType as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(readerType)).Kind(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) == 20, (__goscriptAwait = (readerType !== null && (readerType as any).__isVarRef !== true && ((readerType as any).__goValue === undefined || (readerType as any).__goType?.charCodeAt(0) !== 42) ? (readerType as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(readerType)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	let namerType = reflect.TypeFor(__goscriptStatic12())
	await $.println("namer:", (__goscriptAwait = (namerType !== null && (namerType as any).__isVarRef !== true && ((namerType as any).__goValue === undefined || (namerType as any).__goType?.charCodeAt(0) !== 42) ? (namerType as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(namerType)).Kind(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) == 20, (__goscriptAwait = (namerType !== null && (namerType as any).__isVarRef !== true && ((namerType as any).__goValue === undefined || (namerType as any).__goType?.charCodeAt(0) !== 42) ? (namerType as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(namerType)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = (namerType !== null && (namerType as any).__isVarRef !== true && ((namerType as any).__goValue === undefined || (namerType as any).__goType?.charCodeAt(0) !== 42) ? (namerType as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(namerType)).NumMethod(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	let anyType = reflect.TypeFor(__goscriptStatic13())
	await $.println("any:", (__goscriptAwait = (anyType !== null && (anyType as any).__isVarRef !== true && ((anyType as any).__goValue === undefined || (anyType as any).__goType?.charCodeAt(0) !== 42) ? (anyType as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(anyType)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), $.stringEqual((__goscriptAwait = (anyType !== null && (anyType as any).__isVarRef !== true && ((anyType as any).__goValue === undefined || (anyType as any).__goType?.charCodeAt(0) !== 42) ? (anyType as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(anyType)).Name(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), ""), (__goscriptAwait = (anyType !== null && (anyType as any).__isVarRef !== true && ((anyType as any).__goValue === undefined || (anyType as any).__goType?.charCodeAt(0) !== 42) ? (anyType as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(anyType)).Kind(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) == 20)

	let s: any = __goscriptStatic14()
	let [, ok] = $.typeAssertTuple<fmt.Stringer | null>(s, "fmt.Stringer")
	await $.println("assert fmt.Stringer:", ok)

	await genericComposites()

	await $.println("reflect_typefor test finished")
}

export async function describe<E>(__typeArgs: $.GenericTypeArgs | undefined, s: $.Slice<E>): globalThis.Promise<void> {
	let v = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.genericInterfaceValue(s, "[]E", /* @__PURE__ */ $.sliceType(__typeArgs?.["E"]?.type ?? { kind: $.TypeKind.Interface, methods: [] })))))
	await $.println("type:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(v)).Type()).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), "elem kind:", reflect.Kind_String((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(v)).Type()).Elem(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)).Kind(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)), "len:", $.markAsStructValue($.cloneStructValue(v)).Len())
	if ($.markAsStructValue($.cloneStructValue(v)).Len() > 0) {
		await $.println("index kind:", reflect.Kind_String($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(v)).Index(0))).Kind()))
	}
}

export async function describeMap(__typeArgs: $.GenericTypeArgs | undefined, m: globalThis.Map<any, any> | null): globalThis.Promise<void> {
	await $.println("map type:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.genericInterfaceValue(m, "map[K]V", /* @__PURE__ */ $.mapType(__typeArgs?.["K"]?.type ?? { kind: $.TypeKind.Interface, methods: [] }, __typeArgs?.["V"]?.type ?? { kind: $.TypeKind.Interface, methods: [] })))).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

export async function describePointer(__typeArgs: $.GenericTypeArgs | undefined, p: any): globalThis.Promise<void> {
	await $.println("pointer type:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.typeParamPointerInterfaceValue(p, __typeArgs?.["E"], "*E", /* @__PURE__ */ $.pointerType(__typeArgs?.["E"]?.type ?? { kind: $.TypeKind.Interface, methods: [] })))).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

export async function genericComposites(): globalThis.Promise<void> {
	await describe(__goscriptStatic15(), $.arrayToSlice<MyStruct>([new MyStruct({Name: "a", Age: 1}, true)]))
	await describe(__goscriptStatic16(), $.arrayToSlice<number>([1, 2, 3]))
	await describe(__goscriptStatic17(), $.arrayToSlice<number>([]))
	await describeMap(__goscriptStatic18(), $.makeMap<string, MyStruct>([]))
	await describePointer(__goscriptStatic15(), new MyStruct())
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.MyInterface", zero: () => null, methods: {SomeMethod: (receiver: any) => receiver.SomeMethod()} }})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.MyStruct", zero: () => new MyStruct(undefined, true) }})
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }})
}

var __goscriptStatic3$value: any
function __goscriptStatic3(): any {
	return __goscriptStatic3$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "time.Time", zero: () => $.markAsStructValue(new time.Time()), methods: {Add: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Add(...$.stripGenericTypeArgs(args)), AddDate: (receiver: any, ...args: any[]) => $.pointerValue(receiver).AddDate(...$.stripGenericTypeArgs(args)), After: (receiver: any, ...args: any[]) => $.pointerValue(receiver).After(...$.stripGenericTypeArgs(args)), AppendBinary: (receiver: any, ...args: any[]) => $.pointerValue(receiver).AppendBinary(...$.stripGenericTypeArgs(args)), AppendFormat: (receiver: any, ...args: any[]) => $.pointerValue(receiver).AppendFormat(...$.stripGenericTypeArgs(args)), AppendText: (receiver: any, ...args: any[]) => $.pointerValue(receiver).AppendText(...$.stripGenericTypeArgs(args)), Before: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Before(...$.stripGenericTypeArgs(args)), Clock: (receiver: any) => $.pointerValue(receiver).Clock(), Compare: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Compare(...$.stripGenericTypeArgs(args)), Date: (receiver: any) => $.pointerValue(receiver).Date(), Day: (receiver: any) => $.pointerValue(receiver).Day(), Equal: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Equal(...$.stripGenericTypeArgs(args)), Format: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Format(...$.stripGenericTypeArgs(args)), GoString: (receiver: any) => $.pointerValue(receiver).GoString(), GobEncode: (receiver: any) => $.pointerValue(receiver).GobEncode(), Hour: (receiver: any) => $.pointerValue(receiver).Hour(), ISOWeek: (receiver: any) => $.pointerValue(receiver).ISOWeek(), In: (receiver: any, ...args: any[]) => $.pointerValue(receiver).In(...$.stripGenericTypeArgs(args)), IsDST: (receiver: any) => $.pointerValue(receiver).IsDST(), IsZero: (receiver: any) => $.pointerValue(receiver).IsZero(), Local: (receiver: any) => $.pointerValue(receiver).Local(), Location: (receiver: any) => $.pointerValue(receiver).Location(), MarshalBinary: (receiver: any) => $.pointerValue(receiver).MarshalBinary(), MarshalJSON: (receiver: any) => $.pointerValue(receiver).MarshalJSON(), MarshalText: (receiver: any) => $.pointerValue(receiver).MarshalText(), Minute: (receiver: any) => $.pointerValue(receiver).Minute(), Month: (receiver: any) => $.pointerValue(receiver).Month(), Nanosecond: (receiver: any) => $.pointerValue(receiver).Nanosecond(), Round: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Round(...$.stripGenericTypeArgs(args)), Second: (receiver: any) => $.pointerValue(receiver).Second(), String: (receiver: any) => $.pointerValue(receiver).String(), Sub: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Sub(...$.stripGenericTypeArgs(args)), Truncate: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Truncate(...$.stripGenericTypeArgs(args)), UTC: (receiver: any) => $.pointerValue(receiver).UTC(), Unix: (receiver: any) => $.pointerValue(receiver).Unix(), UnixMicro: (receiver: any) => $.pointerValue(receiver).UnixMicro(), UnixMilli: (receiver: any) => $.pointerValue(receiver).UnixMilli(), UnixNano: (receiver: any) => $.pointerValue(receiver).UnixNano(), Weekday: (receiver: any) => $.pointerValue(receiver).Weekday(), Year: (receiver: any) => $.pointerValue(receiver).Year(), YearDay: (receiver: any) => $.pointerValue(receiver).YearDay(), Zone: (receiver: any) => $.pointerValue(receiver).Zone(), ZoneBounds: (receiver: any) => $.pointerValue(receiver).ZoneBounds(), absSec: (receiver: any) => $.pointerValue(receiver).absSec(), appendFormat: (receiver: any, ...args: any[]) => $.pointerValue(receiver).appendFormat(...$.stripGenericTypeArgs(args)), appendFormatRFC3339: (receiver: any, ...args: any[]) => $.pointerValue(receiver).appendFormatRFC3339(...$.stripGenericTypeArgs(args)), appendStrictRFC3339: (receiver: any, ...args: any[]) => $.pointerValue(receiver).appendStrictRFC3339(...$.stripGenericTypeArgs(args)), appendTo: (receiver: any, ...args: any[]) => $.pointerValue(receiver).appendTo(...$.stripGenericTypeArgs(args)), locabs: (receiver: any) => $.pointerValue(receiver).locabs()} }})
}

var __goscriptStatic4$value: any
function __goscriptStatic4(): any {
	return __goscriptStatic4$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.OtherStruct", zero: () => new __goscript_other.OtherStruct(undefined, true) }})
}

var __goscriptStatic5$value: any
function __goscriptStatic5(): any {
	return __goscriptStatic5$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "error", zero: () => null, methods: {Error: (receiver: any) => receiver.Error()} }})
}

var __goscriptStatic6$value: any
function __goscriptStatic6(): any {
	return __goscriptStatic6$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "fmt.Stringer", zero: () => null, methods: {String: (receiver: any) => receiver.String()} }})
}

var __goscriptStatic7$value: any
function __goscriptStatic7(): any {
	return __goscriptStatic7$value ??= ({String: (receiver: any) => (Stringy_String as any)(($.isVarRef(receiver) ? receiver.value : receiver))})
}

var __goscriptStatic8$value: any
function __goscriptStatic8(): any {
	return __goscriptStatic8$value ??= (/* @__PURE__ */ $.basicType("string", "main.Stringy"))
}

var __goscriptStatic9$value: any
function __goscriptStatic9(): any {
	return __goscriptStatic9$value ??= ([$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])])
}

var __goscriptStatic10$value: any
function __goscriptStatic10(): any {
	return __goscriptStatic10$value ??= ($.namedValueInterfaceValue<any>("s", "main.Stringy", __goscriptStatic7(), __goscriptStatic8(), __goscriptStatic9()))
}

var __goscriptStatic11$value: any
function __goscriptStatic11(): any {
	return __goscriptStatic11$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "io.Reader", zero: () => null, methods: {Read: (receiver: any, ...args: any[]) => receiver.Read(...$.stripGenericTypeArgs(args))} }})
}

var __goscriptStatic12$value: any
function __goscriptStatic12(): any {
	return __goscriptStatic12$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.namer", zero: () => null, methods: {Name: (receiver: any) => receiver.Name()} }})
}

var __goscriptStatic13$value: any
function __goscriptStatic13(): any {
	return __goscriptStatic13$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: { kind: $.TypeKind.Interface, methods: [] }, zero: () => null }})
}

var __goscriptStatic14$value: any
function __goscriptStatic14(): any {
	return __goscriptStatic14$value ??= ($.namedValueInterfaceValue<any>("q", "main.Stringy", __goscriptStatic7(), __goscriptStatic8(), __goscriptStatic9()))
}

var __goscriptStatic15$value: any
function __goscriptStatic15(): any {
	return __goscriptStatic15$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, E: { type: "main.MyStruct", zero: () => new MyStruct(undefined, true) }})
}

var __goscriptStatic16$value: any
function __goscriptStatic16(): any {
	return __goscriptStatic16$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, E: { type: /* @__PURE__ */ $.basicType("float32"), zero: () => 0 }})
}

var __goscriptStatic17$value: any
function __goscriptStatic17(): any {
	return __goscriptStatic17$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, E: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }})
}

var __goscriptStatic18$value: any
function __goscriptStatic18(): any {
	return __goscriptStatic18$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, K: { type: /* @__PURE__ */ $.basicType("string"), zero: () => "" }, V: { type: "main.MyStruct", zero: () => new MyStruct(undefined, true) }})
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
