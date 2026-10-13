// Generated file based on named_basic_interface_assert.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as json from "@goscript/encoding/json/index.js"

import * as fmt from "@goscript/fmt/index.js"

import * as reflect from "@goscript/reflect/index.js"

import * as strings from "@goscript/strings/index.js"

import type * as io from "@goscript/io/index.js"
import "@goscript/encoding/json/index.js"
import "@goscript/fmt/index.js"
import "@goscript/reflect/index.js"
import "@goscript/strings/index.js"

export type MyInt = number

export type Name = string

export type Stringy = string

export type stringer = {
	String(): string
}

$.registerInterfaceType(
	"main.stringer",
	null,
	[$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]
);

export function Stringy_String(s: Stringy): string {
	return "S:" + s
}

export function toAny(__typeArgs: $.GenericTypeArgs | undefined, v: any): any {
	return $.typeParamInterfaceValue<any>(v, __typeArgs?.["T"] ?? { type: { kind: $.TypeKind.Interface, methods: [] }, zero: () => null })
}

export function toStringer(__typeArgs: $.GenericTypeArgs | undefined, v: any): stringer | null {
	return $.typeParamInterfaceValue<stringer | null>(v, __typeArgs?.["T"] ?? { type: { kind: $.TypeKind.Interface, methods: [$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])] }, zero: () => null })
}

export function kind(v: any): string {
	{
		const __goscriptTypeSwitchValue = v
		switch (true) {
			case $.typeAssert<json.Number>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("string", "json.Number")).ok:
				{
					return "json.Number"
				}
				break
			case $.typeAssert<Name>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("string", "main.Name")).ok:
				{
					return "Name"
				}
				break
			case $.typeAssert<MyInt>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("int32", "main.MyInt")).ok:
				{
					return "MyInt"
				}
				break
			case $.typeAssert<string>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("string")).ok:
				{
					return "string"
				}
				break
			case $.typeAssert<number>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("int32")).ok:
				{
					return "int32"
				}
				break
			case $.typeAssert<number>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("int")).ok:
				{
					return "int"
				}
				break
		}
	}
	return "other"
}

