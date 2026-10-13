//go:build noasm

package main

const haveArchSqrt = false

func archSqrt(x float64) float64 {
	panic("not implemented")
}
