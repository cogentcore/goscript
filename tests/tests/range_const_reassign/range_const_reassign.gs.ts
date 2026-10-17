// Generated file based on range_const_reassign.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export async function main(): globalThis.Promise<void> {
	let s = "abc"
	for (let __goscriptRunes0 = $.stringRunes(s); __goscriptRunes0.next(); ) {
		let c = __goscriptRunes0.rune
		if (c >= 97) {
			c = $.int((((((c - 97) | 0)) + 10) | 0), 32)
		}
		await $.println(c)
	}

	// An assignment of the key of a slice or integer range changes only the
	// copy of this iteration, not the iterations.
	let xs = $.arrayToSlice<string>(["a", "b", "c", "d"])
	for (let __goscriptRangeTarget0 = xs, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __goscriptRangeIndex0 = 0; __goscriptRangeIndex0 < __goscriptRangeWindow0.length; __goscriptRangeIndex0++) {
		let x = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __goscriptRangeIndex0] as string)
		let i = __goscriptRangeIndex0
		if ($.stringEqual(x, "b")) {
			i++
			continue
		}
		await $.println("slice:", i, x)
	}
	let sum = 0
	for (let __goscriptRangeIndex1 = 0; __goscriptRangeIndex1 < 4; __goscriptRangeIndex1++) {
		let i = __goscriptRangeIndex1
		if (i == 1) {
			i += 10
		}
		sum += i
	}
	await $.println("int:", sum)

	// A key whose address is taken is also a copy of the iteration's index.
	let arr = $.arrayValue([5, 6, 7])
	for (let __goscriptRangeTarget1 = arr, __goscriptRangeWindow1 = $.sliceRange(__goscriptRangeTarget1), __goscriptRangeIndex2 = 0; __goscriptRangeIndex2 < __goscriptRangeWindow1.length; __goscriptRangeIndex2++) {
		let i = $.varRef(__goscriptRangeIndex2)
		let p = i
		p!.value += 100
		await $.println("array:", i.value, arr[$.checkArrayIndex(i.value - 100, 3)])
	}
}

if ($.isMainScript(import.meta)) {
	await main()
}
