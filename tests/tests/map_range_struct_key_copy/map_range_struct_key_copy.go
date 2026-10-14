package main

type Pos struct {
	Line, Char int
}

type Key struct {
	P    Pos
	Name string
}

func main() {
	m := map[Pos]string{{1, 2}: "a"}
	for k := range m {
		k.Line = 77
	}
	for k, v := range m {
		k.Char = 88
		println(v, k.Line, k.Char)
	}
	println(len(m), m[Pos{1, 2}])
	for k := range m {
		println(k.Line, k.Char)
	}

	n := map[Key]int{{Pos{3, 4}, "x"}: 5}
	var saved []Key
	for k := range n {
		saved = append(saved, k)
		k.P.Line = 9
	}
	println(n[Key{Pos{3, 4}, "x"}], saved[0].P.Line)

	vals := map[string]Pos{"v": {5, 6}}
	for _, v := range vals {
		v.Line = 66
	}
	arrs := map[string][2]int{"a": {1, 2}}
	for _, a := range arrs {
		a[0] = 9
	}
	println(vals["v"].Line, arrs["a"][0])

	var last Pos
	for last = range m {
		last.Line = 55
	}
	println(m[Pos{1, 2}], last.Line)
}
