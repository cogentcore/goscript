package main

import "errors"

func load() int {
	ch := make(chan int, 1)
	ch <- 1
	Error = errors.New("loaded")
	return <-ch
}
