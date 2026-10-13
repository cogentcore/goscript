package main

import "reflect"

type shape interface{ Area() int }

type square struct{ Side int }

func (s square) Area() int { return s.Side * s.Side }

type holder struct {
	S shape
	A any
}

// underlying follows interfaces and pointers until it reaches a concrete
// value, stopping at a nil element, as reflection helpers commonly do.
func underlying(v reflect.Value) reflect.Value {
	for v.Kind() == reflect.Interface || v.Kind() == reflect.Pointer {
		e := v.Elem()
		if !e.IsValid() {
			return v
		}
		v = e
	}
	return v
}

func main() {
	var empty holder
	ev := reflect.ValueOf(&empty).Elem()
	s := ev.Field(0)
	println(s.Kind().String(), s.IsNil(), s.Elem().IsValid())
	println(underlying(s).Kind().String(), underlying(ev.Field(1)).Kind().String())

	full := holder{S: square{Side: 3}, A: &square{Side: 2}}
	fv := reflect.ValueOf(&full).Elem()
	u := underlying(fv.Field(0))
	println(u.Kind().String(), u.Field(0).Int())
	u = underlying(fv.Field(1))
	println(u.Kind().String(), u.Field(0).Int())

	var nilAny any
	println(reflect.ValueOf(&nilAny).Elem().Elem().IsValid())
}
