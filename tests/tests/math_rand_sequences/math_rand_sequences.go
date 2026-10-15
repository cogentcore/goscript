package main

import (
	"math"
	"math/rand"
)

// mix folds v into the FNV-style hash h.
func mix(h, v uint64) uint64 { return (h ^ v) * 1099511628211 }

// lcg is a Source of the program, which Rand reads through the interface.
type lcg struct{ x uint64 }

func (l *lcg) Seed(seed int64) { l.x = uint64(seed) }

func (l *lcg) Int63() int64 {
	l.x = l.x*6364136223846793005 + 1442695040888963407
	return int64(l.x >> 1)
}

// draws hashes n rounds of every Rand method that returns a number, but Int,
// whose values above 2**53 GoScript rounds.
func draws(r *rand.Rand, n int) uint64 {
	var h uint64
	for range n {
		h = mix(h, uint64(r.Int63()))
		h = mix(h, math.Float64bits(r.Float64()))
		h = mix(h, uint64(math.Float32bits(r.Float32())))
		h = mix(h, uint64(r.Intn(1000)))
		h = mix(h, uint64(r.Int31n(7)))
		h = mix(h, uint64(r.Int31n(1<<20)))
		h = mix(h, uint64(r.Int63n(1e15+7)))
		h = mix(h, uint64(r.Int63n(1<<40)))
		h = mix(h, uint64(r.Intn(3000000000)))
		h = mix(h, math.Float64bits(r.NormFloat64()))
		h = mix(h, math.Float64bits(r.ExpFloat64()))
		h = mix(h, r.Uint64())
		h = mix(h, uint64(r.Uint32()))
		h = mix(h, uint64(r.Int31()))
	}
	return h
}

// ints formats a slice of small ints.
func ints(s []int) string {
	out := ""
	for _, v := range s {
		out += string(rune('a' + v))
	}
	return out
}

// bytesHex formats bytes in hex.
func bytesHex(b []byte) string {
	const digits = "0123456789abcdef"
	out := ""
	for _, v := range b {
		out += string(digits[v>>4]) + string(digits[v&15])
	}
	return out
}

// show prints the first values of r, then a hash of many more, then
// permutations, bytes and Zipf variates.
func show(r *rand.Rand) {
	println("first:", r.Int63(), r.Uint32(), r.Uint64(), r.Int31(), r.Intn(10), r.Int31n(100))
	println("floats:", r.Float64(), math.Float32bits(r.Float32()), r.NormFloat64(), r.ExpFloat64())
	println("hash:", draws(r, 1000))

	println("perm:", ints(r.Perm(12)))

	s := []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
	r.Shuffle(len(s), func(i, j int) { s[i], s[j] = s[j], s[i] })
	println("shuffle:", ints(s))

	b := make([]byte, 13)
	r.Read(b)
	r.Read(b[:5])
	println("read:", bytesHex(b))

	z := rand.NewZipf(r, 1.5, 2, 100)
	println("zipf:", z.Uint64(), z.Uint64(), z.Uint64(), z.Uint64())
}

func main() {
	seeds := []int64{0, 1, 42, -7, 89482311, 2147483646, 2147483647, 2147483648, 1 << 40, -1 << 63, 1<<63 - 1}
	for _, seed := range seeds {
		println("seed", seed)
		show(rand.New(rand.NewSource(seed)))
	}

	// Reseeding restarts the sequence, also after a Read.
	r := rand.New(rand.NewSource(5))
	b := make([]byte, 3)
	r.Read(b)
	r.Seed(5)
	r2 := rand.New(rand.NewSource(5))
	println("reseed:", r.Int63() == r2.Int63(), r.Float64() == r2.Float64())

	// A Source of the program goes through the interfaces.
	println("lcg")
	show(rand.New(&lcg{x: 1}))

	// A Source used directly, and as a Source64.
	src := rand.NewSource(99)
	println("source:", src.Int63(), src.(rand.Source64).Uint64())
}
