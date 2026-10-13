// Generated file based on hex_escape_sequence.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as regexp from "@goscript/regexp/index.js"
import "@goscript/regexp/index.js"

export const nonASCII: string = "[\u0080-\ud7ff\ue000-�𐀀-\u{10ffff}]"

export async function main(): globalThis.Promise<void> {
	// Test hexadecimal escape sequences in string literals
	// This should reproduce the error: TS1125: Hexadecimal digit expected.

	// This reproduces the original error: buf = $.append(buf, `\x`)
	let buf: $.Slice<number> = null! as $.Slice<number>
	buf = $.appendSlice(buf, $.stringToBytes("\\x"), $.byteSliceHint)
	await $.println("Appended raw string with \\x:", $.bytesToString(buf))

	// Raw string with incomplete hex escape
	let s1 = "\\x"
	await $.println("Raw string with \\x:", s1)

	// Raw string with \x followed by non-hex
	let s2 = "\\xG"
	await $.println("Raw string with \\xG:", s2)

	// Interpreted string with \x escape sequence
	let s3 = "A"
	await $.println("Interpreted string:", s3)

	// Escapes JavaScript lacks, and runes it must escape.
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
