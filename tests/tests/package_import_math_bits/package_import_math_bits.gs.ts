// Generated file based on package_import_math_bits.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as bits from "@goscript/math/bits/index.js"

export async function main(): globalThis.Promise<void> {
	await $.println("UintSize", 64)
	await $.println("Len-all", bits.Len($.uint("18446744073709551615", 64)))
	await $.println("LeadingZeros-uint-one", bits.LeadingZeros(1))
	let [lo, carry] = bits.Add($.uint("18446744073709551615", 64), 1, 0)
	await $.println("Add-carry", lo == 0, carry)

	const bit31: bigint = 2147483648n
	const low32: bigint = 4294967295n
	const low63: bigint = 9223372036854775807n
	const highBit: bigint = 9223372036854775808n
	const highNibble: bigint = 17293822569102704640n
	const all64: bigint = 18446744073709551615n
	const all32: number = 4294967295

	await $.println("LeadingZeros64", bits.LeadingZeros64(0n), bits.LeadingZeros64(1n), bits.LeadingZeros64(2147483648n), bits.LeadingZeros64(4294967295n), bits.LeadingZeros64(9223372036854775807n), bits.LeadingZeros64(9223372036854775808n), bits.LeadingZeros64(17293822569102704640n), bits.LeadingZeros64(18446744073709551615n))
	await $.println("TrailingZeros64", bits.TrailingZeros64(0n), bits.TrailingZeros64(1n), bits.TrailingZeros64(2147483648n), bits.TrailingZeros64(4294967295n), bits.TrailingZeros64(9223372036854775807n), bits.TrailingZeros64(9223372036854775808n), bits.TrailingZeros64(17293822569102704640n), bits.TrailingZeros64(18446744073709551615n))
	await $.println("OnesCount64", bits.OnesCount64(0n), bits.OnesCount64(1n), bits.OnesCount64(2147483648n), bits.OnesCount64(4294967295n), bits.OnesCount64(9223372036854775807n), bits.OnesCount64(9223372036854775808n), bits.OnesCount64(17293822569102704640n), bits.OnesCount64(18446744073709551615n))

	let [hi, lo32] = bits.Mul32(0, 4294967295)
	await $.println("Mul32-zero", hi, lo32)
	let __goscriptTuple0: any = bits.Mul32(1, 4294967295)
	hi = __goscriptTuple0[0]
	lo32 = __goscriptTuple0[1]
	await $.println("Mul32-one-all", hi, lo32)
	let __goscriptTuple1: any = bits.Mul32(2147483648, 2)
	hi = __goscriptTuple1[0]
	lo32 = __goscriptTuple1[1]
	await $.println("Mul32-bit31-double", hi, lo32)
	let __goscriptTuple2: any = bits.Mul32(4294967295, 4294967295)
	hi = __goscriptTuple2[0]
	lo32 = __goscriptTuple2[1]
	await $.println("Mul32-all-all", hi, lo32)
	let __goscriptTuple3: any = bits.Mul32(2147483648, 2147483648)
	hi = __goscriptTuple3[0]
	lo32 = __goscriptTuple3[1]
	await $.println("Mul32-high-high", hi, lo32)
}

if ($.isMainScript(import.meta)) {
	await main()
}
