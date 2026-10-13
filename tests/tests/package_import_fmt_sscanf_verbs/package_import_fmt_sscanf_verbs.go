package main

import "fmt"

type Pos struct {
	Line, Char int
}

func main() {
	var f32 float32
	n, err := fmt.Sscanf("1.0", "%g", &f32)
	println("g float32:", n, err == nil, f32)

	var f64 float64
	n, err = fmt.Sscanf(" 2.5e1 rest", "%f", &f64)
	println("f float64:", n, err == nil, f64)

	var i64 int64
	var u8 uint8
	n, err = fmt.Sscanf("-42,200", "%d,%d", &i64, &u8)
	println("d int64 uint8:", n, err == nil, i64, u8)

	var r, g, b uint8
	n, err = fmt.Sscanf("ff8000", "%02x%02x%02x", &r, &g, &b)
	println("02x:", n, err == nil, r, g, b)
	n, err = fmt.Sscanf("f80", "%1x%1x%1x", &r, &g, &b)
	println("1x:", n, err == nil, r, g, b)

	var p Pos
	n, err = fmt.Sscanf("L12C3", "L%dC%d", &p.Line, &p.Char)
	println("struct fields:", n, err == nil, p.Line, p.Char)

	var s string
	var v int
	n, err = fmt.Sscanf("name 7", "%s %v", &s, &v)
	println("s v:", n, err == nil, s, v)

	var bl bool
	n, err = fmt.Sscanf("true", "%t", &bl)
	println("t:", n, err == nil, bl)

	n, err = fmt.Sscanf("abc", "%d", &v)
	println("bad int:", n, err != nil)

	n, err = fmt.Sscanf("12", "%d %d", &v, &i64)
	println("short:", n, err != nil, v)

	var a, c int
	var word string
	n, err = fmt.Sscan("3  4\n hello", &a, &c, &word)
	println("Sscan:", n, err == nil, a, c, word)
	var fl float64
	n, err = fmt.Sscan("1.25", &fl)
	println("Sscan float:", n, err == nil, fl)
}
