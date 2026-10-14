package main

import "sync"

type R struct{ A, B int }

func show(tag string, r R) { println(tag, r.A, r.B) }

func (r R) Show(tag string) { println(tag, r.A, r.B) }

func (r *R) ShowPtr(tag string) { println(tag, r.A, r.B) }

var stored int

// Store and Sum only read their receivers and do not suspend.
func (r R) Store() { stored = r.A*10 + r.B }

func (r R) Sum() int { return r.A + r.B }

func value(n int) int {
	println("evaluate", n)
	return n
}

func pair() (int, int) { return 7, 8 }

func two(a, b int) { println("two", a, b) }

func deferred() {
	r := R{1, 2}
	n := 3
	f := func(tag string) { println(tag, "first function") }
	p := &R{10, 20}
	defer show("arg", r)
	defer r.Show("receiver")
	defer p.ShowPtr("pointer")
	defer f("function")
	var mu sync.Mutex
	mu.Lock()
	defer mu.Unlock()
	q := &R{50, 60}
	defer q.ShowPtr("fixed pointer")
	defer println("println", n, value(4))
	defer two(pair())
	defer func(m int) { println("literal", m) }(n)
	defer r.Store()
	sum := r.Sum
	r.A = 5
	n = 6
	f = func(tag string) { println(tag, "second function") }
	p = &R{30, 40}
	println("body", r.A, n)
	println("method value", sum())
}

func main() {
	deferred()
	println("stored", stored)
	var wg sync.WaitGroup
	wg.Add(1)
	r := R{1, 2}
	go func(r R) {
		show("go", r)
		wg.Done()
	}(r)
	r.A = 9
	wg.Wait()
	_ = r
}
