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

func main() {
	typ := reflect.TypeOf(pt)
	fld, _ := typ.FieldByName("Mbr2")
	fieldValue(&pt, fld).Elem().Set(reflect.ValueOf(10))
	println(pt.Mbr2)

	fld, _ = typ.FieldByName("Mbr1")
	fieldValue(&pt, fld).Elem().Set(reflect.ValueOf("new"))
	println(pt.Mbr1, pt.Mbr2)

	sf, _ := typ.FieldByName("S")
	yf, _ := sf.Type.FieldByName("Y")
	ov := reflect.ValueOf(&pt)
	reflect.NewAt(yf.Type, unsafe.Pointer(ov.Pointer()+sf.Offset+yf.Offset)).Elem().SetString("sub")
	println(pt.S.Y)

	local := &T{}
	fieldValue(local, fld).Elem().SetString("loc")
	println(local.Mbr1)

	v := 3
	reflect.NewAt(reflect.TypeFor[int](), unsafe.Pointer(reflect.ValueOf(&v).Pointer())).Elem().SetInt(4)
	println(v)
}
