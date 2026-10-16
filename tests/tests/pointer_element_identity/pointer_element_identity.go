package main

import (
	"reflect"
	"slices"
	"sync/atomic"
	"unsafe"
)

type T struct{ A, B int }

type Inner struct{ X float32 }

type Outer struct {
	N  int
	In Inner
	Ts [2]T
}

type holder struct{ p *T }

func elemPtr(s []T, i int) *T { return &s[i] }

func intPtr(s []int, i int) *int { return &s[i] }

func same[P comparable](a, b P) bool { return a == b }

func index[P comparable](s []P, v P) int {
	for i, e := range s {
		if e == v {
			return i
		}
	}
	return -1
}

func which(p *T, in []T) string {
	switch p {
	case &in[0]:
		return "first"
	case &in[1]:
		return "second"
	}
	return "none"
}

func main() {
	// Pointers to struct elements of a slice.
	in := []T{{1, 2}, {3, 4}}
	p := &in[0]
	println("struct direct", &in[0] == &in[0], p == &in[0], &in[0] != &in[1])
	dst := make([]*T, 2)
	dst[0] = p
	println("struct slice", dst[0] == &in[0], dst[0] == p)
	copy(dst, []*T{&in[0], &in[1]})
	println("struct copy", dst[0] == &in[0], dst[1] == &in[1], dst[0] == dst[1])
	m := map[string]*T{"a": &in[0]}
	println("struct map", m["a"] == &in[0], m["a"] == &in[1])
	var e1, e2 any = &in[0], &in[0]
	println("struct iface", e1 == e2, e1 == any(&in[1]))
	h := holder{p: &in[1]}
	println("struct field", h.p == &in[1], h.p == elemPtr(in, 1), elemPtr(in, 0) == elemPtr(in, 0))
	sub := in[1:]
	println("struct subslice", &sub[0] == &in[1], &sub[0] == &in[0])
	println("struct generic", same(dst[1], &in[1]), index(dst, &in[1]), which(dst[1], in), which(&in[1], in[1:]), which(&in[0], in))
	keys := map[*T]int{&in[0]: 10}
	keys[&in[1]] = 11
	println("struct key", keys[&in[0]], keys[elemPtr(in, 1)], len(keys))
	type pair struct{ p *T }
	pairs := map[pair]int{{&in[0]}: 1}
	pairs[pair{&in[0]}]++
	println("struct pair key", pairs[pair{elemPtr(in, 0)}], len(pairs), [1]*T{&in[0]} == [1]*T{p})

	// Pointers to numeric elements of slices, also typed slices.
	ints := []int{5, 6, 7}
	ip := &ints[1]
	println("int", ip == &ints[1], intPtr(ints, 2) == &ints[2], &ints[1:][0] == ip, ip == &ints[0])
	fs := []float32{1, 2, 3, 4}
	fp := &fs[2]
	fsub := fs[1:3]
	println("float32", fp == &fs[2], &fsub[1] == fp, &fsub[0] == fp)
	ips := []*int{&ints[0]}
	println("int slice", ips[0] == &ints[0])

	// Pointers to array elements.
	arr := [3]T{{1, 1}, {2, 2}, {3, 3}}
	ap := &arr[1]
	aps := []*T{&arr[1]}
	println("array struct", ap == &arr[1], aps[0] == ap, &arr[0] == ap)
	nums := [3]int{1, 2, 3}
	np := &nums[2]
	var ne any = np
	println("array int", np == &nums[2], ne == any(&nums[2]), &nums[2] == &nums[1])

	// Pointers to struct fields.
	o := &Outer{N: 1}
	fn := &o.N
	fi := &o.In
	fx := &o.In.X
	ptrs := map[int]*int{0: &o.N}
	println("field", fn == &o.N, fi == &o.In, fx == &o.In.X, ptrs[0] == fn, &o.Ts[1] == &o.Ts[1])
	var ov Outer
	ovp := &ov.N
	println("field local", ovp == &ov.N, &ov.In == &ov.In, &ov.Ts[0] != &ov.Ts[1])

	// Pointers through unsafe.Pointer and reflect.
	println("unsafe", unsafe.Pointer(p) == unsafe.Pointer(&in[0]), unsafe.Pointer(ip) == unsafe.Pointer(&ints[1]))
	println("reflect", reflect.ValueOf(p).Pointer() == reflect.ValueOf(&in[0]).Pointer(), reflect.ValueOf(ip).Pointer() == reflect.ValueOf(&ints[0]).Pointer())

	// Pointers compared by the standard library.
	println("slices", slices.Index(dst, &in[1]), slices.Contains(ips, &ints[0]), len(slices.Compact([]*T{&in[0], &in[0], &in[1]})))
	var atom atomic.Pointer[T]
	atom.Store(&in[0])
	println("atomic", atom.CompareAndSwap(&in[0], &in[1]), atom.Load() == &in[1])
	ch := make(chan *T, 1)
	ch <- &in[0]
	println("chan", <-ch == &in[0])

	// Writes through one pointer are seen through an equal one.
	dst[0].A = 99
	*ips[0] = 55
	println("writes", in[0].A, ints[0])
}
