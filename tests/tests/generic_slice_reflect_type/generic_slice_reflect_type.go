package main

import "reflect"

type Data struct {
	A float32
	B float32
}

func describe[E any](s []E) {
	v := reflect.ValueOf(s)
	println("type:", v.Type().String(), "elem kind:", v.Type().Elem().Kind().String(), "len:", v.Len())
	if v.Len() > 0 {
		println("index kind:", v.Index(0).Kind().String())
	}
}

func describeMap[K comparable, V any](m map[K]V) {
	println("map type:", reflect.TypeOf(m).String())
}

func describePointer[E any](p *E) {
	println("pointer type:", reflect.TypeOf(p).String())
}

func main() {
	describe([]Data{{A: 1, B: 2}})
	describe([]float32{1, 2, 3})
	describe([]int{})
	describeMap(map[string]Data{})
	describePointer(&Data{})
}
