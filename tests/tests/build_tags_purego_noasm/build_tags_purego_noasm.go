package main

// goscript cannot run assembly, so it builds with the purego and noasm
// tags, which select pure Go code in packages that also provide
// assembly implementations. expected.log matches
// `go run -tags purego,noasm ./`.

func main() {
	println("haveArchSqrt:", haveArchSqrt)
	println("purego:", puregoImpl())
	println("sqrt(16):", sqrt(16))
}

func sqrt(x float64) float64 {
	if haveArchSqrt {
		return archSqrt(x)
	}
	z := x / 2
	for range 20 {
		z -= (z*z - x) / (2 * z)
	}
	return z
}
