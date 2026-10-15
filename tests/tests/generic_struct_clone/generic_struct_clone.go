package main

type unit struct {
	V float32
	U string
}

type sides[T any] struct {
	Top, Right, Bottom, Left T
}

type values struct {
	sides[unit]
	Name string
}

type pair[K comparable, V any] struct {
	Key K
	Val V
}

func (s *sides[T]) setAll(v T) {
	s.Top, s.Right, s.Bottom, s.Left = v, v, v, v
}

// copySides returns a copy of s, made in generic code.
func copySides[T any](s sides[T]) sides[T] {
	c := s
	return c
}

func main() {
	// A struct that embeds an instance of a generic struct copies it.
	a := values{Name: "a"}
	a.setAll(unit{1, "px"})
	b := a
	b.Top.V = 5
	b.sides.Left.U = "em"
	println("copy:", a.Top.V, a.Left.U, b.Top.V, b.Left.U)

	// Instances are copied when assigned, passed and returned.
	s := sides[unit]{Top: unit{2, "dp"}}
	t := copySides(s)
	t.Top.V = 9
	u := s
	u.Right = unit{3, "x"}
	println("instance:", s.Top.V, t.Top.V, s.Right.U == "", u.Right.U)

	// Instances with type arguments of other kinds.
	p := pair[string, sides[int]]{Key: "k", Val: sides[int]{1, 2, 3, 4}}
	q := p
	q.Val.Left = 40
	ps := []pair[string, sides[int]]{p, q}
	ps[0].Val.Top = 10
	println("pair:", p.Val.Left, q.Val.Left, ps[0].Val.Top, p.Val.Top, ps[1].Val.Left)
}
