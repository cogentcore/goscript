package main

import (
	"github.com/s4wave/goscript/tests/tests/runtime_caller_maxify/subpkg"
)

// local names the line that calls it.
//
//goscript:maxify
func local(names *[]string) {
	*names = append(*names, subpkg.Name(2))
}

func main() {
	var names []string
	subpkg.Add(&names, func() {
	})
	subpkg.Add(
		&names,
		func() {},
	)
	subpkg.AddOf(&names, 1)
	subpkg.AddOf[string](&names,
		"two")
	local(&names)
	func() { subpkg.Add(&names, nil) }()
	p := &subpkg.Plan{}
	p.
		Add().
		Add()
	names = append(names, p.Names...)
	for _, name := range names {
		println(name)
	}

	// Calls the chain does not reach still find a frame.
	add := subpkg.Add
	add(&names, nil)
	println("value call named:", names[len(names)-1] != "")
	println("unmarked named:", subpkg.Unmarked() != "")
}
