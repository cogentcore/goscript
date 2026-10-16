package main

import "reflect"

type Setter interface{ Set(int) }

type Getter interface{ Get() int }

type T struct{ v int }

func (t *T) Set(v int) { t.v = v }

func (t T) Get() int { return t.v }

// ByValue embeds T, so its value has only T's value methods.
type ByValue struct{ T }

// ByPointer embeds *T, so its value has all of T's methods.
type ByPointer struct{ *T }

// Count is a named non-struct type with a pointer method.
type Count int

func (c *Count) Set(v int) { *c = Count(v) }

func (c Count) Get() int { return int(c) }

func check(name string, v any) {
	_, s := v.(Setter)
	_, g := v.(Getter)
	println(name, "Setter:", s, "Getter:", g)
}

func main() {
	var x any = T{v: 1}
	var px any = &T{v: 2}

	// A T value has only the value methods, so it is a Getter but not a Setter.
	check("T", x)
	check("*T", px)
	check("ByValue", ByValue{})
	check("*ByValue", &ByValue{})
	check("ByPointer", ByPointer{&T{}})
	check("Count", Count(3))
	c := Count(4)
	check("*Count", &c)

	// Type switches decide the same way.
	for _, v := range []any{x, px} {
		switch v.(type) {
		case Setter:
			println("switch: Setter")
		case Getter:
			println("switch: Getter")
		default:
			println("switch: neither")
		}
	}

	// The method set of a value is still usable through its pointer.
	t := T{}
	var s Setter = &t
	s.Set(5)
	println("set through pointer:", t.Get())

	// reflect agrees.
	setter := reflect.TypeOf((*Setter)(nil)).Elem()
	println("reflect T:", reflect.TypeOf(T{}).Implements(setter), "*T:", reflect.TypeOf(&T{}).Implements(setter))
	println("reflect Count:", reflect.TypeOf(Count(0)).Implements(setter), "*Count:", reflect.TypeOf(&c).Implements(setter))
	println("NumMethod T:", reflect.TypeOf(T{}).NumMethod(), "*T:", reflect.TypeOf(&T{}).NumMethod())
}
