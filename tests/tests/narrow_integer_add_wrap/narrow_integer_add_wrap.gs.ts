// Generated file based on narrow_integer_add_wrap.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type fixed = number

export async function main(): globalThis.Promise<void> {
	let u: number = 0xffffffff
	let z = 0
	await $.println($.uint(((u + 1) >>> 0), 32), $.uint(((u + u) >>> 0), 32), $.uint(((z - 1) >>> 0), 32))
	let q = 2147483647
	q = ((q + 1) | 0)
	await $.println(q)
	q = ((q - 1) | 0)
	await $.println(q, $.int(((q + q) | 0), 32))
	let a: fixed = 2560000
	let b: fixed = 1920000
	await $.println($.int((((globalThis.Math.trunc((globalThis.Math.imul(a, a)) / 64)) + (globalThis.Math.trunc((globalThis.Math.imul(b, b)) / 64))) | 0), 32), $.int((((((a + b) | 0)) + 2147483647) | 0), 32))
	let i8 = 127
	i8 = ((i8 + 1) << 24 >> 24)
	await $.println(i8, $.int(((-128 - i8) << 24 >> 24), 8))
	let u16 = 65535
	u16 = ((u16 + 1) & 0xffff)
	let one = 1
	await $.println(u16, $.uint((((((one << 15) & 0xffff)) << 1) & 0xffff), 16))
	let u8 = 200
	await $.println($.uint(((u8 + 100) & 0xff), 8), $.uint(((u8 << 1) & 0xff), 8))
}

if ($.isMainScript(import.meta)) {
	await main()
}
