package main

import (
	"encoding/json"
	"fmt"
	"reflect"
)

type odd struct {
	__proto__   int
	constructor string
	Name        string `json:"name"`
}

func main() {
	// Fields named like JavaScript object internals are ordinary fields.
	v := odd{__proto__: 7, constructor: "c", Name: "n"}
	w := v
	w.__proto__ = 8
	p := &v.__proto__
	*p += 1
	fmt.Println(v.__proto__, v.constructor, v.Name, w.__proto__)

	// The struct keeps its type and methods.
	fmt.Printf("%v %+v\n", v, w)
	fmt.Println(reflect.TypeOf(v).String(), reflect.ValueOf(v).Field(0).Int(), reflect.ValueOf(v).Field(1).String())
	fmt.Println(v == odd{__proto__: 8, constructor: "c", Name: "n"})
	data, err := json.Marshal(v)
	fmt.Println(string(data), err == nil)
}
