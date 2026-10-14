package main

import (
	"encoding/json"
	"reflect"
)

type Item struct {
	Size  int    `label:"Größe" json:"größe"`
	Plain string `json:"plain"`
}

func main() {
	// A non-ASCII struct tag is a Go string of its UTF-8 bytes.
	field, _ := reflect.TypeOf(Item{}).FieldByName("Size")
	label := field.Tag.Get("label")
	println("label:", label, len(label), label == "Größe")

	// Its JSON name round-trips through encoding/json.
	data, _ := json.Marshal(Item{Size: 3, Plain: "x"})
	println("json:", string(data), string(data) == `{"größe":3,"plain":"x"}`)
	var back Item
	err := json.Unmarshal(data, &back)
	println("back:", err == nil, back.Size, back.Plain)
}
