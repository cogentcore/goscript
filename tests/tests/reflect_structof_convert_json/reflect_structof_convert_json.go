package main

import (
	"encoding/json"
	"reflect"
)

type Node struct {
	Name string
	Size int
}

var calls int

func (n *Node) UnmarshalJSON(b []byte) error {
	calls++
	// Unmarshal into a copy of the type without methods, so that this
	// method is not called again.
	v := reflect.ValueOf(n)
	t := v.Type().Elem()
	fields := make([]reflect.StructField, t.NumField())
	for i := range fields {
		fields[i] = t.Field(i)
	}
	copyType := reflect.PointerTo(reflect.StructOf(fields))
	return json.Unmarshal(b, v.Convert(copyType).Interface())
}

func main() {
	n := &Node{}
	err := json.Unmarshal([]byte(`{"Name":"a","Size":3}`), n)
	println(err == nil, calls, n.Name, n.Size)
	var anyN any = n
	_, ok := anyN.(json.Unmarshaler)
	println(ok, reflect.TypeOf(anyN).String())
}
