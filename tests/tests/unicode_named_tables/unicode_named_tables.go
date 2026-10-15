package main

import "unicode"

func main() {
	// Script tables by their Go names.
	println(unicode.Is(unicode.Han, '中'), unicode.Is(unicode.Han, 'a'))
	println(unicode.Is(unicode.Latin, 'a'), unicode.Is(unicode.Greek, 'λ'))
	println(unicode.In('я', unicode.Latin, unicode.Cyrillic))

	// Property tables by their Go names, including the ones that
	// regexp2 uses for identifier classes.
	println(unicode.Is(unicode.Other_ID_Start, '℘'), unicode.Is(unicode.Other_ID_Continue, '·'))
	println(unicode.Is(unicode.Dash, '-'), unicode.Is(unicode.Hex_Digit, 'f'), unicode.Is(unicode.Hex_Digit, 'g'))
	println(unicode.Is(unicode.White_Space, ' '))

	// A script added in Unicode 16.
	println(unicode.Is(unicode.Garay, 0x10D40))
	println(unicode.Version)
}
