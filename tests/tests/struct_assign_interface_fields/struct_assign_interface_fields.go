package main

// point is a struct value that interface and type parameter fields can hold.
type point struct{ X, Y int }

// holder has interface fields.
type holder struct {
	Any  any
	Name string
}

// pair has type parameter fields.
type pair[T any] struct{ A, B T }

// outer holds a generic struct by value, so that assigning it assigns pair.
type outer struct{ P pair[[2]int] }

func main() {
	// Interface fields keep their values through an assignment through a pointer.
	h := holder{Any: point{1, 2}, Name: "h"}
	var g holder
	pg := &g
	*pg = h
	println(pg.Any.(point).X, pg.Name)

	// Array values in type parameter fields are copied.
	o := outer{P: pair[[2]int]{A: [2]int{1, 2}, B: [2]int{3, 4}}}
	var c outer
	pc := &c
	*pc = o
	pc.P.A[0] = 10
	println(o.P.A[0], pc.P.A[0], pc.P.B[1])

	// Struct values in type parameter fields are copied.
	s := pair[point]{A: point{5, 6}}
	t := &pair[point]{}
	*t = s
	t.A.X = 50
	println(s.A.X, t.A.X)

	// An array held by an interface field is not shared.
	a := holder{Any: [2]int{7, 8}}
	var b holder
	pb := &b
	*pb = a
	println(pb.Any.([2]int)[1])
}
