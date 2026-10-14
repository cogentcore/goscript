package main

func main() {
	s := make([]int, 0, 10)
	a := append(s, 1)
	b := append(a, 2)
	c := append(b, 3)
	println(len(s), len(a), len(b), len(c), cap(a))
	for i, v := range a {
		println("a", i, v)
	}
	d := append(a, 9)
	println(b[1], d[1], len(d))

	x := 5
	var p []*int
	p = append(p, &x)
	q := append(p, &x)
	r := append(q, &x)
	println(len(p), len(q), len(r))

	t := []string{"a", "b", "c", "d"}
	u := t[:1]
	v := append(u, "x")
	w := append(v, "y")
	println(len(u), len(v), len(w), t[1], t[2])
	copy(u, []string{"z"})
	println(t[0], v[0], w[0])
}
