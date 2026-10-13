package main

import "syscall/js"

// wrap passes a function value, rather than a function literal, to
// js.FuncOf, as wrapper packages such as github.com/hack-pad/safejs do.
func wrap(fn func(this js.Value, args []js.Value) any) js.Func {
	jsFunc := func(this js.Value, args []js.Value) any {
		return fn(this, args)
	}
	return js.FuncOf(jsFunc)
}

func main() {
	add := wrap(func(this js.Value, args []js.Value) any {
		return args[0].Int() + args[1].Int()
	})
	defer add.Release()
	println("wrapped type:", add.Type().String())

	var fn func(this js.Value, args []js.Value) any
	fn = func(this js.Value, args []js.Value) any { return "from variable" }
	direct := js.FuncOf(fn)
	defer direct.Release()
	println("direct:", direct.Invoke().String())
}
