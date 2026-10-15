package main

import "math"

type pos struct {
	Line, Char int
}

type stamp struct {
	Sec  int64
	NSec uint32
}

type region struct {
	Start, End pos
	Time       stamp
}

type node struct {
	Name string
}

type mixed struct {
	Name  string
	F     float64
	OK    bool
	Ptr   *node
	Any   any
	_     int
	Inner pos
}

type withArray struct {
	Vals [2]int
}

func main() {
	// Plain and nested fields.
	a := region{Start: pos{1, 2}, End: pos{3, 4}, Time: stamp{5, 6}}
	b := a
	println("equal:", a == b, a != b, a.Start == b.Start)
	b.End.Char++
	println("end differs:", a == b, a != b, a.End == b.End)
	b = a
	b.Time.Sec = 1 << 40
	println("time differs:", a == b)

	// Pointers compare by identity, interfaces by their dynamic values.
	n1, n2 := &node{"x"}, &node{"x"}
	m1 := mixed{Name: "m", F: 1.5, OK: true, Ptr: n1, Any: pos{1, 1}, Inner: pos{7, 8}}
	m2 := m1
	println("mixed:", m1 == m2)
	m2.Ptr = n2
	println("other pointer:", m1 == m2)
	m2 = m1
	m2.Any = pos{1, 2}
	println("other interface value:", m1 == m2)
	m2.Any = "text"
	println("other interface type:", m1 == m2)
	m2 = m1
	m2.F = math.NaN()
	m3 := m2
	println("NaN:", m2 == m3, m2 != m3)
	m2.F, m3.F = math.Copysign(0, -1), 0
	println("zeros:", m2 == m3)

	// Comparisons of values in slices and maps.
	regions := []region{a, b}
	println("slice:", regions[0] == a, regions[1] == a)
	seen := map[pos]bool{{1, 2}: true}
	println("map:", seen[a.Start], seen[a.End])

	// Arrays in structs.
	w1, w2 := withArray{[2]int{1, 2}}, withArray{[2]int{1, 2}}
	println("array:", w1 == w2)
	w2.Vals[1] = 3
	println("array differs:", w1 == w2)
}
