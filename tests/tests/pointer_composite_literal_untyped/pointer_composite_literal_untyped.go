package main

func main() {
	// The address of an anonymous struct literal points at a copy.
	var ptr *struct{ x int }
	ptr = &struct{ x int }{42}
	println("Pointer value x:", ptr.x)

	// An elided element of pointer type takes the address of its literal.
	data := []*struct{ x int }{{42}, {43}}
	data[1].x++
	println("First element x:", data[0].x)
	println("Second element x:", data[1].x)

	// The elided literal may be an array or a map too.
	pairs := []*[2]int{{1, 2}}
	pairs[0][1] = 5
	println("Pair:", pairs[0][0], pairs[0][1])
	names := []*map[string]int{{"a": 1}}
	(*names[0])["b"] = 2
	println("Names:", len(*names[0]))
}
