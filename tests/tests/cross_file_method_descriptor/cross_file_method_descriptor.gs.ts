// Generated file based on cross_file_method_descriptor.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as __goscript_method from "./method.gs.ts"
import "./method.gs.ts"

export type runner = {
	Run(): string
}

$.registerInterfaceType(
	"main.runner",
	null,
	[{ name: "Run", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }]
);

export type mode = number

$.registerNamedValueType(
	"main.mode",
	{Run: (receiver: any, ...args: any[]) => (__goscript_method.mode_Run as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Run", [], [/* @__PURE__ */ $.basicType("string")])]
);

$.registerNamedValueType(
	"*main.mode",
	{Run: (receiver: any, ...args: any[]) => (__goscript_method.mode_Run as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Run", [], [/* @__PURE__ */ $.basicType("string")])]
);

export function asRunner(m: mode): runner | null {
	return $.namedValueInterfaceValue<runner | null>(m, "main.mode", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2())
}

export async function main(): globalThis.Promise<void> {
	await $.println(await $.pointerValue<Exclude<runner, null>>(asRunner(1)).Run())
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({Run: (receiver: any, ...args: any[]) => (__goscript_method.mode_Run as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= (/* @__PURE__ */ $.basicType("int", "main.mode"))
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ([$.methodSignature("Run", [], [/* @__PURE__ */ $.basicType("string")])])
}

if ($.isMainScript(import.meta)) {
	await main()
}
