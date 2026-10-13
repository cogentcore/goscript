// Generated file based on array_value_receiver_copy.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Matrix = number[]

$.registerNamedType("main.Matrix", /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("float32"), 4));

$.registerNamedValueType(
	"main.Matrix",
	{Scaled: (receiver: any, ...args: any[]) => (Matrix_Scaled as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), Sum: (receiver: any, ...args: any[]) => (Matrix_Sum as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Scaled", [["s", /* @__PURE__ */ $.basicType("float32")]], ["main.Matrix"]), $.methodSignature("Sum", [], [/* @__PURE__ */ $.basicType("float32")])]
);

$.registerNamedValueType(
	"*main.Matrix",
	{Scale: (receiver: any, ...args: any[]) => (Matrix_Scale as any)(receiver, ...$.stripGenericTypeArgs(args)), Scaled: (receiver: any, ...args: any[]) => (Matrix_Scaled as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args)), Sum: (receiver: any, ...args: any[]) => (Matrix_Sum as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Scale", [["s", /* @__PURE__ */ $.basicType("float32")]]), $.methodSignature("Scaled", [["s", /* @__PURE__ */ $.basicType("float32")]], ["main.Matrix"]), $.methodSignature("Sum", [], [/* @__PURE__ */ $.basicType("float32")])]
);

export function Matrix_Scaled(__goscriptReceiver0: Matrix, s: number): Matrix {
	let m: $.VarRef<Matrix> = $.varRef($.cloneArrayValue(__goscriptReceiver0, "main.Matrix"))
	Matrix_Scale(m, s)
	return $.cloneArrayValue(m.value, "main.Matrix")
}

export function Matrix_Scale(m: $.VarRef<Matrix> | null, s: number): void {
	for (let __goscriptRangeTarget0 = $.pointerValue<number[]>(m), i = 0; i < $.len(__goscriptRangeTarget0); i++) {
		$.pointerValue<number[]>(m)[i] = $.float32($.pointerValue<number[]>(m)[i] * (s))
	}
}

export function Matrix_Sum(__goscriptReceiver1: Matrix): number {
	let m: Matrix = $.cloneArrayValue(__goscriptReceiver1, "main.Matrix")
	let t: number = 0
	for (let __goscriptRangeTarget1 = m, i = 0; i < $.len(__goscriptRangeTarget1); i++) {
		t = $.float32(t + ($.arrayIndex(m, i)))
		m[i] = 0
	}
	return t
}

export async function main(): globalThis.Promise<void> {
	let m = $.varRef($.arrayValue([1, 2, 3, 4], /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("float32"), 4)))
	let original = $.cloneArrayValue(m.value, "main.Matrix")
	let r = $.cloneArrayValue(Matrix_Scaled(m.value, 2), "main.Matrix")
	await $.println("m:", $.arrayIndex(m.value, 0), $.arrayIndex(m.value, 1), $.arrayIndex(m.value, 2), $.arrayIndex(m.value, 3))
	await $.println("r:", $.arrayIndex(r, 0), $.arrayIndex(r, 1), $.arrayIndex(r, 2), $.arrayIndex(r, 3))
	await $.println("original equal:", $.arrayEqual(original, m.value))
	await $.println("sum:", Matrix_Sum(m.value), $.arrayIndex(m.value, 0))
	let p: $.VarRef<Matrix> | null = m
	await $.println("ptr sum:", Matrix_Sum($.pointerValue<Matrix>(p)), $.arrayIndex($.pointerValue<number[]>(p), 0))
}

if ($.isMainScript(import.meta)) {
	await main()
}
