// Generated file based on reflect_named_composite_type_methods.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as xml from "@goscript/encoding/xml/index.js"
import * as fmt from "@goscript/fmt/index.js"
import * as reflect from "@goscript/reflect/index.js"
import "@goscript/encoding/xml/index.js"

export type Rules = globalThis.Map<string, $.Slice<Rule>> | null

$.registerNamedType("main.Rules", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.sliceType("main.Rule")));

$.registerNamedValueType(
	"*main.Rules",
	{UnmarshalXML: (receiver: any, ...args: any[]) => (Rules_UnmarshalXML as any)(receiver, ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("UnmarshalXML", [["d", /* @__PURE__ */ $.pointerType("xml.Decoder")], ["start", "xml.StartElement"]], ["error"])]
);

export type Names = $.Slice<string>

$.registerNamedType("main.Names", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string")));

$.registerNamedValueType(
	"main.Names",
	{First: (receiver: any) => (Names_First as any)(($.isVarRef(receiver) ? receiver.value : receiver))},
	[$.methodSignature("First", [], [/* @__PURE__ */ $.basicType("string")])]
);

$.registerNamedValueType(
	"*main.Names",
	{First: (receiver: any) => (Names_First as any)($.pointerValue(receiver))},
	[$.methodSignature("First", [], [/* @__PURE__ */ $.basicType("string")])]
);

export type Grid = number[]

$.registerNamedType("main.Grid", /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int"), 2));

$.registerNamedValueType(
	"main.Grid",
	{Sum: (receiver: any) => (Grid_Sum as any)(($.isVarRef(receiver) ? receiver.value : receiver))},
	[$.methodSignature("Sum", [], [/* @__PURE__ */ $.basicType("int")])]
);

$.registerNamedValueType(
	"*main.Grid",
	{Sum: (receiver: any) => (Grid_Sum as any)($.pointerValue(receiver))},
	[$.methodSignature("Sum", [], [/* @__PURE__ */ $.basicType("int")])]
);

export class Rule {
	public declare Pattern: string

	constructor(init?: Partial<{Pattern?: string}>, __goscriptValue?: boolean) {
		this.Pattern = init?.Pattern ?? ("" as string)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Rule {
		return new Rule(this, true)
	}

	public __goscriptAssign(source: Rule): this {
		this.Pattern = source.Pattern
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Rule",
		() => new Rule(),
		() => [],
		Rule,
		() => [/* @__PURE__ */ $.structField("Pattern", /* @__PURE__ */ $.basicType("string"), [0], 0, true, { tag: "xml:\"pattern,attr\"" })]
	)
}

export class xmlState {
	public declare Name: string

	public declare Rules: $.Slice<Rule>

	constructor(init?: Partial<{Name?: string, Rules?: $.Slice<Rule>}>, __goscriptValue?: boolean) {
		this.Name = init?.Name ?? ("" as string)
		this.Rules = init?.Rules ?? (null! as $.Slice<Rule>)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): xmlState {
		return new xmlState(this, true)
	}

	public __goscriptAssign(source: xmlState): this {
		this.Name = source.Name
		this.Rules = source.Rules
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.xmlState",
		() => new xmlState(),
		() => [],
		xmlState,
		() => [/* @__PURE__ */ $.structField("Name", /* @__PURE__ */ $.basicType("string"), [0], 0, true, { tag: "xml:\"name,attr\"" }), /* @__PURE__ */ $.structField("Rules", /* @__PURE__ */ $.sliceType("main.Rule"), [1], 16, true, { tag: "xml:\"rule\"" })]
	)
}

export class xmlRules {
	public declare States: $.Slice<xmlState>

	constructor(init?: Partial<{States?: $.Slice<xmlState>}>, __goscriptValue?: boolean) {
		this.States = init?.States ?? (null! as $.Slice<xmlState>)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): xmlRules {
		return new xmlRules(this, true)
	}

	public __goscriptAssign(source: xmlRules): this {
		this.States = source.States
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.xmlRules",
		() => new xmlRules(),
		() => [],
		xmlRules,
		() => [/* @__PURE__ */ $.structField("States", /* @__PURE__ */ $.sliceType("main.xmlState"), [0], 0, true, { tag: "xml:\"state\"" })]
	)
}

export class Lexer {
	public declare Name: string

	public declare Rules: Rules

	constructor(init?: Partial<{Name?: string, Rules?: Rules}>, __goscriptValue?: boolean) {
		this.Name = init?.Name ?? ("" as string)
		this.Rules = init?.Rules ?? (null! as Rules)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Lexer {
		return new Lexer(this, true)
	}

	public __goscriptAssign(source: Lexer): this {
		this.Name = source.Name
		this.Rules = source.Rules
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Lexer",
		() => new Lexer(),
		() => [],
		Lexer,
		() => [/* @__PURE__ */ $.structField("Name", /* @__PURE__ */ $.basicType("string"), [0], 0, true, { tag: "xml:\"name\"" }), /* @__PURE__ */ $.structField("Rules", "main.Rules", [1], 16, true, { tag: "xml:\"rules\"" })]
	)
}

export async function Rules_UnmarshalXML(r: $.VarRef<Rules> | null, d: xml.Decoder | $.VarRef<xml.Decoder> | null, __goscriptParam0: xml.StartElement): globalThis.Promise<$.GoError> {
	let start: $.VarRef<xml.StartElement> = $.varRef(__goscriptParam0)
	let xr = $.varRef(new xmlRules(undefined, true))
	{
		let err = await (d !== null && (d as any).__isVarRef !== true && (d as any).__goValue === undefined ? ((d as any) as xml.Decoder).DecodeElement($.interfaceValue(xr, "*main.xmlRules", /* @__PURE__ */ $.pointerType("main.xmlRules")), start) : xml.Decoder.prototype.DecodeElement.call(d, $.interfaceValue(xr, "*main.xmlRules", /* @__PURE__ */ $.pointerType("main.xmlRules")), start))
		if (err != null) {
			return err
		}
	}
	if ($.pointerValue<Rules>(r) == null) {
		r!.value = $.makeMap<string, $.Slice<Rule>>([])
	}
	for (let __goscriptRangeTarget0 = xr.value.States, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let st = ((__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as xmlState)).clone()
		$.mapSet(($.pointerValue<Rules>(r)), st.Name, st.Rules)
	}
	return null
}

export async function main(): globalThis.Promise<void> {
	showArray()
	let l: $.VarRef<Lexer> = $.varRef(new Lexer(undefined, true))
	let t = ((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.interfaceValue((l.value).clone(), "main.Lexer", "main.Lexer"))).Field(1), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as reflect.StructField).Type
	fmt.Println("field type:", (__goscriptAwait = (t !== null && (t as any).__isVarRef !== true && ((t as any).__goValue === undefined || (t as any).__goType?.charCodeAt(0) !== 42) ? (t as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(t)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), $.namedValueInterfaceValue<any>((__goscriptAwait = (t !== null && (t as any).__isVarRef !== true && ((t as any).__goValue === undefined || (t as any).__goType?.charCodeAt(0) !== 42) ? (t as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(t)).Kind(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), "reflect.Kind", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()), (__goscriptAwait = (t !== null && (t as any).__isVarRef !== true && ((t as any).__goValue === undefined || (t as any).__goType?.charCodeAt(0) !== 42) ? (t as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(t)).Name(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	let pt = reflect.PointerTo($.pointerValueOrNil(t)!)
	fmt.Println("ptr methods:", $.basicInterfaceValue((__goscriptAwait = (pt !== null && (pt as any).__isVarRef !== true && ((pt as any).__goValue === undefined || (pt as any).__goType?.charCodeAt(0) !== 42) ? (pt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(pt)).NumMethod(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), "int"))
	let v = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(l, "*main.Lexer", /* @__PURE__ */ $.pointerType("main.Lexer"))))).Elem())).Field(1)))
	fmt.Println("value type:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(v)).Type()).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(v)).Addr())).Type()).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	let [, ok] = $.typeAssertTuple<xml.Unmarshaler | null>($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(v)).Addr())).Interface(), "xml.Unmarshaler")
	fmt.Println("addr implements Unmarshaler:", ok)
}

export function Names_First(n: Names): string {
	return $.arrayIndex(n!, 0)
}

export function Grid_Sum(g: Grid): number {
	return $.arrayIndex(g, 0) + $.arrayIndex(g, 1)
}

export function showArray(): void {
	let nt = reflect.TypeOf($.namedValueInterfaceValue<any>($.arrayToSlice<string>(["a"]), "main.Names", __goscriptStatic3(), __goscriptStatic4(), __goscriptStatic5()))
	fmt.Println("names:", ((nt !== null && (nt as any).__isVarRef !== true && ((nt as any).__goValue === undefined || (nt as any).__goType?.charCodeAt(0) !== 42) ? (nt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(nt)).String() as string), ((nt !== null && (nt as any).__isVarRef !== true && ((nt as any).__goValue === undefined || (nt as any).__goType?.charCodeAt(0) !== 42) ? (nt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(nt)).Name() as string), $.namedValueInterfaceValue<any>(((nt !== null && (nt as any).__isVarRef !== true && ((nt as any).__goValue === undefined || (nt as any).__goType?.charCodeAt(0) !== 42) ? (nt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(nt)).Kind() as reflect.Kind), "reflect.Kind", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()), $.basicInterfaceValue(((nt !== null && (nt as any).__isVarRef !== true && ((nt as any).__goValue === undefined || (nt as any).__goType?.charCodeAt(0) !== 42) ? (nt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(nt)).NumMethod() as number), "int"))
	let gt = reflect.TypeOf($.namedValueInterfaceValue<any>($.arrayValue([1, 2]), "main.Grid", __goscriptStatic6(), __goscriptStatic7(), __goscriptStatic8()))
	fmt.Println("grid:", ((gt !== null && (gt as any).__isVarRef !== true && ((gt as any).__goValue === undefined || (gt as any).__goType?.charCodeAt(0) !== 42) ? (gt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(gt)).String() as string), ((gt !== null && (gt as any).__isVarRef !== true && ((gt as any).__goValue === undefined || (gt as any).__goType?.charCodeAt(0) !== 42) ? (gt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(gt)).Name() as string), $.namedValueInterfaceValue<any>(((gt !== null && (gt as any).__isVarRef !== true && ((gt as any).__goValue === undefined || (gt as any).__goType?.charCodeAt(0) !== 42) ? (gt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(gt)).Kind() as reflect.Kind), "reflect.Kind", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()), $.basicInterfaceValue(((gt !== null && (gt as any).__isVarRef !== true && ((gt as any).__goValue === undefined || (gt as any).__goType?.charCodeAt(0) !== 42) ? (gt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(gt)).NumMethod() as number), "int"))
	let [m, ok] = ((gt !== null && (gt as any).__isVarRef !== true && ((gt as any).__goValue === undefined || (gt as any).__goType?.charCodeAt(0) !== 42) ? (gt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(gt)).MethodByName("Sum") as [reflect.Method, boolean])
	fmt.Println("grid Sum:", m.Name, ok)
	let mt = reflect.TypeOf($.interfaceValue($.makeMap<string, $.Slice<Rule>>([]), "main.Rules", "main.Rules"))
	fmt.Println("rules:", ((mt !== null && (mt as any).__isVarRef !== true && ((mt as any).__goValue === undefined || (mt as any).__goType?.charCodeAt(0) !== 42) ? (mt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(mt)).String() as string), ((mt !== null && (mt as any).__isVarRef !== true && ((mt as any).__goValue === undefined || (mt as any).__goType?.charCodeAt(0) !== 42) ? (mt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(mt)).Name() as string), $.namedValueInterfaceValue<any>(((mt !== null && (mt as any).__isVarRef !== true && ((mt as any).__goValue === undefined || (mt as any).__goType?.charCodeAt(0) !== 42) ? (mt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(mt)).Kind() as reflect.Kind), "reflect.Kind", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()), $.basicInterfaceValue(((mt !== null && (mt as any).__isVarRef !== true && ((mt as any).__goValue === undefined || (mt as any).__goType?.charCodeAt(0) !== 42) ? (mt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(mt)).NumMethod() as number), "int"), $.basicInterfaceValue(($.pointerValue<Exclude<reflect.Type, null>>(reflect.PointerTo($.pointerValueOrNil(mt)!)).NumMethod() as number), "int"))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({String: (receiver: any) => (reflect.Kind_String as any)(($.isVarRef(receiver) ? receiver.value : receiver))})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= (/* @__PURE__ */ $.basicType("uint", "reflect.Kind"))
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ([$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])])
}

var __goscriptStatic3$value: any
function __goscriptStatic3(): any {
	return __goscriptStatic3$value ??= ({First: (receiver: any) => (Names_First as any)(($.isVarRef(receiver) ? receiver.value : receiver))})
}

var __goscriptStatic4$value: any
function __goscriptStatic4(): any {
	return __goscriptStatic4$value ??= (/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string"), "main.Names"))
}

var __goscriptStatic5$value: any
function __goscriptStatic5(): any {
	return __goscriptStatic5$value ??= ([$.methodSignature("First", [], [/* @__PURE__ */ $.basicType("string")])])
}

var __goscriptStatic6$value: any
function __goscriptStatic6(): any {
	return __goscriptStatic6$value ??= ({Sum: (receiver: any) => (Grid_Sum as any)(($.isVarRef(receiver) ? receiver.value : receiver))})
}

var __goscriptStatic7$value: any
function __goscriptStatic7(): any {
	return __goscriptStatic7$value ??= ("main.Grid")
}

var __goscriptStatic8$value: any
function __goscriptStatic8(): any {
	return __goscriptStatic8$value ??= ([$.methodSignature("Sum", [], [/* @__PURE__ */ $.basicType("int")])])
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
