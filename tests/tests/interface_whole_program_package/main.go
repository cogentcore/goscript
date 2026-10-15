package main

import "github.com/s4wave/goscript/tests/tests/interface_whole_program_package/visit"

type doubler struct{}

func (doubler) Visit(n int) int {
	return n * 2
}

type chanFetcher struct {
	ch chan int
}

func (c *chanFetcher) Fetch() int {
	c.ch <- 21
	return <-c.ch
}

func main() {
	println("walk:", visit.Walk(doubler{}, []int{1, 2, 3}))
	println("fetch:", visit.Fetch(&chanFetcher{ch: make(chan int, 1)}))
}
