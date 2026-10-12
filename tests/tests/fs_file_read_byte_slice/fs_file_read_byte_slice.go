package main

import (
	"io/fs"
	"testing/fstest"
)

// show takes data as an interface value, which makes the compiler type
// data as a generic byte slice rather than a Uint8Array.
func show(v any) {
	if b, ok := v.([]byte); ok {
		println("show:", string(b))
	}
}

func main() {
	var fsys fs.FS = fstest.MapFS{
		"a.txt": &fstest.MapFile{Data: []byte("bar")},
	}
	file, err := fsys.Open("a.txt")
	if err != nil {
		println("open error:", err.Error())
		return
	}
	data := make([]byte, 3)
	n, err := file.Read(data)
	println(n, err == nil, string(data))
	show(data)
}
