// Generated file based on package_import_encoding_json.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as json from "@goscript/encoding/json/index.js"

import * as fmt from "@goscript/fmt/index.js"

import * as slices from "@goscript/slices/index.js"

import * as strconv from "@goscript/strconv/index.js"

import * as strings from "@goscript/strings/index.js"

import * as time from "@goscript/time/index.js"
import "@goscript/encoding/json/index.js"
import "@goscript/fmt/index.js"
import "@goscript/slices/index.js"
import "@goscript/strconv/index.js"
import "@goscript/strings/index.js"
import "@goscript/time/index.js"

export class Holder {
	public declare Tags: globalThis.Map<string, number> | null

	public _fields: {
		Tags: globalThis.Map<string, number> | null
	}

	constructor(init?: Partial<{Tags?: globalThis.Map<string, number> | null}>) {
		this._fields = {
			Tags: init?.Tags ?? (null! as globalThis.Map<string, number> | null)
		}
	}

	public clone(): Holder {
		return $.markAsStructValue(new Holder(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Tags"])
	}

	static __typeInfo = $.registerStructType(
		"main.Holder",
		() => new Holder(),
		() => [],
		Holder,
		() => [{ name: "Tags", key: "Tags", type: /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int")) }]
	)
}

export class Enc {
	public declare Width: number

	public declare Image: $.Slice<number>

	public declare Frames: $.Slice<$.Slice<number>>

	public declare Named: globalThis.Map<string, $.Slice<number>> | null

	public declare Nested: Enc | $.VarRef<Enc> | null

	public _fields: {
		Width: number
		Image: $.Slice<number>
		Frames: $.Slice<$.Slice<number>>
		Named: globalThis.Map<string, $.Slice<number>> | null
		Nested: Enc | $.VarRef<Enc> | null
	}

	constructor(init?: Partial<{Width?: number, Image?: $.Slice<number>, Frames?: $.Slice<$.Slice<number>>, Named?: globalThis.Map<string, $.Slice<number>> | null, Nested?: Enc | $.VarRef<Enc> | null}>) {
		this._fields = {
			Width: init?.Width ?? (0 as number),
			Image: init?.Image ?? (null! as $.Slice<number>),
			Frames: init?.Frames ?? (null! as $.Slice<$.Slice<number>>),
			Named: init?.Named ?? (null! as globalThis.Map<string, $.Slice<number>> | null),
			Nested: init?.Nested ?? (null! as Enc | $.VarRef<Enc> | null)
		}
	}

	public clone(): Enc {
		return $.markAsStructValue(new Enc(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Width", "Image", "Frames", "Named", "Nested"])
	}

	static __typeInfo = $.registerStructType(
		"main.Enc",
		() => new Enc(),
		() => [],
		Enc,
		() => [{ name: "Width", key: "Width", type: /* @__PURE__ */ $.basicType("int") }, { name: "Image", key: "Image", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }, { name: "Frames", key: "Frames", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))) }, { name: "Named", key: "Named", type: /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))) }, { name: "Nested", key: "Nested", type: /* @__PURE__ */ $.pointerType("main.Enc") }]
	)
}

export class Event {
	public declare Name: string

	public declare At: time.Time

	public _fields: {
		Name: string
		At: time.Time
	}

	constructor(init?: Partial<{Name?: string, At?: time.Time}>) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			At: init?.At ? $.markAsStructValue($.cloneStructValue(init.At)) : $.markAsStructValue(new time.Time())
		}
	}

	public clone(): Event {
		return $.markAsStructValue(new Event(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Name", "At"])
	}

	static __typeInfo = $.registerStructType(
		"main.Event",
		() => new Event(),
		() => [],
		Event,
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }, { name: "At", key: "At", type: "time.Time" }]
	)
}

export class Person {
	public declare Name: string

	public declare Age: number

	public declare Active: boolean

	public _fields: {
		Name: string
		Age: number
		Active: boolean
	}

