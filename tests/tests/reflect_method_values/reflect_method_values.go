package main

import (
	"fmt"
	"reflect"
	"strings"
)

type Label string

type Level int

func (l Level) Double() int { return int(l) * 2 }

type Widget struct {
	Text string
	Lab  Label
}

func NewWidget() *Widget { return &Widget{} }

func (w *Widget) SetText(s string) *Widget { w.Text = s; return w }

func (w *Widget) SetLab(l Label) *Widget { w.Lab = l; return w }

func (w *Widget) Sum(vs ...Level) int {
	n := 0
	for _, v := range vs {
		n += int(v)
	}
	return n
}

func (w Widget) Upper() string { return strings.ToUpper(w.Text) }

type Inner struct{ X int }

type Outer struct{ *Inner }

func main() {
	// A pointer has all the methods; a struct value only its value methods.
	pt := reflect.TypeOf(&Widget{})
	for i := 0; i < pt.NumMethod(); i++ {
		m := pt.Method(i)
		fmt.Println("ptr method", i, m.Name, m.Index, m.Type.IsVariadic())
	}
	vt := reflect.TypeOf(Widget{})
	fmt.Println("value methods", vt.NumMethod(), vt.Method(0).Name)

	// A method of a pointer held in a settable Value is called by index.
	out := reflect.ValueOf(NewWidget).Call(nil)
	slot := reflect.New(out[0].Type()).Elem()
	slot.Set(out[0])
	m, _ := pt.MethodByName("SetText")
	slot.Method(m.Index).Call([]reflect.Value{reflect.ValueOf("abc")})
	fmt.Println("text", slot.Interface().(*Widget).Text, slot.NumMethod())

	// A named string argument arrives as a string.
	setLab := slot.MethodByName("SetLab")
	setLab.Call([]reflect.Value{reflect.ValueOf(Label("hello"))})
	w := slot.Interface().(*Widget)
	fmt.Println("label", len(w.Lab), w.Lab == "hello")

	// A variadic method takes its arguments one by one.
	sum := slot.MethodByName("Sum")
	fmt.Println("variadic", sum.Type().IsVariadic(), sum.Call([]reflect.Value{reflect.ValueOf(Level(3)), reflect.ValueOf(Level(4))})[0].Int())

	// A method of a named int is bound to its value.
	double := reflect.ValueOf(Level(5)).Method(0)
	fmt.Println("double", double.Call(nil)[0].Int())

	// A func stored in a settable Value can be called.
	fn := reflect.New(reflect.TypeOf(strings.ToUpper)).Elem()
	fn.Set(reflect.ValueOf(strings.ToUpper))
	fmt.Println("func", fn.Call([]reflect.Value{reflect.ValueOf("up")})[0].String())

	// Method and SelectCase values are copied as structs.
	methods := []reflect.Method{pt.Method(0)}
	first := methods[0]
	cases := []reflect.SelectCase{{Dir: reflect.SelectDefault}}
	c := cases[0]
	fmt.Println("copies", first.Name, c.Dir == reflect.SelectDefault)

	// FieldByIndex steps through an embedded struct pointer.
	o := Outer{&Inner{7}}
	fmt.Println("embedded", reflect.ValueOf(o).FieldByIndex([]int{0, 0}).Int())

	// A sized number keeps its type through Interface.
	f32 := reflect.ValueOf(Widget.Upper).Type().NumIn()
	fmt.Println("float32", reflect.ValueOf(float32(1.1)).Interface(), reflect.ValueOf(int8(-3)).Interface(), f32)

	// A new array has its length of zero elements.
	arr := reflect.New(reflect.ArrayOf(3, reflect.TypeOf(""))).Elem()
	arr.Index(1).SetString("b")
	fmt.Println("array", arr.Len(), reflect.Zero(reflect.ArrayOf(4, reflect.TypeOf(byte(0)))).Len(), arr.Index(1).String())

	// A MakeFunc argument has the type of its parameter.
	mf := reflect.MakeFunc(reflect.TypeOf(func(*Widget) string { return "" }), func(args []reflect.Value) []reflect.Value {
		return []reflect.Value{reflect.ValueOf(args[0].Type().String())}
	})
	fmt.Println("makefunc", mf.Call([]reflect.Value{reflect.ValueOf(&Widget{})})[0].String())
}
