package main

import "slices"

type Process struct {
	pid  int
	done chan struct{}
}

// exited suspends in a select, so a predicate that calls it is async.
func (p *Process) exited() bool {
	select {
	case <-p.done:
		return true
	default:
		return false
	}
}

func isEven(v int) bool {
	return v%2 == 0
}

// firstEven passes only synchronous predicates, so it stays synchronous.
func firstEven(values []int) int {
	return slices.IndexFunc(values, isEven)
}

// anyExited passes a method expression that selects.
func anyExited(procs []*Process) bool {
	return slices.ContainsFunc(procs, (*Process).exited)
}

func main() {
	done := make(chan struct{})
	close(done)
	procs := []*Process{
		{pid: 1, done: make(chan struct{})},
		{pid: 2, done: done},
	}

	println("first even:", firstEven([]int{1, 3, 4, 6}))
	println("any exited:", anyExited(procs))
	println("exited index:", slices.IndexFunc(procs, func(p *Process) bool {
		return p.exited()
	}))

	// Each comparison receives a zero, which makes cmp async.
	ch := make(chan int, 8)
	for range cap(ch) {
		ch <- 0
	}
	cmp := func(a, b int) int {
		return a - b + 0*<-ch
	}
	values := []int{3, 1, 2}
	slices.SortStableFunc(values, cmp)
	println("sorted:", values[0], values[1], values[2])

	pred := isEven
	println("max odd:", slices.MaxFunc([]int{5, 9, 7}, func(a, b int) int { return a - b }))
	println("contains even:", slices.ContainsFunc([]int{1, 2}, pred))
}
