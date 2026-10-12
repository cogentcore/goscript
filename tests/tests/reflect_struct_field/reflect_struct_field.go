package main

import "reflect"

type inner struct {
	A int
	B string
}

type outer struct {
	X  float64
	In inner
	P  *inner
}

func main() {
	// Test creating a StructField value
	field := reflect.StructField{
		Name: "TestField",
		Type: reflect.TypeFor[string](),
	}
	println("StructField Name:", field.Name)
	println("StructField Type:", field.Type.String())

	// Type.FieldByIndex selects nested fields, following pointers to structs
	typ := reflect.TypeOf(outer{})
	f := typ.FieldByIndex([]int{0})
	println("FieldByIndex 0:", f.Name, f.Type.String())
	f = typ.FieldByIndex([]int{1, 1})
	println("FieldByIndex 1,1:", f.Name, f.Type.String())
	f = typ.FieldByIndex([]int{2, 0})
	println("FieldByIndex 2,0:", f.Name, f.Type.String())
}
