package main

import "reflect"

type P struct {
	X int
	Y string
}

func main() {
	v, w := 1, 1
	pv, pw := &v, &w
	println(reflect.ValueOf(pv).Equal(reflect.ValueOf(pv)), reflect.ValueOf(pv).Equal(reflect.ValueOf(pw)))
	println(reflect.ValueOf(v).Equal(reflect.ValueOf(w)), reflect.ValueOf(int64(1)).Equal(reflect.ValueOf(1)))
	println(reflect.ValueOf(&pv).Elem().Equal(reflect.ValueOf(pv)))
	var n1, n2 *int
	println(reflect.ValueOf(n1).Equal(reflect.ValueOf(n2)), reflect.ValueOf(n1).Equal(reflect.ValueOf(pv)))
	println(reflect.ValueOf(P{1, "a"}).Equal(reflect.ValueOf(P{1, "a"})), reflect.ValueOf(P{1, "a"}).Equal(reflect.ValueOf(P{1, "b"})))
	println(reflect.ValueOf(nil).Equal(reflect.ValueOf(nil)), reflect.ValueOf(nil).Equal(reflect.ValueOf(1)))

	type Z struct {
		S []int
		M map[string]int
		P *int
		F float64
		B bool
		T string
	}
	z := Z{}
	zv := reflect.ValueOf(z)
	for i := 0; i < zv.NumField(); i++ {
		println(zv.Type().Field(i).Name, zv.Field(i).IsZero())
	}
	println(zv.IsZero(), reflect.ValueOf(Z{T: "x"}).IsZero())
	println(reflect.ValueOf([]int{}).IsZero(), reflect.ValueOf(map[string]int{}).IsZero())
}
