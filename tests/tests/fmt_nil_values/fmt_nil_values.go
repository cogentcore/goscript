package main

import "fmt"

// T is the element type of Line.
type T struct{ A int }

// Line is a named slice type, Ints and Bytes named slices of basic types,
// and M a named map type, whose nil values fmt prints as empty ones.
type Line []T
type Ints []int
type Bytes []byte
type M map[string]int

func main() {
	var l Line
	var i Ints
	var b Bytes
	var s []T
	var m M
	var p *T

	// Print and Sprint format a nil slice or map as an empty one, as %v
	// does.
	fmt.Println(fmt.Sprint(l), fmt.Sprint(i), fmt.Sprint(b), fmt.Sprint(s), fmt.Sprint(m))
	fmt.Println(l, i, s, m, p)
	fmt.Printf("%v %v %v %+v|%d|%s\n", l, i, b, l, i, b)

	// %#v spells the type of a nil slice, map or pointer.
	fmt.Printf("%#v %#v %#v %#v %#v\n", l, i, s, m, p)
	fmt.Printf("%#v %#v\n", b, map[string]int(nil))

	// The same holds in an interface and in a struct field.
	var a any = l
	fmt.Println(a, fmt.Sprint(a), fmt.Sprintf("%#v", a))
	x := struct{ L Line }{}
	fmt.Printf("%v %+v\n", x, x)
}
