package main

// GID is a glyph index, wider than the uint16 arithmetic that computes it.
type GID uint32

// lookup maps c to a glyph as an OpenType cmap format 4 does, where the
// uint16 sum wraps before it is widened to a GID.
func lookup(c, delta uint16) GID {
	return GID(c + delta)
}

// main proves integer conversions wrap (truncate) like Go instead of
// panicking, matching Go's two's-complement conversion semantics.
func main() {
	var big int64 = (1 << 40) + 5
	println("int32:", int32(big))
	println("uint8:", uint8(big))
	println("int16:", int16(big))

	var neg int64 = -1
	println("uint32 of -1:", uint32(neg))
	println("uint64 of -1:", uint64(neg))

	var u uint64 = 0xFFFFFFFFFFFFFFFF
	println("int64 of max uint64:", int64(u))

	// Arithmetic narrower than 64 bits wraps to its own width before a
	// widening conversion.
	println("gid H:", lookup('H', 65507))

	var a, b uint8 = 200, 100
	println("uint8 sum:", uint32(a+b), int(a*b), uint64(a-b-b-b))

	var x, y int16 = 30000, 10000
	println("int16 sum:", int32(x+y), int64(x*3), uint32(-x-y-y))

	var s uint16 = 1
	println("shift:", uint32(s<<15+s<<15), int(^s))

	var i8 int8 = 127
	println("int8:", int(i8+1), float64(i8*2))
}
