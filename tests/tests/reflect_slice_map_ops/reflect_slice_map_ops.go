package main

import (
	"encoding/xml"
	"reflect"
)

// Item is a struct slice element.
type Item struct {
	Name string
}

// Holder has slice fields to grow through reflection.
type Holder struct {
	S []int
	T []int
}

// Doc decodes repeated XML elements into a slice.
type Doc struct {
	Items []Item `xml:"item"`
}

func main() {
	// MapRange starts before the first entry and uses the map's types.
	it := reflect.ValueOf(map[string]float32{"x": 3}).MapRange()
	n := 0
	for it.Next() {
		n++
		println(it.Key().String(), it.Value().Kind().String(), it.Value().Float())
	}
	println(n)
	empty := reflect.ValueOf(map[string]int{}).MapRange()
	println(empty.Next())

	// Append appends after the slice's length, within its capacity.
	s := []int{1, 2, 3}
	sv := reflect.ValueOf(&s).Elem()
	sv.SetLen(2)
	println(len(s), cap(s))
	a := reflect.Append(sv, reflect.ValueOf(9))
	println(a.Len(), a.Index(2).Int())
	b := reflect.AppendSlice(sv, reflect.ValueOf([]int{7, 8}))
	println(b.Len(), b.Index(3).Int())

	// Copy copies within the lengths of the slices.
	c := []int{1, 2, 3, 4}
	copied := reflect.Copy(reflect.ValueOf(c[2:]), reflect.ValueOf([]int{8, 9, 10}))
	println(copied, c[0], c[2], c[3])

	// Values read after a Set through the same Value see the new contents.
	m := map[string]int{"old": 0}
	mv := reflect.ValueOf(&m).Elem()
	mv.Set(reflect.MakeMap(reflect.TypeFor[map[string]int]()))
	mv.SetMapIndex(reflect.ValueOf("k"), reflect.ValueOf(1))
	println(len(m), mv.Len())
	t := []int{0}
	tv := reflect.ValueOf(&t).Elem()
	tv.Set(reflect.MakeSlice(reflect.TypeFor[[]int](), 2, 2))
	tv.Index(1).SetInt(4)
	println(t[1], tv.Slice(1, 2).Index(0).Int())

	// Grow then SetLen, as encoding/xml and encoding/json do.
	h := &Holder{T: make([]int, 1, 10)}
	hs := reflect.ValueOf(h).Elem().Field(0)
	for i := 0; i < 5; i++ {
		n := hs.Len()
		hs.Grow(1)
		hs.SetLen(n + 1)
		hs.Index(n).SetInt(int64(i * 10))
	}
	println("grown:", len(h.S), h.S[0], h.S[4], cap(h.S) >= 5)

	// Grow keeps capacity when it is already large enough.
	ht := reflect.ValueOf(h).Elem().Field(1)
	ht.Grow(3)
	println("cap kept:", ht.Cap())

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
