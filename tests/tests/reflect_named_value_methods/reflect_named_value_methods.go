package main

import (
	"errors"
	"reflect"
)

type Fruits int32

const (
	Apple Fruits = iota
	Peach
	Strawberry
)

func (f Fruits) String() string { return [...]string{"Apple", "Peach", "Strawberry"}[f] }

func (f *Fruits) SetString(s string) error {
	if s != "Strawberry" {
		return errors.New("bad fruit " + s)
	}
	*f = Strawberry
	return nil
}

type stringer interface{ String() string }

type setStringer interface{ SetString(s string) error }

func main() {
	// Values of a named basic type made by reflect keep their methods.
	fruit := Peach
	ev := reflect.ValueOf(&fruit).Elem()
	st, ok := ev.Interface().(stringer)
	println(ok)
	if ok {
		println(st.String())
	}
	ss, ok := ev.Addr().Interface().(setStringer)
	println(ok)
	if ok {
		println(ss.SetString("Strawberry") == nil, fruit == Strawberry)
	}
	_, ok = ev.Interface().(setStringer)
	println(ok)

	nv := reflect.New(reflect.TypeFor[Fruits]())
	nv.Elem().SetInt(1)
	if s, ok := nv.Elem().Interface().(stringer); ok {
		println(s.String())
	}
}
