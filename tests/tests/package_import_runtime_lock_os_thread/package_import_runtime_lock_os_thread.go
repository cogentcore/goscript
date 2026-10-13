package main

import "runtime"

func init() {
	// Graphics and windowing code locks the main goroutine to the main
	// thread in init.
	runtime.LockOSThread()
}

func main() {
	done := make(chan bool)
	go func() {
		runtime.LockOSThread()
		defer runtime.UnlockOSThread()
		println("locked goroutine ran")
		done <- true
	}()
	<-done
	runtime.UnlockOSThread()
	println("main unlocked")
}
