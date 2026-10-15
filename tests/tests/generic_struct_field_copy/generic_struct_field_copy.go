package main

type Value struct {
	V    int
	Unit int
}

type Sides[T any] struct {
	Top, Right, Bottom, Left T
}

type Values struct {
	Sides[Value]
}

type Pair[K comparable, V any] struct {
	Key K
	Val V
}

type withClone struct {
	clone func() int
	n     int
}

func main() {
	// the zero value of an instance holds zero values of its type argument
	var v Values
	v.Top.V = 1
	w := v
	w.Top.V = 2
	w.Right.Unit = 3
	println("zero copy:", v.Top.V, w.Top.V, v.Right.Unit, w.Right.Unit)

	// each zero value is its own
	var s Sides[Value]
	s.Top.V = 4
	println("own zero:", s.Top.V, s.Right.V, s.Bottom.V, s.Left.V)

	// copies of type argument fields of struct, array, pointer and unnamed
	// struct types
	arr := Sides[[2]int]{Top: [2]int{1, 2}}
	arr2 := arr
	arr2.Top[0] = 9
	println("array:", arr.Top[0], arr2.Top[0])
	p := &Value{V: 5}
	ptr := Sides[*Value]{Top: p}
	ptr2 := ptr
	ptr2.Top.V = 6
	println("pointer:", p.V, ptr.Top == ptr2.Top)
	anon := Sides[struct{ A, B int }]{Top: struct{ A, B int }{1, 2}}
	anon2 := anon
	anon2.Top.A = 7
	println("unnamed:", anon.Top.A, anon2.Top.A)

	// a struct type argument with a field named clone
	wc := Sides[withClone]{Top: withClone{clone: func() int { return 8 }, n: 1}}
	wc2 := wc
	wc2.Top.n = 2
	println("field named clone:", wc.Top.n, wc2.Top.n, wc2.Top.clone())

	// nested generic instances
	var pr Pair[string, Sides[Value]]
	pr.Val.Left.V = 10
	pr2 := pr
	pr2.Val.Left.V = 11
	println("nested:", pr.Val.Left.V, pr2.Val.Left.V, pr2.Val.Top.Unit)

	// slices of instances grow with zero values of their own
	vals := make([]Values, 2)
	vals = append(vals, Values{})
	vals[0].Top.V = 12
	println("slice:", vals[0].Top.V, vals[1].Top.V, vals[2].Top.V)
}
