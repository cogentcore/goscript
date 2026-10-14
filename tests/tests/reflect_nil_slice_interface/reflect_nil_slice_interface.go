package main

import "reflect"

type S1 struct{ Name string }

type S5 struct {
	K []*S1
	M map[string]int
	P *S1
	F func()
}

func show(name string, v any) {
	rv := reflect.ValueOf(v)
	if !rv.IsValid() {
		println(name, "invalid")
		return
	}
	println(name, rv.Kind().String(), rv.IsNil(), rv.Type().String())
}

func main() {
	var s []*S1
	show("direct", s)
	var a any = s
	println("a == nil:", a == nil)
	show("any", a)

	v := S5{}
	f := reflect.ValueOf(&v).Elem()
	for i := 0; i < f.NumField(); i++ {
		show(f.Type().Field(i).Name, f.Field(i).Interface())
	}
	k := f.Field(0).Interface()
	_, ok := k.([]*S1)
	println("assert:", ok, k == nil)

	// The address of an unnamed field keeps its pointer type.
	for i := 0; i < f.NumField(); i++ {
		p := f.Field(i).Addr().Interface()
		pv := reflect.ValueOf(p)
		println("addr", pv.Type().String(), pv.Elem().Type().String())
	}
	kp, ok := f.Field(0).Addr().Interface().(*[]*S1)
	*kp = append(*kp, &S1{"x"})
	println("addr assert:", ok, len(v.K), v.K[0].Name)

	// Unnamed basic, array and slice values keep their types.
	show2("int", reflect.ValueOf(3))
	show2("slice", reflect.ValueOf([]string{"a"}))
	show2("map", reflect.ValueOf(map[string]int{"a": 1}))
}

func show2(name string, v reflect.Value) {
	println(name, reflect.ValueOf(v.Interface()).Type().String())
}
