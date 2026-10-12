package main

import "reflect"

type item struct {
	Name  string
	Count int
	Big   int64
	Ratio float64
	On    bool
	Tags  []string
}

func main() {
	// values made by New and set through Elem, as decoders do for map keys
	name := reflect.New(reflect.TypeOf("")).Elem()
	name.SetString("a")
	println(name.String(), name.Interface().(string))

	n := reflect.New(reflect.TypeOf(0)).Elem()
	n.SetInt(7)
	println(n.Int())

	big := reflect.New(reflect.TypeOf(int64(0))).Elem()
	big.SetInt(1 << 40)
	println(big.Int())

	f := reflect.New(reflect.TypeOf(0.0)).Elem()
	f.SetFloat(2.5)
	println(f.Float())

	b := reflect.New(reflect.TypeOf(false)).Elem()
	b.SetBool(true)
	println(b.Bool())

	sl := reflect.New(reflect.TypeOf([]string{})).Elem()
	sl.Set(reflect.ValueOf([]string{"x", "y"}))
	println(sl.Len())

	// struct fields set through a copy of the field Value
	it := item{}
	v := reflect.ValueOf(&it).Elem()
	fields := []reflect.Value{v.Field(0), v.Field(1), v.Field(4)}
	fields[0].SetString("n")
	fields[1].SetInt(3)
	fields[2].SetBool(true)
	println(fields[0].String(), fields[1].Int(), fields[2].Bool(), it.Name, it.Count, it.On)
}
