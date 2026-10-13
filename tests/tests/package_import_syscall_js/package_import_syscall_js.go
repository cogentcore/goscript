package main

import "syscall/js"

func main() {
	global := js.Global()
	global.Set("__GOSCRIPT_JS_TEST__", js.ValueOf(map[string]any{
		"name": "goscript",
		"nums": []any{1, 2, 3},
	}))
	obj := global.Get("__GOSCRIPT_JS_TEST__")
	println("type:", obj.Type().String())
	println("name:", obj.Get("name").String())
	println("length:", obj.Get("nums").Length())

	cb := js.FuncOf(func(this js.Value, args []js.Value) any {
		return args[0].Int() + 1
	})
	defer cb.Release()
	println("callback:", cb.Invoke(41).Int())

	bytes := global.Get("Uint8Array").New(3)
	bytes.SetIndex(0, 65)
	bytes.SetIndex(1, 66)
	bytes.SetIndex(2, 67)
	dst := make([]byte, 3)
	js.CopyBytesToGo(dst, bytes)
	println("bytes:", string(dst))

	// A JavaScript exception surfaces as a js.Error panic.
	func() {
		defer func() {
			if err, ok := recover().(js.Error); ok {
				println("recovered:", err.Get("name").String())
			}
		}()
		global.Get("JSON").Call("parse", "{")
	}()

	funcOfValues()
}

// wrap passes a function value, rather than a function literal, to
// js.FuncOf, as wrapper packages do.
func wrap(fn func(this js.Value, args []js.Value) any) js.Func {
	jsFunc := func(this js.Value, args []js.Value) any {
		return fn(this, args)
	}
	return js.FuncOf(jsFunc)
}

// funcOfValues wraps a function parameter and a function variable.
func funcOfValues() {
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
