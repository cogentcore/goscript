package main

import "regexp"

// Escapes in Go string literals that have no JavaScript equivalent:
// \U for runes outside the Basic Multilingual Plane and \a.
const nonASCII = "[\u0080-퟿-�\U00010000-\U0010FFFF]"

func main() {
	s := "\a\v\x00\x7f\U0010FFFF\U00010000 é"
	println("len:", len(s))
	for _, r := range s {
		println("rune:", int(r))
	}
	re := regexp.MustCompile("^" + nonASCII + "+$")
	println("match:", re.MatchString("é𐀀"), re.MatchString("a"))
}
