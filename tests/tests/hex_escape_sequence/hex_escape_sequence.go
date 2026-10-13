package main

import "regexp"

// Escapes in Go string literals that have no JavaScript equivalent:
// \U for runes outside the Basic Multilingual Plane and \a.
const nonASCII = "[\u0080-퟿-�\U00010000-\U0010FFFF]"

func main() {
	// Test hexadecimal escape sequences in string literals
	// This should reproduce the error: TS1125: Hexadecimal digit expected.

	// This reproduces the original error: buf = $.append(buf, `\x`)
	var buf []byte
	buf = append(buf, `\x`...)
	println("Appended raw string with \\x:", string(buf))

	// Raw string with incomplete hex escape
	s1 := `\x` // This should be treated as literal \x
	println("Raw string with \\x:", s1)

	// Raw string with \x followed by non-hex
	s2 := `\xG` // This should be treated as literal \xG
	println("Raw string with \\xG:", s2)

	// Interpreted string with \x escape sequence
	s3 := "\x41" // This should be treated as hex escape for 'A'
	println("Interpreted string:", s3)

	// Escapes JavaScript lacks, and runes it must escape.
	s := "\a\v\x00\x7f\U0010FFFF\U00010000 é"
	println("len:", len(s))
	for _, r := range s {
		println("rune:", int(r))
	}
	re := regexp.MustCompile("^" + nonASCII + "+$")
	println("match:", re.MatchString("é𐀀"), re.MatchString("a"))
}
