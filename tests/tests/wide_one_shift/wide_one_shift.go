package main

// flags is a set of bit flags, as an int64 holding bits 1<<f.
type flags int64

// has reports whether the flag of bit index f is set, by the mask 1<<f.
func (fl flags) has(f int64) bool {
	return int64(fl)&(1<<uint32(f)) != 0
}

func main() {
	// Masks of int64 for counts of each kind, up to the sign bit and past it.
	counts := []uint32{0, 1, 31, 32, 53, 62, 63, 64, 65, 200}
	for _, k := range counts {
		var m int64 = 1 << k
		println("int64", k, m)
	}

	// Masks of uint64, with a bigint count.
	for _, k := range []int64{0, 7, 52, 63, 64, 100} {
		var m uint64 = 1 << k
		println("uint64", k, m)
	}

	// A mask of the platform uint, and one used in a flag test.
	var k uint = 40
	var u uint = 1 << k
	println("uint", u)
	fl := flags(1<<3 | 1<<40)
	println("has", fl.has(3), fl.has(4), fl.has(40), fl.has(63))
}
