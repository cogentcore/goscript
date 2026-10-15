package main

type Small int8

type Code uint16

func main() {
	// Widening conversions keep every value.
	runes := []rune{'a', -1, 0x10FFFF, -2147483648, 2147483647}
	sum := 0
	for _, r := range runes {
		sum += int(r)
		println("rune", int(r), int64(r), int32(r))
	}
	println("sum", sum)

	bs := []byte{0, 1, 127, 128, 255}
	for _, b := range bs {
		println("byte", int(b), uint16(b), int16(b), uint32(b), int8(b))
	}

	var i8 int8 = -128
	var u16 uint16 = 65535
	var u32 uint32 = 4294967295
	var i16 int16 = -32768
	println("i8", int16(i8), int32(i8), int(i8), int64(i8), uint8(i8), uint(i8))
	println("u16", int32(u16), uint32(u16), int(u16), int16(u16), uint8(u16))
	println("u32", int(u32), uint64(u32), int64(u32), int32(u32), uint16(u32))
	println("i16", int32(i16), int(i16), uint16(i16), int8(i16))

	// Named types convert like their underlying types.
	s := Small(-5)
	c := Code(40000)
	println("named", int(s), int32(s), Small(int8(s)), int(c), uint32(c), int16(c), Code(uint8(c)))

	// Narrowing conversions still wrap.
	n := 300
	m := -1
	println("narrow", int8(n), uint8(n), int16(n*300), uint16(m), uint32(m), int32(n*10000000))
}
