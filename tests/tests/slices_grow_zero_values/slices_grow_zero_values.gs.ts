// Generated file based on slices_grow_zero_values.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as slices from "@goscript/slices/index.js"

export type word = number

export async function main(): globalThis.Promise<void> {
	let nilWords: $.Slice<word> = null! as $.Slice<word>
	nilWords = (slices.Grow(nilWords, 3, () => (0 as word)) as $.Slice<word>)
	nilWords = $.goSlice(nilWords, undefined, 3)
	await $.println("nil words", $.arrayIndex(nilWords!, 0), $.arrayIndex(nilWords!, 1), $.arrayIndex(nilWords!, 2))

	let counts: $.Slice<number> = $.makeSlice<number>(1, 1, "number")
	$.sliceElems(counts!)[$.sliceSlot(counts!, 0)] = 7
	counts = (slices.Grow(counts, 2, () => (0 as number)) as $.Slice<number>)
	counts = $.goSlice(counts, undefined, 3)
	await $.println("counts", $.arrayIndex(counts!, 0), $.arrayIndex(counts!, 1), $.arrayIndex(counts!, 2))

	let names = $.goSlice(slices.Grow($.arrayToSlice<string>(["a"]), 2, () => ("" as string)), undefined, 3)
	await $.println("names", $.arrayIndex(names!, 0), $.stringEqual($.arrayIndex(names!, 1), ""), $.stringEqual($.arrayIndex(names!, 2), ""))

	let pointers: $.Slice<$.VarRef<number> | null> = null! as $.Slice<$.VarRef<number> | null>
	pointers = $.goSlice(slices.Grow(pointers, 2, () => (null! as $.VarRef<number> | null as $.VarRef<number> | null)), undefined, 2)
	await $.println("pointers", $.arrayIndex(pointers!, 0) == null, $.arrayIndex(pointers!, 1) == null)
}

if ($.isMainScript(import.meta)) {
	await main()
}
