// Generated file based on named_array_value_receiver_pointer_call.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type flags = number[]

$.registerNamedValueType(
	"main.flags",
	{values: (receiver: any, ...args: any[]) => (flags_values as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("values", [], [/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")])]
);

$.registerNamedValueType(
	"*main.flags",
	{set: (receiver: any, ...args: any[]) => (flags__set as any)(receiver, ...$.stripGenericTypeArgs(args)), values: (receiver: any, ...args: any[]) => (flags_values as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("set", [["idx", /* @__PURE__ */ $.basicType("int")]]), $.methodSignature("values", [], [/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")])]
);

export function flags__set(f: $.VarRef<flags> | null, idx: number): void {
	$.pointerValue<number[]>(f)[idx] = idx + 1
}

export function flags_values(__goscriptReceiver0: flags): [number, number] {
	let f: $.VarRef<flags> = $.varRef($.cloneArrayValue(__goscriptReceiver0, "main.flags"))
	flags__set(f, 0)
	flags__set(f, 1)
	return [$.arrayIndex(f.value, 0), $.arrayIndex(f.value, 1) + 1]
}

export async function main(): globalThis.Promise<void> {
	let [left, right] = flags_values($.arrayValue(globalThis.Array.from({ length: 2 }, () => 0)))
	await $.println(left)
	await $.println(right)
}

if ($.isMainScript(import.meta)) {
	await main()
}
