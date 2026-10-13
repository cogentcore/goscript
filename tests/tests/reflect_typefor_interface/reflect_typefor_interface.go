package main

import (
	"fmt"
	"io"
	"reflect"
)

type Stringy string

func (s Stringy) String() string { return string(s) }

type namer interface{ Name() string }

type myErr struct{}

func (*myErr) Error() string { return "myErr" }

func main() {
	errorType := reflect.TypeFor[error]()
	println("error:", errorType.Kind() == reflect.Interface, errorType.String(), errorType.Name(), errorType.PkgPath())
	println("error implements:", reflect.TypeOf(&myErr{}).Implements(errorType), reflect.TypeOf(1).Implements(errorType))

	stringerType := reflect.TypeFor[fmt.Stringer]()
	println("Stringer:", stringerType.Kind() == reflect.Interface, stringerType.String(), stringerType.Name(), stringerType.PkgPath())
	println("Stringer implements:", reflect.TypeOf(Stringy("s")).Implements(stringerType), reflect.TypeOf("s").Implements(stringerType))

	readerType := reflect.TypeFor[io.Reader]()
	println("Reader:", readerType.Kind() == reflect.Interface, readerType.String())

	namerType := reflect.TypeFor[namer]()
	println("namer:", namerType.Kind() == reflect.Interface, namerType.String(), namerType.NumMethod())

	anyType := reflect.TypeFor[any]()
	println("any:", anyType.String(), anyType.Name() == "", anyType.Kind() == reflect.Interface)

	var s any = Stringy("q")
	_, ok := s.(fmt.Stringer)
	println("assert fmt.Stringer:", ok)
}
