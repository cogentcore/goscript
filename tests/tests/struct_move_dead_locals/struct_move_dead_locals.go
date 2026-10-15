package main

type pos struct {
	Line, Char int
}

type token struct {
	Kind int
	At   pos
}

var saved token

func main() {
	// A local appended last is moved: the slice holds its value.
	var toks []token
	for i := range 3 {
		tok := token{Kind: i}
		tok.At.Line = i * 10
		toks = append(toks, tok)
	}
	toks[0].At.Line = 99
	println(toks[0].At.Line, toks[1].At.Line, toks[2].At.Line)

	// A local declared outside the loop is copied at each append.
	var outer []token
	cur := token{Kind: 7}
	for i := range 3 {
		cur.At.Char = i
		outer = append(outer, cur)
	}
	println(outer[0].At.Char, outer[1].At.Char, outer[2].At.Char)

	// A later reference in the same statement keeps the copy.
	v := pos{Line: 1}
	var w pos
	v.Line, w = 5, v
	println(v.Line, w.Line)

	// A local read later is copied; its last read is moved.
	a := pos{Line: 2}
	b := a
	b.Line = 3
	m := map[int]pos{}
	m[1] = a
	println(a.Line, b.Line, m[1].Line)

	// A field of a dead local is moved into a package variable.
	t := token{Kind: 4, At: pos{Line: 8}}
	saved = t
	saved.At.Line++
	println(saved.At.Line)

	// A local captured by a function literal is copied.
	c := pos{Line: 6}
	get := func() int { return c.Line }
	d := c
	d.Line = 0
	println(get(), d.Line)

	// A local whose address is taken is copied.
	e := pos{Line: 11}
	pe := &e
	f := e
	pe.Line = 12
	println(e.Line, f.Line)

	// A range variable is copied.
	var copies []pos
	for _, p := range []pos{{Line: 1}, {Line: 2}} {
		copies = append(copies, p)
	}
	copies[0].Line = 9
	println(copies[0].Line, copies[1].Line)

	// A function literal parameter is copied.
	src := []pos{{Line: 1}}
	var kept []pos
	each(src, func(p pos) { kept = append(kept, p) })
	kept[0].Line = 5
	println(src[0].Line, kept[0].Line)
}

func each(s []pos, f func(pos)) {
	for _, p := range s {
		f(p)
	}
}
