package main

import (
	"fmt"
	"math"
)

// pair returns two complex128 values that the compiler cannot fold.
func pair() (complex128, complex128) { return 1 + 2i, 3 - 1i }

func main() {
	// The binary operators, with variable and constant operands.
	a, b := pair()
	fmt.Println(a+b, a-b, a*b, a/b, -a, +a)
	fmt.Println(a*2, 2*a, a/2, a+1i, 1-a)
	fmt.Println(a == b, a != b, a == 1+2i)
	fmt.Printf("%v %.2f %e %g %+v\n", a, a, b, -b, struct{ C complex64 }{2i})

	// The assignment operators.
	c := a
	c += b
	c -= 1
	c *= a
	c /= 2i
	fmt.Println(c)

	// complex64 rounds to the precision of float32 parts.
	var x, y complex64 = complex64(a), complex64(b)
	fmt.Println(x+y, x*y, x/y, -x)
	x *= y
	fmt.Println(x, real(x), imag(x))

	// Division by zero and by infinities follows the Go runtime.
	var zero complex128
	inf := complex(math.Inf(1), 0)
	fmt.Println(a/zero, zero/zero, a/inf, inf/a)
}
