package main

import "math"

const third = 1.0 / 3

const digitsToBitsRatio = math.Ln10 / math.Ln2

func main() {
	bits := 296
	three := 3.0
	println("third", int(three/third), int(three*third*3))
	println("digits", int(float64(bits)/digitsToBitsRatio))
}
