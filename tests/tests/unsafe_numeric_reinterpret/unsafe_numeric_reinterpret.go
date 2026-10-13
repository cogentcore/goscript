package main

import (
	"math"
	"unsafe"
)

func float32bits(f float32) uint32     { return *(*uint32)(unsafe.Pointer(&f)) }
func float32frombits(b uint32) float32 { return *(*float32)(unsafe.Pointer(&b)) }
func float64bits(f float64) uint64     { return *(*uint64)(unsafe.Pointer(&f)) }
func float64frombits(b uint64) float64 { return *(*float64)(unsafe.Pointer(&b)) }

func main() {
	println(float32bits(1.5), float32bits(1.5) == math.Float32bits(1.5))
	println(float32frombits(0x40490fdb) == math.Float32frombits(0x40490fdb))
	println(float64bits(-2.5), float64bits(-2.5) == math.Float64bits(-2.5))
	println(float64frombits(0x400921fb54442d18) == math.Pi)
	var i int32 = -1
	println(*(*uint32)(unsafe.Pointer(&i)))
	var u uint64 = 1 << 63
	println(*(*int64)(unsafe.Pointer(&u)))

	// writing through the reinterpreted pointer updates the variable
	var g float32 = 1
	*(*uint32)(unsafe.Pointer(&g)) = 0x40000000
	println(g == 2)
	type pair struct{ f float64 }
	p := pair{f: 0.5}
	println(*(*uint64)(unsafe.Pointer(&p.f)) == math.Float64bits(0.5))
}
