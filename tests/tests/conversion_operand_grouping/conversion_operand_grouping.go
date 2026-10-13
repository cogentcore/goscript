package main

import "math"

type celsius float64

// Conversions that do not change the JavaScript value must keep their
// operand grouped, so that the operand is evaluated before the operator
// that uses the conversion.
func main() {
	n, ny, threads := 4194368, 2, 64
	println("divide:", int(math.Ceil(float64(n)/float64(ny*threads))))
	println("subtract:", float64(n)-float64(ny-threads) == 4194430)
	println("multiply:", float64(2)*float64(ny+threads) == 132)
	println("int:", 100/int(ny*threads/ny))
	println("named:", float64(celsius(n)/celsius(ny+threads)) > 63550)
	var f float64 = 10
	println("float:", int(f/float64(ny+3)) == 2)
	println("unary:", -float64(ny+threads) == -66)
}
