package main

import (
	"sync"
	"syscall/js"
)

// wrap passes a function value to js.FuncOf, as wrapper packages such as
// github.com/hack-pad/safejs do.
func wrap(fn func(this js.Value, args []js.Value) any) js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) any {
		return fn(this, args)
	})
}

func main() {
	var mu sync.Mutex
	done := make(chan string, 2)

	// The callback locks a mutex, so it may suspend. It is called by
	// JavaScript, which does not wait for it.
	handler := wrap(func(this js.Value, args []js.Value) any {
		mu.Lock()
		defer mu.Unlock()
		done <- "handled " + args[0].String()
		return nil
	})
	defer handler.Release()

	handler.Invoke("first")
	println(<-done)

	// A callback that does not suspend still returns its result.
	add := js.FuncOf(func(this js.Value, args []js.Value) any {
		return args[0].Int() + args[1].Int()
	})
	defer add.Release()
	println("sum:", add.Invoke(2, 3).Int())

	handler.Invoke("second")
	println(<-done)
}
