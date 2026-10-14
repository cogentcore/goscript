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
import "@goscript/reflect/index.js"
import "@goscript/time/index.js"
import "./other.gs.ts"

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

export class MyStruct {
	public declare Name: string

	public declare Age: number

	public _fields: {
		Name: string
		Age: number
	}

	constructor(init?: Partial<{Name?: string, Age?: number}>) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			Age: init?.Age ?? (0 as number)
		}
	}

	public clone(): MyStruct {
		return $.markAsStructValue(new MyStruct(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Name", "Age"])
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
		() => [$.methodSignature("Error", [], [/* @__PURE__ */ $.basicType("string")])],
		myErr,
		() => []
	)
}

export function Stringy_String(s: Stringy): string {
	return s
}

export async function main(): globalThis.Promise<void> {
	// Test TypeFor with named interface type
	let t1 = reflect.TypeFor({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.MyInterface", zero: () => null, methods: {SomeMethod: (receiver: any, ...args: any[]) => receiver.SomeMethod(...$.stripGenericTypeArgs(args))} }})
	await $.println("TypeFor interface:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(t1).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	// Test TypeFor with struct type
	let t2 = reflect.TypeFor({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.MyStruct", zero: () => $.markAsStructValue(new MyStruct()) }})
	await $.println("TypeFor struct:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(t2).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println("TypeFor struct kind:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(t2).Kind(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) == 25)

	// Test TypeFor with int type
	let t3 = reflect.TypeFor({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }})
	await $.println("TypeFor int:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(t3).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println("TypeFor int kind:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(t3).Kind(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) == 2)

	// Test TypeFor with imported and cross-file named struct types
	let t4 = reflect.TypeFor({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "time.Time", zero: () => $.markAsStructValue(new time.Time()), methods: {Add: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Add(...$.stripGenericTypeArgs(args)), AddDate: (receiver: any, ...args: any[]) => $.pointerValue(receiver).AddDate(...$.stripGenericTypeArgs(args)), After: (receiver: any, ...args: any[]) => $.pointerValue(receiver).After(...$.stripGenericTypeArgs(args)), AppendBinary: (receiver: any, ...args: any[]) => $.pointerValue(receiver).AppendBinary(...$.stripGenericTypeArgs(args)), AppendFormat: (receiver: any, ...args: any[]) => $.pointerValue(receiver).AppendFormat(...$.stripGenericTypeArgs(args)), AppendText: (receiver: any, ...args: any[]) => $.pointerValue(receiver).AppendText(...$.stripGenericTypeArgs(args)), Before: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Before(...$.stripGenericTypeArgs(args)), Clock: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Clock(...$.stripGenericTypeArgs(args)), Compare: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Compare(...$.stripGenericTypeArgs(args)), Date: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Date(...$.stripGenericTypeArgs(args)), Day: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Day(...$.stripGenericTypeArgs(args)), Equal: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Equal(...$.stripGenericTypeArgs(args)), Format: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Format(...$.stripGenericTypeArgs(args)), GoString: (receiver: any, ...args: any[]) => $.pointerValue(receiver).GoString(...$.stripGenericTypeArgs(args)), GobEncode: (receiver: any, ...args: any[]) => $.pointerValue(receiver).GobEncode(...$.stripGenericTypeArgs(args)), Hour: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Hour(...$.stripGenericTypeArgs(args)), ISOWeek: (receiver: any, ...args: any[]) => $.pointerValue(receiver).ISOWeek(...$.stripGenericTypeArgs(args)), In: (receiver: any, ...args: any[]) => $.pointerValue(receiver).In(...$.stripGenericTypeArgs(args)), IsDST: (receiver: any, ...args: any[]) => $.pointerValue(receiver).IsDST(...$.stripGenericTypeArgs(args)), IsZero: (receiver: any, ...args: any[]) => $.pointerValue(receiver).IsZero(...$.stripGenericTypeArgs(args)), Local: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Local(...$.stripGenericTypeArgs(args)), Location: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Location(...$.stripGenericTypeArgs(args)), MarshalBinary: (receiver: any, ...args: any[]) => $.pointerValue(receiver).MarshalBinary(...$.stripGenericTypeArgs(args)), MarshalJSON: (receiver: any, ...args: any[]) => $.pointerValue(receiver).MarshalJSON(...$.stripGenericTypeArgs(args)), MarshalText: (receiver: any, ...args: any[]) => $.pointerValue(receiver).MarshalText(...$.stripGenericTypeArgs(args)), Minute: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Minute(...$.stripGenericTypeArgs(args)), Month: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Month(...$.stripGenericTypeArgs(args)), Nanosecond: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Nanosecond(...$.stripGenericTypeArgs(args)), Round: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Round(...$.stripGenericTypeArgs(args)), Second: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Second(...$.stripGenericTypeArgs(args)), String: (receiver: any, ...args: any[]) => $.pointerValue(receiver).String(...$.stripGenericTypeArgs(args)), Sub: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Sub(...$.stripGenericTypeArgs(args)), Truncate: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Truncate(...$.stripGenericTypeArgs(args)), UTC: (receiver: any, ...args: any[]) => $.pointerValue(receiver).UTC(...$.stripGenericTypeArgs(args)), Unix: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Unix(...$.stripGenericTypeArgs(args)), UnixMicro: (receiver: any, ...args: any[]) => $.pointerValue(receiver).UnixMicro(...$.stripGenericTypeArgs(args)), UnixMilli: (receiver: any, ...args: any[]) => $.pointerValue(receiver).UnixMilli(...$.stripGenericTypeArgs(args)), UnixNano: (receiver: any, ...args: any[]) => $.pointerValue(receiver).UnixNano(...$.stripGenericTypeArgs(args)), Weekday: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Weekday(...$.stripGenericTypeArgs(args)), Year: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Year(...$.stripGenericTypeArgs(args)), YearDay: (receiver: any, ...args: any[]) => $.pointerValue(receiver).YearDay(...$.stripGenericTypeArgs(args)), Zone: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Zone(...$.stripGenericTypeArgs(args)), ZoneBounds: (receiver: any, ...args: any[]) => $.pointerValue(receiver).ZoneBounds(...$.stripGenericTypeArgs(args)), absSec: (receiver: any, ...args: any[]) => $.pointerValue(receiver).absSec(...$.stripGenericTypeArgs(args)), appendFormat: (receiver: any, ...args: any[]) => $.pointerValue(receiver).appendFormat(...$.stripGenericTypeArgs(args)), appendFormatRFC3339: (receiver: any, ...args: any[]) => $.pointerValue(receiver).appendFormatRFC3339(...$.stripGenericTypeArgs(args)), appendStrictRFC3339: (receiver: any, ...args: any[]) => $.pointerValue(receiver).appendStrictRFC3339(...$.stripGenericTypeArgs(args)), appendTo: (receiver: any, ...args: any[]) => $.pointerValue(receiver).appendTo(...$.stripGenericTypeArgs(args)), locabs: (receiver: any, ...args: any[]) => $.pointerValue(receiver).locabs(...$.stripGenericTypeArgs(args))} }})
	await $.println("TypeFor imported struct:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(t4).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	let t5 = reflect.TypeFor({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.OtherStruct", zero: () => $.markAsStructValue(new __goscript_other.OtherStruct()) }})
	await $.println("TypeFor cross-file struct:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(t5).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	// Test Pointer constant (should be same as Ptr)
	await $.println("Pointer constant:", (22 as number) == 22)

	// Test TypeFor with named interface types and Implements
	let errorType = reflect.TypeFor({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "error", zero: () => null, methods: {Error: (receiver: any, ...args: any[]) => receiver.Error(...$.stripGenericTypeArgs(args))} }})
	await $.println("error:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(errorType).Kind(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) == 20, (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(errorType).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(errorType).Name(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(errorType).PkgPath(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println("error implements:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.interfaceValue(new myErr(), "*main.myErr", /* @__PURE__ */ $.pointerType("main.myErr")))).Implements($.pointerValueOrNil(errorType)!), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.basicInterfaceValue(1, "int"))).Implements($.pointerValueOrNil(errorType)!), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	let stringerType = reflect.TypeFor({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "fmt.Stringer", zero: () => null, methods: {String: (receiver: any, ...args: any[]) => receiver.String(...$.stripGenericTypeArgs(args))} }})
	await $.println("Stringer:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(stringerType).Kind(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) == 20, (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(stringerType).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(stringerType).Name(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(stringerType).PkgPath(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println("Stringer implements:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.namedValueInterfaceValue<any>("s", "main.Stringy", {String: (receiver: any, ...args: any[]) => (Stringy_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))}, /* @__PURE__ */ $.basicType("string", "main.Stringy"), [$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]))).Implements($.pointerValueOrNil(stringerType)!), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf("s")).Implements($.pointerValueOrNil(stringerType)!), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	let readerType = reflect.TypeFor({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "io.Reader", zero: () => null, methods: {Read: (receiver: any, ...args: any[]) => receiver.Read(...$.stripGenericTypeArgs(args))} }})
	await $.println("Reader:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(readerType).Kind(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) == 20, (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(readerType).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	let namerType = reflect.TypeFor({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.namer", zero: () => null, methods: {Name: (receiver: any, ...args: any[]) => receiver.Name(...$.stripGenericTypeArgs(args))} }})
	await $.println("namer:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(namerType).Kind(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) == 20, (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(namerType).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(namerType).NumMethod(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	let anyType = reflect.TypeFor({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: { kind: $.TypeKind.Interface, methods: [] }, zero: () => null }})
	await $.println("any:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(anyType).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), $.stringEqual((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(anyType).Name(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), ""), (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(anyType).Kind(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) == 20)

	let s: any = $.namedValueInterfaceValue<any>("q", "main.Stringy", {String: (receiver: any, ...args: any[]) => (Stringy_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))}, /* @__PURE__ */ $.basicType("string", "main.Stringy"), [$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])])
	let [, ok] = $.typeAssertTuple<fmt.Stringer | null>(s, "fmt.Stringer")
	await $.println("assert fmt.Stringer:", ok)

	await genericComposites()

	await $.println("reflect_typefor test finished")
}

