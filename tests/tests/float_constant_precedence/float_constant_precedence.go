package main

import (
	"fmt"
	"math"
)

// Rational float constants stay one operand inside any larger expression.
const (
	third      = 1.0 / 3
	negThird   = -1.0 / 3
	twoThirds  = 2.0 / 3
	negTenth   = -0.1
	smallRatio = 1.0 / 3e20
)

func main() {
	x := 12.0
	n := 5

	fmt.Println("div:", x/third, x/negThird, x/twoThirds, x/-negTenth)
	fmt.Println("sub:", third-x, negThird-x, x-third, x-negThird)
	fmt.Println("mul:", x*third, third*x, x*negThird, x*twoThirds*x)
	fmt.Println("neg:", -x/third, -(x / third), -(x * negThird), -x-negThird, -x*negTenth)
	fmt.Println("pow:", round(math.Pow(x, third)), round(math.Pow(third, 2)), round(math.Pow(negTenth, 3)), round(math.Pow(x, negThird)))
	fmt.Println("call:", math.Sqrt(x*third), math.Abs(negThird*x), math.Max(third, x/third))
	fmt.Println("shift:", float64(int(x/third)<<2), float64(int64(1)<<n)/third, float64(int(x*third)>>1), x/(third*float64(int64(1)<<40)))
	fmt.Println("small:", x/smallRatio, smallRatio*x)
	fmt.Println("cmp:", x*third < 4.01, x/third == 36, x-third > 11)
	fmt.Println("mix:", (x+third)/(x-third), x/third/third, x/(1/third))
}

// round trims the last binary digits that math.Pow may disagree on.
func round(v float64) float64 {
	return math.Round(v*1e9) / 1e9
}
