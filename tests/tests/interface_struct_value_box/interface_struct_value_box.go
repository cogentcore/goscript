package main

type Vec struct{ X, Y float32 }

func (v Vec) Sum() float32 { return v.X + v.Y }

type Summer interface{ Sum() float32 }

type Named struct {
	Name string
	Tags []string
	Next *Named
}

type Outer struct {
	In Vec
	N  int
}

type Celsius Vec

func main() {
	// A box holds a copy of the value, which later writes do not change.
	v := Vec{1, 2}
	var a any = v
	v.X = 10
	b := a.(Vec)
	b.Y = 20
	println(a.(Vec).X, a.(Vec).Y, v.X, b.Y)

	// The box has the dynamic type of the value and its methods.
	var s Summer = Vec{3, 4}
	_, isVec := s.(Vec)
	_, isPtr := s.(*Vec)
	_, isCelsius := any(Vec{}).(Celsius)
	println(s.Sum(), isVec, isPtr, isCelsius)

	// Boxes compare by type and value, also as map keys.
	println(any(Vec{1, 2}) == any(Vec{1, 2}), any(Vec{1, 2}) == any(Vec{2, 1}), any(Vec{}) == any(Celsius{}))
	m := map[any]int{}
	for i := 0; i < 5; i++ {
		m[Vec{float32(i), 1}] = i
		m[Celsius{float32(i), 1}] = 10 + i
	}
	println(len(m), m[Vec{3, 1}], m[Celsius{3, 1}])

	// Values with slice, pointer and nested struct fields box too.
	n := Named{Name: "a", Tags: []string{"x"}, Next: &Named{Name: "b"}}
	var na any = n
	n.Name = "changed"
	n.Tags[0] = "y"
	got := na.(Named)
	println(got.Name, got.Tags[0], got.Next.Name)
	o := Outer{In: Vec{5, 6}, N: 7}
	var oa any = o
	o.In.X = 50
	println(oa.(Outer).In.X, oa.(Outer).N)

	// A type switch and a value method on a boxed value.
	for _, x := range []any{Vec{1, 1}, Celsius{2, 2}, &Vec{3, 3}, Outer{}} {
		switch t := x.(type) {
		case Vec:
			println("Vec", t.Sum())
		case Celsius:
			println("Celsius", t.X)
		case *Vec:
			println("*Vec", t.Sum())
		default:
			println("other")
		}
	}
}
