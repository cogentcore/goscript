// Generated file based on package_import_runtime_policy.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as bytes from "@goscript/bytes/index.js"
import * as context from "@goscript/context/index.js"
import * as runtime from "@goscript/runtime/index.js"
import * as pprof from "@goscript/runtime/pprof/index.js"
import * as trace from "@goscript/runtime/trace/index.js"
import type * as io from "@goscript/io/index.js"

export async function main(): globalThis.Promise<void> {
	await $.println("runtime trace:", runtime.StartTrace() != null)

	let profile = $.varRef($.markAsStructValue(new bytes.Buffer()))
	await $.println("pprof:", pprof.StartCPUProfile($.pointerValueOrNil($.interfaceValue<io.Writer | null>(profile, "*bytes.Buffer", __goscriptStatic0()))!) != null, pprof.Profile.prototype.WriteTo.call($.pointerValue<pprof.Profile>(pprof.Lookup("heap")), $.pointerValueOrNil($.interfaceValue<io.Writer | null>(profile, "*bytes.Buffer", __goscriptStatic0()))!, 0) != null)

	let traceBuf = $.varRef($.markAsStructValue(new bytes.Buffer()))
	let __goscriptTuple0: any = trace.NewTask($.pointerValueOrNil(context.Background())!, "task")
	let ctx = __goscriptTuple0[0]
	let task: trace.Task | $.VarRef<trace.Task> | null = __goscriptTuple0[1]
	void (task !== null && (task as any).__isVarRef !== true && (task as any).__goValue === undefined ? ((task as any) as trace.Task).End() : trace.Task.prototype.End.call($.pointerValue<trace.Task>(task)))
	await $.println("trace:", trace.Start($.pointerValueOrNil($.interfaceValue<io.Writer | null>(traceBuf, "*bytes.Buffer", __goscriptStatic0()))!) != null, trace.IsEnabled())
	trace.Log($.pointerValueOrNil(ctx)!, "category", "message")
	trace.Stop()
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ($.overrideTypeMethods(/* @__PURE__ */ $.pointerType("bytes.Buffer"), "bytes.Buffer", () => [$.methodSignature("Available", [], [/* @__PURE__ */ $.basicType("int")], true), $.methodSignature("AvailableBuffer", [], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))], true), $.methodSignature("Bytes", [], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))], true), $.methodSignature("Cap", [], [/* @__PURE__ */ $.basicType("int")], true), $.methodSignature("Grow", [["n", /* @__PURE__ */ $.basicType("int")]], [], true), $.methodSignature("Len", [], [/* @__PURE__ */ $.basicType("int")], true), $.methodSignature("Next", [["n", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))], true), $.methodSignature("Peek", [["n", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")), "error"], true), $.methodSignature("Read", [["p", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("ReadByte", [], [/* @__PURE__ */ $.basicType("uint8"), "error"], true), $.methodSignature("ReadBytes", [["delim", /* @__PURE__ */ $.basicType("uint8")]], [["line", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))], ["err", "error"]], true), $.methodSignature("ReadFrom", [["r", "io.Reader"]], [["n", /* @__PURE__ */ $.basicType("int64")], ["err", "error"]], true), $.methodSignature("ReadRune", [], [["r", /* @__PURE__ */ $.basicType("int32")], ["size", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("ReadString", [["delim", /* @__PURE__ */ $.basicType("uint8")]], [["line", /* @__PURE__ */ $.basicType("string")], ["err", "error"]], true), $.methodSignature("Reset", [], [], true), $.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")], true), $.methodSignature("Truncate", [["n", /* @__PURE__ */ $.basicType("int")]], [], true), $.methodSignature("UnreadByte", [], ["error"], true), $.methodSignature("UnreadRune", [], ["error"], true), $.methodSignature("Write", [["p", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("WriteByte", [["c", /* @__PURE__ */ $.basicType("uint8")]], ["error"], true), $.methodSignature("WriteRune", [["r", /* @__PURE__ */ $.basicType("int32")]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("WriteString", [["s", /* @__PURE__ */ $.basicType("string")]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("WriteTo", [["w", "io.Writer"]], [["n", /* @__PURE__ */ $.basicType("int64")], ["err", "error"]], true)]))
}

if ($.isMainScript(import.meta)) {
	await main()
}
