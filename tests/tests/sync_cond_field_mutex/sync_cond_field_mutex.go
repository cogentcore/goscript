package main

import "sync"

// Deque is a queue whose Cond waits on a Mutex field of the same struct,
// with Cond.L set to the address of that field.
type Deque struct {
	Mu    sync.Mutex
	Cond  sync.Cond
	Items []int
}

func (q *Deque) lockAndInit() {
	q.Mu.Lock()
	if q.Cond.L == nil {
		q.Cond.L = &q.Mu
	}
}

func (q *Deque) Next() int {
	q.lockAndInit()
	defer q.Mu.Unlock()
	for len(q.Items) == 0 {
		q.Cond.Wait()
	}
	it := q.Items[0]
	q.Items = q.Items[1:]
	return it
}

func (q *Deque) Send(it int) {
	q.lockAndInit()
	q.Items = append(q.Items, it)
	q.Cond.Signal()
	q.Mu.Unlock()
}

type Events struct {
	Deque Deque
}

func main() {
	ev := &Events{}
	started := make(chan bool)
	results := make(chan int)
	go func() {
		started <- true
		for i := 0; i < 3; i++ {
			results <- ev.Deque.Next()
		}
	}()
	<-started
	for i := 1; i <= 3; i++ {
		ev.Deque.Send(i * 10)
		println("got:", <-results)
	}
}
