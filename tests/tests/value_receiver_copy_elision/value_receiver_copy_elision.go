package main

type vec struct{ X, Y int }

func (v vec) Sum() int { return v.X + v.Y }

func (v vec) Bump() int {
	v.X++
	return v.X
}

func (v *vec) inc() { v.Y++ }

func (v vec) BumpViaPointer() int {
	v.inc()
	return v.Y
}

func (v vec) BumpInClosure() int {
	f := func() { v.X = 100 }
	f()
	return v.X
}

func (v vec) Keep() vec { return v }

type holder struct{ v vec }

func main() {
	a := vec{1, 2}
	println("sum", a.Sum())
	println("bump", a.Bump(), a.X)
	println("ptr", a.BumpViaPointer(), a.Y)
	println("closure", a.BumpInClosure(), a.X)
	k := a.Keep()
	k.X = 50
	println("keep", a.X, k.X)
	h := holder{v: a}
	println("field", h.v.Sum(), h.v.Bump(), h.v.X)
	p := &a
	println("via pointer", p.Sum(), p.Bump(), p.X)
}
