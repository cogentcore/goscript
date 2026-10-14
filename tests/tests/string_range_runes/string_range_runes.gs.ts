// Generated file based on string_range_runes.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export async function main(): globalThis.Promise<void> {
	for (const [i, r] of $.rangeString("a\xc2\xa2\xe2\x82\xac")) {
		await $.println(i, r)
	}
}

if ($.isMainScript(import.meta)) {
	await main()
}
