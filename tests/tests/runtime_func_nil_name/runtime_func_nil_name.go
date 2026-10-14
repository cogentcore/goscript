package main

import (
	"reflect"
	"runtime"
)

func hello() {}

func funcName(f any) string {
	return runtime.FuncForPC(reflect.ValueOf(f).Pointer()).Name()
}

func main() {
	// Name of a nil *runtime.Func is "", as in Go.
	var fn *runtime.Func
	println("nil:", fn.Name() == "")
	println("pc 0:", runtime.FuncForPC(0).Name() == "")

	var nilFunc func()
	println("nil func:", funcName(nilFunc) == "")
	println("hello:", funcName(hello))
}
