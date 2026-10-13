package main

import "github.com/s4wave/goscript/tests/tests/named_value_interface_implicit_import/dep"

// lookup returns both results of a call, converting the first to an
// interface. This file has no other use of the errno package.
func lookup() (error, bool) {
	return dep.Lookup()
}
