// Generated file based on package_import_encoding_json_go127.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as json from "@goscript/encoding/json/index.js"
import * as jsontext from "@goscript/encoding/json/jsontext/index.js"
import * as io from "@goscript/io/index.js"
import * as slices from "@goscript/slices/index.js"
import * as strings from "@goscript/strings/index.js"
import "@goscript/io/index.js"

export async function main(): globalThis.Promise<void> {
	let raw: $.VarRef<json.RawMessage> = $.varRef(null! as json.RawMessage)
	let dec = json.NewDecoder($.pointerValueOrNil($.interfaceValue<io.Reader | null>(strings.NewReader("{\"hello\": true}"), "*strings.Reader", __goscriptStatic0()))!)
	let err = await (dec !== null && (dec as any).__isVarRef !== true && (dec as any).__goValue === undefined ? ((dec as any) as json.Decoder).Decode($.namedValueInterfaceValue<any>(raw, "*jsontext.Value", __goscriptStatic1(), __goscriptStatic2(), __goscriptStatic3())) : json.Decoder.prototype.Decode.call($.pointerValue<json.Decoder>(dec), $.namedValueInterfaceValue<any>(raw, "*jsontext.Value", __goscriptStatic1(), __goscriptStatic2(), __goscriptStatic3())))
	await $.println("RawMessage:", $.bytesToString(raw.value), err == null)
	await $.println("RawMessage EOF:", $.comparableEqual(await (dec !== null && (dec as any).__isVarRef !== true && (dec as any).__goValue === undefined ? ((dec as any) as json.Decoder).Decode($.namedValueInterfaceValue<any>(raw, "*jsontext.Value", __goscriptStatic1(), __goscriptStatic2(), __goscriptStatic3())) : json.Decoder.prototype.Decode.call($.pointerValue<json.Decoder>(dec), $.namedValueInterfaceValue<any>(raw, "*jsontext.Value", __goscriptStatic1(), __goscriptStatic2(), __goscriptStatic3()))), io.EOF))
	await $.println("RawMessage valid:", jsontext.Value_IsValid(raw.value), jsontext.Value_Kind(raw.value))
	await $.println("RawMessage format:", jsontext.Value_Format(raw) == null, $.bytesToString(raw.value))

	let formatted: $.VarRef<json.RawMessage> = $.varRef((new Uint8Array([123, 34, 120, 34, 58, 32, 34, 60, 34, 125]) as json.RawMessage))
	await $.println("RawMessage HTML:", jsontext.Value_Format(formatted, $.pointerValueOrNil(jsontext.EscapeForHTML(true))!) == null, $.bytesToString(formatted.value))
	let duplicates = (new Uint8Array([123, 34, 97, 34, 58, 49, 44, 34, 97, 34, 58, 50, 125]) as json.RawMessage)
	await $.println("RawMessage duplicates:", jsontext.Value_IsValid(duplicates), jsontext.Value_IsValid(duplicates, $.pointerValueOrNil(jsontext.AllowDuplicateNames(true))!))

	let malformed = (new Uint8Array([91, 32, 34, 255, 34, 32, 93]) as $.Slice<number> as json.RawMessage)
	let compact: $.VarRef<jsontext.Value> = $.varRef((jsontext.Value_Clone(malformed) as jsontext.Value))
	await $.println("RawMessage compact bytes:", jsontext.Value_Compact(compact) == null, slices.Equal((compact.value as jsontext.Value), (new Uint8Array([91, 34, 255, 34, 93]) as $.Slice<number> as jsontext.Value)))
	let indentedRaw: $.VarRef<jsontext.Value> = $.varRef((jsontext.Value_Clone(malformed) as jsontext.Value))
	await $.println("RawMessage indent bytes:", jsontext.Value_Indent(indentedRaw, $.pointerValueOrNil(jsontext.WithIndent("  "))!) == null, slices.Equal((indentedRaw.value as jsontext.Value), (new Uint8Array([91, 10, 32, 32, 34, 255, 34, 10, 93]) as $.Slice<number> as jsontext.Value)))
	let normalized: $.VarRef<jsontext.Value> = $.varRef((jsontext.Value_Clone(malformed) as jsontext.Value))
	await $.println("RawMessage invalid UTF8 replacement:", jsontext.Value_Format(normalized, $.pointerValueOrNil(jsontext.AllowInvalidUTF8(true))!) == null, $.bytesToString(normalized.value))
	let surrogate: $.VarRef<json.RawMessage> = $.varRef((new Uint8Array([34, 92, 117, 100, 56, 48, 48, 34]) as json.RawMessage))
	await $.println("RawMessage surrogate replacement:", jsontext.Value_Format(surrogate, $.pointerValueOrNil(jsontext.AllowInvalidUTF8(true))!) == null, $.bytesToString(surrogate.value))
	let ordered: $.VarRef<json.RawMessage> = $.varRef((new Uint8Array([123, 34, 97, 34, 58, 50, 44, 34, 97, 34, 58, 49, 44, 34, 98, 34, 58, 45, 48, 125]) as json.RawMessage))
	await $.println("RawMessage duplicate ordering:", jsontext.Value_Canonicalize(ordered, $.pointerValueOrNil(jsontext.AllowDuplicateNames(true))!, $.pointerValueOrNil(jsontext.CanonicalizeRawInts(false))!) == null, $.bytesToString(ordered.value))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ($.overrideTypeMethods(/* @__PURE__ */ $.pointerType("strings.Reader"), "strings.Reader", () => [$.methodSignature("Len", [], [/* @__PURE__ */ $.basicType("int")], true), $.methodSignature("Read", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("ReadAt", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))], ["off", /* @__PURE__ */ $.basicType("int64")]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("ReadByte", [], [/* @__PURE__ */ $.basicType("uint8"), "error"], true), $.methodSignature("ReadRune", [], [["ch", /* @__PURE__ */ $.basicType("int32")], ["size", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("Reset", [["s", /* @__PURE__ */ $.basicType("string")]], [], true), $.methodSignature("Seek", [["offset", /* @__PURE__ */ $.basicType("int64")], ["whence", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("int64"), "error"], true), $.methodSignature("Size", [], [/* @__PURE__ */ $.basicType("int64")], true), $.methodSignature("UnreadByte", [], ["error"], true), $.methodSignature("UnreadRune", [], ["error"], true), $.methodSignature("WriteTo", [["w", "io.Writer"]], [["n", /* @__PURE__ */ $.basicType("int64")], ["err", "error"]], true)]))
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({Canonicalize: (receiver: any, ...args: any[]) => (jsontext.Value_Canonicalize as any)(receiver, ...$.stripGenericTypeArgs(args)), Clone: (receiver: any) => (jsontext.Value_Clone as any)($.pointerValue(receiver)), Compact: (receiver: any, ...args: any[]) => (jsontext.Value_Compact as any)(receiver, ...$.stripGenericTypeArgs(args)), Format: (receiver: any, ...args: any[]) => (jsontext.Value_Format as any)(receiver, ...$.stripGenericTypeArgs(args)), Indent: (receiver: any, ...args: any[]) => (jsontext.Value_Indent as any)(receiver, ...$.stripGenericTypeArgs(args)), IsValid: (receiver: any, ...args: any[]) => (jsontext.Value_IsValid as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args)), Kind: (receiver: any) => (jsontext.Value_Kind as any)($.pointerValue(receiver)), MarshalJSON: (receiver: any) => (jsontext.Value_MarshalJSON as any)($.pointerValue(receiver)), String: (receiver: any) => (jsontext.Value_String as any)($.pointerValue(receiver)), UnmarshalJSON: (receiver: any, ...args: any[]) => (jsontext.Value_UnmarshalJSON as any)(receiver, ...$.stripGenericTypeArgs(args)), format: (receiver: any, ...args: any[]) => (jsontext.Value_format as any)(receiver, ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= (/* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"), "jsontext.Value")))
}

var __goscriptStatic3$value: any
function __goscriptStatic3(): any {
	return __goscriptStatic3$value ??= ([$.methodSignature("Canonicalize", [["opts", /* @__PURE__ */ $.sliceType("jsonopts.Options")]], ["error"]), $.methodSignature("Clone", [], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"), "jsontext.Value")]), $.methodSignature("Compact", [["opts", /* @__PURE__ */ $.sliceType("jsonopts.Options")]], ["error"]), $.methodSignature("Format", [["opts", /* @__PURE__ */ $.sliceType("jsonopts.Options")]], ["error"]), $.methodSignature("Indent", [["opts", /* @__PURE__ */ $.sliceType("jsonopts.Options")]], ["error"]), $.methodSignature("IsValid", [["opts", /* @__PURE__ */ $.sliceType("jsonopts.Options")]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Kind", [], [/* @__PURE__ */ $.basicType("uint8", "jsontext.Kind")]), $.methodSignature("MarshalJSON", [], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")), "error"]), $.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")]), $.methodSignature("UnmarshalJSON", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], ["error"]), $.methodSignature("format", [["opts1", /* @__PURE__ */ $.sliceType("jsonopts.Options")], ["opts2", /* @__PURE__ */ $.sliceType("jsonopts.Options")]], ["error"])])
}

if ($.isMainScript(import.meta)) {
	await main()
}
