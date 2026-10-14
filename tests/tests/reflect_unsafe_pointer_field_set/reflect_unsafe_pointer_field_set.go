package main

import (
	"reflect"
	"unsafe"
)

type config struct {
	Name    string
	UsesCgo bool
}

func main() {
	c := &config{Name: "x"}
	f := reflect.ValueOf(c).Elem().FieldByName("UsesCgo")
	*(*bool)(f.Addr().UnsafePointer()) = true
	println(c.UsesCgo)

	b := false
	p := unsafe.Pointer(&b)
	*(*bool)(p) = true
	println(b)
}
