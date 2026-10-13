package main

import "reflect"

type Node interface {
	AsBase() *Base
}

type Base struct {
	This Node
	Name string
}

func (b *Base) AsBase() *Base { return b }

// NewInstance makes a new node of the same type, as a tree of embedded
// struct types does.
func (b *Base) NewInstance() Node {
	return reflect.New(reflect.TypeOf(b.This).Elem()).Interface().(Node)
}

type Widget struct {
	Base
	X int
}

type Body struct {
	Widget
	Title string
}

func main() {
	b := &Body{Title: "body"}
	b.This = b

	// ValueOf of a struct pointer gives back the same pointer.
	n, ok := reflect.ValueOf(b).Interface().(Node)
	println("valueof:", ok, ok && n.(*Body) == b)

	// Addr of the element is the same pointer.
	a, ok := reflect.ValueOf(b).Elem().Addr().Interface().(*Body)
	println("addr:", ok, a == b)

	// New makes a new zero struct pointer that satisfies interfaces.
	ni := b.NewInstance()
	nb, ok := ni.(*Body)
	println("new:", ok, nb != b, nb.Title == "", nb.AsBase() != nil)

	// Fields set through reflect are seen through the pointer.
	nv := reflect.New(reflect.TypeOf(Widget{}))
	nv.Elem().FieldByName("X").SetInt(7)
	w := nv.Interface().(*Widget)
	println("new widget:", w.X)

	// A nil struct pointer stays a typed nil.
	var np *Body
	iv := reflect.ValueOf(np).Interface()
	println("nil:", iv != nil, iv.(*Body) == nil)
}
