package main

import (
	"reflect"
	"strings"
)

type item struct {
	Name  string `json:"name" desc:"the name of the item, with spaces" default:"a b"`
	Count int    `json:"count,omitempty"`
	Plain int
}

func tagLen(tag reflect.StructTag) int {
	return len(tag)
}

func main() {
	typ := reflect.TypeOf(item{})
	for i := 0; i < typ.NumField(); i++ {
		f := typ.Field(i)
		println(f.Name, tagLen(f.Tag), string(f.Tag) == "")
		println(" json:", f.Tag.Get("json"))
		println(" desc:", f.Tag.Get("desc"))
		def, ok := f.Tag.Lookup("default")
		println(" default:", def, ok)
		println(" fields:", len(strings.Fields(string(f.Tag))))
	}
	var tag reflect.StructTag = `a:"1" b:"two words"`
	println(tag.Get("b"), tag == `a:"1" b:"two words"`)
}
