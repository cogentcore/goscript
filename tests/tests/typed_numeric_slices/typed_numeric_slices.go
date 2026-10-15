package main

// Slices of fixed-size numeric elements are held in JavaScript typed arrays.
// Their elements must wrap and round as Go stores them, and they must share,
// grow, copy and convert as any other slice.

type celsius float32

func sum(xs ...float32) float32 {
	var t float32
	for _, x := range xs {
		t += x
	}
	return t
}

func makeOf[T any](n int) []T {
	return make([]T, n)
}

func appendOf[T any](s []T, v ...T) []T {
	return append(s, v...)
}

func kind(v any) string {
	switch v.(type) {
	case []float32:
		return "[]float32"
	case []float64:
		return "[]float64"
	case []int32:
		return "[]int32"
	case []uint32:
		return "[]uint32"
	case []int16:
		return "[]int16"
	case []uint16:
		return "[]uint16"
	case []int8:
		return "[]int8"
	case []byte:
		return "[]byte"
	case []celsius:
		return "[]celsius"
	}
	return "other"
}

func main() {
	// Integer elements wrap around, as Go stores them.
	i32 := []int32{2147483647}
	i32[0]++
	println("int32 wrap:", i32[0])
	u32 := make([]uint32, 2)
	u32[0]--
	u32[1] = 1 << 31
	u32[1] *= 2
	println("uint32 wrap:", u32[0], u32[1])
	i16 := []int16{32767, -32768}
	i16[0]++
	i16[1]--
	u16 := []uint16{65535}
	u16[0] += 2
	i8 := []int8{127}
	i8[0]++
	println("small wrap:", i16[0], i16[1], u16[0], i8[0])

	// float32 elements round to float32, float64 elements do not.
	f32 := make([]float32, 3)
	f32[0] = 0.1
	f32[1] = f32[0] * 3
	x := 16777216.0
	f32[2] = float32(x + 1)
	println("float32:", f32[0] == float32(0.1), float64(f32[0]) == 0.1, f32[1] == 0.3, float64(f32[1]) == 0.3, f32[2] == 16777216)
	f64 := []float64{0.1}
	f64[0] *= 3
	println("float64:", f64[0] == 0.3, f64[0])
	println("variadic:", sum(1.5, 2.25, 0.125), sum(f32[:2]...) == f32[0]+f32[1])

	// Nil and empty slices differ, and nil appends as empty.
	var nilF []float32
	empty := []float32{}
	println("nil:", nilF == nil, empty == nil, len(nilF), len(empty), cap(empty))
	nilF = append(nilF, 1, 2)
	println("append nil:", len(nilF), nilF[0], nilF[1])
	var nilU []uint16
	nilU = append(nilU, []uint16{}...)
	println("append none to nil:", nilU == nil)

	// Appending within capacity shares the backing array, and growing it does
	// not.
	base := make([]float32, 2, 4)
	a := append(base, 3)
	b := append(base, 4)
	println("shared:", a[2], b[2], len(a), cap(a))
	c := append(a, 5, 6)
	c[0] = 9
	println("grown:", len(c), cap(c) >= 5, a[0], c[0], c[4])
	var grow []int32
	for i := 0; i < 1000; i++ {
		grow = append(grow, int32(i)*3000000)
	}
	println("many appends:", len(grow), grow[999], grow[500])

	// Slicing windows share elements, reslice into spare capacity, and keep
	// the capacity of their window.
	w := []uint32{1, 2, 3, 4, 5, 6}
	mid := w[2:4]
	mid[0] = 30
	println("window:", w[2], len(mid), cap(mid), mid[1])
	ext := mid[:4]
	ext[3] = 60
	println("extended:", len(ext), w[5])
	clipped := w[1:3:3]
	clipped = append(clipped, 99)
	println("clipped:", w[3], clipped[2], cap(clipped) >= 3)
	for i, v := range w[4:] {
		println("range:", i, v)
	}

	// copy moves elements between typed slices, overlapping ones too, and
	// between typed and generic slices.
	src := []float64{1, 2, 3, 4, 5}
	n := copy(src[1:], src)
	println("overlap copy:", n, src[0], src[1], src[4])
	gen := makeOf[float32](3)
	gen[0] = 0.1
	n = copy(f32, gen)
	println("copy from generic:", n, f32[0] == float32(0.1), f32[2])
	n = copy(gen, []float32{7, 8})
	println("copy to generic:", n, gen[0], gen[1])
	gen = append(gen, 1.5)
	println("append generic:", len(gen), gen[3])
	plain := appendOf[float32](nil, 0.1, 2)
	n = copy(f32, plain)
	println("copy from plain:", n, f32[0] == float32(0.1), f32[1])
	n = copy(plain, []float32{7})
	plain = append(plain, 3)
	plain[1] += 0.1
	println("copy to plain:", n, plain[0], len(plain), plain[1] == float32(2.1))

	// Arrays stay arrays, and a slice of an array shares its elements.
	arr := [4]float32{1, 2, 3, 4}
	as := arr[1:3]
	as[0] = 20
	println("array slice:", arr[1], len(as), cap(as))
	as = append(as, 30)
	println("array append:", arr[3])
	arr2 := [3]uint32(w[:3])
	arr2[0] = 100
	println("slice to array:", arr2[0], w[0], len(arr2))
	ap := (*[2]uint32)(w[1:])
	ap[0] = 200
	println("array pointer:", w[1])

	// clear zeroes the window only.
	z := []int16{1, 2, 3, 4}
	clear(z[1:3])
	println("clear:", z[0], z[1], z[2], z[3])

	// Pointers to elements read and write the element.
	p := &f64[0]
	*p = 2.5
	q := &w[2]
	*q += 1
	println("pointer:", f64[0], w[2], &w[2] == &mid[0])

	// Named element types and type switches tell typed slices apart.
	temps := []celsius{36.6, 37.2}
	temps = append(temps, 38)
	println("named:", len(temps), temps[2], kind(temps))
	println("kinds:", kind(f32), kind(f64), kind(i32), kind(u32), kind(i16), kind(u16), kind(i8), kind([]byte{1}))
	var anyRunes any = []rune("hé")
	_, isRunes := anyRunes.([]int32)
	println("runes:", isRunes, len(anyRunes.([]rune)), string(anyRunes.([]rune)))
}
