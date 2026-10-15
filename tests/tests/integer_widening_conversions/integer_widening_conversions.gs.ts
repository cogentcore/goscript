// Generated file based on integer_widening_conversions.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Small = number

export type Code = number

export async function main(): globalThis.Promise<void> {
	// Widening conversions keep every value.
	let runes = $.arrayToSlice<number>([97, -1, 0x10FFFF, -2147483648, 2147483647])
	let sum = 0
	for (let __goscriptRangeTarget0 = runes, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let r = $.int((__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as number), 32)
		sum += r
		await $.println("rune", r, $.int64(r), r)
	}
	await $.println("sum", sum)

	let bs = new Uint8Array([0, 1, 127, 128, 255]) as $.Slice<number>
	for (let __goscriptRangeTarget1 = bs, __goscriptRangeWindow1 = $.sliceRange(__goscriptRangeTarget1), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow1.length; __rangeIndex++) {
		let b = $.uint((__goscriptRangeWindow1.backing[__goscriptRangeWindow1.offset + __rangeIndex] as number), 8)
		await $.println("byte", b, b, b, b, $.int(b, 8))
	}

	let i8 = -128
	let u16 = 65535
	let u32 = 4294967295
	let i16 = -32768
	await $.println("i8", i8, i8, i8, $.int64(i8), $.uint(i8, 8), $.uint(i8, 64))
	await $.println("u16", u16, u16, u16, $.int(u16, 16), $.uint(u16, 8))
	await $.println("u32", u32, $.uint64(u32), $.int64(u32), $.int(u32, 32), $.uint(u32, 16))
	await $.println("i16", i16, i16, $.uint(i16, 16), $.int(i16, 8))

	// Named types convert like their underlying types.
	let s = -5
	let c = 40000
	await $.println("named", s, s, s, c, c, $.int(c, 16), $.uint(c, 8))

	// Narrowing conversions still wrap.
	let n = 300
	let m = -1
	await $.println("narrow", $.int(n, 8), $.uint(n, 8), $.int(n * 300, 16), $.uint(m, 16), $.uint(m, 32), $.int(n * 10000000, 32))
}

if ($.isMainScript(import.meta)) {
	await main()
}
