// Generated file based on named_slice_full_slice_assignment.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type filters = $.Slice<number>

$.registerNamedType("main.filters", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")));

$.registerNamedValueType(
	"main.filters",
	{size: (receiver: any, ...args: any[]) => (filters_size as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("size", [], [/* @__PURE__ */ $.basicType("int")])]
);

$.registerNamedValueType(
	"*main.filters",
	{size: (receiver: any, ...args: any[]) => (filters_size as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("size", [], [/* @__PURE__ */ $.basicType("int")])]
);

export function filters_size(f: filters): number {
	return $.sliceLen((f as filters))
}

export async function main(): globalThis.Promise<void> {
	let out: filters = null! as filters
	let value = $.namedValueInterfaceValue<any>($.arrayToSlice<number>([1, 2, 3]), "main.filters", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2())
	{
		let __goscriptTuple0: any = $.typeAssertTuple<filters>(value, /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"), "main.filters"))
		let c: filters = (__goscriptTuple0[0] as filters)
		let ok = __goscriptTuple0[1]
		if (ok) {
			out = ($.goSlice(c, undefined, $.sliceLen((c as filters)), $.sliceLen((c as filters))) as filters)
		}
	}
	let raw = $.arrayToSlice<number>([4, 5])
	let size = filters_size((raw as filters))
	await $.println("len:", $.sliceLen((out as filters)))
	await $.println("cap:", $.cap((out as filters)))
	await $.println("size:", size)
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({size: (receiver: any, ...args: any[]) => (filters_size as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= (/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"), "main.filters"))
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ([$.methodSignature("size", [], [/* @__PURE__ */ $.basicType("int")])])
}

if ($.isMainScript(import.meta)) {
	await main()
}
