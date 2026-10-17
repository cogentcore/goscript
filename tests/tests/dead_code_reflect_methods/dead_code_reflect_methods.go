package main

import (
	"fmt"
	"reflect"
)

// Methods of a type are called by reflection with names known only at run
// time, so every exported method of a used type is kept.
type Calc struct{ base int }

func (c Calc) Add(n int) int { return c.base + n }
func (c Calc) Double() int   { return c.base * 2 }
func (c *Calc) Reset()       { c.base = 0 }

type Greeting string

func (g Greeting) Hello() string { return "hello " + string(g) }
func (g Greeting) Bye() string   { return "bye " + string(g) }

func call(v any, name string, args ...any) []reflect.Value {
	in := make([]reflect.Value, len(args))
	for i, a := range args {
		in[i] = reflect.ValueOf(a)
	}
	return reflect.ValueOf(v).MethodByName(name).Call(in)
}

func main() {
	c := &Calc{base: 5}
	names := []string{"Add", "Double"}
	fmt.Println(call(c, names[0], 3)[0].Int(), call(c, names[1])[0].Int())

	t := reflect.TypeOf(c)
	for i := 0; i < t.NumMethod(); i++ {
		fmt.Println(i, t.Method(i).Name)
	}
	v := reflect.ValueOf(Greeting("go"))
	for i := 0; i < v.NumMethod(); i++ {
		fmt.Println(v.Type().Method(i).Name, v.Method(i).Call(nil)[0].String())
	}
	call(c, "Reset")
	fmt.Println(c.base)
}