export async function describe<E>(__typeArgs: $.GenericTypeArgs | undefined, s: $.Slice<E>): globalThis.Promise<void> {
	let v = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(s, "[]E", /* @__PURE__ */ $.sliceType(__typeArgs?.["E"]?.type ?? { kind: $.TypeKind.Interface, methods: [] })))))
	await $.println("type:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(v)).Type()).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), "elem kind:", reflect.Kind_String((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(v)).Type()).Elem(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)).Kind(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)), "len:", $.markAsStructValue($.cloneStructValue(v)).Len())
	if ($.markAsStructValue($.cloneStructValue(v)).Len() > 0) {
		await $.println("index kind:", reflect.Kind_String($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(v)).Index(0))).Kind()))
	}
}

export async function describeMap(__typeArgs: $.GenericTypeArgs | undefined, m: globalThis.Map<any, any> | null): globalThis.Promise<void> {
	await $.println("map type:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.interfaceValue(m, "map[K]V", /* @__PURE__ */ $.mapType(__typeArgs?.["K"]?.type ?? { kind: $.TypeKind.Interface, methods: [] }, __typeArgs?.["V"]?.type ?? { kind: $.TypeKind.Interface, methods: [] })))).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

export async function describePointer(__typeArgs: $.GenericTypeArgs | undefined, p: any): globalThis.Promise<void> {
	await $.println("pointer type:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.typeParamPointerInterfaceValue(p, __typeArgs?.["E"], "*E", /* @__PURE__ */ $.pointerType(__typeArgs?.["E"]?.type ?? { kind: $.TypeKind.Interface, methods: [] })))).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

export async function genericComposites(): globalThis.Promise<void> {
	await describe({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, E: { type: "main.MyStruct", zero: () => $.markAsStructValue(new MyStruct()) }}, $.arrayToSlice<MyStruct>([$.markAsStructValue(new MyStruct({Name: "a", Age: 1}))]))
	await describe({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, E: { type: /* @__PURE__ */ $.basicType("float32"), zero: () => 0 }}, $.arrayToSlice<number>([1, 2, 3]))
	await describe({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, E: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }}, $.arrayToSlice<number>([]))
	await describeMap({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, K: { type: /* @__PURE__ */ $.basicType("string"), zero: () => "" }, V: { type: "main.MyStruct", zero: () => $.markAsStructValue(new MyStruct()) }}, $.makeMap<string, MyStruct>([]))
	await describePointer({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, E: { type: "main.MyStruct", zero: () => $.markAsStructValue(new MyStruct()) }}, new MyStruct())
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
