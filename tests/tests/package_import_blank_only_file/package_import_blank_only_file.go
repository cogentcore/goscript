package main

import (
	_ "github.com/s4wave/goscript/tests/tests/package_import_blank_only_file/all"
	"github.com/s4wave/goscript/tests/tests/package_import_blank_only_file/registry"
)

func main() {
	if !registry.Registered("blank") {
		panic("blank import in a file without declarations did not run")
	}
	println("registered:", registry.Registered("blank"))
}
