package main

import (
	"encoding/json"
	"fmt"
	"reflect"
	"strings"
)

type MyInt int32

type Name string

type Stringy string

func (s Stringy) String() string { return "S:" + string(s) }

type stringer interface{ String() string }

func toAny[T any](v T) any { return v }

func toStringer[T stringer](v T) stringer { return v }

func kind(v any) string {
	switch v.(type) {
	case json.Number:
		return "json.Number"
	case Name:
		return "Name"
	case MyInt:
		return "MyInt"
	case string:
		return "string"
	case int32:
		return "int32"
	case int:
		return "int"
	}
	return "other"
}

func main() {
	var a any = MyInt(5)
	_, ok := a.(MyInt)
	println("MyInt as MyInt:", ok)
	_, ok = a.(int32)
	println("MyInt as int32:", ok)
	var b any = int32(5)
	_, ok = b.(MyInt)
	println("int32 as MyInt:", ok)

	for _, v := range []any{"s", Name("n"), json.Number("1"), MyInt(1), int32(2), 3} {
		println("switch:", kind(v))
	}

	println("generic:", kind(toAny(MyInt(6))), kind(toAny(Name("g"))), kind(toAny("raw")))
	println("generic stringer:", toStringer(Stringy("q")).String())
	_, ok = toAny(Stringy("r")).(stringer)
	println("generic any stringer:", ok)

	println("reflect:", kind(reflect.ValueOf(MyInt(7)).Interface()), reflect.TypeOf(a).String())
	type holder struct {
		N  Name
		Is []MyInt
	}
	hv := reflect.ValueOf(holder{N: "h", Is: []MyInt{9}})
	println("reflect field:", kind(hv.Field(0).Interface()), kind(hv.Field(1).Index(0).Interface()))

	println("equal:", a == any(MyInt(5)), a == b, a == any(MyInt(6)))

	m := map[string]Name{"k": "v"}
	var am any = m
	_, ok = am.(map[string]Name)
	println("map:", ok)

	d := json.NewDecoder(strings.NewReader(`{"n": 12}`))
	d.UseNumber()
	var obj map[string]any
	if err := d.Decode(&obj); err != nil {
		println(err.Error())
	}
	println("json UseNumber:", kind(obj["n"]))

	println("fmt:", fmt.Sprint(MyInt(8), " ", Name("p"), " ", a))
}
