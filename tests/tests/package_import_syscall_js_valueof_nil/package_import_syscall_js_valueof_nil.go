package main

import "syscall/js"

func features() []any {
	var out []any
	return out
}

func main() {
	// js.ValueOf converts nil []any and map[string]any values to an empty
	// array and an empty object, not to null.
	println("nil slice:", js.ValueOf([]any(nil)).Type().String(), js.ValueOf([]any(nil)).Length())
	println("nil map:", js.ValueOf(map[string]any(nil)).Type().String())

	desc := map[string]any{
		"label":            "",
		"requiredFeatures": features(),
		"limits":           map[string]any(nil),
	}
	v := js.ValueOf(desc)
	println("nested slice:", v.Get("requiredFeatures").Type().String(), js.Global().Get("Array").Call("isArray", v.Get("requiredFeatures")).Bool())
	println("nested map:", v.Get("limits").Type().String())

	var nothing any
	println("nil interface:", js.ValueOf(nothing).Type().String())
}
