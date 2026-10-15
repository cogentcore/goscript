package main

type Point struct {
	X, Y int
}

func (p Point) Sum() int { return p.X + p.Y }

func sum(p Point) int { return p.Sum() }

func unnamedPoint() Point { return struct{ X, Y int }{4, 5} }

type Box struct {
	Min, Max Point
	Name     string
}

type Pair struct {
	A Point
	B struct{ X, Y int }
}

func main() {
	p := Point{1, 2}

	// a named struct value equals an unnamed struct literal of the same
	// underlying type, in both operand orders
	println("named == unnamed:", p == struct{ X, Y int }{1, 2})
	println("unnamed == named:", struct{ X, Y int }{1, 2} == p)
	println("named != unnamed:", p != struct{ X, Y int }{1, 3})

	// an unnamed struct variable assigned from a named value compares equal
	var u struct{ X, Y int } = p
	println("unnamed var == named:", u == p)
	u.Y = 5
	println("changed unnamed var == named:", u == p)

	// nested struct fields compare by fields, also when one side is unnamed
	b := Box{Min: Point{1, 2}, Max: Point{3, 4}, Name: "b"}
	println("nested == unnamed:", b == struct {
		Min, Max Point
		Name     string
	}{Point{1, 2}, Point{3, 4}, "b"})
	println("nested != unnamed:", b == struct {
		Min, Max Point
		Name     string
	}{Point{1, 2}, Point{3, 5}, "b"})

	// a field of unnamed struct type equals a named value of the same
	// underlying type
	pr := Pair{A: p, B: struct{ X, Y int }{1, 2}}
	println("unnamed field == named:", pr.B == p)
	println("named field == unnamed field:", pr.A == pr.B)
	pr.B.X = 9
	println("changed field:", pr.A == pr.B)

	// conversions between the named and unnamed type keep the fields
	println("converted:", Point(pr.B) == Point{9, 2})
	println("converted method:", Point(pr.B).Sum())
	println("assigned method:", sum(pr.B))

	// unnamed struct values assigned to named struct variables, fields,
	// elements and results get the methods of the named type
	var q Point = pr.B
	println("var method:", q.Sum())
	q = struct{ X, Y int }{2, 3}
	println("assign method:", q.Sum())
	println("return method:", unnamedPoint().Sum())
	pr2 := Pair{A: struct{ X, Y int }{5, 6}}
	println("field method:", pr2.A.Sum())
	ps := []Point{struct{ X, Y int }{7, 8}}
	println("element method:", ps[0].Sum())
	m := map[string]Point{"a": struct{ X, Y int }{1, 1}}
	println("map method:", m["a"].Sum())

	// as interface values, the named and unnamed types differ
	var ia, ib any = p, struct{ X, Y int }{1, 2}
	println("interfaces differ:", ia == ib)

	// an unnamed struct key finds the entry of a named key
	keys := map[Point]string{{1, 2}: "one-two"}
	println("map key:", keys[struct{ X, Y int }{1, 2}])
}
