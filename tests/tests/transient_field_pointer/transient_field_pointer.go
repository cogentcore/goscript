package main

import "sync/atomic"

// flags is a set of bit flags with pointer methods, as enum bit flags have.
type flags int64

// has reads the flags through its receiver.
func (f *flags) has(bit int) bool {
	return int64(*f)&(1<<bit) != 0
}

// set writes the flags through its receiver.
func (f *flags) set(bit int) {
	*f |= 1 << bit
}

// inc and incTwice only write through their pointers.
func inc(p *int) {
	*p++
}

func incTwice(p *int) {
	if p != nil {
		inc(p)
		inc(p)
	}
}

// same compares its pointers, and keep stores its pointer, so a field
// address passed to them must be the stable one.
func same(a, b *int) bool {
	return a == b
}

var kept *int

// keepWith keeps its receiver, and only writes through n.
var keptFlags *flags

func (f *flags) keepWith(n *int) {
	keptFlags = f
	*n++
}

// ret returns its pointer, and through runs a function literal that uses it.
func ret(p *int) *int {
	return p
}

func through(p *int) *int {
	get := func() *int { return p }
	return get()
}

func keep(p *int) {
	kept = p
}

// load reads through its pointer with sync/atomic, whose metadata marks
// LoadInt64 as only reading through it.
func load(p *int64) int64 {
	return atomic.LoadInt64(p)
}

type state struct {
	fl flags
	n  int
	m  int
	c  int64
}

func main() {
	// Methods and functions that only read and write through a pointer.
	s := &state{}
	s.fl.set(3)
	println(s.fl.has(3), s.fl.has(2))
	incTwice(&s.n)
	println(s.n)
	atomic.StoreInt64(&s.c, 7)
	println(load(&s.c))

	// Comparing or keeping a pointer sees the field's own address.
	println(same(&s.n, &s.n), same(&s.n, &s.m))
	keep(&s.n)
	inc(&s.n)
	println(*kept, kept == &s.n)
	println(ret(&s.n) == &s.n, through(&s.m) == &s.m)

	// A method expression takes its receiver as its first argument.
	(*flags).keepWith(&s.fl, &s.n)
	println(keptFlags == &s.fl, s.n)

	// A struct value's fields work the same.
	var v state
	v.fl.set(1)
	incTwice(&v.m)
	println(v.fl.has(1), v.fl.has(3), v.m)
}
