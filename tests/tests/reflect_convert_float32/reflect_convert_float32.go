package main

import "reflect"

type T struct {
	A string
	B float32
}

func main() {
	f32 := reflect.TypeFor[float32]()
	c := reflect.ValueOf(int64(3)).Convert(f32)
	f, ok := c.Interface().(float32)
	println(ok, f == 3, c.Kind().String())

	println(reflect.ValueOf(3.9).Convert(reflect.TypeFor[int]()).Int())
	println(reflect.ValueOf(300).Convert(reflect.TypeFor[int8]()).Int())
	println(reflect.ValueOf(-1).Convert(reflect.TypeFor[uint8]()).Uint())
	println(reflect.ValueOf(int32(65)).Convert(reflect.TypeFor[string]()).String())
	b := reflect.ValueOf("hé").Convert(reflect.TypeFor[[]byte]()).Interface().([]byte)
	println(len(b))
	r := reflect.ValueOf("hé").Convert(reflect.TypeFor[[]rune]()).Interface().([]rune)
	println(len(r))
	println(reflect.ValueOf([]byte("ok")).Convert(reflect.TypeFor[string]()).String())

	// Setting a float32 rounds to float32 precision, as a Go assignment does.
	x := 3.14
	s := &T{A: "aaa", B: float32(x)}
	d := &T{}
	dv := reflect.ValueOf(d).Elem()
	dv.Field(0).SetString("aaa")
	dv.Field(1).SetFloat(x)
	println(s.B == d.B, s.A == d.A)
	d2 := &T{}
	reflect.ValueOf(d2).Elem().Field(1).Set(reflect.ValueOf(x).Convert(f32))
	println(s.B == d2.B)
}
