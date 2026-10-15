// Generated file based on range_const_reassign.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export async function main(): globalThis.Promise<void> {
	let s = "abc"
	for (let __goscriptRunes0 = $.stringRunes(s); __goscriptRunes0.next(); ) {
		let c = __goscriptRunes0.rune
		if (c >= 97) {
			c = $.int((((((c - 97) | 0)) + 10) | 0), 32)
		}
		await $.println(c)
	}
}

if ($.isMainScript(import.meta)) {
	await main()
}
