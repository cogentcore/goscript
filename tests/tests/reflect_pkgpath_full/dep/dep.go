package dep

import "reflect"

type Node struct {
	Name string
}

type Level int

type Namer interface {
	Name() string
}

type Box[T any] struct {
	Value T
}

// LocalType returns the reflect type of a type declared in a function.
func LocalType() reflect.Type {
	type local struct{ A int }
	return reflect.TypeOf(local{})
}
