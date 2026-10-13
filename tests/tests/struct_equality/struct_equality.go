package main

type ObjectID struct {
	hash   [4]byte
	format uint8
}

type Hash = ObjectID

func (s ObjectID) IsZero() bool {
	return s == ObjectID{}
}

func (s ObjectID) Valid() bool {
	return s != ObjectID{}
}

type S struct {
	A string
	B float64
}

type Outer struct {
	In S
	N  int
}

func take(x any) {
	switch x.(type) {
	case *S:
	}
}

func keep(x any) any { return x }

func main() {
	var zero Hash
	otherZero := Hash{}
	one := Hash{hash: [4]byte{1: 7}}
	otherOne := Hash{hash: [4]byte{1: 7}}
	different := Hash{hash: [4]byte{2: 7}}

	println("zero is zero:", zero.IsZero())
	println("zero valid:", zero.Valid())
	println("zero equals zero:", zero == otherZero)
	println("one valid:", one.Valid())
	println("one equals other one:", one == otherOne)
	println("one differs:", one != different)

	// struct values compare by fields after passing a pointer as an interface
	s := S{A: "x", B: 1.5}
	n := &S{A: "x", B: 1.5}
	take(n)
	println(*n == s)
	m := &S{A: "x", B: 1.5}
	_ = keep(m)
	println(*m == s, s == *m)
	var v any = s
	println(v.(S) == s)

	// nested struct field passed as a pointer
	o1 := Outer{In: S{A: "y"}, N: 2}
	o2 := Outer{In: S{A: "y"}, N: 2}
	take(&o1.In)
	println(o1 == o2, o1.In == o2.In)
	o2.In.B = 3
	println(o1 == o2)

	// interface comparisons keep dynamic type and pointer identity
	var p1, p2 any = &S{A: "z"}, &S{A: "z"}
	println(p1 == p2, p1 == p1)
	var i1, i2 any = S{A: "z"}, &S{A: "z"}
	println(i1 == i2, i1 == any(S{A: "z"}))
}
