package main

import "reflect"

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
}
