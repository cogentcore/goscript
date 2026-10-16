package main

import "unsafe"

func writeBytes(words []uint64, bytes []byte) {
	for i, b := range bytes {
		*(*uint8)(unsafe.Pointer(uintptr(unsafe.Pointer(&words[0])) + uintptr(i))) = b
	}
}

// word holds data that its methods view as other types, as in programs
// translated from Pascal variant records.
type word struct {
	data [4]byte
}

func (w *word) real() *float32 {
	return (*float32)(unsafe.Add(unsafe.Pointer(&w.data), 0))
}

func (w *word) half() *uint16 {
	return (*uint16)(unsafe.Add(unsafe.Pointer(&w.data), 2))
}

func main() {
	println("unsafe pointer storage compiles")
}
