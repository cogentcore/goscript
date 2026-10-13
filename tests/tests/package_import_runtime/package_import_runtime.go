package main

import "runtime"

func init() {
	// Graphics and windowing code locks the main goroutine to the main
	// thread in init.
	runtime.LockOSThread()
}

func main() {
	// Test basic runtime functions
	println("GOOS:", runtime.GOOS)
	println("GOARCH:", runtime.GOARCH)
	println("Compiler:", runtime.Compiler)
	_ = runtime.GOROOT() // not stable for the test (depends on the Go installation)
	// println("Version:", runtime.Version()) - not stable for the test (go.mod may change)
	// println("NumCPU:", runtime.NumCPU()) - not stable for the test (number of cores may change)

	// Test GOMAXPROCS
	procs := runtime.GOMAXPROCS(0) // Get current value
	println("GOMAXPROCS(-1):", runtime.GOMAXPROCS(-1))
	println("GOMAXPROCS(0):", procs)

	// Test NumGoroutine
	println("NumGoroutine:", runtime.NumGoroutine())

	// Test GC (should be no-op)
	runtime.GC()
	println("GC called successfully")

	pcs := make([]uintptr, 0)
	println("Callers empty:", runtime.Callers(0, pcs))
	frames := runtime.CallersFrames(pcs)
	frame, more := frames.Next()
	println("Frames empty:", frame.Line, more)
	println("FuncForPC nil:", runtime.FuncForPC(0) == nil)

	box := &struct{ value int }{value: 1}
	cleanup := runtime.AddCleanup(box, func(value int) {
		println("cleanup should not run during test:", value)
	}, 1)
	cleanup.Stop()
	runtime.KeepAlive(box)
	println("Cleanup stopped")

	runtime.SetFinalizer(box, func(*struct{ value int }) {
		println("finalizer should not run during test")
	})
	runtime.SetFinalizer(box, nil)
	println("Finalizer ignored")

	lockOSThread()
}

// lockOSThread locks a goroutine to its thread and unlocks main's lock from
// init.
func lockOSThread() {
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
