package main

import (
	"encoding/xml"
	"reflect"
)

type Item struct {
	Name string
}

type Holder struct {
	S []int
	T []int
}

type Doc struct {
	Items []Item `xml:"item"`
}

func main() {
	// Grow then SetLen, as encoding/xml and encoding/json do.
	h := &Holder{T: make([]int, 1, 10)}
	v := reflect.ValueOf(h).Elem().Field(0)
	for i := 0; i < 5; i++ {
		n := v.Len()
		v.Grow(1)
		v.SetLen(n + 1)
		v.Index(n).SetInt(int64(i * 10))
	}
	println("grown:", len(h.S), h.S[0], h.S[4], cap(h.S) >= 5)

	// Grow keeps capacity when it is already large enough.
	tv := reflect.ValueOf(h).Elem().Field(1)
	tv.Grow(3)
	println("cap kept:", tv.Cap())

	// MakeSlice honors the capacity and zeroes each struct element.
	ms := reflect.MakeSlice(reflect.TypeFor[[]Item](), 2, 4)
	println("makeslice:", ms.Len(), ms.Cap())
	ms.Index(0).Field(0).SetString("a")
	println("distinct:", ms.Index(0).Field(0).String(), ms.Index(1).Field(0).String() == "")

	// MakeSlice of bytes.
	bs := reflect.MakeSlice(reflect.TypeFor[[]byte](), 3, 3)
	bs.Index(1).SetUint(7)
	println("bytes:", len(bs.Bytes()), bs.Bytes()[1])

	var d Doc
	err := xml.Unmarshal([]byte(`<doc><item><Name>x</Name></item><item><Name>y</Name></item></doc>`), &d)
	println("xml:", err == nil, len(d.Items))
	if len(d.Items) == 2 {
		println("xml items:", d.Items[0].Name, d.Items[1].Name)
	}
}
