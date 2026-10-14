// Generated file based on for_range_value_only.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as strings from "@goscript/strings/index.js"
import "@goscript/strings/index.js"

export async function main(): globalThis.Promise<void> {
	let s: $.Slice<number> = $.arrayToSlice<number>([10, 20, 30])
	let sum = 0
	for (let __goscriptRangeTarget0 = s, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let v = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as number)
		sum = sum + (v)
		await $.println(v)
	}
	await $.println(sum)

	let arr = $.arrayValue(["a", "b", "c"])
	let concat: $.VarRef<strings.Builder> = $.varRef($.markAsStructValue(new strings.Builder()))
	for (let __goscriptRangeTarget1 = arr, __goscriptRangeWindow1 = $.sliceRange(__goscriptRangeTarget1), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow1.length; __rangeIndex++) {
		let val = (__goscriptRangeWindow1.backing[__goscriptRangeWindow1.offset + __rangeIndex] as string)
		concat.value.WriteString(val)
		await $.println(val)
	}
	await $.println(concat.value.String())

	// Test with blank identifier for value (should still iterate)
	await $.println("Ranging with blank identifier for value:")
	let count = 0
	for (let __goscriptRangeTarget2 = s, __goscriptRangeWindow2 = $.sliceRange(__goscriptRangeTarget2), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow2.length; __rangeIndex++) {
		count++
	}
	await $.println(count)
}

if ($.isMainScript(import.meta)) {
	await main()
}
