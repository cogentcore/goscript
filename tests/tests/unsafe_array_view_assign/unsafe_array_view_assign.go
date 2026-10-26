package main

import "unsafe"

type digest struct {
	chain [8]uint32
	block [16]uint32
}

func compress(chain *[8]uint32, block *[16]uint32, out *[16]uint32) {
	*out = [16]uint32{
		chain[0], chain[1], chain[2], chain[3],
		chain[4], chain[5], chain[6], chain[7],
		block[0], block[1], block[2], block[3],
		block[4], block[5], block[6], block[7],
	}
	for i := range out {
		out[i] = out[i]*3 + uint32(i)
	}
}

func main() {
	// Assign an array read through an unsafe view of a larger array.
	var compressed [16]uint32
	for i := range compressed {
		compressed[i] = uint32(i + 1)
	}
	var d digest
	d.chain = *(*[8]uint32)(unsafe.Pointer(&compressed[0]))
	println(d.chain[0], d.chain[7])
	compressed[0] = 99
	println("after source write:", d.chain[0])

	// Take the message block as a view of a larger array.
	var words [32]uint32
	for i := range words {
		words[i] = uint32(i * 7)
	}
	block := (*[16]uint32)(unsafe.Pointer(&words[16]))
	println("word0:", block[0], "word15:", block[15])

	// Chain two compressions as a multi-block hash does.
	var out [16]uint32
	for round := 0; round < 2; round++ {
		compress(&d.chain, block, &out)
		d.chain = *(*[8]uint32)(unsafe.Pointer(&out[0]))
		println("round", round, d.chain[0], d.chain[3], d.chain[7])
	}

	// Write a view of the block array from another array.
	*(*[8]uint32)(unsafe.Pointer(&d.block[8])) = *(*[8]uint32)(unsafe.Pointer(&out[0]))
	println("block8:", d.block[8], "block15:", d.block[15], "block0:", d.block[0])
}
