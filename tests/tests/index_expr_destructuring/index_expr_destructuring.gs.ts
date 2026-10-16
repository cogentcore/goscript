// Generated file based on index_expr_destructuring.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export function returnTwoInts(): [number, number] {
	return [42, 24]
}

export function returnIntAndString(): [number, string] {
	return [42, "hello"]
}

export async function main(): globalThis.Promise<void> {
	// Create arrays/slices to test index expressions in destructuring
	let intArray: number[] = $.arrayValue(globalThis.Array.from({ length: 2 }, () => 0))
	let stringSlice: $.Slice<string> = $.makeSlice<string>(2, undefined, "string")

	// This should trigger the "unhandled LHS expression in destructuring: *ast.IndexExpr" error
	let __goscriptTuple0: any = returnIntAndString()
	intArray[0] = __goscriptTuple0[0]
	$.sliceElems(stringSlice!)[$.sliceSlot(stringSlice!, 1)] = __goscriptTuple0[1]

	await $.println("intArray[0]:", intArray[0])
	await $.println("stringSlice[1]:", $.arrayIndex(stringSlice!, 1))

	// Test with more complex index expressions
	let matrix: number[][] = $.arrayValue(globalThis.Array.from({ length: 2 }, () => $.arrayValue(globalThis.Array.from({ length: 2 }, () => 0))), /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int"), 2), 2))
	let i = 0
	let j = 1

	let __goscriptTuple1: any = returnTwoInts()
	matrix[$.checkArrayIndex(i, 2)][j] = __goscriptTuple1[0]
	intArray[1] = __goscriptTuple1[1]

	await $.println("matrix[0][1]:", (matrix[0])[1])
	await $.println("intArray[1]:", intArray[1])
}

if ($.isMainScript(import.meta)) {
	await main()
}
