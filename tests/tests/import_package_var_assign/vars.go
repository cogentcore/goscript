package main

// userLevel blocks on a channel to initialize, so its initializer is async.
var userLevel = defaultLevel()

func defaultLevel() int {
	ch := make(chan int, 1)
	ch <- 3
	return <-ch
}

var level = base + 1

var base = 10
