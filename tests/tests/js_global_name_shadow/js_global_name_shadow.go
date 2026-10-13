package main

// These package-level names match JavaScript globals that generated code
// uses for integer arithmetic, conversions and async functions.

type Family int

const (
	Serif Family = iota
	Math
)

type Number float64

func String(v int) string { return "String" }

var Array = []string{"Array"}

type Promise struct {
	value string
}

type point struct{ x, y int }

func main() {
	p := Promise{value: "Promise"}
	println("names:", int(Math), Number(1.5), String(1), Array[0], p.value)

	a, b := 7, 2
	w := int32(a)
	println("multiply:", a*b, w*int32(b))
	var u uint32 = 4000000000
	println("unsigned multiply:", u*3)
	println("divide:", a/b, -a/b)

	r := rune(0x1F600)
	println("rune string:", string(r) == "\U0001F600")

	var points [2]point
	points[1].x = 3
	println("array:", points[1].x, points[0].y)

	var big int64 = 1 << 40
	var f float64 = float64(big)
	println("int64 to float:", f == 1099511627776)
	var n int = int(big >> 20)
	println("int64 to int:", n)
}
