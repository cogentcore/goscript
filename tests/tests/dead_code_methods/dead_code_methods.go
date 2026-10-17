package main

import (
	"errors"
	"fmt"
	"reflect"
	"sort"
)

// Speaker is called through an interface.
type Speaker interface{ Speak() string }

type Dog struct{ name string }

func (d *Dog) Speak() string { return d.name + " says woof" }

// Unreachable is never called.
func (d *Dog) Unreachable() string { return "unreachable" }

// checker is only asserted, never called: its method must stay so that the
// assertion succeeds.
type checker interface{ Check() }

func (d *Dog) Check() {}

// Ping is looked up by reflection with a constant name.
func (d *Dog) Ping() string { return "pong" }

// Counter has methods used as a method value and a method expression.
type Counter struct{ n int }

func (c *Counter) Inc()       { c.n++ }
func (c *Counter) Dec()       { c.n-- }
func (c *Counter) Value() int { return c.n }
func (c *Counter) unused()    { c.n = -1 }

// Inner is embedded; its methods are promoted to Outer.
type Inner struct{ label string }

func (i Inner) Label() string      { return "label:" + i.label }
func (i Inner) Hidden() string     { return "hidden" }
func (i *Inner) SetLabel(s string) { i.label = s }

type Labeler interface{ Label() string }

type Outer struct {
	*Inner
	Speaker
}

// Celsius is a named non-struct type whose String method fmt calls.
type Celsius float64

func (c Celsius) String() string  { return fmt.Sprintf("%.1fC", float64(c)) }
func (c Celsius) Kelvin() float64 { return float64(c) + 273.15 }
func (c Celsius) Unused() int     { return 0 }

// Named is a constraint whose method a generic function calls.
type Named interface{ Name() string }

type Cat struct{}

func (Cat) Name() string  { return "cat" }
func (Cat) Other() string { return "other" }

func names[T Named](items []T) []string {
	var out []string
	for _, it := range items {
		out = append(out, it.Name())
	}
	return out
}

// Box is a generic type with a used and an unused method.
type Box[T any] struct{ v T }

func (b *Box[T]) Get() T  { return b.v }
func (b *Box[T]) Drop() T { var zero T; return zero }

// byLen is sorted by sort.Sort, which calls its methods.
type byLen []string

func (s byLen) Len() int           { return len(s) }
func (s byLen) Less(i, j int) bool { return len(s[i]) < len(s[j]) }
func (s byLen) Swap(i, j int)      { s[i], s[j] = s[j], s[i] }

// myErr is printed as an error.
type myErr struct{ code int }

func (e *myErr) Error() string { return fmt.Sprintf("error %d", e.code) }

func unusedFunction() int { return 42 }

func main() {
	d := &Dog{name: "rex"}
	var s Speaker = d
	fmt.Println(s.Speak())

	var v any = d
	_, ok := v.(checker)
	fmt.Println("checker:", ok)

	fmt.Println(reflect.ValueOf(d).MethodByName("Ping").Call(nil)[0])

	c := &Counter{}
	inc := c.Inc
	inc()
	inc()
	(*Counter).Dec(c)
	fmt.Println("counter:", c.Value())

	o := Outer{Inner: &Inner{}, Speaker: &Dog{name: "max"}}
	o.SetLabel("x")
	var l Labeler = o
	fmt.Println(l.Label(), o.Speak())

	t := Celsius(21.5)
	fmt.Println(t, t.Kelvin())

	fmt.Println(names([]Cat{{}, {}}))

	b := &Box[int]{v: 7}
	fmt.Println(b.Get())

	words := byLen{"ccc", "a", "bb"}
	sort.Sort(words)
	fmt.Println(words)

	var err error = &myErr{code: 3}
	fmt.Println(err)
	var target *myErr
	fmt.Println(errors.As(err, &target), target.code)
}
