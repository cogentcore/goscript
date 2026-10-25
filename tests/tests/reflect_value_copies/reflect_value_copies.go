package main

import "reflect"

// slot holds a reflect.Value as a struct field, as an interpreter's stack
// slot does.
type slot struct {
	n   int
	ref reflect.Value
}

func main() {
	// A copy of a settable Value sets the same variable.
	x := 1
	v := reflect.ValueOf(&x).Elem()
	w := v
	w.SetInt(2)
	println("copy set:", x, v.Int(), w.Int())

	// Struct copies share the Value and its variable.
	s := slot{n: 1, ref: v}
	t := s
	t.n = 2
	t.ref.SetInt(3)
	println("struct copy:", s.n, t.n, x, s.ref.Int())

	// A slice of slots copies Values on assignment.
	stack := make([]slot, 3)
	stack[0] = slot{ref: reflect.ValueOf("a")}
	stack[1] = stack[0]
	stack[0] = slot{ref: reflect.ValueOf(5)}
	println("stack:", stack[0].ref.Int(), stack[1].ref.String(), stack[2].ref.IsValid())

	// A Value of a struct field reads and writes the field.
	type pair struct{ A, B int }
	p := pair{1, 2}
	pv := reflect.ValueOf(&p).Elem()
	fa := pv.Field(0)
	fb := fa
	fb.SetInt(10)
	println("field:", p.A, fa.Int(), pv.Field(1).Int())

	// The zero Value of a field is invalid.
	var z slot
	println("zero:", z.ref.IsValid(), z.ref.Kind().String())
}
