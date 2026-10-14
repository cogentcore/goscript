package main

import "reflect"

type Base struct {
	Name string
}

func (b *Base) SetName(name string) { b.Name = name }

func (b Base) Label() string { return b.Name }

type Node struct {
	Base
	Value int
}

func main() {
	// A struct type built from the fields of Node, whose embedded Base has
	// methods: Go allows this when Base is the first field.
	nt := reflect.TypeOf(Node{})
	fields := make([]reflect.StructField, nt.NumField())
	for i := range fields {
		fields[i] = nt.Field(i)
	}
	st := reflect.StructOf(fields)
	println(st.NumField(), st.Field(0).Anonymous, st.Field(1).Name)

	println(st.Field(0).Type.String(), st.Field(1).Type.String())
}
