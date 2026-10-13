package main

import "sync"

// queue uses the zero value of sync.Cond, setting its Locker lazily, as in
// a struct that embeds both the mutex and the condition.
type queue struct {
	Mu    sync.Mutex
	Cond  sync.Cond
	items []int
}

func (q *queue) init() {
	if q.Cond.L == nil {
		q.Cond.L = &q.Mu
	}
}

func (q *queue) push(v int) {
	q.Mu.Lock()
	q.init()
	q.items = append(q.items, v)
	q.Mu.Unlock()
	q.Cond.Signal()
}

func (q *queue) pop() int {
	q.Mu.Lock()
	q.init()
	for len(q.items) == 0 {
		q.Cond.Wait()
	}
	v := q.items[0]
	q.items = q.items[1:]
	q.Mu.Unlock()
	return v
}

func main() {
	var zero sync.Cond
	println("zero L is nil:", zero.L == nil)

	q := &queue{}
	done := make(chan bool)
	go func() {
		sum := 0
		for range 3 {
			sum += q.pop()
		}
		println("sum:", sum)
		done <- true
	}()
	q.push(1)
	q.push(2)
	q.push(3)
	<-done

	c := sync.NewCond(&sync.Mutex{})
	println("NewCond L is nil:", c.L == nil)
}
