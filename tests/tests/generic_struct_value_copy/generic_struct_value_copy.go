package main

// Value is a struct type argument, which Go copies on every assignment.
type Value struct {
	V float32
	U int
}

func (v *Value) Set(x float32) { v.V = x }

type Sides[T any] struct {
	Top, Right, Bottom, Left T
}

func (s *Sides[T]) SetHorizontal(val T) {
	s.Right = val
	s.Left = val
}

func (s *Sides[T]) SetAll(val T) {
	s.Top = val
	s.Right = val
	s.Bottom = val
	s.Left = val
}

func copyOf[T any](v T) T {
	c := v
	return c
}

func twoCopies[T any](v T) (T, T) {
	a := v
	b := v
	return a, b
}

func store[T any](dst *T, v T) {
	*dst = v
}

func fill[T any](n int, v T) []T {
	r := make([]T, n)
	for i := range r {
		r[i] = v
	}
	return r
}

func appendTwice[T any](s []T, v T) []T {
	return append(s, v, v)
}

func setTwo[T any](m map[string]T, v T) {
	m["a"] = v
	m["b"] = v
}

func pair[T any](v T) [2]T {
	return [2]T{v, v}
}

type box[T any] struct {
	A, B T
}

func makeBox[T any](v T) box[T] {
	return box[T]{A: v, B: v}
}

func main() {
	var s Sides[Value]
	s.SetHorizontal(Value{V: 24})
	s.Left.Set(16)
	println("horizontal:", s.Left.V, s.Right.V)

	s.SetAll(Value{V: 10})
	s.Top.Set(1)
	s.Left.Set(2)
	println("all:", s.Top.V, s.Right.V, s.Bottom.V, s.Left.V)

	v := Value{V: 1}
	c := copyOf(v)
	c.Set(2)
	println("copyOf:", v.V, c.V)

	a1, b1 := twoCopies(Value{V: 15})
	a1.Set(16)
	println("twoCopies:", a1.V, b1.V)

	var d Value
	store(&d, v)
	d.Set(3)
	println("store:", v.V, d.V)

	xs := fill(2, Value{V: 5})
	xs[0].Set(6)
	println("fill:", xs[0].V, xs[1].V)

	ys := appendTwice(nil, Value{V: 7})
	ys[0].Set(8)
	println("append:", ys[0].V, ys[1].V)

	m := map[string]Value{}
	setTwo(m, Value{V: 9})
	a := m["a"]
	a.Set(10)
	m["a"] = a
	println("map:", m["a"].V, m["b"].V)

	p := pair(Value{V: 11})
	p[0].Set(12)
	println("pair:", p[0].V, p[1].V)

	b := makeBox(Value{V: 13})
	b.A.Set(14)
	println("box:", b.A.V, b.B.V)

	// Copying a generic struct copies its struct-typed fields, so assigning
	// to a field of the original leaves the copy unchanged.
	orig := Sides[Value]{Bottom: Value{V: 1}}
	cp := orig
	cp.Bottom = Value{V: 2}
	orig.Bottom = Value{V: 3}
	println("struct copy:", orig.Bottom.V, cp.Bottom.V)
	orig2 := Sides[Value]{Top: Value{V: 4}}
	cp2 := orig2
	orig2.Top.Set(5)
	println("struct copy method:", orig2.Top.V, cp2.Top.V)

	var si Sides[int]
	si.SetAll(4)
	si.Left = 5
	println("ints:", si.Top, si.Left)
}
