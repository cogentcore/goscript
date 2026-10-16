// Generated file based on clear_large_words.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type word = number

export async function main(): globalThis.Promise<void> {
	let words = $.arrayToSlice<word>([$.uint("9223372036854775808", 64), 5, $.uint("18446744073709551615", 64)])
	$.clear($.goSlice(words, undefined, 2), () => 0)
	await $.println("words", $.arrayIndex(words!, 0), $.arrayIndex(words!, 1), $.arrayIndex(words!, 2) == $.uint("18446744073709551615", 64))
	$.clear(words, () => 0)
	await $.println("words", $.arrayIndex(words!, 0), $.arrayIndex(words!, 1), $.arrayIndex(words!, 2))

	let wide = $.arrayToSlice<bigint>([9223372036854775808n, 4611686018427387904n])
	$.clear(wide, () => 0n)
	await $.println("wide", $.arrayIndex(wide!, 0), $.arrayIndex(wide!, 1), $.arrayIndex(wide!, 0) == 0n)
}

if ($.isMainScript(import.meta)) {
	await main()
}
