// Generated file based on for_range_key_only.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export async function main(): globalThis.Promise<void> {
	let s: $.Slice<number> = $.arrayToSlice<number>([10, 20, 30])
	await $.println("Looping over slice (key only):")
	for (let __goscriptRangeTarget0 = s, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), i = 0; i < __goscriptRangeWindow0.length; i++) {
		await $.println(i)
	}
	// Expected output:
	// 0
	// 1
	// 2

	let a = $.arrayValue(["alpha", "beta"])
	await $.println("Looping over array (key only):")
	for (let __goscriptRangeTarget1 = a, __goscriptRangeWindow1 = $.sliceRange(__goscriptRangeTarget1), k = 0; k < __goscriptRangeWindow1.length; k++) {
		await $.println(k)
	}
}

if ($.isMainScript(import.meta)) {
	await main()
}
