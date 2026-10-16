package main

import "github.com/s4wave/goscript/tests/tests/cross_package_unexported_named_methods/dep"

func main() {
	// The method table of the boxed pointer includes the unexported methods
	// of dep's type, so dep can assert it to its own interface.
	var v any = &dep.All
	println(dep.Add(v, 3))
	println(dep.Add(v, 4))
	println(dep.All.Len())
}
