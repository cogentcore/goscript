package main

type Pos struct {
	Ln, Ch int
}

type Key struct {
	Name string
	At   Pos
	On   bool
	F    float64
}

type Rule struct{ Name string }

type ScopeRule struct {
	Scope Pos
	Rule  *Rule
}

func main() {
	m := map[Key]int{}
	for i := 0; i < 2000; i++ {
		m[Key{Name: "k", At: Pos{i, i % 7}, On: i%2 == 0, F: float64(i) / 2}] = i
	}
	println(len(m), m[Key{"k", Pos{10, 3}, true, 5}], m[Key{"k", Pos{11, 4}, false, 5.5}])
	_, ok := m[Key{"k", Pos{10, 3}, false, 5}]
	println(ok)
	delete(m, Key{"k", Pos{10, 3}, true, 5})
	_, ok = m[Key{"k", Pos{10, 3}, true, 5}]
	println(len(m), ok)
	z := map[Pos]string{{0, 0}: "zero"}
	negZero := 0.0
	negZero = -negZero
	fz := map[float64]int{0: 1}
	println(z[Pos{}], fz[negZero])

	r1, r2 := &Rule{"a"}, &Rule{"a"}
	set := map[ScopeRule]bool{}
	for i := 0; i < 1000; i++ {
		set[ScopeRule{Pos{i, 0}, r1}] = true
	}
	r1.Name = "changed"
	println(len(set), set[ScopeRule{Pos{5, 0}, r1}], set[ScopeRule{Pos{5, 0}, r2}], set[ScopeRule{Pos{5, 0}, nil}])
}
