package main

import "hash/maphash"

func main() {
	seed := maphash.MakeSeed()
	var a, b maphash.Hash
	a.SetSeed(seed)
	b.SetSeed(seed)
	maphash.WriteComparable(&a, 42)
	maphash.WriteComparable(&b, 42)
	println(a.Sum64() == b.Sum64())
	maphash.WriteComparable(&b, "x")
	println(a.Sum64() == b.Sum64())
}
