package main

import "unsafe"

type Data struct {
	A float32
	B float32
	C float32
	D float32
}

type Mixed struct {
	Flag bool
	N    int32
	V    [3]float32
}

const dataSize = unsafe.Sizeof(Data{})

func main() {
	var m Mixed
	n := 10
	println("data size:", unsafe.Sizeof(Data{}), dataSize)
	println("bytes for 10:", 10*int(unsafe.Sizeof(Data{})))
	println("bytes for n:", n*int(unsafe.Sizeof(Data{})), uintptr(n)*unsafe.Sizeof(m))
	println("offset sum:", int(unsafe.Offsetof(m.V))+n, unsafe.Alignof(m.V)+uintptr(n))
	println("float32 size:", unsafe.Sizeof(float32(0)), unsafe.Alignof(float32(0)))
	println("mixed size:", unsafe.Sizeof(m), unsafe.Alignof(m))
	println("mixed offsets:", unsafe.Offsetof(m.N), unsafe.Offsetof(m.V))
}
