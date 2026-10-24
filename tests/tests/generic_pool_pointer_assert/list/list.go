// Package list is a generic linked list whose elements come from a sync.Pool,
// as in quic-go's internal linkedlist.
package list

import "sync"

// NewPool returns a pool of elements of T.
func NewPool[T any]() *sync.Pool {
	return &sync.Pool{New: func() any { return &Element[T]{} }}
}

// Element is an element of a list.
type Element[T any] struct {
	next, prev *Element[T]
	list       *List[T]
	Value      T
}

// Next returns the next element or nil.
func (e *Element[T]) Next() *Element[T] {
	if p := e.next; e.list != nil && p != &e.list.root {
		return p
	}
	return nil
}

// Prev returns the previous element or nil.
func (e *Element[T]) Prev() *Element[T] {
	if p := e.prev; e.list != nil && p != &e.list.root {
		return p
	}
	return nil
}

// List returns the list e belongs to.
func (e *Element[T]) List() *List[T] {
	return e.list
}

// List is a doubly linked list.
type List[T any] struct {
	root Element[T]
	len  int
	pool *sync.Pool
}

// Init clears the list.
func (l *List[T]) Init() *List[T] {
	l.root.next = &l.root
	l.root.prev = &l.root
	l.len = 0
	return l
}

// NewWithPool returns a list that takes its elements from pool.
func NewWithPool[T any](pool *sync.Pool) *List[T] {
	l := &List[T]{pool: pool}
	return l.Init()
}

// Len returns the number of elements.
func (l *List[T]) Len() int { return l.len }

// Front returns the first element or nil.
func (l *List[T]) Front() *Element[T] {
	if l.len == 0 {
		return nil
	}
	return l.root.next
}

func (l *List[T]) insert(e, at *Element[T]) *Element[T] {
	e.prev = at
	e.next = at.next
	e.prev.next = e
	e.next.prev = e
	e.list = l
	l.len++
	return e
}

func (l *List[T]) insertValue(v T, at *Element[T]) *Element[T] {
	var e *Element[T]
	if l.pool != nil {
		e = l.pool.Get().(*Element[T])
	} else {
		e = &Element[T]{}
	}
	e.Value = v
	return l.insert(e, at)
}

// PushFront inserts v at the front of the list.
func (l *List[T]) PushFront(v T) *Element[T] {
	return l.insertValue(v, &l.root)
}
