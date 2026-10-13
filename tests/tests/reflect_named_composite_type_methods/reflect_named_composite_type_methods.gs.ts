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
	public declare Pattern: string

	public _fields: {
		Pattern: string
	}

	constructor(init?: Partial<{Pattern?: string}>) {
		this._fields = {
			Pattern: init?.Pattern ?? ("" as string)
		}
	}

	public clone(): Rule {
		return $.markAsStructValue(new Rule(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Pattern"])
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

	public _fields: {
		Name: string
		Rules: $.Slice<Rule>
	}

	constructor(init?: Partial<{Name?: string, Rules?: $.Slice<Rule>}>) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			Rules: init?.Rules ?? (null! as $.Slice<Rule>)
		}
	}

	public clone(): xmlState {
		return $.markAsStructValue(new xmlState(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Name", "Rules"])
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

	public _fields: {
		States: $.Slice<xmlState>
	}

	constructor(init?: Partial<{States?: $.Slice<xmlState>}>) {
		this._fields = {
			States: init?.States ?? (null! as $.Slice<xmlState>)
		}
	}

	public clone(): xmlRules {
		return $.markAsStructValue(new xmlRules(this))
	}

	static {
		$.bindStructFields(this.prototype, ["States"])
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

	public _fields: {
		Name: string
		Rules: Rules
	}

	constructor(init?: Partial<{Name?: string, Rules?: Rules}>) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			Rules: init?.Rules ?? (null! as Rules)
		}
	}

	public clone(): Lexer {
		return $.markAsStructValue(new Lexer(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Name", "Rules"])
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
	let xr = $.varRef($.markAsStructValue(new xmlRules()))
	{
		let err = await xml.Decoder.prototype.DecodeElement.call(d, $.interfaceValue(xr, "*main.xmlRules", /* @__PURE__ */ $.pointerType("main.xmlRules")), start)
		if (err != null) {
			return err
		}
	}
	if ($.pointerValue<Rules>(r) == null) {
		r!.value = $.makeMap<string, $.Slice<Rule>>([])
	}
	for (let __goscriptRangeTarget0 = xr.value.States, __rangeIndex = 0; __rangeIndex < $.len(__goscriptRangeTarget0); __rangeIndex++) {
		let st = $.markAsStructValue($.cloneStructValue(__goscriptRangeTarget0![__rangeIndex]))
		$.mapSet(($.pointerValue<Rules>(r)), st.Name, st.Rules)
	}
	return null
}

export async function main(): globalThis.Promise<void> {
	await showArray()
	let l: $.VarRef<Lexer> = $.varRef($.markAsStructValue(new Lexer()))
	let t = (await $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.interfaceValue($.markAsStructValue($.cloneStructValue(l.value)), "main.Lexer", "main.Lexer"))).Field(1)).Type
	await fmt.Println("field type:", await $.pointerValue<Exclude<reflect.Type, null>>(t).String(), $.namedValueInterfaceValue<any>(await $.pointerValue<Exclude<reflect.Type, null>>(t).Kind(), "reflect.Kind", {String: (receiver: any, ...args: any[]) => (reflect.Kind_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))}, /* @__PURE__ */ $.basicType("uint", "reflect.Kind"), [$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]), await $.pointerValue<Exclude<reflect.Type, null>>(t).Name())
	let pt = reflect.PointerTo($.pointerValueOrNil(t)!)
	await fmt.Println("ptr methods:", $.basicInterfaceValue(await $.pointerValue<Exclude<reflect.Type, null>>(pt).NumMethod(), "int"))
	let v = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(l, "*main.Lexer", /* @__PURE__ */ $.pointerType("main.Lexer"))))).Elem())).Field(1)))
	await fmt.Println("value type:", await $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(v)).Type()).String(), await $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(v)).Addr())).Type()).String())
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
	let nt = reflect.TypeOf($.namedValueInterfaceValue<any>($.arrayToSlice<string>(["a"]), "main.Names", {First: (receiver: any, ...args: any[]) => (Names_First as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))}, /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string"), "main.Names"), [$.methodSignature("First", [], [/* @__PURE__ */ $.basicType("string")])]))
	await fmt.Println("names:", await $.pointerValue<Exclude<reflect.Type, null>>(nt).String(), await $.pointerValue<Exclude<reflect.Type, null>>(nt).Name(), $.namedValueInterfaceValue<any>(await $.pointerValue<Exclude<reflect.Type, null>>(nt).Kind(), "reflect.Kind", {String: (receiver: any, ...args: any[]) => (reflect.Kind_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))}, /* @__PURE__ */ $.basicType("uint", "reflect.Kind"), [$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]), $.basicInterfaceValue(await $.pointerValue<Exclude<reflect.Type, null>>(nt).NumMethod(), "int"))
	let gt = reflect.TypeOf($.namedValueInterfaceValue<any>($.arrayValue([1, 2]), "main.Grid", {Sum: (receiver: any, ...args: any[]) => (Grid_Sum as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))}, "main.Grid", [$.methodSignature("Sum", [], [/* @__PURE__ */ $.basicType("int")])]))
	await fmt.Println("grid:", await $.pointerValue<Exclude<reflect.Type, null>>(gt).String(), await $.pointerValue<Exclude<reflect.Type, null>>(gt).Name(), $.namedValueInterfaceValue<any>(await $.pointerValue<Exclude<reflect.Type, null>>(gt).Kind(), "reflect.Kind", {String: (receiver: any, ...args: any[]) => (reflect.Kind_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))}, /* @__PURE__ */ $.basicType("uint", "reflect.Kind"), [$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]), $.basicInterfaceValue(await $.pointerValue<Exclude<reflect.Type, null>>(gt).NumMethod(), "int"))
	let [m, ok] = await $.pointerValue<Exclude<reflect.Type, null>>(gt).MethodByName("Sum")
	await fmt.Println("grid Sum:", m.Name, ok)
	let mt = reflect.TypeOf($.interfaceValue($.makeMap<string, $.Slice<Rule>>([]), "main.Rules", "main.Rules"))
	await fmt.Println("rules:", await $.pointerValue<Exclude<reflect.Type, null>>(mt).String(), await $.pointerValue<Exclude<reflect.Type, null>>(mt).Name(), $.namedValueInterfaceValue<any>(await $.pointerValue<Exclude<reflect.Type, null>>(mt).Kind(), "reflect.Kind", {String: (receiver: any, ...args: any[]) => (reflect.Kind_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))}, /* @__PURE__ */ $.basicType("uint", "reflect.Kind"), [$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]), $.basicInterfaceValue(await $.pointerValue<Exclude<reflect.Type, null>>(mt).NumMethod(), "int"), $.basicInterfaceValue(await $.pointerValue<Exclude<reflect.Type, null>>(reflect.PointerTo($.pointerValueOrNil(mt)!)).NumMethod(), "int"))
}

if ($.isMainScript(import.meta)) {
	await main()
}
