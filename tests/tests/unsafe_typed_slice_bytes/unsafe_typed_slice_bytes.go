package main

import "unsafe"

// unsafe.Slice views the memory of a slice of fixed-size numbers as bytes, as
// GPU and file APIs do to pass vertex data without copying. In GoScript such a
// slice is held in a typed array, whose memory the view shares.

func floatBytes(s []float32) []byte {
	if len(s) == 0 {
		return nil
	}
	return unsafe.Slice((*byte)(unsafe.Pointer(&s[0])), len(s)*int(unsafe.Sizeof(s[0])))
}

func uintBytes(s []uint32) []byte {
	return unsafe.Slice((*byte)(unsafe.Pointer(unsafe.SliceData(s))), len(s)*4)
}

func main() {
	// The bytes are the little-endian encoding of the elements.
	f := []float32{1, -2, 0.5}
	b := floatBytes(f)
	println("float bytes:", len(b), b[2], b[3], b[7], b[11])

	// Writes through either side are seen by the other.
	b[3] = 0x40
	f[2] = 2
	println("shared:", f[0], b[11])

	// A window views only its own elements.
	u := []uint32{0x01020304, 0x05060708, 0x090a0b0c}
	w := uintBytes(u[1:])
	println("window:", len(w), w[0], w[4])
	w[0] = 0xff
	println("window write:", u[1] == 0x050607ff)

	// The element pointer is that of the slice.
	e := unsafe.Slice(&u[1], 2)
	e[1] = 7
	println("same kind:", u[2], len(e), cap(e))

	// The bytes of an int16 slice, and back from bytes to elements.
	i := []int16{-1, 256}
	ib := unsafe.Slice((*byte)(unsafe.Pointer(&i[0])), 4)
	println("int16 bytes:", ib[0], ib[1], ib[2], ib[3])
	println("nil:", floatBytes(nil) == nil)
}
