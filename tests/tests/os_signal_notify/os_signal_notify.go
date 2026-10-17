package main

import (
	"context"
	"os"
	"os/signal"
	"time"
)

func main() {
	// A channel registered for signals receives none, and the program keeps
	// running timers.
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	select {
	case <-c:
		println("signal")
	case <-time.After(10 * time.Millisecond):
		println("no signal")
	}
	signal.Stop(c)
	signal.Reset(os.Interrupt)
	println("ignored:", signal.Ignored(os.Interrupt))

	// The context of NotifyContext is done when it is stopped.
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt)
	println("before stop:", ctx.Err() == nil)
	stop()
	<-ctx.Done()
	println("after stop:", ctx.Err() == context.Canceled)
}
