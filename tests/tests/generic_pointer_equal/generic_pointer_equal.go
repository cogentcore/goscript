package main

import "slices"

type node struct {
	name     string
	parent   *node
	children []*node
}

type point struct {
	x, y int
}

type pair struct {
	a point
	b point
}

func eq[T comparable](a, b T) bool {
	return a == b
}

func newPoint(x, y int) point {
	return point{x, y}
}

func main() {
	// Distinct pointers to equal structs, linked in a cycle through their
	// parent, compare by identity.
	root := &node{name: "root"}
	a := &node{name: "leaf", parent: root}
	b := &node{name: "leaf", parent: root}
	root.children = []*node{a, b}
	println("index a:", slices.Index(root.children, a))
	println("index b:", slices.Index(root.children, b))
	println("contains root:", slices.Contains(root.children, root))
	println("eq a b:", eq(a, b), "eq a a:", eq(a, a))
	println("any a b:", any(a) == any(b), "any a a:", any(a) == any(a))

	// Struct values compare by their fields wherever they come from.
	var zero point
	lit := point{1, 2}
	ptr := &point{1, 2}
	made := make([]point, 2)
	made[1] = lit
	arr := [2]point{{1, 2}, {3, 4}}
	m := map[string]point{"k": {1, 2}}
	p := pair{a: point{1, 2}}
	println("zero:", eq(zero, point{}), eq(zero, made[0]))
	println("deref:", eq(lit, *ptr), "slice:", eq(lit, made[1]), "array:", eq(lit, arr[0]))
	println("map:", eq(lit, m["k"]), "field:", eq(lit, p.a), "return:", eq(lit, newPoint(1, 2)))
	println("differ:", eq(lit, arr[1]), "pair:", eq(p, pair{a: lit}))
	println("index values:", slices.Index([]point{{3, 4}, {1, 2}}, *ptr))
	println("any values:", any(lit) == any(*ptr), any(lit) == any(arr[1]))
}
