package main

import (
	"reflect"
	"runtime"
	"strconv"
	"strings"
)

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
	callers()
	funcValueNames()

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

// callers reports frames of its own stack and names a function value.
func callers() {
	pc, file, line, ok := runtime.Caller(0)
	println("Caller:", ok, pc != 0, file != "", line > 0)
	f := runtime.FuncForPC(pc)
	println("FuncForPC caller:", f != nil, strings.Contains(f.Name(), "callers"))
	println("Caller(1):", callerInfo() != "")

	pcs := make([]uintptr, 8)
	n := runtime.Callers(1, pcs)
	frame, _ := runtime.CallersFrames(pcs[:n]).Next()
	println("Callers:", n > 0, frame.Line > 0, strings.Contains(frame.Function, "callers"))
}

// callerInfo names its caller's function, file and line, as logging code does.
func callerInfo() string {
	pc, file, line, _ := runtime.Caller(1)
	return runtime.FuncForPC(pc).Name() + " " + file + ":" + strconv.Itoa(line)
}

// funcName names a function value, as Cogent Core's types.FuncName does.
func funcName(f any) string {
	return runtime.FuncForPC(reflect.ValueOf(f).Pointer()).Name()
}

func helperFunc() {}

type counter struct{ n int }

func (c *counter) PtrMethod() int { return c.n }

func (c counter) ValMethod() int { return c.n }

type box[E any] struct{ v E }

func (b *box[E]) Get() E { return b.v }

// funcValueNames prints the Go names of declared functions and method values.
func funcValueNames() {
	println("FuncForPC func:", funcName(helperFunc))
	println("FuncForPC imported:", funcName(strings.ToUpper))

	c := &counter{n: 1}
	println("FuncForPC pointer method:", funcName(c.PtrMethod))
	println("FuncForPC value method:", funcName(c.ValMethod))

	b := &box[int]{v: 2}
	println("FuncForPC generic method:", funcName(b.Get))
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
