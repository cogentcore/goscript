package main

import (
	"reflect"
	"strings"
)

type Inner struct {
	X int
}

type arg struct {
	Name  string
	Value any
	Tag   reflect.StructTag
}

func (a *arg) label() string { return a.Name }

type Outer struct {
	Inner
	Name string
}

func main() {
	// A StructField literal takes a Type that may be nil, as reflect.TypeOf
	// returns.
	a := &arg{Name: "Arg", Value: 3, Tag: `json:"arg"`}
	f := reflect.StructField{Name: a.label(), Type: reflect.TypeOf(a.Value), Tag: a.Tag}
	println(f.Name, f.Type.String(), f.Tag.Get("json"))

	// Index is a []int that can be appended to.
	of, _ := reflect.TypeOf(Outer{}).FieldByName("X")
	of.Index = append([]int{9}, of.Index...)
	println(len(of.Index), of.Index[0], of.Index[1], of.Index[2])

	// Value.FieldByNameFunc finds a field by a name predicate.
	val := reflect.ValueOf(Outer{Inner{5}, "n"})
	fv := val.FieldByNameFunc(func(n string) bool { return strings.EqualFold(n, "name") })
	println(fv.String())
	missing := val.FieldByNameFunc(func(n string) bool { return false })
	println(missing.IsValid())

	// The zero StructField has a nil Type and an empty Index.
	var zero reflect.StructField
	println(zero.Type == nil, len(zero.Index))
}
