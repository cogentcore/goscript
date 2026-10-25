// Generated file based on slices_grow_zero_values.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as slices from "@goscript/slices/index.js"

export type word = number

export async function main(): globalThis.Promise<void> {
	let nilWords: $.Slice<word> = null! as $.Slice<word>
	nilWords = (slices.Grow(nilWords, 3, () => (0 as word)) as $.Slice<word>)
	nilWords = $.goSlice(nilWords, undefined, 3)
	await $.println("nil words", $.plainSliceIndex(nilWords!, 0), $.plainSliceIndex(nilWords!, 1), $.plainSliceIndex(nilWords!, 2))

	let counts: $.Slice<number> = $.makeSlice<number>(1, 1, "number")
	$.sliceElems(counts!)[$.sliceSlot(counts!, 0)] = 7
	counts = (slices.Grow(counts, 2, () => (0 as number)) as $.Slice<number>)
	counts = $.goSlice(counts, undefined, 3)
	await $.println("counts", $.plainSliceIndex(counts!, 0), $.plainSliceIndex(counts!, 1), $.plainSliceIndex(counts!, 2))

	let names = $.goSlice(slices.Grow($.arrayToSlice<string>(["a"]), 2, () => ("" as string)), undefined, 3)
	await $.println("names", $.plainSliceIndex(names!, 0), $.stringEqual($.plainSliceIndex(names!, 1), ""), $.stringEqual($.plainSliceIndex(names!, 2), ""))

	let pointers: $.Slice<$.VarRef<number> | null> = null! as $.Slice<$.VarRef<number> | null>
	pointers = $.goSlice(slices.Grow(pointers, 2, () => (null! as $.VarRef<number> | null as $.VarRef<number> | null)), undefined, 2)
	await $.println("pointers", $.plainSliceIndex(pointers!, 0) == null, $.plainSliceIndex(pointers!, 1) == null)
}

if ($.isMainScript(import.meta)) {
	await main()
}
