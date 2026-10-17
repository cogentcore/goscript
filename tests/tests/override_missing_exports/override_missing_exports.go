package main

import (
	"mime"
	"runtime"
	"unicode"
)

// encoder is satisfied by mime.WordEncoder, whose method table lists the
// unexported methods the override does not implement.
type encoder interface {
	Encode(charset, s string) string
}

func encode[T encoder](e T, s string) string {
	return e.Encode("utf-8", s)
}

func main() {
	// A method of an override class, called through its method function.
	println("upper:", string(unicode.TurkishCase.ToUpper('i')) == "İ")
	lower := unicode.TurkishCase.ToLower
	println("lower:", string(lower('I')) == "ı")

	// A generic call passes the method table of an override type.
	println("encode:", encode(mime.QEncoding, "hi"))

	// Functions and variables the override does not implement exist.
	profile := runtime.MemProfile
	println("profile:", profile != nil)
	println("rate:", runtime.MemProfileRate)
}
