package main

type GID uint32

type entry struct {
	start, end uint16
	delta      uint16 // arithmetic modulo 0x10000, as in an OpenType cmap
}

// lookup maps c to a glyph as cmap format 4 does, where the uint16 sum
// wraps before it is widened to a GID.
func lookup(e entry, c uint16) GID {
	return GID(c + e.delta)
}

func main() {
	e := entry{start: 32, end: 126, delta: 65507}
	println("gid H:", lookup(e, 'H'))

	var a, b uint8 = 200, 100
	println("uint8 sum:", uint32(a+b), int(a*b), uint64(a-b-b-b))

	var x, y int16 = 30000, 10000
	println("int16 sum:", int32(x+y), int64(x*3), uint32(-x-y-y))

	var s uint16 = 1
	println("shift:", uint32(s<<15+s<<15), int(^s))

	var i8 int8 = 127
	println("int8:", int(i8+1), float64(i8*2))
}
