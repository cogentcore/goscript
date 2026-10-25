package main

import (
	"reflect"
	"strings"
)

type pair struct {
	A int
	B string
}

func (p pair) Sum() int { return p.A + len(p.B) }

func (p *pair) Add(n int) { p.A += n }

func main() {
	// The Can methods report the kinds that their accessors accept.
	i, u, f, c := reflect.ValueOf(1), reflect.ValueOf(uint8(2)), reflect.ValueOf(1.5), reflect.ValueOf(1i)
	println("can:", i.CanInt(), i.CanUint(), u.CanUint(), f.CanFloat(), c.CanComplex(), f.CanComplex())
	println("overflow:", reflect.ValueOf(complex64(0)).OverflowComplex(1e40), c.OverflowComplex(1e40))

	// Comparable looks at the values an interface or struct holds.
	var a any = []int{1}
	println("comparable:", reflect.ValueOf(&a).Elem().Comparable(), reflect.ValueOf(pair{}).Comparable())

	// Clear empties a map and zeros a slice; SetCap shrinks a slice's capacity.
	m := map[string]int{"a": 1}
	reflect.ValueOf(m).Clear()
	s := make([]int, 2, 8)
	s[0] = 5
	sv := reflect.ValueOf(&s).Elem()
	sv.Clear()
	sv.SetCap(4)
	println("clear:", len(m), s[0], len(s), cap(s))

	// Fields and Methods iterate with names and values.
	p := pair{A: 1, B: "xy"}
	for sf, v := range reflect.ValueOf(p).Fields() {
		println("field:", sf.Name, v.Kind().String())
	}
	for meth, v := range reflect.ValueOf(p).Methods() {
		println("method:", meth.Name, v.Call(nil)[0].Int())
	}

	// The Type iterators yield fields, methods, and function inputs and outputs.
	pt := reflect.TypeOf(p)
	for sf := range pt.Fields() {
		println("type field:", sf.Name, sf.Type.String())
	}
	for meth := range pt.Methods() {
		println("type method:", meth.Name, meth.Type.String(), meth.IsExported())
	}
	// Method.Func takes the receiver as its first argument.
	sum, _ := pt.MethodByName("Sum")
	println("func:", sum.Func.Type().String(), sum.Func.Call([]reflect.Value{reflect.ValueOf(p)})[0].Int())
	addm, _ := reflect.TypeOf(&p).MethodByName("Add")
	addm.Func.Call([]reflect.Value{reflect.ValueOf(&p), reflect.ValueOf(5)})
	println("ptr func:", addm.Func.Type().String(), p.A)
	ft := reflect.TypeOf(strings.Repeat)
	for in := range ft.Ins() {
		println("in:", in.String())
	}
	for out := range ft.Outs() {
		println("out:", out.String())
	}

	// SetIterKey and SetIterValue copy the current map entry.
	k, e := reflect.New(reflect.TypeFor[string]()).Elem(), reflect.New(reflect.TypeFor[int]()).Elem()
	it := reflect.ValueOf(map[string]int{"k": 7}).MapRange()
	for it.Next() {
		k.SetIterKey(it)
		e.SetIterValue(it)
	}
	println("iter:", k.String(), e.Int())

	// TrySend and TryRecv do not block.
	ch := reflect.ValueOf(make(chan int, 1))
	println("trysend:", ch.TrySend(reflect.ValueOf(3)), ch.TrySend(reflect.ValueOf(4)))
	x, ok := ch.TryRecv()
	println("tryrecv:", x.Int(), ok)
	x, ok = ch.TryRecv()
	println("empty:", x.IsValid(), ok)
}
