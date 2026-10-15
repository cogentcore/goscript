package main

import "syscall/js"

// recorder holds a JavaScript object whose hit method prints its arguments.
type recorder struct {
	obj js.Value
}

// flush calls hit through deferred method calls, which bind the receiver
// when each defer statement runs.
func (r *recorder) flush() {
	defer r.obj.Call("hit")
	defer r.obj.Call("hit", 2, 3)
	args := []any{4}
	defer r.obj.Call("hit", args...)
	r.obj = js.Null()
}

func main() {
	hit := js.FuncOf(func(this js.Value, args []js.Value) any {
		println("hit", len(args))
		return nil
	})
	defer hit.Release()
	obj := js.Global().Get("Object").New()
	obj.Set("hit", hit)

	// A method value takes its variadic arguments as a slice.
	call := obj.Call
	call("hit")
	call("hit", 1)
	call("hit", []any{1, 2}...)

	r := &recorder{obj: obj}
	r.flush()
}
