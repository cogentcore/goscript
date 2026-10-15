// Generated file based on string_range_runes.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export async function main(): globalThis.Promise<void> {
	for (let __goscriptRunes0 = $.stringRunes("a\xc2\xa2\xe2\x82\xac"); __goscriptRunes0.next(); ) {
		const i = __goscriptRunes0.index
		const r = __goscriptRunes0.rune
		await $.println(i, r)
	}
}

if ($.isMainScript(import.meta)) {
	await main()
}
