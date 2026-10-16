package main

type pos struct {
	Line, Char int
}

func main() {
	// The spare capacity of a grown slice of structs holds zero values,
	// each its own, when a slice extends into it.
	var ps []pos
	for i := range 5 {
		ps = append(ps, pos{Line: i + 1, Char: i})
	}
	all := ps[:cap(ps)]
	println(len(ps), cap(ps), all[4].Line, all[5].Line, all[7].Char)
	all[5].Line = 9
	println(all[5].Line, all[6].Line)

	// Appending after a reslice writes the slot the reslice zeroed.
	more := append(ps, pos{Line: 42})
	println(more[5].Line, all[5].Line)

	// Grown slices of other element types have their zero values too.
	var ns []int
	var ss []string
	var ptrs []*pos
	for i := range 3 {
		ns = append(ns, i+1)
		ss = append(ss, "x")
		ptrs = append(ptrs, &pos{Line: i})
	}
	nall, sall, pall := ns[:cap(ns)], ss[:cap(ss)], ptrs[:cap(ptrs)]
	println(nall[3], len(sall[3]), pall[3] == nil, ptrs[2].Line)

	// A grown copy holds copies of the struct elements.
	small := make([]pos, 1, 1)
	small[0].Line = 7
	grown := append(small, pos{Line: 8})
	grown[0].Line = 70
	println(small[0].Line, grown[0].Line, grown[1].Line)

	// Appending a slice grows the same way.
	ext := append([]pos{{Line: 1}}, []pos{{Line: 2}, {Line: 3}}...)
	full := ext[:cap(ext)]
	println(len(ext), cap(ext) >= 3, full[len(full)-1].Line)

	// Several values append in place into spare capacity, each a copy.
	p := pos{Line: 5}
	pair := append(make([]pos, 0, 4), p, p)
	pair[0].Line = 50
	p.Line = 500
	shared := pair[:3]
	pair = append(pair, pos{Line: 6}, pos{Line: 7})
	println(len(pair), pair[0].Line, pair[1].Line, pair[2].Line, shared[2].Line, pair[3].Line)

	// Typed and zero-hinted elements append several values in place and
	// when they grow.
	fs := make([]float32, 0, 4)
	fview := fs[:4]
	fs = append(fs, 0.1, 0.5, 2)
	println(len(fs), cap(fs), fview[0] == fs[0], fview[2])
	fs = append(fs, 3, 4, 5)
	fview[1] = 9
	println(len(fs), fs[1], fs[5], fs[0] == float32(0.1))
	var cs []complex128
	cs = append(cs, complex(1, 2), 3)
	var nps []*pos
	nps = append(nps, nil, &pos{Line: 8})
	println(len(cs), real(cs[0]), imag(cs[1]), len(nps), nps[0] == nil, nps[1].Line)
}
