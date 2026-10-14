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
	return $.namedValueInterfaceValue<runner | null>(m, "main.mode", {Run: (receiver: any, ...args: any[]) => (__goscript_method.mode_Run as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))}, /* @__PURE__ */ $.basicType("int", "main.mode"), [$.methodSignature("Run", [], [/* @__PURE__ */ $.basicType("string")])])
}

export async function main(): globalThis.Promise<void> {
	await $.println((__goscriptAwait = $.pointerValue<Exclude<runner, null>>(asRunner(1)).Run(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
