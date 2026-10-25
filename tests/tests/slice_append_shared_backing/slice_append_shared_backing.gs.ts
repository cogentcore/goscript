// Generated file based on slice_append_shared_backing.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export async function main(): globalThis.Promise<void> {
	let s = $.makeSlice<number>(0, 10, "number")
	let a = $.appendOne(s, 1)
	let b = $.appendOne(a, 2)
	let c = $.appendOne(b, 3)
	await $.println($.sliceLen(s), $.sliceLen(a), $.sliceLen(b), $.sliceLen(c), $.cap(a))
	for (let __goscriptRangeTarget0 = a, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), i = 0; i < __goscriptRangeWindow0.length; i++) {
		let v = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + i] as number)
		await $.println("a", i, v)
	}
	let d = $.appendOne(a, 9)
	await $.println($.plainSliceIndex(b!, 1), $.plainSliceIndex(d!, 1), $.sliceLen(d))

	let x = $.varRef(5)
	let p: $.Slice<$.VarRef<number> | null> = null! as $.Slice<$.VarRef<number> | null>
	p = $.appendOne(p, x, $.appendZeros.nil)
	let q = $.appendOne(p, x, $.appendZeros.nil)
	let r = $.appendOne(q, x, $.appendZeros.nil)
	await $.println($.sliceLen(p), $.sliceLen(q), $.sliceLen(r))

	let t = $.arrayToSlice<string>(["a", "b", "c", "d"])
	let u = $.goSlice(t, undefined, 1)
	let v = $.appendOne(u, "x")
	let w = $.appendOne(v, "y")
	await $.println($.sliceLen(u), $.sliceLen(v), $.sliceLen(w), $.plainSliceIndex(t!, 1), $.plainSliceIndex(t!, 2))
	$.copy(u, $.arrayToSlice<string>(["z"]))
	await $.println($.plainSliceIndex(t!, 0), $.plainSliceIndex(v!, 0), $.plainSliceIndex(w!, 0))
}

if ($.isMainScript(import.meta)) {
	await main()
}
