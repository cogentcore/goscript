package main

import (
	"github.com/s4wave/goscript/tests/tests/package_var_deferred_program/tables"
)

// other replaces tables.CodecC.
var other = tables.Codec{Name: "other"}

// labeled reads a deferred table and calls an effect-free function of
// another package, so it is deferred and needs no await.
var labeled = []any{tables.CodecA, tables.Label("y", 6)}

func main() {
	// A deferred list reads the tables of its codecs.
	println("all", len(tables.All), tables.All[0].Name, tables.All[1].Name, tables.All[1].Decode[255])
	println("named", tables.Named[0].(*tables.Codec).Name, tables.Named[1].(string))
	println("labeled", labeled[0].(*tables.Codec).Name, labeled[1].(string))

	// An assignment after initialization does not change a list built at
	// initialization.
	tables.CodecC = &other
	println("withc", tables.WithC[1].Name, tables.CodecC.Name)

	// Nor does a change through a pointer method.
	tables.Count.Inc()
	println("withcount", tables.WithCount[1].(tables.Counter).N, tables.Count.N)
}
