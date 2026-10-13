package main

import (
	"fmt"
	"io"
	"reflect"
	"time"
)

type MyStruct struct {
	Name string
	Age  int
}

type MyInterface interface {
	SomeMethod()
}

type Stringy string

func (s Stringy) String() string { return string(s) }

type namer interface{ Name() string }

type myErr struct{}

func (*myErr) Error() string { return "myErr" }

func main() {
	// Test TypeFor with named interface type
	t1 := reflect.TypeFor[MyInterface]()
	println("TypeFor interface:", t1.String())

	// Test TypeFor with struct type
	t2 := reflect.TypeFor[MyStruct]()
	println("TypeFor struct:", t2.String())
	println("TypeFor struct kind:", t2.Kind() == reflect.Struct)

	// Test TypeFor with int type
	t3 := reflect.TypeFor[int]()
	println("TypeFor int:", t3.String())
	println("TypeFor int kind:", t3.Kind() == reflect.Int)

	// Test TypeFor with imported and cross-file named struct types
	t4 := reflect.TypeFor[time.Time]()
	println("TypeFor imported struct:", t4.String())
	t5 := reflect.TypeFor[OtherStruct]()
	println("TypeFor cross-file struct:", t5.String())

	// Test Pointer constant (should be same as Ptr)
	println("Pointer constant:", reflect.Pointer == reflect.Pointer)

	// Test TypeFor with named interface types and Implements
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

	genericComposites()

	println("reflect_typefor test finished")
}

func describe[E any](s []E) {
	v := reflect.ValueOf(s)
	println("type:", v.Type().String(), "elem kind:", v.Type().Elem().Kind().String(), "len:", v.Len())
	if v.Len() > 0 {
		println("index kind:", v.Index(0).Kind().String())
	}
}

func describeMap[K comparable, V any](m map[K]V) {
	println("map type:", reflect.TypeOf(m).String())
}

func describePointer[E any](p *E) {
	println("pointer type:", reflect.TypeOf(p).String())
}

// genericComposites checks that reflection sees the type arguments of
// composite types built from type parameters.
func genericComposites() {
	describe([]MyStruct{{Name: "a", Age: 1}})
	describe([]float32{1, 2, 3})
	describe([]int{})
	describeMap(map[string]MyStruct{})
	describePointer(&MyStruct{})
}
