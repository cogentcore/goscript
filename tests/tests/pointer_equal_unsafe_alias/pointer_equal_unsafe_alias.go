package main

import "unsafe"

type first struct {
	X int
}

type second struct {
	X int
}

func main() {
	// Distinct pointers before and after an unsafe view is made.
	a := &first{X: 1}
	other := &first{X: 1}
	println("same:", a == a, a != a)
	println("distinct:", a == other, a != other)

	// A view of another type, converted back, is the same pointer.
	view := (*second)(unsafe.Pointer(a))
	back := (*first)(unsafe.Pointer(view))
	println("back:", a == back, a != back, back == a)
	println("still distinct:", a == other, back != other)

	// Fields and elements reached through the pointers agree.
	view.X = 7
	println("shared:", a.X, back.X)
	items := []*first{other, a}
	found := -1
	for i, item := range items {
		if item == back {
			found = i
		}
	}
	println("found:", found)
}
