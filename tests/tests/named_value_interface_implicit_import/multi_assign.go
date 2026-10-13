package main

import "github.com/s4wave/goscript/tests/tests/named_value_interface_implicit_import/dep"

// assignLookup assigns both results of a call, converting the first to an
// interface. This file has no other use of the errno package.
func assignLookup() (error, bool) {
	var err error
	var ok bool
	err, ok = dep.Lookup()
	return err, ok
}
