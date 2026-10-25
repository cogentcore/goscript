// Generated file based on keyed_array_literal.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export async function main(): globalThis.Promise<void> {
	// Test simple keyed array literal with integer keys
	let arr1 = $.arrayValue(["", "first", "", "third", ""])
	await $.println("arr1[0]:", arr1[0])
	await $.println("arr1[1]:", arr1[1])
	await $.println("arr1[2]:", arr1[2])
	await $.println("arr1[3]:", arr1[3])
	await $.println("arr1[4]:", arr1[4])

	// Test keyed array literal with expression keys (this likely causes the issue)
	const offset: number = 10
	let arr2 = $.arrayValue(["", "", "", "", "", "", "", "", "", "", "", "at index 11", "", "at index 13", ""])
	await $.println("arr2[10]:", arr2[10])
	await $.println("arr2[11]:", arr2[11])
	await $.println("arr2[12]:", arr2[12])
	await $.println("arr2[13]:", arr2[13])
	await $.println("arr2[14]:", arr2[14])

	// Test mixed keyed and unkeyed elements
	let arr3 = $.arrayValue([1, 2, 0, 0, 0, 100, 200, 0])
	await $.println("arr3[0]:", arr3[0])
	await $.println("arr3[1]:", arr3[1])
	await $.println("arr3[2]:", arr3[2])
	await $.println("arr3[5]:", arr3[5])
	await $.println("arr3[6]:", arr3[6])
	await $.println("arr3[7]:", arr3[7])

	// Test slice with keyed elements
	let slice1 = $.arrayToSlice<string>(["", "", "second", "", "fourth"])
	await $.println("slice1[0]:", $.plainSliceIndex(slice1!, 0))
	await $.println("slice1[1]:", $.plainSliceIndex(slice1!, 1))
	await $.println("slice1[2]:", $.plainSliceIndex(slice1!, 2))
	await $.println("slice1[3]:", $.plainSliceIndex(slice1!, 3))
	await $.println("slice1[4]:", $.plainSliceIndex(slice1!, 4))

	await $.println("keyed array literal test completed")
}

if ($.isMainScript(import.meta)) {
	await main()
}
