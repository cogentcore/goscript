// Generated file based on unsafe_pointer_address.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as unsafe from "@goscript/unsafe/index.js"
import "@goscript/unsafe/index.js"

export function anyOverlap(x: $.Slice<number>, y: $.Slice<number>): boolean {
	return ((($.sliceLen(x) > 0) && ($.sliceLen(y) > 0)) && ($.indexByteAddress(x!, 0, 1) <= $.indexByteAddress(y!, $.sliceLen(y) - 1, 1))) && ($.indexByteAddress(y!, 0, 1) <= $.indexByteAddress(x!, $.sliceLen(x) - 1, 1))
}

export function sameStart(x: $.Slice<number>, y: $.Slice<number>): boolean {
	return (($.sliceLen(x) > 0) && ($.sliceLen(y) > 0)) && ($.indexAddress(x!, 0) == $.indexAddress(y!, 0))
}

export function parenIndexValue(x: $.Slice<number>, i: number): number {
	return $.pointerValue<number>(($.indexRef(x!, i)))
}

export async function main(): globalThis.Promise<void> {
	let buf = new Uint8Array([1, 2, 3, 4]) as $.Slice<number>
	let left = $.goSlice(buf, 1, 3)
	let right = $.goSlice(buf, 2, 4)
	let other = new Uint8Array([8, 9]) as $.Slice<number>

	await $.println("overlap:", anyOverlap(left, right))
	await $.println("separate:", anyOverlap(left, other))
	await $.println("same:", sameStart(left, $.goSlice(buf, 1, undefined)))
	await $.println("different:", sameStart(left, right))
	await $.println("paren:", parenIndexValue(buf, 2))
}

if ($.isMainScript(import.meta)) {
	await main()
}