	constructor(init?: Partial<{Name?: string, Age?: number, Active?: boolean}>) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			Age: init?.Age ?? (0 as number),
			Active: init?.Active ?? (false as boolean)
		}
	}

	public clone(): Person {
		return $.markAsStructValue(new Person(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Name", "Age", "Active"])
	}

	static __typeInfo = $.registerStructType(
		"main.Person",
		() => new Person(),
		() => [],
		Person,
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string"), tag: "json:\"name\"" }, { name: "Age", key: "Age", type: /* @__PURE__ */ $.basicType("int"), tag: "json:\"age\"" }, { name: "Active", key: "Active", type: /* @__PURE__ */ $.basicType("bool"), tag: "json:\"active\"" }]
	)
}

export async function main(): globalThis.Promise<void> {
	let results: $.Slice<string> = null! as $.Slice<string>

	// Marshal a simple struct
	let p = $.markAsStructValue(new Person({Name: "Alice", Age: 30, Active: true}))
	let __goscriptTuple0: any = json.Marshal($.interfaceValue($.markAsStructValue($.cloneStructValue(p)), "main.Person", "main.Person"))
	let b: $.Slice<number> = __goscriptTuple0[0]
	let err = __goscriptTuple0[1]
	if (err != null) {
		results = $.append(results, $.concatString("Marshal error: ", await $.pointerValue<Exclude<$.GoError, null>>(err).Error()))
	} else {
		results = $.append(results, $.concatString("Marshal: ", $.bytesToString(b)))
	}
	let __goscriptTuple1: any = json.MarshalIndent($.interfaceValue($.markAsStructValue($.cloneStructValue(p)), "main.Person", "main.Person"), "", "  ")
	let indented: $.Slice<number> = __goscriptTuple1[0]
	err = __goscriptTuple1[1]
	if (err != null) {
		results = $.append(results, $.concatString("MarshalIndent error: ", await $.pointerValue<Exclude<$.GoError, null>>(err).Error()))
	} else {
		results = $.append(results, $.concatString("MarshalIndent: ", strings.ReplaceAll($.bytesToString(indented), "\n", "|")))
	}

	// Unmarshal into a struct
	let q: $.VarRef<Person> = $.varRef($.markAsStructValue(new Person()))
	{
		let __goscriptShadow0 = json.Unmarshal(new Uint8Array([123, 34, 110, 97, 109, 101, 34, 58, 34, 66, 111, 98, 34, 44, 34, 97, 103, 101, 34, 58, 50, 53, 44, 34, 97, 99, 116, 105, 118, 101, 34, 58, 102, 97, 108, 115, 101, 125]), $.interfaceValue(q, "*main.Person", /* @__PURE__ */ $.pointerType("main.Person")))
		if (__goscriptShadow0 != null) {
			results = $.append(results, $.concatString("Unmarshal struct error: ", await $.pointerValue<Exclude<$.GoError, null>>(__goscriptShadow0).Error()))
		} else {
			results = $.append(results, $.concatString(($.concatString(($.concatString(($.concatString(($.concatString("Unmarshal struct: Name=", q.value.Name)), ", Age=")), strconv.Itoa(q.value.Age))), ", Active=")), strconv.FormatBool(q.value.Active)))
		}
	}

	// Unmarshal into a map[string]any
	let m: $.VarRef<globalThis.Map<string, any> | null> = $.varRef(null! as globalThis.Map<string, any> | null)
	{
		let __goscriptShadow1 = json.Unmarshal(new Uint8Array([123, 34, 110, 97, 109, 101, 34, 58, 34, 67, 97, 114, 111, 108, 34, 44, 34, 97, 103, 101, 34, 58, 50, 50, 44, 34, 97, 99, 116, 105, 118, 101, 34, 58, 116, 114, 117, 101, 125]), $.interfaceValue(m, "*map[string]interface{}", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), { kind: $.TypeKind.Interface, methods: [] }))))
		if (__goscriptShadow1 != null) {
			results = $.append(results, $.concatString("Unmarshal map error: ", await $.pointerValue<Exclude<$.GoError, null>>(__goscriptShadow1).Error()))
		} else {
			let name = $.mustTypeAssert<string>($.mapGet<string, any, any>(m.value, "name", null)[0], /* @__PURE__ */ $.basicType("string"))
			let age = $.int($.mustTypeAssert<number>($.mapGet<string, any, any>(m.value, "age", null)[0], /* @__PURE__ */ $.basicType("float64")))
			let active = $.mustTypeAssert<boolean>($.mapGet<string, any, any>(m.value, "active", null)[0], /* @__PURE__ */ $.basicType("bool"))
			results = $.append(results, $.concatString(($.concatString(($.concatString(($.concatString(($.concatString("Unmarshal map: name=", name)), ", age=")), strconv.Itoa(age))), ", active=")), strconv.FormatBool(active)))
		}
	}

	// Sort results for deterministic output
	slices.Sort(results)

	for (let __goscriptRangeTarget0 = results, __rangeIndex = 0; __rangeIndex < $.len(__goscriptRangeTarget0); __rangeIndex++) {
		let r = __goscriptRangeTarget0![__rangeIndex]
		await $.println("JSON result:", r)
	}

	// A Number in an interface carries all of its methods, including
	// the json/v2 MarshalJSONTo and UnmarshalJSONFrom.
	let num: fmt.Stringer | null = $.namedValueInterfaceValue<fmt.Stringer | null>(globalThis.String("12.5"), "json.Number", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2())
	await $.println("Number as Stringer:", await $.pointerValue<Exclude<fmt.Stringer, null>>(num).String())

	// Decoding an object into a non-nil map adds to the existing entries.
	let mp: $.VarRef<globalThis.Map<string, number> | null> = $.varRef($.makeMap<string, number>([["a", 1], ["b", 2]]))
	let to: any = $.interfaceValue(mp, "*map[string]float32", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("float32"))))
	err = json.Unmarshal(new Uint8Array([123, 34, 98, 34, 58, 53, 44, 34, 99, 34, 58, 51, 125]), to)
	await $.println("merge any:", err == null, $.len(mp.value), $.mapGet<string, number, number>(mp.value, "a", 0)[0], $.mapGet<string, number, number>(mp.value, "b", 0)[0], $.mapGet<string, number, number>(mp.value, "c", 0)[0])
	let m2: $.VarRef<globalThis.Map<string, number> | null> = $.varRef($.makeMap<string, number>([["x", 1]]))
	json.Unmarshal(new Uint8Array([123, 34, 121, 34, 58, 50, 125]), $.interfaceValue(m2, "*map[string]int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int")))))
	await $.println("merge typed:", $.len(m2.value), $.mapGet<string, number, number>(m2.value, "x", 0)[0], $.mapGet<string, number, number>(m2.value, "y", 0)[0])
	let m3: $.VarRef<globalThis.Map<string, number> | null> = $.varRef(null! as globalThis.Map<string, number> | null)
	json.Unmarshal(new Uint8Array([123, 34, 122, 34, 58, 51, 125]), $.interfaceValue(m3, "*map[string]int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int")))))
	await $.println("nil map:", $.len(m3.value), $.mapGet<string, number, number>(m3.value, "z", 0)[0])
	let h = $.varRef($.markAsStructValue(new Holder({Tags: $.makeMap<string, number>([["keep", 1]])})))
	json.Unmarshal(new Uint8Array([123, 34, 84, 97, 103, 115, 34, 58, 123, 34, 97, 100, 100, 34, 58, 50, 125, 125]), $.interfaceValue(h, "*main.Holder", /* @__PURE__ */ $.pointerType("main.Holder")))
	await $.println("merge field:", $.len(h.value.Tags), $.mapGet<string, number, number>(h.value.Tags, "keep", 0)[0], $.mapGet<string, number, number>(h.value.Tags, "add", 0)[0])

	await byteSliceFields()
	await timeField()

	await $.println("encoding/json test finished")
}

