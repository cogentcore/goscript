package main

import "reflect"

type T struct {
	A string
	B float32
}

// walk follows pointers as reflection-based encoders do.
func walk(v reflect.Value) string {
	if v.Kind() == reflect.Ptr {
		if v.IsNil() {
			return "nil"
		}
		return "*" + walk(v.Elem())
	}
	return v.Kind().String()
}

func main() {
	s := &T{A: "aaa", B: 3.14}
	v := reflect.ValueOf(s)
	println(v.Kind().String(), v.Elem().Kind().String(), v.Elem().Type().String())
	println(walk(v), walk(reflect.ValueOf(&s)))

	var np *T
	println(walk(reflect.ValueOf(np)), reflect.ValueOf(np).Elem().IsValid())

	e := v.Elem()
	println(e.NumField(), e.Field(0).String(), e.CanSet())
	e.Field(0).SetString("bbb")
	e.FieldByName("B").SetFloat(2.5)
	println(s.A, s.B)
}
