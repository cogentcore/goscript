// Generated file based on integer_conversion_overflow.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type GID = number

export function lookup(c: number, delta: number): GID {
	return ($.uint(((c + delta) & 0xffff), 16))
}

export async function main(): globalThis.Promise<void> {
	let big = 1099511627781n
	await $.println("int32:", $.int(big, 32))
	await $.println("uint8:", $.uint(big, 8))
	await $.println("int16:", $.int(big, 16))

	let neg = -1n
	await $.println("uint32 of -1:", $.uint(neg, 32))
	await $.println("uint64 of -1:", $.uint64(neg))

	let u = 18446744073709551615n
	await $.println("int64 of max uint64:", $.int64(u))

	// Arithmetic narrower than 64 bits wraps to its own width before a
	// widening conversion.
	await $.println("gid H:", lookup(72, 65507))

	let a = 200
	let b = 100
	await $.println("uint8 sum:", ($.uint(((a + b) & 0xff), 8)), ($.uint(a * b, 8)), $.uint64($.uint(((((((((a - b) & 0xff)) - b) & 0xff)) - b) & 0xff), 8)))

	let x = 30000
	let y = 10000
	await $.println("int16 sum:", ($.int(((x + y) << 16 >> 16), 16)), $.int64($.int(x * 3, 16)), $.uint($.int((((((-x - y) << 16 >> 16)) - y) << 16 >> 16), 16), 32))

	let s = 1
	await $.println("shift:", ($.uint((((((s << 15) & 0xffff)) + (((s << 15) & 0xffff))) & 0xffff), 16)), $.uint(~s, 16))

	let i8 = 127
	await $.println("int8:", ($.int(((i8 + 1) << 24 >> 24), 8)), ($.int(i8 * 2, 8)))
}

if ($.isMainScript(import.meta)) {
	await main()
}
