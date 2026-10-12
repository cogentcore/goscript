package main

import "github.com/s4wave/goscript/tests/tests/import_package_var_ref/dep"

func main() {
	if dep.Verbosity <= 2 {
		println("at most 2")
	}
	println(dep.Verbosity+1, int(dep.Verbosity))
	dep.Verbosity = 5
	println(dep.Get(), dep.Verbosity > 3)
	dep.Verbosity++
	println(*dep.Ptr)
	p := &dep.Verbosity
	*p = 9
	println(dep.Verbosity, dep.Get())

	if dep.UserLevel <= 3 {
		println("user level", int(dep.UserLevel), *dep.UserPtr())
	}
}
