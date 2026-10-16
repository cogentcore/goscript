package subpkg

import (
	"path/filepath"
	"runtime"
	"strconv"
)

// Name names its caller's caller by its directory, file and line, as
// Cogent Core's tree.AutoPlanName names the widgets that each line adds.
//
//goscript:maxify
func Name(level int) string {
	_, file, line, ok := runtime.Caller(level)
	if !ok {
		return "unknown"
	}
	return filepath.Base(filepath.Dir(file)) + "/" + filepath.Base(file) + ":" + strconv.Itoa(line)
}

// Add names the line that calls it.
//
//goscript:maxify
func Add(names *[]string, init func()) {
	*names = append(*names, Name(2))
}

// AddOf names the line that calls it, for any type.
//
//goscript:maxify
func AddOf[T any](names *[]string, value T) {
	*names = append(*names, Name(2))
}

// Plan collects names.
type Plan struct{ Names []string }

// Add names the line that calls it.
//
//goscript:maxify
func (p *Plan) Add() *Plan {
	p.Names = append(p.Names, Name(2))
	return p
}

// Unmarked names the line that calls it, but the directive does not mark it,
// so the name comes from the stack trace.
func Unmarked() string {
	return Name(2)
}
