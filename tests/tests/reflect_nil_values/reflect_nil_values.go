package main

import (
	"fmt"
	"reflect"
)

type S struct{ V []string }

func main() {
	// The zero value of a slice type is a nil slice.
	st := reflect.TypeOf([]int(nil))
	z := reflect.Zero(st)
	n := reflect.New(st).Elem()
	fmt.Println(z.IsNil(), n.IsNil(), n.Len(), reflect.MakeSlice(st, 0, 0).IsNil())
	var bs []byte
	p := reflect.ValueOf(&bs).Elem()
	p.Set(reflect.Zero(p.Type()))
	fmt.Println(p.IsNil(), bs == nil)

	// An interface holding a nil slice is not nil.
	x := reflect.ValueOf(&S{}).Elem().Field(0).Interface()
	fmt.Println(x == nil, reflect.ValueOf(&x).Elem().IsNil())
	var e any
	fmt.Println(reflect.ValueOf(&e).Elem().IsNil())

	// MapIndex finds a key however its Value was made, and gives the zero
	// Value for a missing one.
	m := map[int]string{0: "a"}
	mv := reflect.ValueOf(m)
	k := reflect.New(reflect.TypeOf(0)).Elem()
	k.SetInt(0)
	fmt.Println(mv.MapIndex(reflect.ValueOf(0)), mv.MapIndex(k))
	fmt.Println(mv.MapIndex(reflect.ValueOf(5)).IsValid())
	var nilMap map[int]string
	fmt.Println(reflect.ValueOf(nilMap).MapIndex(k).IsValid())
}
