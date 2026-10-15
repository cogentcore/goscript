// Generated file based on override_func_value_interface_param.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as bytes from "@goscript/bytes/index.js"
import * as json from "@goscript/encoding/json/index.js"
import * as io from "@goscript/io/index.js"
import * as strings from "@goscript/strings/index.js"
import "@goscript/encoding/json/index.js"
import "@goscript/io/index.js"

export type Decoder = {
	Decode(v: any): $.GoError | globalThis.Promise<$.GoError>
}

$.registerInterfaceType(
	"main.Decoder",
	null,
	[{ name: "Decode", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "error" }] }]
);

export type DecoderFunc = ((r: io.Reader | null) => Decoder | null | globalThis.Promise<Decoder | null>) | null

export type Encoder = {
	Encode(v: any): $.GoError | globalThis.Promise<$.GoError>
}

$.registerInterfaceType(
	"main.Encoder",
	null,
	[{ name: "Encode", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "error" }] }]
);

export type EncoderFunc = ((w: io.Writer | null) => Encoder | null | globalThis.Promise<Encoder | null>) | null

export function NewDecoderFunc(__typeArgs: $.GenericTypeArgs | undefined, f: ((r: io.Reader | null) => any | globalThis.Promise<any>) | null): DecoderFunc | null {
	return $.functionValue((r: io.Reader | null): Decoder | null => {
		return $.typeParamInterfaceValue<Decoder | null>((f!(r) as any), __typeArgs?.["T"] ?? { type: { kind: $.TypeKind.Interface, methods: [$.methodSignature("Decode", [["v", { kind: $.TypeKind.Interface, methods: [] }]], ["error"])] }, zero: () => null })
	}, ({ kind: $.TypeKind.Function, params: ["io.Reader"], results: ["main.Decoder"] } as $.FunctionTypeInfo))
}

export function NewEncoderFunc(__typeArgs: $.GenericTypeArgs | undefined, f: ((w: io.Writer | null) => any | globalThis.Promise<any>) | null): EncoderFunc | null {
	return $.functionValue((w: io.Writer | null): Encoder | null => {
		return $.typeParamInterfaceValue<Encoder | null>((f!(w) as any), __typeArgs?.["T"] ?? { type: { kind: $.TypeKind.Interface, methods: [$.methodSignature("Encode", [["v", { kind: $.TypeKind.Interface, methods: [] }]], ["error"])] }, zero: () => null })
	}, ({ kind: $.TypeKind.Function, params: ["io.Writer"], results: ["main.Encoder"] } as $.FunctionTypeInfo))
}

export async function decode(f: ((r: io.Reader | null) => Decoder | null | globalThis.Promise<Decoder | null>) | null, s: string): globalThis.Promise<void> {
	let v: $.VarRef<globalThis.Map<string, number> | null> = $.varRef(null! as globalThis.Map<string, number> | null)
	{
		let err = (__goscriptAwait = $.pointerValue<Exclude<Decoder, null>>((f!($.interfaceValue<io.Reader | null>(strings.NewReader(s), "*strings.Reader", /* @__PURE__ */ $.pointerType("strings.Reader"))) as Decoder | null)).Decode($.interfaceValue(v, "*map[string]int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int"))))), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
		if (err != null) {
			await $.println("error:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
			return
		}
	}
	await $.println($.mapGet<string, number, number>(v.value, "a", 0)[0])
}

