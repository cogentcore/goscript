package main

import "github.com/s4wave/goscript/tests/tests/import_package_var_assign/dep"

// These pointers are declared before the lazily initialized variables they
// point at, which live in another file and in an imported package.
var (
	userPtr     = &userLevel
	levelPtr    = &level
	importedPtr = &dep.UserLevel
)

func main() {
	dep.Count = 7
	println(dep.Current())
	dep.Hook = func() error {
		return dep.Wait()
	}
	if err := dep.Run(); err != nil {
		println("hook error")
		return
	}
	println("hook ok")

	// Read and write variables stored in a pointer box.
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

	// Read and write lazy variables through package-level pointers.
	println(*userPtr, userLevel)
	*userPtr = 5
	println(userLevel, *userPtr)
	println(*levelPtr, level)
	level = 7
	println(*levelPtr)
	*importedPtr = 8
	println(int(dep.UserLevel), *dep.UserPtr())
}
