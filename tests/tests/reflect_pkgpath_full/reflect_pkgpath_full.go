package main

import (
	"reflect"

	"github.com/s4wave/goscript/tests/tests/reflect_pkgpath_full/dep"
)

type mainType struct{}

func show(label string, t reflect.Type) {
	println(label+":", t.PkgPath(), t.Name(), t.String())
}

func main() {
	show("struct", reflect.TypeOf(dep.Node{}))
	show("pointer elem", reflect.TypeOf(&dep.Node{}).Elem())
	show("basic", reflect.TypeOf(dep.Level(1)))
	show("interface", reflect.TypeFor[dep.Namer]())
	show("local", dep.LocalType())
	show("main", reflect.TypeOf(mainType{}))
	println("generic:", reflect.TypeOf(dep.Box[int]{}).PkgPath())
	println("unnamed:", reflect.TypeOf([]dep.Node{}).PkgPath() == "")
}
