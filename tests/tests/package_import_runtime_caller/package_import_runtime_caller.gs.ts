// Generated file based on package_import_runtime_caller.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as reflect from "@goscript/reflect/index.js"

import * as runtime from "@goscript/runtime/index.js"

import * as strconv from "@goscript/strconv/index.js"

import * as strings from "@goscript/strings/index.js"
import "@goscript/reflect/index.js"
import "@goscript/runtime/index.js"
import "@goscript/strconv/index.js"
import "@goscript/strings/index.js"

export function callerInfo(): string {
	let __goscriptTuple0: any = runtime.Caller(1)
	let pc = $.uint(__goscriptTuple0[0], 64)
	let file = __goscriptTuple0[1]
	let line = __goscriptTuple0[2]
	return $.concatString(($.concatString(($.concatString(($.concatString(runtime.Func.prototype.Name.call($.pointerValue<runtime.Func>(runtime.FuncForPC($.uint(pc, 64)))), " ")), file)), ":")), strconv.Itoa(line))
}

export function logSomething(): string {
	return callerInfo()
}

export function funcName(f: any): string {
	return runtime.Func.prototype.Name.call($.pointerValue<runtime.Func>(runtime.FuncForPC($.uint($.markAsStructValue($.cloneStructValue(reflect.ValueOf(f))).Pointer(), 64))))
}

export function helperFunc(): void {
}

export async function main(): globalThis.Promise<void> {
	let __goscriptTuple1: any = runtime.Caller(0)
	let pc = $.uint(__goscriptTuple1[0], 64)
	let file = __goscriptTuple1[1]
	let line = __goscriptTuple1[2]
	let ok = __goscriptTuple1[3]
	await $.println("caller ok:", ok, $.uint(pc, 64) != 0, !$.stringEqual(file, ""), line > 0)

	let f: runtime.Func | $.VarRef<runtime.Func> | null = runtime.FuncForPC($.uint(pc, 64))
	await $.println("func:", f != null, strings.Contains(runtime.Func.prototype.Name.call($.pointerValue<runtime.Func>(f)), "main"))

	let info = logSomething()
	await $.println("info:", !$.stringEqual(info, ""))

	await $.println("funcname:", strings.Contains(funcName($.interfaceValue($.goFunc(helperFunc, "main.helperFunc"), "func()", ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo))), "helperFunc"))

	let pcs: $.Slice<number> = $.makeSlice<number>(8, undefined, "number")
	let n = runtime.Callers(1, pcs)
	await $.println("callers:", n > 0)
	let frames: runtime.Frames | $.VarRef<runtime.Frames> | null = runtime.CallersFrames($.goSlice(pcs, undefined, n))
	let [frame, ] = runtime.Frames.prototype.Next.call($.pointerValue<runtime.Frames>(frames))
	await $.println("frame:", frame.Line > 0, strings.Contains(frame.Function, "main"))
}

if ($.isMainScript(import.meta)) {
	await main()
}
