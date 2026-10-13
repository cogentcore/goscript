package main

import "encoding/json"

func main() {
	// Decoding an object into a non-nil map adds to the existing entries.
	mp := map[string]float32{"a": 1, "b": 2}
	var to any = &mp
	err := json.Unmarshal([]byte(`{"b":5,"c":3}`), to)
	println(err == nil, len(mp), mp["a"], mp["b"], mp["c"])

	m2 := map[string]int{"x": 1}
	json.Unmarshal([]byte(`{"y":2}`), &m2)
	println(len(m2), m2["x"], m2["y"])

	var m3 map[string]int
	json.Unmarshal([]byte(`{"z":3}`), &m3)
	println(len(m3), m3["z"])
}
