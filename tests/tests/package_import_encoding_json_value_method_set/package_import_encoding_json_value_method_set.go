package main

import (
	"encoding/json"
	"reflect"
)

type Node struct {
	A int
	B string
}

// MarshalJSON has a pointer receiver, so a Node value does not implement
// json.Marshaler and marshaling the value uses the default encoding.
func (n *Node) MarshalJSON() ([]byte, error) {
	b, err := json.Marshal(reflect.ValueOf(n).Elem().Interface())
	if err != nil {
		return nil, err
	}
	return append([]byte(`{"wrapped":`), append(b, '}')...), nil
}

func main() {
	b, err := json.Marshal(&Node{A: 1, B: "x"})
	println(string(b), err == nil)

	b, err = json.Marshal(Node{A: 2, B: "y"})
	println(string(b), err == nil)

	b, err = json.Marshal([]Node{{A: 3}})
	println(string(b), err == nil)

	b, err = json.Marshal([]*Node{{A: 4}})
	println(string(b), err == nil)

	var v struct{ N Node }
	v.N.A = 5
	b, err = json.Marshal(v)
	println(string(b), err == nil)

	var p struct{ N *Node }
	p.N = &Node{A: 6}
	b, err = json.Marshal(p)
	println(string(b), err == nil)
}
