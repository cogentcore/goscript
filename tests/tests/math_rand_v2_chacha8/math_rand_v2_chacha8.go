package main

import (
	randv1 "math/rand"
	"math/rand/v2"
)

func main() {
	var seed [32]byte
	for i := range seed {
		seed[i] = byte(i + 1)
	}
	r := rand.NewChaCha8(seed)
	for i := 0; i < 8; i++ {
		println(r.Uint64())
	}
	for i := 0; i < 124; i++ {
		r.Uint64()
	}
	for i := 0; i < 8; i++ {
		println(r.Uint64())
	}
	b, err := r.MarshalBinary()
	if err != nil {
		panic(err)
	}
	println(len(b))
	for _, v := range b {
		println(v)
	}
	r2 := rand.NewChaCha8(seed)
	if err := r2.UnmarshalBinary(b); err != nil {
		panic(err)
	}
	for i := 0; i < 8; i++ {
		println(r2.Uint64())
	}
	seed2 := seed
	seed2[0] = 0xff
	r.Seed(seed2)
	println(r.Uint64())

	globalSources()
}

// globalSources checks the randomly seeded global sources, so only their
// properties.
func globalSources() {
	seen := map[int64]bool{}
	nonzero := 0
	inRange := true
	for range 20 {
		n := randv1.Int63()
		seen[n] = true
		if n != 0 {
			nonzero++
		}
		f := randv1.Float64()
		f32 := randv1.Float32()
		if f < 0 || f >= 1 || f32 < 0 || f32 >= 1 {
			inRange = false
		}
	}
	println("v1 distinct:", len(seen) > 15, "nonzero:", nonzero > 15, "in range:", inRange)

	seen2 := map[uint64]bool{}
	for range 20 {
		seen2[rand.Uint64()] = true
	}
	n := rand.IntN(10)
	println("v2 distinct:", len(seen2) > 15, "intn in range:", n >= 0 && n < 10)
}
