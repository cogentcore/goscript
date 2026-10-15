package main

import "embed"

//go:embed text.txt
var text string

//go:embed text.txt
var textBytes []byte

//go:embed blob.bin
var blob []byte

//go:embed small.txt
var small []byte

//go:embed blob.bin small.txt text.txt
var files embed.FS

// sum adds the bytes of data, weighted by position.
func sum(data []byte) int {
	total := 0
	for i, b := range data {
		total += (i%7 + 1) * int(b)
	}
	return total
}

func main() {
	// Text keeps its bytes in strings and byte slices.
	println("text:", len(text), text[:len(text)-1])
	println("text bytes:", len(textBytes), string(textBytes) == text, sum(textBytes))

	// Binary data keeps every byte value, and is a slice of its own.
	println("blob:", len(blob), blob[0], blob[255], blob[256], sum(blob), string(blob[len(blob)-4:]))
	println("small:", len(small), string(small))
	blob[0] = 42
	again, _ := files.ReadFile("blob.bin")
	println("own:", blob[0], again[0])

	// Files read from an embedded file system match.
	data, err := files.ReadFile("blob.bin")
	println("fs blob:", err == nil, len(data), sum(data))
	data, err = files.ReadFile("text.txt")
	println("fs text:", err == nil, string(data) == text)
	data, err = files.ReadFile("small.txt")
	println("fs small:", err == nil, string(data))
}
