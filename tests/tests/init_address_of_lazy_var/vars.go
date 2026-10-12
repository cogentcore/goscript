package main

var UserLevel = defaultLevel()

// defaultLevel blocks on a channel, so it is asynchronous.
func defaultLevel() int {
	ch := make(chan int, 1)
	ch <- 3
	return <-ch
}

var Level = base + 1

var base = 10
