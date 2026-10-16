package main

import "fmt"

type inner struct{ N [2]int }

type item struct {
	X, Y int
	In   inner
}

type items []item

func main() {
	// A pointer to an element sees the values copied into it.
	dst := make([]item, 3)
	p := &dst[1]
	src := []item{{1, 2, inner{[2]int{3, 4}}}, {5, 6, inner{[2]int{7, 8}}}, {9, 10, inner{}}}
	n := copy(dst, src)
	fmt.Println(n, p.X, p.Y, p.In.N)

	// The copies are values: changing the source leaves dst alone.
	src[1].X = 50
	src[1].In.N[0] = 70
	fmt.Println(dst[1].X, dst[1].In.N, p.X)

	// Overlapping copies within one backing array, forward and backward.
	all := []item{{X: 1}, {X: 2}, {X: 3}, {X: 4}}
	q := &all[3]
	copy(all[1:], all)
	fmt.Println(all[0].X, all[1].X, all[2].X, all[3].X, q.X)
	copy(all, all[2:])
	fmt.Println(all[0].X, all[1].X, all[2].X, all[3].X, q.X)

	// A named slice type, an array window and a shorter source.
	var named items = make(items, 2)
	r := &named[0]
	copy(named, src[2:])
	var arr [3]item
	s := &arr[2]
	copy(arr[1:], src)
	fmt.Println(r.X, named[1].X, s.X, arr[0].X)

	// Slices of pointers still copy the pointers.
	a, b := &item{X: 1}, &item{X: 2}
	ptrs := []*item{a}
	others := []*item{b}
	copy(others, ptrs)
	others[0].Y = 8
	fmt.Println(a.Y, b.Y, others[0] == a)
}
