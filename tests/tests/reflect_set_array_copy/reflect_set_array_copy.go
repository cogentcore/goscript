package main

import "reflect"

type Pose struct {
	M     [4]float32
	A     [2]int
	Inner struct{ B [2]int }
}

func main() {
	a := Pose{M: [4]float32{1, 2, 3, 4}, A: [2]int{5, 6}}
	a.Inner.B = [2]int{7, 8}
	var b, c, d Pose
	av := reflect.ValueOf(&a).Elem()

	// Set an array field from another array field.
	bv := reflect.ValueOf(&b).Elem()
	for i := 0; i < av.NumField(); i++ {
		bv.Field(i).Set(av.Field(i))
	}

	// Set an array field from a converted array field.
	cv := reflect.ValueOf(&c).Elem()
	for i := 0; i < av.NumField(); i++ {
		cv.Field(i).Set(av.Field(i).Convert(cv.Field(i).Type()))
	}

	// Set a whole struct.
	reflect.ValueOf(&d).Elem().Set(av)

	a.M[0] = 100
	a.A[0] = 200
	a.Inner.B[0] = 300
	println("b:", b.M[0], b.A[0], b.Inner.B[0])
	println("c:", c.M[0], c.A[0], c.Inner.B[0])
	println("d:", d.M[0], d.A[0], d.Inner.B[0])

	b.M[1] = 9
	println("c after b:", c.M[1], d.M[1], a.M[1])

	// Index of an array element set from an array.
	arrs := [2][2]int{}
	reflect.ValueOf(&arrs).Elem().Index(0).Set(av.Field(1))
	a.A[1] = 400
	println("arrs:", arrs[0][1])

	// Interface returns a copy of an array.
	x := av.Field(1).Interface().([2]int)
	a.A[1] = 500
	println("interface:", x[1])
}
