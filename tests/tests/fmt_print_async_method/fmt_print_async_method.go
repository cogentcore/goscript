package main

import "fmt"

// slowName's String method receives from a channel, so it is async, and so
// are the fmt print functions, which may call it, and their callers, even
// where they format only sync values.

type slowName struct {
	ch chan string
}

func (s slowName) String() string {
	s.ch <- "slow"
	return <-s.ch
}

type point struct {
	x, y int
}

func (p point) String() string {
	return fmt.Sprintf("(%d, %d)", p.x, p.y)
}

func label(v fmt.Stringer, n int) string {
	return fmt.Sprintf("%v/%d", v, n)
}

func describe(p point) string {
	return fmt.Sprint("point ", p)
}

func main() {
	println(label(slowName{ch: make(chan string, 1)}, 1))
	println(label(point{2, 3}, 4))
	println(describe(point{5, 6}))
	err := fmt.Errorf("bad %v", slowName{ch: make(chan string, 1)})
	println(err.Error())
}
