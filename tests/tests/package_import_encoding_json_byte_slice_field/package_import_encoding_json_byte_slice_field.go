package main

import "encoding/json"

type Enc struct {
	Width  int
	Image  []byte
	Frames [][]byte
	Named  map[string][]byte
	Nested *Enc
}

func main() {
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
