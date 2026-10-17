// Generated file based on switch_wide_uint_constant.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Class = number

export const unknownClass: Class = 18446744073709551615

export function classify(c: Class): number {
	switch (c) {
		case $.uint("18446744073709551615", 64):
		{
			return 1
			break
		}
		case 0:
		{
			return 2
			break
		}
	}
	return 3
}

export async function main(): globalThis.Promise<void> {
	let strong = $.uint("18446744073709551615", 64)
	await $.println("switch:", classify(strong), classify(0), classify(5))

	// The constant itself and a value computed from it are cases too.
	let _unknown: Class = $.uint("18446744073709551615", 64)
	await $.println("var:", classify(_unknown), classify($.uint("18446744073709551615", 64)))

	// A wide constant of int is a case in the same way.
	let i: number = $.int("4611686018427387905", 64)
	switch (i) {
		case $.int("4611686018427387905", 64):
		{
			await $.println("int: ok")
			break
		}
		default:
		{
			await $.println("int: bad")
			break
		}
	}
}

if ($.isMainScript(import.meta)) {
	await main()
}
