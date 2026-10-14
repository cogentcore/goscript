package main

import "slices"

func Keys[M ~map[K]V, K comparable, V any](m M) []K {
	r := make([]K, 0, len(m))
	for k := range m {
		r = append(r, k)
	}
	return r
}

func Values[M ~map[K]V, K comparable, V any](m M) []V {
	r := make([]V, 0, len(m))
	for _, v := range m {
		r = append(r, v)
	}
	return r
}

func Sum[S ~[]E, E int | float64](s S) E {
	var t E
	for _, v := range s {
		t += v
	}
	return t
}

type Named map[string]int

func main() {
	m := map[string][]int{"a": {1}, "b": {2, 3}, "c": nil}
	ks := Keys(m)
	slices.Sort(ks)
	println(len(ks), ks[0], ks[1], ks[2])
	n := Named{"x": 1, "y": 2}
	vs := Values(n)
	slices.Sort(vs)
	println(len(vs), vs[0], vs[1])
	nk := Keys(n)
	slices.Sort(nk)
	println(nk[0], nk[1])
	println(Sum([]int{1, 2, 3}))
}
