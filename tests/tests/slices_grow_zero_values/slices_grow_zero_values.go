package main

import "slices"

type word uint

func main() {
	var nilWords []word
	nilWords = slices.Grow(nilWords, 3)
	nilWords = nilWords[:3]
	println("nil words", nilWords[0], nilWords[1], nilWords[2])

	counts := make([]int, 1, 1)
	counts[0] = 7
	counts = slices.Grow(counts, 2)
	counts = counts[:3]
	println("counts", counts[0], counts[1], counts[2])

	names := slices.Grow([]string{"a"}, 2)[:3]
	println("names", names[0], names[1] == "", names[2] == "")

	var pointers []*int
	pointers = slices.Grow(pointers, 2)[:2]
	println("pointers", pointers[0] == nil, pointers[1] == nil)
}
