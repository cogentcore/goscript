// Generated file based on unicode_named_tables.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as unicode from "@goscript/unicode/index.js"

export async function main(): globalThis.Promise<void> {
	// Script tables by their Go names.
	await $.println(unicode.Is(unicode.Han, 20013), unicode.Is(unicode.Han, 97))
	await $.println(unicode.Is(unicode.Latin, 97), unicode.Is(unicode.Greek, 955))
	await $.println(unicode.In(1103, unicode.Latin, unicode.Cyrillic))

	// Property tables by their Go names, including the ones that
	// regexp2 uses for identifier classes.
	await $.println(unicode.Is(unicode.Other_ID_Start, 8472), unicode.Is(unicode.Other_ID_Continue, 183))
	await $.println(unicode.Is(unicode.Dash, 45), unicode.Is(unicode.Hex_Digit, 102), unicode.Is(unicode.Hex_Digit, 103))
	await $.println(unicode.Is(unicode.White_Space, 32))

	// A script added in Unicode 16.
	await $.println(unicode.Is(unicode.Garay, 0x10D40))
	await $.println(unicode.Version)
}

if ($.isMainScript(import.meta)) {
	await main()
}
