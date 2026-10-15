// Generated file based on named_nil_slice_interface_receiver.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type sizer = {
	Len(): number
}

$.registerInterfaceType(
	"main.sizer",
	null,
	[{ name: "Len", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }]
);

export type bytesEncoder = $.Slice<number>

$.registerNamedType("main.bytesEncoder", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")));

$.registerNamedValueType(
	"main.bytesEncoder",
	{Len: (receiver: any, ...args: any[]) => (bytesEncoder_Len as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Len", [], [/* @__PURE__ */ $.basicType("int")])]
);

$.registerNamedValueType(
	"*main.bytesEncoder",
	{Len: (receiver: any, ...args: any[]) => (bytesEncoder_Len as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Len", [], [/* @__PURE__ */ $.basicType("int")])]
);

export function bytesEncoder_Len(b: bytesEncoder): number {
	return $.sliceLen((b as bytesEncoder))
}

export async function main(): globalThis.Promise<void> {
	let b: bytesEncoder = null! as bytesEncoder
	let s: sizer | null = $.namedValueInterfaceValue<sizer | null>(b, "main.bytesEncoder", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2())
	await $.println((__goscriptAwait = (s !== null && (s as any).__isVarRef !== true && (s as any).__goValue === undefined ? (s as Exclude<sizer, null>) : $.pointerValue<Exclude<sizer, null>>(s)).Len(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({Len: (receiver: any, ...args: any[]) => (bytesEncoder_Len as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= (/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"), "main.bytesEncoder"))
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ([$.methodSignature("Len", [], [/* @__PURE__ */ $.basicType("int")])])
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
