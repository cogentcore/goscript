package main

import (
	"encoding/json"
	"fmt"
	"slices"
	"strconv"
	"strings"
)

// Holder has a map field that Unmarshal merges into.
type Holder struct {
	Tags map[string]int
}

// Enc has []byte fields, which JSON encodes as base64 strings.
type Enc struct {
	Width  int
	Image  []byte
	Frames [][]byte
	Named  map[string][]byte
	Nested *Enc
}

type Person struct {
	Name   string `json:"name"`
	Age    int    `json:"age"`
	Active bool   `json:"active"`
}

func main() {
	var results []string

	// Marshal a simple struct
	p := Person{Name: "Alice", Age: 30, Active: true}
	b, err := json.Marshal(p)
	if err != nil {
		results = append(results, "Marshal error: "+err.Error())
	} else {
		results = append(results, "Marshal: "+string(b))
	}
	indented, err := json.MarshalIndent(p, "", "  ")
	if err != nil {
		results = append(results, "MarshalIndent error: "+err.Error())
	} else {
		results = append(results, "MarshalIndent: "+strings.ReplaceAll(string(indented), "\n", "|"))
	}

	// Unmarshal into a struct
	var q Person
	if err := json.Unmarshal([]byte(`{"name":"Bob","age":25,"active":false}`), &q); err != nil {
		results = append(results, "Unmarshal struct error: "+err.Error())
	} else {
		results = append(results, "Unmarshal struct: Name="+q.Name+", Age="+strconv.Itoa(q.Age)+", Active="+strconv.FormatBool(q.Active))
	}

	// Unmarshal into a map[string]any
	var m map[string]any
	if err := json.Unmarshal([]byte(`{"name":"Carol","age":22,"active":true}`), &m); err != nil {
		results = append(results, "Unmarshal map error: "+err.Error())
	} else {
		name := m["name"].(string)
		age := int(m["age"].(float64))
		active := m["active"].(bool)
		results = append(results, "Unmarshal map: name="+name+", age="+strconv.Itoa(age)+", active="+strconv.FormatBool(active))
	}

	// Sort results for deterministic output
	slices.Sort(results)

	for _, r := range results {
		println("JSON result:", r)
	}

	// A Number in an interface carries all of its methods, including
	// the json/v2 MarshalJSONTo and UnmarshalJSONFrom.
	var num fmt.Stringer = json.Number("12.5")
	println("Number as Stringer:", num.String())

	// Decoding an object into a non-nil map adds to the existing entries.
	mp := map[string]float32{"a": 1, "b": 2}
	var to any = &mp
	err = json.Unmarshal([]byte(`{"b":5,"c":3}`), to)
	println("merge any:", err == nil, len(mp), mp["a"], mp["b"], mp["c"])
	m2 := map[string]int{"x": 1}
	json.Unmarshal([]byte(`{"y":2}`), &m2)
	println("merge typed:", len(m2), m2["x"], m2["y"])
	var m3 map[string]int
	json.Unmarshal([]byte(`{"z":3}`), &m3)
	println("nil map:", len(m3), m3["z"])
	h := Holder{Tags: map[string]int{"keep": 1}}
	json.Unmarshal([]byte(`{"Tags":{"add":2}}`), &h)
	println("merge field:", len(h.Tags), h.Tags["keep"], h.Tags["add"])

	byteSliceFields()

	println("encoding/json test finished")
}

// byteSliceFields round-trips []byte fields, elements and map values,
// decoding into a struct whose []byte fields start nil.
func byteSliceFields() {
	e := &Enc{
		Width:  2,
		Image:  []byte{1, 2, 250},
		Frames: [][]byte{{3}, {4, 5}},
		Named:  map[string][]byte{"a": {6, 7}},
		Nested: &Enc{Image: []byte("hi")},
	}
	b, err := json.Marshal(e)
	println(string(b), err == nil)

	d := &Enc{}
	err = json.Unmarshal(b, d)
	println("err:", err == nil, "width:", d.Width)
	println("image:", len(d.Image), d.Image[0], d.Image[2])
	println("frames:", len(d.Frames), len(d.Frames[1]), d.Frames[1][1])
	println("named:", len(d.Named["a"]), d.Named["a"][1])
	println("nested:", string(d.Nested.Image))

	err = json.Unmarshal([]byte(`{"Image":null}`), d)
	println("null image:", err == nil, d.Image == nil)
}
