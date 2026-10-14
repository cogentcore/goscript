package main

type Pos struct {
	Line, Char int
}

type Region struct {
	Start, End Pos
}

type State struct {
	reg Region
	n   int
}

// width only reads its parameter.
func width(r Region) int {
	return r.End.Char - r.Start.Char
}

// mutate changes its own copy.
func mutate(r Region) int {
	r.Start.Char = 100
	return r.Start.Char
}

// readAfterStore changes the caller's value through a pointer while it
// reads its parameter.
func readAfterStore(r Region, s *State) int {
	s.reg.Start.Char = 50
	return r.Start.Char
}

// readAfterCall changes the caller's value in a call while it reads its
// parameter.
func readAfterCall(r Region, s *State) int {
	s.set(60)
	return r.Start.Char
}

func (s *State) set(c int) { s.reg.Start.Char = c }

// later returns a function that reads its parameter after the call.
func later(r Region) func() int {
	return func() int { return r.Start.Char }
}

// address takes the address of its parameter.
func address(r Region) *Region {
	return &r
}

// readAfterPointer changes its caller's value through a pointer while it
// reads its parameter.
func readAfterPointer(r Region, p *Region) int {
	p.Start.Char = 80
	return r.Start.Char
}

var global State

// readGlobal reads its parameter after storing to a package variable.
func readGlobal(r Region) int {
	global.reg.Start.Char = 70
	return r.Start.Char
}

func (r Region) Width() int { return r.End.Char - r.Start.Char }

func (r Region) Later() func() int {
	return func() int { return r.End.Char }
}

func main() {
	s := &State{reg: Region{Start: Pos{1, 2}, End: Pos{1, 10}}}
	println(width(s.reg), s.reg.Width())
	println(mutate(s.reg), s.reg.Start.Char)
	println(readAfterStore(s.reg, s), s.reg.Start.Char)
	println(readAfterCall(s.reg, s), s.reg.Start.Char)
	f := later(s.reg)
	s.reg.Start.Char = 3
	println(f(), s.reg.Start.Char)
	p := address(s.reg)
	p.Start.Char = 99
	println(s.reg.Start.Char)
	global.reg.Start.Char = 4
	println(readGlobal(global.reg), global.reg.Start.Char)
	loc := s.reg
	println(readAfterCall(loc, s), loc.Start.Char, s.reg.Start.Char)
	addr := s.reg
	ap := &addr
	println(readAfterPointer(addr, ap), addr.Start.Char)
	g := s.reg.Later()
	s.reg.End.Char = 20
	println(g(), s.reg.Width())
}