export async function byteSliceFields(): globalThis.Promise<void> {
	let e: Enc | $.VarRef<Enc> | null = new Enc({Width: 2, Image: new Uint8Array([1, 2, 250]) as $.Slice<number>, Frames: $.arrayToSlice<$.Slice<number>>([new Uint8Array([3]) as $.Slice<number>, new Uint8Array([4, 5]) as $.Slice<number>]), Named: $.makeMap<string, $.Slice<number>>([["a", new Uint8Array([6, 7]) as $.Slice<number>]]), Nested: new Enc({Image: new Uint8Array([104, 105])})})
	let __goscriptTuple2: any = json.Marshal($.interfaceValue(e, "*main.Enc", /* @__PURE__ */ $.pointerType("main.Enc")))
	let b: $.Slice<number> = __goscriptTuple2[0]
	let err = __goscriptTuple2[1]
	await $.println($.bytesToString(b), err == null)

	let d: Enc | $.VarRef<Enc> | null = new Enc()
	err = json.Unmarshal(b, $.interfaceValue(d, "*main.Enc", /* @__PURE__ */ $.pointerType("main.Enc")))
	await $.println("err:", err == null, "width:", $.pointerValue<Enc>(d).Width)
	await $.println("image:", $.len($.pointerValue<Enc>(d).Image), $.uint($.arrayIndex($.pointerValue<Enc>(d).Image!, 0), 8), $.uint($.arrayIndex($.pointerValue<Enc>(d).Image!, 2), 8))
	await $.println("frames:", $.len($.pointerValue<Enc>(d).Frames), $.len($.arrayIndex($.pointerValue<Enc>(d).Frames!, 1)), $.uint($.arrayIndex($.arrayIndex($.pointerValue<Enc>(d).Frames!, 1)!, 1), 8))
	await $.println("named:", $.len($.mapGet<string, $.Slice<number>, $.Slice<number>>($.pointerValue<Enc>(d).Named, "a", null)[0]), $.uint($.arrayIndex($.mapGet<string, $.Slice<number>, $.Slice<number>>($.pointerValue<Enc>(d).Named, "a", null)[0]!, 1), 8))
	await $.println("nested:", $.bytesToString($.pointerValue<Enc>($.pointerValue<Enc>(d).Nested).Image))

	err = json.Unmarshal(new Uint8Array([123, 34, 73, 109, 97, 103, 101, 34, 58, 110, 117, 108, 108, 125]), $.interfaceValue(d, "*main.Enc", /* @__PURE__ */ $.pointerType("main.Enc")))
	await $.println("null image:", err == null, $.pointerValue<Enc>(d).Image == null)
}

