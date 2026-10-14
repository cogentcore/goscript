// Generated file based on package_import_encoding_json_text_unmarshaler_pointer.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as json from "@goscript/encoding/json/index.js"

import * as errors from "@goscript/errors/index.js"
import "@goscript/encoding/json/index.js"
import "@goscript/errors/index.js"

export type Act = bigint

$.registerNamedValueType(
	"*main.Act",
	{UnmarshalText: (receiver: any, ...args: any[]) => (Act_UnmarshalText as any)(receiver, ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("UnmarshalText", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], ["error"])]
);

export type Small = number

$.registerNamedValueType(
	"*main.Small",
	{UnmarshalText: (receiver: any, ...args: any[]) => (Small_UnmarshalText as any)(receiver, ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("UnmarshalText", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], ["error"])]
);

export function Act_UnmarshalText(a: $.VarRef<Act> | null, b: $.Slice<number>): $.GoError {
	switch ($.bytesToString(b)) {
		case "Name":
		{
			a!.value = 3n
			break
		}
		case "Next":
		{
			a!.value = 4n
			break
		}
		default:
		{
			return errors.New("bad act")
			break
		}
	}
	return null
}

export function Small_UnmarshalText(s: $.VarRef<Small> | null, b: $.Slice<number>): $.GoError {
	s!.value = $.int($.int($.len(b), 32), 32)
	return null
}

export async function main(): globalThis.Promise<void> {
	let a: $.VarRef<Act> = $.varRef(0n)
	let err = json.Unmarshal(new Uint8Array([34, 78, 97, 109, 101, 34]), $.namedValueInterfaceValue<any>(a, "*main.Act", {UnmarshalText: (receiver: any, ...args: any[]) => (Act_UnmarshalText as any)(receiver, ...$.stripGenericTypeArgs(args))}, /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int64", "main.Act")), [$.methodSignature("UnmarshalText", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], ["error"])]))
	await $.println(err == null, $.int64(a.value))
	let s: $.VarRef<Small> = $.varRef(0)
	err = json.Unmarshal(new Uint8Array([34, 97, 98, 99, 100, 101, 34]), $.namedValueInterfaceValue<any>(s, "*main.Small", {UnmarshalText: (receiver: any, ...args: any[]) => (Small_UnmarshalText as any)(receiver, ...$.stripGenericTypeArgs(args))}, /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int32", "main.Small")), [$.methodSignature("UnmarshalText", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], ["error"])]))
	await $.println(err == null, $.int($.int(s.value, 32), 32))
	let acts: $.VarRef<$.Slice<Act>> = $.varRef(null! as $.Slice<Act>)
	err = json.Unmarshal(new Uint8Array([91, 34, 78, 101, 120, 116, 34, 44, 34, 78, 97, 109, 101, 34, 93]), $.interfaceValue(acts, "*[]main.Act", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int64", "main.Act")))))
	await $.println(err == null, $.len(acts.value), $.int64($.arrayIndex(acts.value!, 0)), $.int64($.arrayIndex(acts.value!, 1)))
	err = json.Unmarshal(new Uint8Array([34, 66, 111, 103, 117, 115, 34]), $.namedValueInterfaceValue<any>(a, "*main.Act", {UnmarshalText: (receiver: any, ...args: any[]) => (Act_UnmarshalText as any)(receiver, ...$.stripGenericTypeArgs(args))}, /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int64", "main.Act")), [$.methodSignature("UnmarshalText", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], ["error"])]))
	await $.println(err != null)
}

if ($.isMainScript(import.meta)) {
	await main()
}
