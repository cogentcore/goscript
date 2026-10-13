//go:build !noasm

package main

const haveArchSqrt = true

// archSqrt stands in for a function that would be implemented in assembly.
func archSqrt(x float64) float64 {
	return 0
}
