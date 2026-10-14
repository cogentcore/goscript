// Generated file based on slice_append_shared_backing.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export async function main(): globalThis.Promise<void> {
	let s: $.Slice<number> = $.makeSlice<number>(0, 10, "number")
	let a: $.Slice<number> = $.append(s, 1)
	let b: $.Slice<number> = $.append(a, 2)
	let c: $.Slice<number> = $.append(b, 3)
	await $.println($.sliceLen(s), $.sliceLen(a), $.sliceLen(b), $.sliceLen(c), $.cap(a))
	for (let __goscriptRangeTarget0 = a, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), i = 0; i < __goscriptRangeWindow0.length; i++) {
		let v = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + i] as number)
		await $.println("a", i, v)
	}
	let d: $.Slice<number> = $.append(a, 9)
	await $.println($.arrayIndex(b!, 1), $.arrayIndex(d!, 1), $.sliceLen(d))

	let x = $.varRef(5)
	let p: $.Slice<$.VarRef<number> | null> = null! as $.Slice<$.VarRef<number> | null>
	p = $.append(p, x, $.appendZeros.nil)
	let q: $.Slice<$.VarRef<number> | null> = $.append(p, x, $.appendZeros.nil)
	let r: $.Slice<$.VarRef<number> | null> = $.append(q, x, $.appendZeros.nil)
	await $.println($.sliceLen(p), $.sliceLen(q), $.sliceLen(r))

	let t: $.Slice<string> = $.arrayToSlice<string>(["a", "b", "c", "d"])
	let u: $.Slice<string> = $.goSlice(t, undefined, 1)
	let v: $.Slice<string> = $.append(u, "x")
	let w: $.Slice<string> = $.append(v, "y")
	await $.println($.sliceLen(u), $.sliceLen(v), $.sliceLen(w), $.arrayIndex(t!, 1), $.arrayIndex(t!, 2))
	$.copy(u, $.arrayToSlice<string>(["z"]))
	await $.println($.arrayIndex(t!, 0), $.arrayIndex(v!, 0), $.arrayIndex(w!, 0))
}

if ($.isMainScript(import.meta)) {
	await main()
}
