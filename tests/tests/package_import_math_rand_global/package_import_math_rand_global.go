package main

import (
	"math/rand"
	randv2 "math/rand/v2"
)

func main() {
	// The global sources are randomly seeded, so only check properties.
	seen := map[int64]bool{}
	nonzero := 0
	inRange := true
	for range 20 {
		n := rand.Int63()
		seen[n] = true
		if n != 0 {
			nonzero++
		}
		f := rand.Float64()
		f32 := rand.Float32()
		if f < 0 || f >= 1 || f32 < 0 || f32 >= 1 {
			inRange = false
		}
	}
	println("v1 distinct:", len(seen) > 15, "nonzero:", nonzero > 15, "in range:", inRange)

	seen2 := map[uint64]bool{}
	for range 20 {
		seen2[randv2.Uint64()] = true
	}
	n := randv2.IntN(10)
	println("v2 distinct:", len(seen2) > 15, "intn in range:", n >= 0 && n < 10)
}
