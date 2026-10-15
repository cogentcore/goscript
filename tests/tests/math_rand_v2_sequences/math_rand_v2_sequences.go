package main

import (
	"math"
	"math/rand/v2"
	"time"
)

// mix folds v into the FNV-style hash h.
func mix(h, v uint64) uint64 { return (h ^ v) * 1099511628211 }

// splitmix is a Source of the program, which Rand reads through the
// interface.
type splitmix struct{ x uint64 }

func (s *splitmix) Uint64() uint64 {
	s.x += 0x9e3779b97f4a7c15
	z := s.x
	z = (z ^ z>>30) * 0xbf58476d1ce4e5b9
	z = (z ^ z>>27) * 0x94d049bb133111eb
	return z ^ z>>31
}

// draws hashes n rounds of every Rand method that returns a number, but Int
// and Uint, whose values above 2**53 GoScript rounds.
func draws(r *rand.Rand, n int) uint64 {
	var h uint64
	for range n {
		h = mix(h, uint64(r.Int64()))
		h = mix(h, uint64(r.Uint32()))
		h = mix(h, r.Uint64())
		h = mix(h, uint64(r.Int32()))
		h = mix(h, math.Float64bits(r.Float64()))
		h = mix(h, uint64(math.Float32bits(r.Float32())))
		h = mix(h, uint64(r.IntN(1000)))
		h = mix(h, uint64(r.IntN(1<<20)))
		h = mix(h, uint64(r.IntN(3000000000)))
		h = mix(h, uint64(r.IntN(1<<40+7)))
		h = mix(h, uint64(r.Int32N(7)))
		h = mix(h, uint64(r.Uint32N(4294967295)))
		h = mix(h, uint64(r.Int64N(1e15+7)))
		h = mix(h, r.Uint64N(1<<63+5))
		h = mix(h, uint64(r.UintN(12345)))
		h = mix(h, uint64(r.N(time.Duration(1e9))))
		h = mix(h, uint64(r.N(int8(100))))
		h = mix(h, math.Float64bits(r.NormFloat64()))
		h = mix(h, math.Float64bits(r.ExpFloat64()))
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

// show prints the first values of r, then a hash of many more, then
// permutations and Zipf variates.
func show(r *rand.Rand) {
	println("first:", r.Int64(), r.Uint32(), r.Uint64(), r.Int32(), r.IntN(10), r.Int32N(100), r.Uint64N(1<<40))
	println("floats:", r.Float64(), math.Float32bits(r.Float32()), r.NormFloat64(), r.ExpFloat64())
	println("hash:", draws(r, 500))
	println("perm:", ints(r.Perm(12)))
	s := []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
	r.Shuffle(len(s), func(i, j int) { s[i], s[j] = s[j], s[i] })
	println("shuffle:", ints(s))
	z := rand.NewZipf(r, 1.5, 2, 100)
	println("zipf:", z.Uint64(), z.Uint64(), z.Uint64(), z.Uint64())
}

// hex formats bytes in hex.
func hex(b []byte) string {
	const digits = "0123456789abcdef"
	out := ""
	for _, v := range b {
		out += string(digits[v>>4]) + string(digits[v&15])
	}
	return out
}

func main() {
	seeds := []uint64{0, 1, 42, 1<<63 + 3, 0xffffffffffffffff, 0x123456789abcdef}
	for i, seed := range seeds {
		println("pcg", seed)
		show(rand.New(rand.NewPCG(seed, seeds[(i+1)%len(seeds)])))
	}

	for _, b := range []byte{0, 1, 7, 255} {
		var seed [32]byte
		for i := range seed {
			seed[i] = b + byte(i)*b
		}
		println("chacha8", b)
		show(rand.New(rand.NewChaCha8(seed)))
	}

	println("splitmix")
	show(rand.New(&splitmix{x: 7}))

	// PCG and ChaCha8 state round trips.
	p := rand.NewPCG(5, 6)
	p.Uint64()
	data, _ := p.MarshalBinary()
	println("pcg state:", hex(data))
	var p2 rand.PCG
	p2.UnmarshalBinary(data)
	println("pcg restored:", p.Uint64() == p2.Uint64())
	p.Seed(9, 10)
	println("pcg seed:", p.Uint64())

	var seed [32]byte
	c := rand.NewChaCha8(seed)
	buf := make([]byte, 13)
	c.Read(buf)
	println("chacha8 read:", hex(buf))
	data, _ = c.MarshalBinary()
	println("chacha8 state:", hex(data))
	c2 := rand.NewChaCha8([32]byte{1})
	println("chacha8 unmarshal:", c2.UnmarshalBinary(data) == nil)
	c.Read(buf[:5])
	c2.Read(buf[5:10])
	println("chacha8 restored:", hex(buf[:10]), c.Uint64() == c2.Uint64())
	for range 300 {
		c.Uint64()
	}
	println("chacha8 later:", c.Uint64())
}
