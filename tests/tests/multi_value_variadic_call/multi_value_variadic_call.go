package main

import "fmt"

type Node interface {
	Name() string
}

type Frame struct{ name string }

func (f *Frame) Name() string { return f.name }

type Tab struct{ name string }

func (t *Tab) Name() string { return t.name }

func newTab(name string) (*Frame, *Tab) {
	return &Frame{name: name + "-frame"}, &Tab{name: name + "-tab"}
}

func pair() (int, int) { return 3, 4 }

func names(parent ...Node) {
	println("count:", len(parent))
	for _, p := range parent {
		println("name:", p.Name())
	}
}

func sum(base int, rest ...int) int {
	for _, r := range rest {
		base += r
	}
	return base
}

func ints(v ...int) int { return len(v) }

type Tabs struct{ count int }

// NewTab is async in TypeScript, because it prints.
func (ts *Tabs) NewTab(name string) (*Frame, *Tab) {
	ts.count++
	println("new tab:", name)
	return newTab(name)
}

func main() {
	names(newTab("Widgets"))
	println("sum:", sum(pair()))
	println("ints:", ints(pair()))
	ts := &Tabs{}
	names(ts.NewTab("Text"))
	println("sprint:", fmt.Sprint(pair()))
	println("tabs:", ts.count)
}
