package main

type vec struct{ x, y float32 }

// mk is effect free: it only builds a value from its parameters.
func mk(x, y float32) vec { return vec{x, y} }

// add only reads its receiver and parameter and calls mk, so its callers
// can pass their values without copies.
func (v vec) add(o vec) vec { return mk(v.x+o.x, v.y+o.y) }

// scale reads its receiver after calling mk.
func (v vec) scale(s float32) vec {
	r := mk(v.x*s, v.y*s)
	return mk(r.x+v.x, r.y+v.y)
}

var counter int

// bump changes a package variable, so it is not effect free.
func bump(x float32) float32 {
	counter++
	return x
}

// addBump calls bump, so its callers copy values that others can reach.
func (v vec) addBump(o vec) vec { return vec{bump(v.x) + o.x, v.y + o.y} }

type holder struct{ pos vec }

func main() {
	a := vec{1, 2}
	b := a.add(vec{3, 4})
	a.x = 10
	println("add", b.x, b.y, a.x)

	h := &holder{pos: vec{5, 6}}
	c := h.pos.scale(2)
	h.pos.y = 0
	println("scale", c.x, c.y, h.pos.y)

	d := h.pos.addBump(a)
	println("bump", d.x, d.y, counter)
}
