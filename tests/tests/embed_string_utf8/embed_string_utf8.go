package main

import (
	"embed"
	"unicode/utf8"
)

//go:embed text.txt
var text string

//go:embed text.txt
var textBytes []byte

//go:embed invalid.txt
var invalid string

//go:embed dé.txt
var files embed.FS

func main() {
	// An embedded string holds the UTF-8 bytes of the file.
	println("text:", len(text), utf8.RuneCountInString(text), text[:len(text)-1])
	println("bytes:", len(textBytes), string(textBytes) == text, text[1], text[2])
	for i, r := range text[:8] {
		println("rune:", i, r)
	}

	// Bytes that are not valid UTF-8 are kept as they are.
	println("invalid:", len(invalid), utf8.ValidString(invalid), invalid[4], invalid[5])

	// The names of embedded files are UTF-8 too.
	data, err := files.ReadFile("dé.txt")
	println("file:", err == nil, string(data) == "accent\n")
	entries, _ := files.ReadDir(".")
	for _, entry := range entries {
		println("entry:", entry.Name(), len(entry.Name()))
	}
}
