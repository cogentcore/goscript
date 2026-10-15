package main

import (
	"fmt"
	"reflect"
)

// slowName is a compiled fmt.Stringer that receives from a channel. The fmt
// metadata declares only the override values of fmt.Stringer sync, so this
// implementation makes calls of String async.
type slowName struct {
	ch chan string
}

func (s slowName) String() string {
	return <-s.ch
}

func describeStringer(s fmt.Stringer) string {
	return "[" + s.String() + "]"
}

// reflect.Type has no compiled implementations, so its calls stay sync.
func typeName(t reflect.Type) string {
	return t.Name()
}

func main() {
	ch := make(chan string, 1)
	ch <- "slow"
	println(describeStringer(slowName{ch: ch}))
	println(typeName(reflect.TypeOf(slowName{})))
}
