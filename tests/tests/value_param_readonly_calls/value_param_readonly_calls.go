package main

type Pos struct{ Line, Char int }

type Region struct{ Start, End Pos }

var g Region

type holder struct{ r Region }

var h = &holder{}

var regions = []Region{{}}

func bump() { g.Start.Line = 9 }

func bumpH() { h.r.Start.Line = 7 }

func bumpElem() { regions[0].Start.Line = 5 }

// F only reads its parameter, but calls a function that changes the
// package variable that the caller passes.
func F(r Region) int {
	bump()
	return r.Start.Line
}

// FH reads its parameter after a call that changes the value that the
// caller passes through a pointer.
func FH(r Region) int {
	bumpH()
	return r.Start.Line
}

// FE reads its parameter after a call that changes the slice element that
// the caller passes.
func FE(r Region) int {
	bumpElem()
	return r.Start.Line
}

// lineAfterBump reads its receiver after a call that changes the package
// variable it was called on.
func (r Region) lineAfterBump() int {
	bump()
	return r.Start.Line
}

// plain only reads its parameter and calls nothing.
func plain(r Region) int {
	return r.Start.Line + r.End.Line
}

func main() {
	g.Start.Line = 1
	println("F(g):", F(g))
	h.r.Start.Line = 2
	println("FH(h.r):", FH(h.r))
	regions[0].Start.Line = 3
	println("FE(regions[0]):", FE(regions[0]))
	g.Start.Line = 4
	println("g.lineAfterBump():", g.lineAfterBump())
	println("plain(g):", plain(g))
}
