package main

// pointerToJS has a type parameter constrained to a pointer with a method,
// so that calls pass a descriptor for the inferred type argument.
func pointerToJS[T any, P interface {
	*T
	toJS() any
}](v P) any {
	if v == nil {
		return nil
	}
	return v.toJS()
}
