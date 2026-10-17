// Generated file based on override_missing_exports.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as mime from "@goscript/mime/index.js"
import * as runtime from "@goscript/runtime/index.js"
import * as unicode from "@goscript/unicode/index.js"
import "@goscript/mime/index.js"
import "@goscript/runtime/index.js"

export type encoder = {
	Encode(charset: string, s: string): string
}

$.registerInterfaceType(
	"main.encoder",
	null,
	[{ name: "Encode", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }, { type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }]
);

export async function encode(__typeArgs: $.GenericTypeArgs | undefined, e: any, s: string): globalThis.Promise<string> {
	return $.callGenericMethod(__typeArgs, "T", "Encode", e, "utf-8", s)
}

export async function main(): globalThis.Promise<void> {
	// A method of an override class, called through its method function.
	await $.println("upper:", $.stringEqual($.runeToString(unicode.SpecialCase_ToUpper(unicode.TurkishCase, 105)), "\xc4\xb0"))
	let lower: ((r: number) => number | globalThis.Promise<number>) | null = $.functionValue(((__receiver) => (r: number) => unicode.SpecialCase_ToLower(__receiver, r))(unicode.TurkishCase), ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int32")], results: [/* @__PURE__ */ $.basicType("int32")] } as $.FunctionTypeInfo), "unicode.SpecialCase.ToLower-fm")
	await $.println("lower:", $.stringEqual($.runeToString((lower!(73) as number)), "\xc4\xb1"))

	// A generic call passes the method table of an override type.
	await $.println("encode:", await encode(__goscriptStatic0(), 113, "hi"))

	// Functions and variables the override does not implement exist.
	let profile: ((p: $.Slice<runtime.MemProfileRecord>, inuseZero: boolean) => [number, boolean] | globalThis.Promise<[number, boolean]>) | null = runtime.MemProfile
	await $.println("profile:", profile != null)
	await $.println("rate:", runtime.MemProfileRate)
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("uint8", "mime.WordEncoder"), zero: () => 0, methods: {Encode: (receiver: any, ...args: any[]) => (mime.WordEncoder_Encode as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), bEncode: (receiver: any, ...args: any[]) => (mime.WordEncoder_bEncode as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), encodeWord: (receiver: any, ...args: any[]) => (mime.WordEncoder_encodeWord as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), openWord: (receiver: any, ...args: any[]) => (mime.WordEncoder_openWord as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), qEncode: (receiver: any, ...args: any[]) => (mime.WordEncoder_qEncode as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), splitWord: (receiver: any, ...args: any[]) => (mime.WordEncoder_splitWord as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))}, methodSignatures: [$.methodSignature("Encode", [["charset", /* @__PURE__ */ $.basicType("string")], ["s", /* @__PURE__ */ $.basicType("string")]], [/* @__PURE__ */ $.basicType("string")]), $.methodSignature("bEncode", [["buf", /* @__PURE__ */ $.pointerType("strings.Builder")], ["charset", /* @__PURE__ */ $.basicType("string")], ["s", /* @__PURE__ */ $.basicType("string")]]), $.methodSignature("encodeWord", [["charset", /* @__PURE__ */ $.basicType("string")], ["s", /* @__PURE__ */ $.basicType("string")]], [/* @__PURE__ */ $.basicType("string")]), $.methodSignature("openWord", [["buf", /* @__PURE__ */ $.pointerType("strings.Builder")], ["charset", /* @__PURE__ */ $.basicType("string")]]), $.methodSignature("qEncode", [["buf", /* @__PURE__ */ $.pointerType("strings.Builder")], ["charset", /* @__PURE__ */ $.basicType("string")], ["s", /* @__PURE__ */ $.basicType("string")]]), $.methodSignature("splitWord", [["buf", /* @__PURE__ */ $.pointerType("strings.Builder")], ["charset", /* @__PURE__ */ $.basicType("string")]])] }})
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
