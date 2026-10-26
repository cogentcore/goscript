package main

import "iter"

type provider interface {
	Items() []*Group
}

type listProvider struct {
	items []*Group
}

func (p *listProvider) Items() []*Group {
	return p.items
}

type Group struct {
	provider provider
	seen     bool
}

func (g *Group) Each(yield func(*Group) bool) {
	for _, child := range g.provider.Items() {
		if !yield(child) {
			return
		}
	}
}

func (g *Group) Build() {
	for child := range g.Each {
		child.seen = true
	}
}

var ch = make(chan int, 1)

// count is async, as it receives from a channel.
func count() int {
	ch <- 3
	return <-ch
}

// seq is async, as it calls count, so the iterator that it returns is
// awaited before it is called.
func seq(v any) iter.Seq2[int, float64] {
	n := count()
	if s, ok := v.([]float64); ok {
		n = len(s)
	}
	return func(yield func(int, float64) bool) {
		for i := range n {
			if !yield(i, float64(i)*0.5) {
				return
			}
		}
	}
}

func main() {
	child := &Group{}
	root := &Group{provider: &listProvider{items: []*Group{child}}}
	root.Build()
	println(child.seen)

	for i := range seq(nil) {
		println("key:", i)
	}
	for i, f := range seq([]float64{1, 2}) {
		println("pair:", i, f)
	}
}
