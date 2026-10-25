package main

import (
	"fmt"
	"reflect"
)

// field returns the first field of v, or the panic it recovers.
func field(v reflect.Value) (s string) {
	defer func() {
		if r := recover(); r != nil {
			_, isErr := r.(*reflect.ValueError)
			s = fmt.Sprint("recovered: ", isErr, " ", r)
		}
	}()
	return v.Field(0).String()
}

func main() {
	type T struct{ S string }
	println(field(reflect.ValueOf(T{S: "ok"})))
	println(field(reflect.Value{}))
}