export async function timeField(): globalThis.Promise<void> {
	let at = $.markAsStructValue($.cloneStructValue(time.Date(2025, 5, 15, 1, 10, 42, 123456789, time.UTC)))
	let __goscriptTuple3: any = json.Marshal($.interfaceValue($.markAsStructValue(new Event({Name: "win", At: $.markAsStructValue($.cloneStructValue(at))})), "main.Event", "main.Event"))
	let b: $.Slice<number> = __goscriptTuple3[0]
	let err = __goscriptTuple3[1]
	await $.println($.bytesToString(b), err == null)
	let ev: $.VarRef<Event> = $.varRef($.markAsStructValue(new Event()))
	err = json.Unmarshal(b, $.interfaceValue(ev, "*main.Event", /* @__PURE__ */ $.pointerType("main.Event")))
	await $.println("event:", err == null, ev.value.Name, $.markAsStructValue($.cloneStructValue(ev.value.At)).Equal($.markAsStructValue($.cloneStructValue(at))))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({Float64: (receiver: any, ...args: any[]) => (json.Number_Float64 as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), Int64: (receiver: any, ...args: any[]) => (json.Number_Int64 as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), MarshalJSONTo: (receiver: any, ...args: any[]) => (json.Number_MarshalJSONTo as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), String: (receiver: any, ...args: any[]) => (json.Number_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= (/* @__PURE__ */ $.basicType("string", "json.Number"))
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ([$.methodSignature("Float64", [], [/* @__PURE__ */ $.basicType("float64"), "error"]), $.methodSignature("Int64", [], [/* @__PURE__ */ $.basicType("int64"), "error"]), $.methodSignature("MarshalJSONTo", [["enc", /* @__PURE__ */ $.pointerType("jsontext.Encoder")]], ["error"]), $.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])])
}

if ($.isMainScript(import.meta)) {
	await main()
}
