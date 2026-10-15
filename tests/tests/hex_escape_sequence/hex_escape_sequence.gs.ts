// Generated file based on hex_escape_sequence.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as regexp from "@goscript/regexp/index.js"

export const nonASCII: string = "[\xc2\x80-\xed\x9f\xbf\xee\x80\x80-\xef\xbf\xbd\xf0\x90\x80\x80-\xf4\x8f\xbf\xbf]"

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
	let s = "\x07\x0b\x00\x7f\xf4\x8f\xbf\xbf\xf0\x90\x80\x80\xe2\x80\xa8\xc3\xa9"
	await $.println("len:", $.stringLen(s))
	for (let __goscriptRunes0 = $.stringRunes(s); __goscriptRunes0.next(); ) {
		const r = __goscriptRunes0.rune
		await $.println("rune:", $.int(r))
	}
	let re = regexp.MustCompile("^" + "[\xc2\x80-\xed\x9f\xbf\xee\x80\x80-\xef\xbf\xbd\xf0\x90\x80\x80-\xf4\x8f\xbf\xbf]" + "+$")
	await $.println("match:", await (re !== null && (re as any).__isVarRef !== true && (re as any).__goValue === undefined ? ((re as any) as regexp.Regexp).MatchString("\xc3\xa9\xf0\x90\x80\x80") : regexp.Regexp.prototype.MatchString.call(re, "\xc3\xa9\xf0\x90\x80\x80")), await (re !== null && (re as any).__isVarRef !== true && (re as any).__goValue === undefined ? ((re as any) as regexp.Regexp).MatchString("a") : regexp.Regexp.prototype.MatchString.call(re, "a")))
}

if ($.isMainScript(import.meta)) {
	await main()
}