export async function main(): globalThis.Promise<void> {
	let a: any = $.namedValueInterfaceValue<any>(5, "main.MyInt", {}, /* @__PURE__ */ $.basicType("int32", "main.MyInt"))
	let [, ok] = $.typeAssertTuple<MyInt>(a, /* @__PURE__ */ $.basicType("int32", "main.MyInt"))
	await $.println("MyInt as MyInt:", ok)
	let __goscriptTuple0: any = $.typeAssertTuple<number>(a, /* @__PURE__ */ $.basicType("int32"))
	ok = __goscriptTuple0[1]
	await $.println("MyInt as int32:", ok)
	let b: any = $.basicInterfaceValue($.int(5, 32), "int32")
	let __goscriptTuple1: any = $.typeAssertTuple<MyInt>(b, /* @__PURE__ */ $.basicType("int32", "main.MyInt"))
	ok = __goscriptTuple1[1]
	await $.println("int32 as MyInt:", ok)

	for (let __goscriptRangeTarget0 = $.arrayToSlice<any>(["s", $.namedValueInterfaceValue<any>("n", "main.Name", {}, /* @__PURE__ */ $.basicType("string", "main.Name")), $.namedValueInterfaceValue<any>(String("1"), "json.Number", {Float64: (receiver: any, ...args: any[]) => (json.Number_Float64 as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), Int64: (receiver: any, ...args: any[]) => (json.Number_Int64 as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), MarshalJSONTo: (receiver: any, ...args: any[]) => (json.Number_MarshalJSONTo as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), String: (receiver: any, ...args: any[]) => (json.Number_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))}, /* @__PURE__ */ $.basicType("string", "json.Number"), [$.methodSignature("Float64", [], [/* @__PURE__ */ $.basicType("float64"), "error"]), $.methodSignature("Int64", [], [/* @__PURE__ */ $.basicType("int64"), "error"]), $.methodSignature("MarshalJSONTo", [["enc", /* @__PURE__ */ $.pointerType("jsontext.Encoder")]], ["error"]), $.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]), $.namedValueInterfaceValue<any>(1, "main.MyInt", {}, /* @__PURE__ */ $.basicType("int32", "main.MyInt")), $.basicInterfaceValue($.int(2, 32), "int32"), $.basicInterfaceValue(3, "int")]), __rangeIndex = 0; __rangeIndex < $.len(__goscriptRangeTarget0); __rangeIndex++) {
		let v = __goscriptRangeTarget0![__rangeIndex]
		await $.println("switch:", kind(v))
	}

	await $.println("generic:", kind(toAny({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int32", "main.MyInt"), zero: () => 0 }}, 6)), kind(toAny({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("string", "main.Name"), zero: () => "" }}, "g")), kind(toAny({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("string"), zero: () => "" }}, "raw")))
	await $.println("generic stringer:", await $.pointerValue<Exclude<stringer, null>>(toStringer({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("string", "main.Stringy"), zero: () => "", methods: {String: (receiver: any, ...args: any[]) => (Stringy_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))}, methodSignatures: [$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])] }}, "q")).String())
	let __goscriptTuple2: any = $.typeAssertTuple<stringer | null>(toAny({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("string", "main.Stringy"), zero: () => "", methods: {String: (receiver: any, ...args: any[]) => (Stringy_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))}, methodSignatures: [$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])] }}, "r"), "main.stringer")
	ok = __goscriptTuple2[1]
	await $.println("generic any stringer:", ok)

	await $.println("reflect:", kind($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.namedValueInterfaceValue<any>(7, "main.MyInt", {}, /* @__PURE__ */ $.basicType("int32", "main.MyInt"))))).Interface()), await $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf(a)).String())
	class holder {
		public declare N: Name

		public declare Is: $.Slice<MyInt>

		public _fields: {
			N: Name
			Is: $.Slice<MyInt>
		}

		constructor(init?: Partial<{N?: Name, Is?: $.Slice<MyInt>}>) {
			this._fields = {
				N: init?.N ?? ("" as Name),
				Is: init?.Is ?? (null! as $.Slice<MyInt>)
			}
		}

		public clone(): holder {
			return $.markAsStructValue(new holder(this))
		}

		static {
			$.bindStructFields(this.prototype, ["N", "Is"])
		}

		static __typeInfo = $.registerStructType(
			"main.holder",
			() => new holder(),
			() => [],
			holder,
			() => [/* @__PURE__ */ $.structField("N", /* @__PURE__ */ $.basicType("string", "main.Name"), [0], 0, true), /* @__PURE__ */ $.structField("Is", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int32", "main.MyInt")), [1], 16, true)]
		)
	}
	let hv = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.markAsStructValue(new holder({N: "h", Is: $.arrayToSlice<MyInt>([9])})), "main.holder", "main.holder"))))
	await $.println("reflect field:", kind($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(hv)).Field(0))).Interface()), kind($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(hv)).Field(1))).Index(0))).Interface()))

	await $.println("equal:", $.comparableEqual(a, $.namedValueInterfaceValue<any>(5, "main.MyInt", {}, /* @__PURE__ */ $.basicType("int32", "main.MyInt"))), $.comparableEqual(a, b), $.comparableEqual(a, $.namedValueInterfaceValue<any>(6, "main.MyInt", {}, /* @__PURE__ */ $.basicType("int32", "main.MyInt"))))

	let m: globalThis.Map<string, Name> | null = $.makeMap<string, Name>([["k", "v"]])
	let am: any = $.interfaceValue(m, "map[string]main.Name", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("string", "main.Name")))
	let __goscriptTuple3: any = $.typeAssertTuple<globalThis.Map<string, Name> | null>(am, /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("string", "main.Name")))
	ok = __goscriptTuple3[1]
	await $.println("map:", ok)

	let d: json.Decoder | $.VarRef<json.Decoder> | null = json.NewDecoder($.pointerValueOrNil($.interfaceValue<io.Reader | null>(strings.NewReader("{\"n\": 12}"), "*strings.Reader", /* @__PURE__ */ $.pointerType("strings.Reader")))!)
	json.Decoder.prototype.UseNumber.call($.pointerValue<json.Decoder>(d))
	let obj: $.VarRef<globalThis.Map<string, any> | null> = $.varRef(null! as globalThis.Map<string, any> | null)
	{
		let err = await json.Decoder.prototype.Decode.call($.pointerValue<json.Decoder>(d), $.interfaceValue(obj, "*map[string]interface{}", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), { kind: $.TypeKind.Interface, methods: [] }))))
		if (err != null) {
			await $.println(await $.pointerValue<Exclude<$.GoError, null>>(err).Error())
		}
	}
	await $.println("json UseNumber:", kind($.mapGet<string, any, any>(obj.value, "n", null)[0]))

	await $.println("fmt:", await fmt.Sprint($.namedValueInterfaceValue<any>(8, "main.MyInt", {}, /* @__PURE__ */ $.basicType("int32", "main.MyInt")), " ", $.namedValueInterfaceValue<any>("p", "main.Name", {}, /* @__PURE__ */ $.basicType("string", "main.Name")), " ", a))
}

if ($.isMainScript(import.meta)) {
	await main()
}
