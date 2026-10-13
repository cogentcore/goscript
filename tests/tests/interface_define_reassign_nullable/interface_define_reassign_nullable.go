package main

import "reflect"

type Shape interface {
	Area() int
}

type Square struct{ Side int }

func (s Square) Area() int { return s.Side * s.Side }

func find(ok bool) Shape {
	if ok {
		return Square{Side: 2}
	}
	return nil
}

func first() Shape { return Square{Side: 3} }

func main() {
	// A variable declared from a call result keeps its interface type,
	// so it can be assigned a nil interface later.
	s := first()
	println(s.Area())
	s = find(false)
	println(s == nil)

	// reflect.Type results, as in jinzhu/copier.
	elem := reflect.TypeOf([]int{}).Elem()
	elem = reflect.PtrTo(elem)
	println(elem.String())
}
