package main

import "github.com/s4wave/goscript/tests/tests/named_value_interface_implicit_import/dep"

// notDir returns a value whose type is declared in a package this file
// does not import, so the methods of the boxed value come from an
// implicit import.
func notDir() error {
	return dep.ErrNotDir
}

func main() {
	err := notDir()
	println("error:", err.Error())

	var assigned error
	assigned = dep.ErrNotDir
	println("assigned:", assigned.Error())

	var declared error = dep.ErrNotDir
	println("declared:", declared.Error())

	ch := make(chan error, 1)
	ch <- dep.ErrNotDir
	println("sent:", (<-ch).Error())

	println("converted:", error(dep.ErrNotDir).Error())

	lit := func() error { return dep.ErrNotDir }
	println("func literal:", lit().Error())

	looked, ok := lookup()
	println("multi-value return:", looked.Error(), ok)

	multi, ok := assignLookup()
	println("multi-value assign:", multi.Error(), ok)

	local, ok := localLookup()
	println("local multi-value return:", local.Error(), ok)
}
