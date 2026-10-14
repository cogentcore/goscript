package main

import (
	"slices"
	"strings"
	"unicode"
	"unicode/utf8"
)

func main() {
	s := "BadUTF8\xe2\xe2\xa1"
	println(len(s), utf8.ValidString(s), utf8.RuneCountInString(s))

	// range yields RuneError with width 1 for each invalid byte
	for i, r := range s {
		println(i, r)
	}

	r, size := utf8.DecodeRuneInString(s[7:])
	println(r, size)
	r, size = utf8.DecodeLastRuneInString(s)
	println(r, size)
	println(utf8.Valid([]byte(s)), utf8.RuneCount([]byte(s)))

	// indexing and slicing work on bytes
	println(s[7], s[8], s[9], len(s[7:]), s[:7])

	// conversions
	runes := []rune(s)
	println(len(runes), runes[7], runes[9])
	bs := []byte(s)
	println(len(bs), bs[7], string(bs) == s)
	println(len(string(runes)), string(runes) == "BadUTF8���")

	// building from runes
	var b strings.Builder
	for _, r := range s {
		if unicode.IsUpper(r) {
			r = unicode.ToLower(r)
		}
		b.WriteRune(r)
	}
	out := b.String()
	println(len(out), out == "badutf8���")

	// concatenation keeps the bytes
	c := s + "x"
	println(len(c), c[9], c[10], utf8.ValidString(c))
	d := "x" + s
	println(len(d), d[0], d[8], d[10], d == "xBadUTF8\xe2\xe2\xa1")
	e := s + "é"
	println(len(e), e[10], e[11], e == "BadUTF8\xe2\xe2\xa1\xc3\xa9")
	f := s[:8] + s[8:]
	println(f == s, len(f))

	// strings functions
	println(strings.ToLower(s) == "badutf8\xe2\xe2\xa1", len(strings.ToLower(s)))
	println(strings.ToUpper(s) == "BADUTF8\xe2\xe2\xa1", len(strings.ToUpper(s)))
	println(strings.IndexByte(s, 0xe2), strings.Index(s, "\xe2\xa1"), strings.Contains(s, "UTF"))
	println(strings.ToValidUTF8(s, "?"), strings.ToValidUTF8(s, ""), strings.ToValidUTF8("a\xffb\xc3", "[x]"))
	println(strings.Map(func(r rune) rune {
		if r == 'a' {
			return -1
		}
		return r
	}, "banana"))

	// a binary key keeps its text prefix and orders by its bytes
	key := "block:\x01\xff\x80"
	rest, ok := strings.CutPrefix(key, "block:")
	println(strings.HasPrefix(key, "block:"), ok, len(rest), rest[0], rest[1])
	keys := []string{"gcroot", key}
	slices.Sort(keys)
	println(keys[0] == key, key < "gcroot", strings.Compare(key, "gcroot"))
	keyed := map[string]int{key: 1}
	println(keyed["block:\x01\xff\x80"], keyed[string([]byte(key))])

	// bytes split from a sequence join into it again
	euro := "€"
	println(len(euro[:1]), euro[:1]+euro[1:] == euro, euro[:2]+"\xac" == euro)

	// decoding at the edges
	println(utf8.FullRune([]byte{0xe2, 0x82}), utf8.FullRune([]byte{0xe2, 0x28}), utf8.FullRuneInString("\xe2"))
	r, size = utf8.DecodeLastRuneInString("é\xa9")
	println(r, size, utf8.RuneCount([]byte("\xed\xa0\x80")), utf8.ValidString("\xed\xa0\x80"))
	r, size = utf8.DecodeRune([]byte("\xf0\x9f\x98\x80"))
	println(r, size)
}
