package main

type Pos struct {
	Line, Char int
}

type Region struct {
	Start, End Pos
}

type Rule struct {
	Name string
	pos  Pos
}

var global Pos
var saved *Pos

func (r *Rule) Pos() Pos { return r.pos }

func (r Rule) ValuePos() Pos { return r.pos }

func globalPos() Pos { return global }

func named() (p Pos) {
	saved = &p
	p.Line = 3
	return
}

func namedDefer() (p Pos) {
	defer func() { p.Char = 9 }()
	p.Line = 4
	return p
}

func makeRegion(l int) Region {
	return Region{Start: Pos{l, 1}, End: Pos{l, 2}}
}

func region(r *Region) Region { return *r }

func identity[T any](v T) T { return v }

type key struct {
	a, b int
}

func main() {
	r := &Rule{Name: "r", pos: Pos{1, 2}}
	p := r.Pos()
	p.Line = 10
	println(r.pos.Line, p.Line)

	v := r.ValuePos()
	v.Char = 20
	println(r.pos.Char, v.Char)

	global = Pos{5, 6}
	g := globalPos()
	g.Line = 50
	println(global.Line, g.Line)

	n := named()
	n.Line = 30
	println(saved.Line, n.Line)

	d := namedDefer()
	println(d.Line, d.Char)

	reg := makeRegion(7)
	reg.Start.Line = 70
	println(reg.Start.Line, reg.End.Line)

	src := Region{Start: Pos{1, 1}}
	cp := region(&src)
	cp.Start.Line = 99
	println(src.Start.Line, cp.Start.Line)

	id := identity(src)
	id.End.Char = 42
	println(src.End.Char, id.End.Char)

	var arr [2]Pos
	arr[0] = r.Pos()
	arr[0].Line = 11
	println(r.pos.Line, arr[0].Line)

	m := map[key]int{}
	k := key{1, 2}
	m[k] = 1
	k.a = 5
	_, ok := m[k]
	println(len(m), ok, m[key{1, 2}])
	k.a = 1
	println(m[k])
	delete(m, k)
	println(len(m))

	m2 := map[Pos]Region{}
	m2[r.Pos()] = makeRegion(1)
	q := r.Pos()
	got := m2[q]
	got.Start.Line = 100
	println(m2[q].Start.Line, got.Start.Line)
}
