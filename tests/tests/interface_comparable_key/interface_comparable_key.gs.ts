// Generated file based on interface_comparable_key.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type ref = {
	Key(): any
}

$.registerInterfaceType(
	"main.ref",
	null,
	[{ name: "Key", args: [], returns: [{ type: { kind: $.TypeKind.Interface, methods: [] } }] }]
);

export type valueHash = Uint8Array

$.registerNamedValueType(
	"main.valueHash",
	{Key: (receiver: any, ...args: any[]) => (valueHash_Key as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Key", [], [{ kind: $.TypeKind.Interface, methods: [] }])]
);

$.registerNamedValueType(
	"*main.valueHash",
	{Key: (receiver: any, ...args: any[]) => (valueHash_Key as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Key", [], [{ kind: $.TypeKind.Interface, methods: [] }])]
);

export function valueHash_Key(h: valueHash): any {
	return $.namedValueInterfaceValue<any>(h, "main.valueHash", {Key: (receiver: any, ...args: any[]) => (valueHash_Key as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))}, "main.valueHash", [$.methodSignature("Key", [], [{ kind: $.TypeKind.Interface, methods: [] }])])
}

export async function sameKey(a: ref | null, b: ref | null): globalThis.Promise<boolean> {
	return $.comparableEqual((__goscriptAwait = $.pointerValue<Exclude<ref, null>>(a).Key(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = $.pointerValue<Exclude<ref, null>>(b).Key(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

export async function differentKey(a: ref | null, b: ref | null): globalThis.Promise<boolean> {
	return !$.comparableEqual((__goscriptAwait = $.pointerValue<Exclude<ref, null>>(a).Key(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = $.pointerValue<Exclude<ref, null>>(b).Key(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

export async function main(): globalThis.Promise<void> {
	let a = $.arrayValue(new Uint8Array([0, 7, 0, 0]))
	let b = $.arrayValue(new Uint8Array([0, 7, 0, 0]))
	let c = $.arrayValue(new Uint8Array([0, 0, 7, 0]))

	await $.println("same:", await sameKey($.namedValueInterfaceValue<ref | null>(a, "main.valueHash", {Key: (receiver: any, ...args: any[]) => (valueHash_Key as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))}, "main.valueHash", [$.methodSignature("Key", [], [{ kind: $.TypeKind.Interface, methods: [] }])]), $.namedValueInterfaceValue<ref | null>(b, "main.valueHash", {Key: (receiver: any, ...args: any[]) => (valueHash_Key as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))}, "main.valueHash", [$.methodSignature("Key", [], [{ kind: $.TypeKind.Interface, methods: [] }])])))
	await $.println("different:", await differentKey($.namedValueInterfaceValue<ref | null>(a, "main.valueHash", {Key: (receiver: any, ...args: any[]) => (valueHash_Key as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))}, "main.valueHash", [$.methodSignature("Key", [], [{ kind: $.TypeKind.Interface, methods: [] }])]), $.namedValueInterfaceValue<ref | null>(c, "main.valueHash", {Key: (receiver: any, ...args: any[]) => (valueHash_Key as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))}, "main.valueHash", [$.methodSignature("Key", [], [{ kind: $.TypeKind.Interface, methods: [] }])])))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
