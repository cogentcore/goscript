package main

import (
	"bytes"
	"encoding/binary"
	"encoding/json"
	"fmt"
	"math"
	"reflect"
	"slices"
	"sort"
)

// The standard library sees slices held in typed arrays as the slices they
// are: reflect reads, writes, makes and grows them, encoding/binary and
// encoding/json round trip them, and sort, slices and fmt work on them.

type mesh struct {
	Pos   []float32
	Index []uint32
}

func main() {
	// reflect reads and writes elements and grows typed slices.
	f := []float32{1.5, 2.5, 3.5}
	v := reflect.ValueOf(f)
	println("reflect len:", v.Len(), v.Index(1).Float(), v.Type().String())
	v.Index(0).SetFloat(0.1)
	println("reflect set:", f[0] == float32(0.1))
	sv := v.Slice(1, 3)
	sv.Index(0).SetFloat(9)
	println("reflect slice:", f[1], sv.Len())
	made := reflect.MakeSlice(reflect.TypeOf([]int32(nil)), 2, 4)
	made.Index(1).SetInt(1 << 31)
	made = reflect.Append(made, reflect.ValueOf(int32(-7)))
	made = reflect.AppendSlice(made, reflect.ValueOf([]int32{8, 9}))
	ints := made.Interface().([]int32)
	println("reflect make:", len(ints), ints[1], ints[2], ints[4])
	reflect.Copy(reflect.ValueOf(ints), reflect.ValueOf([]int32{5}))
	println("reflect copy:", ints[0])
	println("deep equal:", reflect.DeepEqual(f, []float32{0.1, 9, 3.5}), reflect.DeepEqual([]uint16{1, 2}, []uint16{1, 3}))
	swap := reflect.Swapper(ints)
	swap(0, 4)
	println("swapper:", ints[0], ints[4])

	// encoding/binary round trips typed slices in both byte orders.
	var buf bytes.Buffer
	if err := binary.Write(&buf, binary.LittleEndian, []float32{1, -2.5, float32(math.Inf(1))}); err != nil {
		println("write error:", err.Error())
	}
	if err := binary.Write(&buf, binary.BigEndian, []uint16{0x1234, 0xffff}); err != nil {
		println("write error:", err.Error())
	}
	println("binary bytes:", buf.Len(), fmt.Sprintf("% x", buf.Bytes()[4:8]), fmt.Sprintf("% x", buf.Bytes()[12:]))
	back := make([]float32, 3)
	backU := make([]uint16, 2)
	if err := binary.Read(&buf, binary.LittleEndian, back); err != nil {
		println("read error:", err.Error())
	}
	if err := binary.Read(&buf, binary.BigEndian, backU); err != nil {
		println("read error:", err.Error())
	}
	println("binary read:", back[0], back[1], math.IsInf(float64(back[2]), 1), backU[0], backU[1])
	window := make([]int32, 4)
	enc, _ := binary.Append(nil, binary.LittleEndian, []int32{-1, 2})
	binary.Read(bytes.NewReader(enc), binary.LittleEndian, window[1:3])
	println("binary window:", window[0], window[1], window[2], window[3], len(enc))

	// sort and slices sort typed slices in place, also through windows.
	fs := []float64{3, math.NaN(), -1, 2}
	sort.Float64s(fs)
	println("sort float64s:", math.IsNaN(fs[0]), fs[1], fs[2], fs[3])
	us := []uint32{5, 1, 4, 2, 3}
	slices.Sort(us[1:4])
	println("slices sort window:", us[0], us[1], us[2], us[3], us[4])
	is := []int16{3, -1, 2}
	sort.Slice(is, func(i, j int) bool { return is[i] < is[j] })
	println("sort slice:", is[0], is[1], is[2])
	cl := slices.Clone(us)
	cl[0] = 50
	println("clone:", us[0], cl[0], len(cl), slices.Index(cl, 4), slices.Contains(cl, 3), slices.Max(cl))
	cl = slices.Insert(cl, 1, 7, 8)
	cl = slices.Delete(cl, 0, 1)
	println("insert delete:", len(cl), cl[0], cl[1], cl[2])
	slices.Reverse(cl)
	println("reverse:", cl[0], slices.Equal(cl, []uint32{3, 4, 2, 8, 7}))

	// fmt formats typed slices element by element.
	println("fmt:", fmt.Sprint(f, []int8{-1, 2}, []uint32{7}, []float64{0.5, 2}))
	println("fmt verbs:", fmt.Sprintf("%v %.2f %d %x", []float32{0.1, 1.25}, []float64{1, 2.5}, []int16{-3, 4}, []uint16{255, 16}))

	// encoding/json marshals and unmarshals typed slices.
	m := mesh{Pos: []float32{0.5, 1, -2.5}, Index: []uint32{0, 1, 4294967295}}
	data, err := json.Marshal(m)
	println("json:", string(data), err == nil)
	var m2 mesh
	err = json.Unmarshal(data, &m2)
	println("json back:", err == nil, len(m2.Pos), m2.Pos[0], m2.Index[2])
	var fs32 []float32
	err = json.Unmarshal([]byte("[0.1, 3]"), &fs32)
	println("json float32:", err == nil, fs32[0] == float32(0.1), fs32[1])
	m2.Pos = append(m2.Pos, 4)
	println("json append:", len(m2.Pos), m2.Pos[3], reflect.DeepEqual(m.Index, m2.Index))

	// A slice grown by appends has spare capacity, which leaves it a window
	// on its backing array, and is used as any other.
	var grown []float32
	for i := range 5 {
		grown = append(grown, float32(i)+0.5)
	}
	gdata, _ := json.Marshal(grown)
	var gbuf bytes.Buffer
	binary.Write(&gbuf, binary.LittleEndian, grown)
	println("grown:", len(grown), cap(grown) > len(grown), fmt.Sprint(grown), string(gdata), gbuf.Len())
	println("grown reflect:", reflect.DeepEqual(grown, []float32{0.5, 1.5, 2.5, 3.5, 4.5}), reflect.ValueOf(grown).Index(4).Float())
	sort.Slice(grown, func(i, j int) bool { return grown[i] > grown[j] })
	gc := slices.Clone(grown)
	println("grown sort:", grown[0], grown[4], gc[0], len(gc))
	var anyGrown any = grown[1:]
	_, isF := anyGrown.([]float32)
	_, isU := anyGrown.([]uint32)
	println("grown assert:", isF, isU)
}
