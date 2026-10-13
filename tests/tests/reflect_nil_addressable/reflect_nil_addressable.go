package main

import "reflect"

type S struct {
	A int
	B string
}

func main() {
	// A nil interface has no type and no value.
	println(reflect.TypeOf(nil) == nil, reflect.ValueOf(nil).IsValid())

	// A *any keeps its interface element type.
	a := any(1)
	pa := reflect.ValueOf(&a)
	println(pa.Type() == reflect.TypeFor[*any](), pa.Elem().Kind().String(), pa.Elem().Elem().Kind().String())
	println(reflect.TypeFor[*any]().Elem() == reflect.TypeFor[any]())

	// Only values reached through a pointer or slice are addressable.
	v := 1
	println(reflect.ValueOf(v).CanAddr(), reflect.ValueOf(&v).CanAddr(), reflect.ValueOf(&v).Elem().CanAddr())
	s := S{}
	println(reflect.ValueOf(s).Field(0).CanAddr(), reflect.ValueOf(&s).Elem().Field(0).CanAddr())
	println(reflect.ValueOf([]int{1}).Index(0).CanAddr())

	// Addr of an addressable value points at it.
	e := reflect.ValueOf(&s).Elem().Field(0)
	e.Addr().Elem().SetInt(5)
	println(s.A, e.Addr().Type().String())
}
