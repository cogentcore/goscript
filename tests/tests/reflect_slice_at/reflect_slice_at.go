package main

import (
	"reflect"
	"unsafe"
)

type Sub struct {
	X int
	Y string
}

type T struct {
	Mbr1 string
	Mbr2 int
	S    Sub
}

var pt T

// fieldValue returns a pointer to a field of the struct obj points to, by
// unsafe pointer arithmetic.
func fieldValue(obj any, fld reflect.StructField) reflect.Value {
	ov := reflect.ValueOf(obj)
	f := unsafe.Pointer(ov.Pointer() + fld.Offset)
	return reflect.NewAt(fld.Type, f)
}

// newAtOffsets resolves NewAt of an object address plus a field offset.
func newAtOffsets() {
	typ := reflect.TypeOf(pt)
	fld, _ := typ.FieldByName("Mbr2")
	fieldValue(&pt, fld).Elem().Set(reflect.ValueOf(10))
	println("newat-offset:", pt.Mbr2)

	fld, _ = typ.FieldByName("Mbr1")
	fieldValue(&pt, fld).Elem().Set(reflect.ValueOf("new"))
	println("newat-offset:", pt.Mbr1, pt.Mbr2)

	sf, _ := typ.FieldByName("S")
	yf, _ := sf.Type.FieldByName("Y")
	ov := reflect.ValueOf(&pt)
	reflect.NewAt(yf.Type, unsafe.Pointer(ov.Pointer()+sf.Offset+yf.Offset)).Elem().SetString("sub")
	println("newat-offset:", pt.S.Y)

	local := &T{}
	fieldValue(local, fld).Elem().SetString("loc")
	println("newat-offset:", local.Mbr1)

	v := 3
	reflect.NewAt(reflect.TypeFor[int](), unsafe.Pointer(reflect.ValueOf(&v).Pointer())).Elem().SetInt(4)
	println("newat-offset:", v)
}

func main() {
	local := 41
	reflect.NewAt(reflect.TypeFor[int](), unsafe.Pointer(&local)).Elem().SetInt(42)
	println("newat-local:", local)

	type holder struct {
		Count int
	}
	h := holder{Count: 5}
	reflect.NewAt(reflect.TypeFor[int](), unsafe.Pointer(&h.Count)).Elem().SetInt(6)
	println("newat-field:", h.Count)

	buf := []byte{1, 2, 3, 4}
	bytes := reflect.SliceAt(reflect.TypeFor[byte](), unsafe.Pointer(&buf[1]), 2)
	println("bytes:", bytes.Len(), bytes.Cap(), bytes.Index(0).Uint(), bytes.Index(1).Uint())
	bytes.Index(0).SetUint(9)
	bytes.Index(1).SetUint(8)
	println("buf:", buf[0], buf[1], buf[2], buf[3])

	ints := []int{10, 20, 30, 40}
	intSlice := reflect.SliceAt(reflect.TypeFor[int](), unsafe.Pointer(&ints[1]), 2)
	intSlice.Index(1).SetInt(77)
	println("ints:", ints[0], ints[1], ints[2], ints[3], intSlice.Len(), intSlice.Cap())

	empty := reflect.SliceAt(reflect.TypeFor[int](), unsafe.Pointer((*int)(nil)), 0)
	println("empty:", empty.IsNil(), empty.Len(), empty.Cap())

	newAtOffsets()

	println("reflect_slice_at test finished")
}
