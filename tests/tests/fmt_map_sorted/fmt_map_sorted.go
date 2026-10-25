package main

import (
	"fmt"
	"math"
)

type key struct {
	A int
	B string
}

func main() {
	// Keys are sorted, numbers by value with NaN first.
	ints := map[int]string{3: "c", -1: "a", 2: "b"}
	floats := map[float64]bool{2.5: true, math.NaN(): false, -1: true}
	fmt.Println(ints, floats)
	fmt.Printf("%v %+v %#v\n", ints, ints, ints)

	// Strings, bools, arrays and structs sort by value, field by field.
	fmt.Println(map[string]int{"b": 2, "a": 1, "": 0})
	fmt.Println(map[bool]int{true: 1, false: 0})
	fmt.Println(map[[2]int]string{{2, 1}: "y", {1, 9}: "x"})
	fmt.Println(map[key]int{{2, "a"}: 3, {1, "b"}: 2, {1, "a"}: 1})

	// Interface elements, nested maps and nil and empty maps.
	var nilMap map[string]int
	fmt.Println(map[string]any{"x": 1, "y": "s"}, map[int]map[int]int{1: {2: 3}})
	fmt.Printf("%v %#v %v\n", nilMap, nilMap, map[string]int{})
	var x any = map[string]int{"k": 1}
	fmt.Println(x, fmt.Sprint(x))
}
