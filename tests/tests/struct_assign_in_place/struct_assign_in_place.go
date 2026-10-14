package main

type Inner struct{ X, Y int }

type Outer struct {
	In  Inner
	Arr [2]int
	Ptr *Inner
	N   int
}

var global Outer

func make1() Outer { return Outer{In: Inner{1, 2}, Arr: [2]int{3, 4}, N: 5} }

func main() {
	a := make1()
	b := Outer{}
	b = a
	a.In.X = 10
	a.Arr[0] = 30
	println(b.In.X, b.Arr[0], a.In.X, a.Arr[0])

	p := &a
	a = *p
	println(a.In.X, a.N)

	s := []Outer{make1(), make1()}
	s[0] = s[1]
	s[1].In.Y = 20
	println(s[0].In.Y, s[1].In.Y)

	sh := &Inner{7, 8}
	a.Ptr = sh
	b = a
	b.Ptr.X = 70
	println(a.Ptr.X, sh.X)

	global = b
	b.N = 50
	println(global.N, b.N)

	var in Inner
	in = a.In
	a.In.Y = 99
	println(in.Y, a.In.Y)
	m := map[string]Outer{"k": a}
	c := Outer{}
	c = m["k"]
	c.N = 77
	println(m["k"].N, c.N)
}
