package main

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
