// Generated file based on clear_slice.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export async function main(): globalThis.Promise<void> {
	let buf = new Uint8Array([1, 2, 3]) as $.Slice<number>
	$.clear(buf, () => 0)
	await $.println("bytes:", $.typedSliceIndex(buf!, 0), $.typedSliceIndex(buf!, 1), $.typedSliceIndex(buf!, 2))

	let nums = $.arrayToSlice<number>([4, 5, 6, 7])
	$.clear($.goSlice(nums, 1, 3), () => 0)
	await $.println("window:", $.plainSliceIndex(nums!, 0), $.plainSliceIndex(nums!, 1), $.plainSliceIndex(nums!, 2), $.plainSliceIndex(nums!, 3))

	let words = $.arrayToSlice<string>(["a", "b"])
	$.clear(words, () => "")
	await $.println("strings:", $.stringEqual($.plainSliceIndex(words!, 0), ""), $.stringEqual($.plainSliceIndex(words!, 1), ""))
}

if ($.isMainScript(import.meta)) {
	await main()
}
