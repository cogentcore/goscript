package main

import (
	"reflect"
	"runtime"
	"strconv"
	"strings"
)

// callerInfo is the common logging idiom of naming the caller's function.
func callerInfo() string {
	pc, file, line, _ := runtime.Caller(1)
	return runtime.FuncForPC(pc).Name() + " " + file + ":" + strconv.Itoa(line)
}

// logSomething logs with callerInfo. Which function callerInfo reports
// depends on the JavaScript engine, since Bun drops tail call frames.
func logSomething() string {
	return callerInfo()
}

// funcName names a function value, as Cogent Core's types.FuncName does.
func funcName(f any) string {
	return runtime.FuncForPC(reflect.ValueOf(f).Pointer()).Name()
}

func helperFunc() {}

func main() {
	pc, file, line, ok := runtime.Caller(0)
	println("caller ok:", ok, pc != 0, file != "", line > 0)

	f := runtime.FuncForPC(pc)
	println("func:", f != nil, strings.Contains(f.Name(), "main"))

	info := logSomething()
	println("info:", info != "")

	println("funcname:", strings.Contains(funcName(helperFunc), "helperFunc"))

	pcs := make([]uintptr, 8)
	n := runtime.Callers(1, pcs)
	println("callers:", n > 0)
	frames := runtime.CallersFrames(pcs[:n])
	frame, _ := frames.Next()
	println("frame:", frame.Line > 0, strings.Contains(frame.Function, "main"))
}
