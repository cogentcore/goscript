package main

type box int

func (b box) base() int {
	return int(b)
}

// pile declares its methods in another file.
type pile struct {
	step int
}
