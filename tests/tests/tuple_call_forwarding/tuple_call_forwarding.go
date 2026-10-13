package main

import "fmt"

func pair(a, b int) (int, int) {
	return a, b
}

func sum(a, b int) int {
	return a + b
}

type point struct {
	x int
	y int
}

func triple(a, b, c int) (int, int, int) {
	return a, b, c
}

func makePoint(x, y, z int) *point {
	return &point{x: x + z, y: y}
}

func shift(p *point) (*point, *point, *point) {
	return &point{x: p.x + 1, y: p.y}, &point{x: p.x + 2, y: p.y}, &point{x: p.x + 3, y: p.y}
}

// Node is the element type of a variadic parameter that results convert to.
type Node interface {
	Name() string
}

type frame struct{ name string }

func (f *frame) Name() string { return f.name }

type tab struct{ name string }

func (t *tab) Name() string { return t.name }

func newTab(name string) (*frame, *tab) {
	return &frame{name: name + "-frame"}, &tab{name: name + "-tab"}
}

func names(nodes ...Node) {
	println("names:", len(nodes))
	for _, n := range nodes {
		println("name:", n.Name())
	}
}

func total(base int, rest ...int) int {
	for _, r := range rest {
		base += r
	}
	return base
}

func count(v ...int) int { return len(v) }

func span(a, b int, rest ...int) int { return b - a + len(rest) }

type tabs struct{ count int }

// NewTab is async in TypeScript, because it prints.
func (ts *tabs) NewTab(name string) (*frame, *tab) {
	ts.count++
	println("new tab:", name)
	return newTab(name)
}

func main() {
	println("sum:", sum(pair(2, 3)))
	p := makePoint(triple(4, 5, 6))
	println("point:", p.x, p.y)
	x, y, z := new(point), new(point), new(point)
	x, y, z = shift(p)
	println("shift:", x.x, y.x, z.x)

	// Results past the fixed parameters fill the variadic slice.
	names(newTab("Widgets"))
	println("total:", total(pair(3, 4)))
	println("count:", count(pair(3, 4)))
	println("span:", span(pair(5, 9)))
	ts := &tabs{}
	names(ts.NewTab("Text"))
	println("sprint:", fmt.Sprint(pair(3, 4)))
	println("tabs:", ts.count)
}
