package main

import (
	"sync"

	"github.com/s4wave/goscript/tests/tests/generic_pool_pointer_assert/list"
)

type interval struct {
	start, end int
}

// intervalPool holds a copy of the pool list.NewPool returns, as quic-go's
// frame sorter does.
var intervalPool sync.Pool

func init() {
	intervalPool = *list.NewPool[interval]()
}

type sorter struct {
	gaps *list.List[interval]
}

func newSorter() *sorter {
	s := &sorter{gaps: list.NewWithPool[interval](&intervalPool)}
	s.gaps.PushFront(interval{start: 0, end: 10})
	return s
}

func main() {
	s := newSorter()
	e := s.gaps.Front()
	println(s.gaps.Len(), e.Value.start, e.Value.end)

	direct := list.NewWithPool[int](list.NewPool[int]())
	println(direct.PushFront(7).Value)
}
