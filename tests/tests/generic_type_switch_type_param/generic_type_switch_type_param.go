package main

import "fmt"

type Value struct {
	Val  float32
	Unit string
}

func (v Value) String() string { return fmt.Sprintf("%g%s", v.Val, v.Unit) }

type Sides[T any] struct {
	Top, Right T
}

func (s *Sides[T]) SetAny(a any) string {
	switch val := a.(type) {
	case Sides[T]:
		*s = val
		return "Sides[T]"
	case *Sides[T]:
		*s = *val
		return "*Sides[T]"
	case T:
		s.Top, s.Right = val, val
		return "T"
	case *T:
		s.Top, s.Right = *val, *val
		return "*T"
	case []T:
		s.Top, s.Right = val[0], val[1]
		return "[]T"
	case string:
		return "string " + val
	default:
		return fmt.Sprintf("default %v", val)
	}
}

func main() {
	var s Sides[Value]
	println(s.SetAny("3px"))
	println(s.SetAny(Value{1, "px"}), s.Top.String())
	println(s.SetAny(&Value{2, "em"}), s.Right.String())
	println(s.SetAny([]Value{{3, "a"}, {4, "b"}}), s.Top.String(), s.Right.String())
	println(s.SetAny(Sides[Value]{Top: Value{5, "c"}}), s.Top.String())
	println(s.SetAny(&Sides[Value]{Right: Value{6, "d"}}), s.Right.String())
	println(s.SetAny(7))

	var f Sides[float32]
	println(f.SetAny(float32(1.5)), f.Top)
	println(f.SetAny(1.5))
	println(f.SetAny("x"))

	var i Sides[int]
	println(i.SetAny(3), i.Top)
	println(i.SetAny(int64(3)))
	println(i.SetAny(3.5))
}
