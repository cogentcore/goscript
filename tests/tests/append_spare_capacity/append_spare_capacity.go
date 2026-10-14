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
}