export async function writeBytes(v: any, f: ((w: io.Writer | null) => Encoder | null | globalThis.Promise<Encoder | null>) | null): globalThis.Promise<string> {
	let b = $.varRef($.markAsStructValue(new bytes.Buffer()))
	{
		let err = (__goscriptAwait = $.pointerValue<Exclude<Encoder, null>>((f!($.interfaceValue<io.Writer | null>(b, "*bytes.Buffer", /* @__PURE__ */ $.pointerType("bytes.Buffer"))) as Encoder | null)).Encode(v), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
		if (err != null) {
			return "error: " + (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
		}
	}
	return b.value.String()
}

export async function main(): globalThis.Promise<void> {
	await decode(NewDecoderFunc(__goscriptStatic0(), ((__goscriptFn: typeof json.NewDecoder) => (__goscriptArg0: io.Reader | null) => __goscriptFn($.pointerValueOrNil(__goscriptArg0)!))(json.NewDecoder)), "{\"a\": 1}")

	let newDecoder: ((r: io.Reader | null) => json.Decoder | $.VarRef<json.Decoder> | null | globalThis.Promise<json.Decoder | $.VarRef<json.Decoder> | null>) | null = ((__goscriptFn: typeof json.NewDecoder) => (__goscriptArg0: io.Reader | null) => __goscriptFn($.pointerValueOrNil(__goscriptArg0)!))(json.NewDecoder)
	let v: $.VarRef<globalThis.Map<string, number> | null> = $.varRef(null! as globalThis.Map<string, number> | null)
	await json.Decoder.prototype.Decode.call($.pointerValue<json.Decoder>((newDecoder!($.interfaceValue<io.Reader | null>(strings.NewReader("{\"a\": 2}"), "*strings.Reader", /* @__PURE__ */ $.pointerType("strings.Reader"))) as json.Decoder | $.VarRef<json.Decoder> | null)), $.interfaceValue(v, "*map[string]int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int")))))
	await $.println($.mapGet<string, number, number>(v.value, "a", 0)[0])

	// The writer is a pointer to a local variable.
	await $.print(await writeBytes($.interfaceValue($.makeMap<string, number>([["b", 3]]), "map[string]int", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int"))), NewEncoderFunc(__goscriptStatic1(), ((__goscriptFn: typeof json.NewEncoder) => (__goscriptArg0: io.Writer | null) => __goscriptFn($.pointerValueOrNil(__goscriptArg0)!))(json.NewEncoder))))
	let newEncoder: ((w: io.Writer | null) => json.Encoder | $.VarRef<json.Encoder> | null | globalThis.Promise<json.Encoder | $.VarRef<json.Encoder> | null>) | null = ((__goscriptFn: typeof json.NewEncoder) => (__goscriptArg0: io.Writer | null) => __goscriptFn($.pointerValueOrNil(__goscriptArg0)!))(json.NewEncoder)
	let buf = $.varRef($.markAsStructValue(new bytes.Buffer()))
	await json.Encoder.prototype.Encode.call($.pointerValue<json.Encoder>((newEncoder!($.interfaceValue<io.Writer | null>(buf, "*bytes.Buffer", /* @__PURE__ */ $.pointerType("bytes.Buffer"))) as json.Encoder | $.VarRef<json.Encoder> | null)), $.interfaceValue($.arrayToSlice<number>([4, 5]), "[]int", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"))))
	await $.print(buf.value.String())
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.pointerType("json.Decoder"), zero: () => null, methods: {Buffered: (receiver: any) => $.pointerValue(receiver).Buffered(), Decode: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Decode(...$.stripGenericTypeArgs(args)), DisallowUnknownFields: (receiver: any) => $.pointerValue(receiver).DisallowUnknownFields(), InputOffset: (receiver: any) => $.pointerValue(receiver).InputOffset(), More: (receiver: any) => $.pointerValue(receiver).More(), Token: (receiver: any) => $.pointerValue(receiver).Token(), UseNumber: (receiver: any) => $.pointerValue(receiver).UseNumber()} }})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.pointerType("json.Encoder"), zero: () => null, methods: {Encode: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Encode(...$.stripGenericTypeArgs(args)), SetEscapeHTML: (receiver: any, ...args: any[]) => $.pointerValue(receiver).SetEscapeHTML(...$.stripGenericTypeArgs(args)), SetIndent: (receiver: any, ...args: any[]) => $.pointerValue(receiver).SetIndent(...$.stripGenericTypeArgs(args))} }})
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
