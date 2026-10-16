// Generated file based on package_import_log_slog.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as bytes from "@goscript/bytes/index.js"
import * as slog from "@goscript/log/slog/index.js"
import type * as io from "@goscript/io/index.js"

export async function main(): globalThis.Promise<void> {
	let s = slog.StringValue("hello")
	await $.println(slog.Kind_String(s.Kind()), await s.String())
	await $.println($.markAsStructValue($.cloneStructValue(slog.IntValue(42))).Int64(), await $.markAsStructValue($.cloneStructValue(slog.Int64Value(-7n))).String())
	await $.println($.markAsStructValue($.cloneStructValue(slog.BoolValue(true))).Bool(), $.markAsStructValue($.cloneStructValue(slog.Float64Value(1.5))).Float64())

	let a = slog.String("name", "gopher")
	await $.println(a.Key, await a.Value.String(), await a.String())
	await $.println(await $.markAsStructValue($.cloneStructValue(slog.Int("n", 3))).String(), await $.markAsStructValue($.cloneStructValue(slog.Any("x", $.interfaceValue($.arrayToSlice<number>([1, 2]), "[]int", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")))))).String())

	let g = slog.Group("g", $.arrayToSlice<any>([$.structInterfaceValue(slog.String("a", "x"), "slog.Attr", "slog.Attr"), $.structInterfaceValue(slog.Int("b", 2), "slog.Attr", "slog.Attr")]))
	let attrs = g.Value.Group()
	await $.println(slog.Kind_String(g.Value.Kind()), $.sliceLen(attrs), $.arrayIndex(attrs!, 0).Key, $.markAsStructValue($.cloneStructValue($.arrayIndex(attrs!, 1).Value)).Int64())
	await $.println(await g.String())
	await $.println(await $.markAsStructValue($.cloneStructValue(slog.StringValue("a"))).Equal(slog.StringValue("a")), await s.Equal(slog.StringValue("other")))

	let buf = $.varRef($.markAsStructValue(new bytes.Buffer()))
	let logger = slog.New($.interfaceValue<slog.Handler | null>(slog.NewTextHandler($.interfaceValue<io.Writer | null>(buf, "*bytes.Buffer", __goscriptStatic0()), new slog.HandlerOptions(false, undefined, undefined, $.functionValue((groups: $.Slice<string>, a: slog.Attr): slog.Attr => {
		if (($.stringEqual(a.Key, slog.TimeKey)) && ($.sliceLen(groups) == 0)) {
			return new slog.Attr(true)
		}
		return (a).clone()
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string")), "slog.Attr"], results: ["slog.Attr"] } as $.FunctionTypeInfo)))), "*slog.TextHandler", /* @__PURE__ */ $.pointerType("slog.TextHandler")))
	await slog.Logger.prototype.Info.call(logger, "text message", $.arrayToSlice<any>(["count", $.basicInterfaceValue(3, "int"), "name", "go pher", $.structInterfaceValue(slog.Group("grp", $.arrayToSlice<any>(["k", "v"])), "slog.Attr", "slog.Attr")]))
	await $.print(buf.value.String())

	buf.value.Reset()
	let jl = slog.New($.interfaceValue<slog.Handler | null>(slog.NewJSONHandler($.interfaceValue<io.Writer | null>(buf, "*bytes.Buffer", __goscriptStatic0()), new slog.HandlerOptions(false, undefined, $.namedValueInterfaceValue<slog.Leveler | null>(slog.LevelDebug, "slog.Level", __goscriptStatic1(), __goscriptStatic2(), __goscriptStatic3()), $.functionValue((groups: $.Slice<string>, a: slog.Attr): slog.Attr => {
		if (($.stringEqual(a.Key, slog.TimeKey)) && ($.sliceLen(groups) == 0)) {
			return new slog.Attr(true)
		}
		return (a).clone()
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string")), "slog.Attr"], results: ["slog.Attr"] } as $.FunctionTypeInfo)))), "*slog.JSONHandler", /* @__PURE__ */ $.pointerType("slog.JSONHandler")))
	await slog.Logger.prototype.Debug.call(jl, "json message", $.arrayToSlice<any>(["ok", true, $.structInterfaceValue(slog.Group("grp", $.arrayToSlice<any>([$.structInterfaceValue(slog.Int("i", 1), "slog.Attr", "slog.Attr")])), "slog.Attr", "slog.Attr")]))
	await slog.Logger.prototype.Warn.call(slog.Logger.prototype.WithGroup.call(await (jl !== null && (jl as any).__isVarRef !== true && (jl as any).__goValue === undefined ? ((jl as any) as slog.Logger).With($.arrayToSlice<any>(["w", "x"])) : slog.Logger.prototype.With.call(jl, $.arrayToSlice<any>(["w", "x"]))), "sub"), "with", $.arrayToSlice<any>(["y", $.basicInterfaceValue(2.5, "float64")]))
	await $.print(buf.value.String())

	let old = slog.Default()
	await slog.SetDefault(logger)
	buf.value.Reset()
	await slog.Error("default", $.arrayToSlice<any>(["err", "boom"]))
	await $.print(buf.value.String())
	await slog.SetDefault(old)
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ($.overrideTypeMethods(/* @__PURE__ */ $.pointerType("bytes.Buffer"), "bytes.Buffer", () => [$.methodSignature("Available", [], [/* @__PURE__ */ $.basicType("int")], true), $.methodSignature("AvailableBuffer", [], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))], true), $.methodSignature("Bytes", [], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))], true), $.methodSignature("Cap", [], [/* @__PURE__ */ $.basicType("int")], true), $.methodSignature("Grow", [["n", /* @__PURE__ */ $.basicType("int")]], [], true), $.methodSignature("Len", [], [/* @__PURE__ */ $.basicType("int")], true), $.methodSignature("Next", [["n", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))], true), $.methodSignature("Peek", [["n", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")), "error"], true), $.methodSignature("Read", [["p", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("ReadByte", [], [/* @__PURE__ */ $.basicType("uint8"), "error"], true), $.methodSignature("ReadBytes", [["delim", /* @__PURE__ */ $.basicType("uint8")]], [["line", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))], ["err", "error"]], true), $.methodSignature("ReadFrom", [["r", "io.Reader"]], [["n", /* @__PURE__ */ $.basicType("int64")], ["err", "error"]], true), $.methodSignature("ReadRune", [], [["r", /* @__PURE__ */ $.basicType("int32")], ["size", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("ReadString", [["delim", /* @__PURE__ */ $.basicType("uint8")]], [["line", /* @__PURE__ */ $.basicType("string")], ["err", "error"]], true), $.methodSignature("Reset", [], [], true), $.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")], true), $.methodSignature("Truncate", [["n", /* @__PURE__ */ $.basicType("int")]], [], true), $.methodSignature("UnreadByte", [], ["error"], true), $.methodSignature("UnreadRune", [], ["error"], true), $.methodSignature("Write", [["p", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("WriteByte", [["c", /* @__PURE__ */ $.basicType("uint8")]], ["error"], true), $.methodSignature("WriteRune", [["r", /* @__PURE__ */ $.basicType("int32")]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("WriteString", [["s", /* @__PURE__ */ $.basicType("string")]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("WriteTo", [["w", "io.Writer"]], [["n", /* @__PURE__ */ $.basicType("int64")], ["err", "error"]], true)]))
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({AppendText: (receiver: any, ...args: any[]) => (slog.Level_AppendText as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), Level: (receiver: any) => (slog.Level_Level as any)(($.isVarRef(receiver) ? receiver.value : receiver)), MarshalJSON: (receiver: any) => (slog.Level_MarshalJSON as any)(($.isVarRef(receiver) ? receiver.value : receiver)), MarshalText: (receiver: any) => (slog.Level_MarshalText as any)(($.isVarRef(receiver) ? receiver.value : receiver)), String: (receiver: any) => (slog.Level_String as any)(($.isVarRef(receiver) ? receiver.value : receiver))})
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= (/* @__PURE__ */ $.basicType("int", "slog.Level"))
}

var __goscriptStatic3$value: any
function __goscriptStatic3(): any {
	return __goscriptStatic3$value ??= ([$.methodSignature("AppendText", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")), "error"]), $.methodSignature("Level", [], [/* @__PURE__ */ $.basicType("int", "slog.Level")]), $.methodSignature("MarshalJSON", [], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")), "error"]), $.methodSignature("MarshalText", [], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")), "error"]), $.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])])
}

if ($.isMainScript(import.meta)) {
	await main()
}
