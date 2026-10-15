package main

import "sync"

// sync.Pool's Get calls New only when the pool is empty, and suspends only
// when New does, so it is async exactly when a call through a func() any
// value may be.

type buffer struct {
	data []byte
}

var buffers = sync.Pool{
	New: func() any { return &buffer{data: make([]byte, 0, 8)} },
}

// get is sync: every func() any value in the program is sync.
func get() *buffer {
	return buffers.Get().(*buffer)
}

func put(b *buffer) {
	b.data = b.data[:0]
	buffers.Put(b)
}

func main() {
	b := get()
	b.data = append(b.data, 'x')
	println("len:", len(b.data), "cap:", cap(b.data))
	put(b)
	c := get()
	println("reused:", c == b, len(c.data))
}
