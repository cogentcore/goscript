// Generated file based on package_import_log_slog.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as bytes from "@goscript/bytes/index.js"

import * as slog from "@goscript/log/slog/index.js"

import type * as io from "@goscript/io/index.js"
import "@goscript/bytes/index.js"
import "@goscript/log/slog/index.js"

export async function main(): globalThis.Promise<void> {
	let s = slog.StringValue("hello")
	await $.println(slog.Kind_String(s.Kind()), await s.String())
	await $.println(await $.markAsStructValue($.cloneStructValue(slog.IntValue(42))).Int64(), await $.markAsStructValue($.cloneStructValue(slog.Int64Value(-7n))).String())
	await $.println(await $.markAsStructValue($.cloneStructValue(slog.BoolValue(true))).Bool(), await $.markAsStructValue($.cloneStructValue(slog.Float64Value(1.5))).Float64())

	let a = slog.String("name", "gopher")
	await $.println(a.Key, await a.Value.String(), await a.String())
	await $.println(await $.markAsStructValue($.cloneStructValue(slog.Int("n", 3))).String(), await $.markAsStructValue($.cloneStructValue(slog.Any("x", $.interfaceValue($.arrayToSlice<number>([1, 2]), "[]int", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")))))).String())

	let g = slog.Group("g", $.arrayToSlice<any>([$.interfaceValue(slog.String("a", "x"), "slog.Attr", "slog.Attr"), $.interfaceValue(slog.Int("b", 2), "slog.Attr", "slog.Attr")]))
	let attrs: $.Slice<slog.Attr> = g.Value.Group()
	await $.println(slog.Kind_String(g.Value.Kind()), $.sliceLen(attrs), $.arrayIndex(attrs!, 0).Key, await $.markAsStructValue($.cloneStructValue($.arrayIndex(attrs!, 1).Value)).Int64())
	await $.println(await g.String())
	await $.println(await $.markAsStructValue($.cloneStructValue(slog.StringValue("a"))).Equal(slog.StringValue("a")), await s.Equal(slog.StringValue("other")))

	let buf: $.VarRef<bytes.Buffer> = $.varRef($.markAsStructValue(new bytes.Buffer()))
	let logger: slog.Logger | $.VarRef<slog.Logger> | null = slog.New($.interfaceValue<slog.Handler | null>(slog.NewTextHandler($.interfaceValue<io.Writer | null>(buf, "*bytes.Buffer", /* @__PURE__ */ $.pointerType("bytes.Buffer")), new slog.HandlerOptions({ReplaceAttr: $.functionValue((groups: $.Slice<string>, a: slog.Attr): slog.Attr => {
		if (($.stringEqual(a.Key, slog.TimeKey)) && ($.sliceLen(groups) == 0)) {
			return new slog.Attr(undefined, true)
		}
		return (a).clone()
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string")), "slog.Attr"], results: ["slog.Attr"] } as $.FunctionTypeInfo))})), "*slog.TextHandler", /* @__PURE__ */ $.pointerType("slog.TextHandler")))
	await slog.Logger.prototype.Info.call(logger, "text message", $.arrayToSlice<any>(["count", $.basicInterfaceValue(3, "int"), "name", "go pher", $.interfaceValue(slog.Group("grp", $.arrayToSlice<any>(["k", "v"])), "slog.Attr", "slog.Attr")]))
	await $.print(buf.value.String())

	buf.value.Reset()
	let jl: slog.Logger | $.VarRef<slog.Logger> | null = slog.New($.interfaceValue<slog.Handler | null>(slog.NewJSONHandler($.interfaceValue<io.Writer | null>(buf, "*bytes.Buffer", /* @__PURE__ */ $.pointerType("bytes.Buffer")), new slog.HandlerOptions({Level: $.namedValueInterfaceValue<slog.Leveler | null>(slog.LevelDebug, "slog.Level", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()), ReplaceAttr: $.functionValue((groups: $.Slice<string>, a: slog.Attr): slog.Attr => {
		if (($.stringEqual(a.Key, slog.TimeKey)) && ($.sliceLen(groups) == 0)) {
			return new slog.Attr(undefined, true)
		}
		return (a).clone()
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string")), "slog.Attr"], results: ["slog.Attr"] } as $.FunctionTypeInfo))})), "*slog.JSONHandler", /* @__PURE__ */ $.pointerType("slog.JSONHandler")))
	await slog.Logger.prototype.Debug.call(jl, "json message", $.arrayToSlice<any>(["ok", true, $.interfaceValue(slog.Group("grp", $.arrayToSlice<any>([$.interfaceValue(slog.Int("i", 1), "slog.Attr", "slog.Attr")])), "slog.Attr", "slog.Attr")]))
	await slog.Logger.prototype.Warn.call(await slog.Logger.prototype.WithGroup.call(await (jl !== null && (jl as any).__isVarRef !== true && (jl as any).__goValue === undefined ? (jl as unknown as slog.Logger).With($.arrayToSlice<any>(["w", "x"])) : slog.Logger.prototype.With.call(jl, $.arrayToSlice<any>(["w", "x"]))), "sub"), "with", $.arrayToSlice<any>(["y", $.basicInterfaceValue(2.5, "float64")]))
	await $.print(buf.value.String())

	let old: slog.Logger | $.VarRef<slog.Logger> | null = slog.Default()
	await slog.SetDefault(logger)
	buf.value.Reset()
	await slog.Error("default", $.arrayToSlice<any>(["err", "boom"]))
	await $.print(buf.value.String())
	await slog.SetDefault(old)
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({AppendText: (receiver: any, ...args: any[]) => (slog.Level_AppendText as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), Level: (receiver: any, ...args: any[]) => (slog.Level_Level as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), MarshalJSON: (receiver: any, ...args: any[]) => (slog.Level_MarshalJSON as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), MarshalText: (receiver: any, ...args: any[]) => (slog.Level_MarshalText as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), String: (receiver: any, ...args: any[]) => (slog.Level_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= (/* @__PURE__ */ $.basicType("int", "slog.Level"))
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ([$.methodSignature("AppendText", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")), "error"]), $.methodSignature("Level", [], [/* @__PURE__ */ $.basicType("int", "slog.Level")]), $.methodSignature("MarshalJSON", [], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")), "error"]), $.methodSignature("MarshalText", [], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")), "error"]), $.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])])
}

if ($.isMainScript(import.meta)) {
	await main()
}
