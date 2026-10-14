// Generated file based on reflect_named_composite_type_methods.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as xml from "@goscript/encoding/xml/index.js"

import * as fmt from "@goscript/fmt/index.js"

import * as reflect from "@goscript/reflect/index.js"
import "@goscript/encoding/xml/index.js"
import "@goscript/fmt/index.js"
import "@goscript/reflect/index.js"

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
	{First: (receiver: any, ...args: any[]) => (Names_First as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("First", [], [/* @__PURE__ */ $.basicType("string")])]
);

$.registerNamedValueType(
	"*main.Names",
	{First: (receiver: any, ...args: any[]) => (Names_First as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("First", [], [/* @__PURE__ */ $.basicType("string")])]
);

export type Grid = number[]

$.registerNamedType("main.Grid", /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int"), 2));

$.registerNamedValueType(
	"main.Grid",
	{Sum: (receiver: any, ...args: any[]) => (Grid_Sum as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Sum", [], [/* @__PURE__ */ $.basicType("int")])]
);

$.registerNamedValueType(
	"*main.Grid",
	{Sum: (receiver: any, ...args: any[]) => (Grid_Sum as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Sum", [], [/* @__PURE__ */ $.basicType("int")])]
);

export class Rule {
	public get Pattern(): string {
		return this._fields.Pattern
	}

	public set Pattern(value: string) {
		this._fields.Pattern = value
	}

	public _fields: {
		Pattern: string
	}

	constructor(init?: Partial<{Pattern?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			Pattern: init?.Pattern ?? ("" as string)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Rule {
		return new Rule(this, true)
	}

	public __goscriptAssign(source: Rule): void {
		const target = this._fields
		const values = source._fields
		target.Pattern = values.Pattern
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
	public get Name(): string {
		return this._fields.Name
	}

	public set Name(value: string) {
		this._fields.Name = value
	}

	public get Rules(): $.Slice<Rule> {
		return this._fields.Rules
	}

	public set Rules(value: $.Slice<Rule>) {
		this._fields.Rules = value
	}

	public _fields: {
		Name: string
		Rules: $.Slice<Rule>
	}

	constructor(init?: Partial<{Name?: string, Rules?: $.Slice<Rule>}>, __goscriptValue?: boolean) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			Rules: init?.Rules ?? (null! as $.Slice<Rule>)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): xmlState {
		return new xmlState(this, true)
	}

	public __goscriptAssign(source: xmlState): void {
		const target = this._fields
		const values = source._fields
		target.Name = values.Name
		target.Rules = values.Rules
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
	public get States(): $.Slice<xmlState> {
		return this._fields.States
	}

	public set States(value: $.Slice<xmlState>) {
		this._fields.States = value
	}

	public _fields: {
		States: $.Slice<xmlState>
	}

	constructor(init?: Partial<{States?: $.Slice<xmlState>}>, __goscriptValue?: boolean) {
		this._fields = {
			States: init?.States ?? (null! as $.Slice<xmlState>)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): xmlRules {
		return new xmlRules(this, true)
	}

	public __goscriptAssign(source: xmlRules): void {
		const target = this._fields
		const values = source._fields
		target.States = values.States
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
	public get Name(): string {
		return this._fields.Name
	}

	public set Name(value: string) {
		this._fields.Name = value
	}

	public get Rules(): Rules {
		return this._fields.Rules
	}

	public set Rules(value: Rules) {
		this._fields.Rules = value
	}

	public _fields: {
		Name: string
		Rules: Rules
	}

	constructor(init?: Partial<{Name?: string, Rules?: Rules}>, __goscriptValue?: boolean) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			Rules: init?.Rules ?? (null! as Rules)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Lexer {
		return new Lexer(this, true)
	}

	public __goscriptAssign(source: Lexer): void {
		const target = this._fields
		const values = source._fields
		target.Name = values.Name
		target.Rules = values.Rules
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
		let err = await (d !== null && (d as any).__isVarRef !== true && (d as any).__goValue === undefined ? (d as unknown as xml.Decoder).DecodeElement($.interfaceValue(xr, "*main.xmlRules", /* @__PURE__ */ $.pointerType("main.xmlRules")), start) : xml.Decoder.prototype.DecodeElement.call(d, $.interfaceValue(xr, "*main.xmlRules", /* @__PURE__ */ $.pointerType("main.xmlRules")), start))
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
	await showArray()
	let l: $.VarRef<Lexer> = $.varRef(new Lexer(undefined, true))
	let t = ((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.interfaceValue((l.value).clone(), "main.Lexer", "main.Lexer"))).Field(1), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as reflect.StructField).Type
	await fmt.Println("field type:", (__goscriptAwait = (t !== null && (t as any).__isVarRef !== true && (t as any).__goValue === undefined ? (t as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(t)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), $.namedValueInterfaceValue<any>((__goscriptAwait = (t !== null && (t as any).__isVarRef !== true && (t as any).__goValue === undefined ? (t as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(t)).Kind(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), "reflect.Kind", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()), (__goscriptAwait = (t !== null && (t as any).__isVarRef !== true && (t as any).__goValue === undefined ? (t as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(t)).Name(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	let pt = reflect.PointerTo($.pointerValueOrNil(t)!)
	await fmt.Println("ptr methods:", $.basicInterfaceValue((__goscriptAwait = (pt !== null && (pt as any).__isVarRef !== true && (pt as any).__goValue === undefined ? (pt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(pt)).NumMethod(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), "int"))
	let v = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(l, "*main.Lexer", /* @__PURE__ */ $.pointerType("main.Lexer"))))).Elem())).Field(1)))
	await fmt.Println("value type:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(v)).Type()).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(v)).Addr())).Type()).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	let [, ok] = $.typeAssertTuple<xml.Unmarshaler | null>($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(v)).Addr())).Interface(), "xml.Unmarshaler")
	await fmt.Println("addr implements Unmarshaler:", ok)
}

export function Names_First(n: Names): string {
	return $.arrayIndex(n!, 0)
}

export function Grid_Sum(g: Grid): number {
	return $.arrayIndex(g, 0) + $.arrayIndex(g, 1)
}

export async function showArray(): globalThis.Promise<void> {
	let nt = reflect.TypeOf($.namedValueInterfaceValue<any>($.arrayToSlice<string>(["a"]), "main.Names", __goscriptStatic3(), __goscriptStatic4(), __goscriptStatic5()))
	await fmt.Println("names:", (__goscriptAwait = (nt !== null && (nt as any).__isVarRef !== true && (nt as any).__goValue === undefined ? (nt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(nt)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = (nt !== null && (nt as any).__isVarRef !== true && (nt as any).__goValue === undefined ? (nt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(nt)).Name(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), $.namedValueInterfaceValue<any>((__goscriptAwait = (nt !== null && (nt as any).__isVarRef !== true && (nt as any).__goValue === undefined ? (nt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(nt)).Kind(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), "reflect.Kind", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()), $.basicInterfaceValue((__goscriptAwait = (nt !== null && (nt as any).__isVarRef !== true && (nt as any).__goValue === undefined ? (nt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(nt)).NumMethod(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), "int"))
	let gt = reflect.TypeOf($.namedValueInterfaceValue<any>($.arrayValue([1, 2]), "main.Grid", __goscriptStatic6(), __goscriptStatic7(), __goscriptStatic8()))
	await fmt.Println("grid:", (__goscriptAwait = (gt !== null && (gt as any).__isVarRef !== true && (gt as any).__goValue === undefined ? (gt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(gt)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = (gt !== null && (gt as any).__isVarRef !== true && (gt as any).__goValue === undefined ? (gt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(gt)).Name(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), $.namedValueInterfaceValue<any>((__goscriptAwait = (gt !== null && (gt as any).__isVarRef !== true && (gt as any).__goValue === undefined ? (gt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(gt)).Kind(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), "reflect.Kind", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()), $.basicInterfaceValue((__goscriptAwait = (gt !== null && (gt as any).__isVarRef !== true && (gt as any).__goValue === undefined ? (gt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(gt)).NumMethod(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), "int"))
	let [m, ok] = await (gt !== null && (gt as any).__isVarRef !== true && (gt as any).__goValue === undefined ? (gt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(gt)).MethodByName("Sum")
	await fmt.Println("grid Sum:", m.Name, ok)
	let mt = reflect.TypeOf($.interfaceValue($.makeMap<string, $.Slice<Rule>>([]), "main.Rules", "main.Rules"))
	await fmt.Println("rules:", (__goscriptAwait = (mt !== null && (mt as any).__isVarRef !== true && (mt as any).__goValue === undefined ? (mt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(mt)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = (mt !== null && (mt as any).__isVarRef !== true && (mt as any).__goValue === undefined ? (mt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(mt)).Name(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), $.namedValueInterfaceValue<any>((__goscriptAwait = (mt !== null && (mt as any).__isVarRef !== true && (mt as any).__goValue === undefined ? (mt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(mt)).Kind(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), "reflect.Kind", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()), $.basicInterfaceValue((__goscriptAwait = (mt !== null && (mt as any).__isVarRef !== true && (mt as any).__goValue === undefined ? (mt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(mt)).NumMethod(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), "int"), $.basicInterfaceValue((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.PointerTo($.pointerValueOrNil(mt)!)).NumMethod(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), "int"))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({String: (receiver: any, ...args: any[]) => (reflect.Kind_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))})
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
	return __goscriptStatic3$value ??= ({First: (receiver: any, ...args: any[]) => (Names_First as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))})
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
	return __goscriptStatic6$value ??= ({Sum: (receiver: any, ...args: any[]) => (Grid_Sum as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))})
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
