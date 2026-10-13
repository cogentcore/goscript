// Generated file based on string_literal_js_escapes.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as regexp from "@goscript/regexp/index.js"
import "@goscript/regexp/index.js"

export const nonASCII: string = "[\u0080-\ud7ff\ue000-�𐀀-\u{10ffff}]"

export async function main(): globalThis.Promise<void> {
	let s = "\x07\v\x00\x7f\u{10ffff}𐀀\u2028é"
	await $.println("len:", $.len(s))
	for (const [__rangeIndex, r] of $.rangeString(s)) {
		await $.println("rune:", $.int(r))
	}
	let re: regexp.Regexp | $.VarRef<regexp.Regexp> | null = await regexp.MustCompile($.concatString(($.concatString("^", "[\u0080-\ud7ff\ue000-�𐀀-\u{10ffff}]")), "+$"))
	await $.println("match:", await regexp.Regexp.prototype.MatchString.call(re, "é𐀀"), await regexp.Regexp.prototype.MatchString.call(re, "a"))
}

if ($.isMainScript(import.meta)) {
	await main()
}
