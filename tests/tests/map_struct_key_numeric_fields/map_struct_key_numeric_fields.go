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

type Pair struct{ A, B string }

type Other struct{ A, B string }

type Vec struct{ X, Y float32 }

type Cplx struct {
	C complex128
	N int
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

	// Keys whose field values run together are still distinct keys.
	pairs := map[Pair]int{{"x|s", ""}: 1, {"x", "|s"}: 2, {"", "x|s"}: 3}
	println(len(pairs), pairs[Pair{"x|s", ""}], pairs[Pair{"x", "|s"}], pairs[Pair{"", "x|s"}], pairs[Pair{"x", "s"}])

	// NaN is never equal to itself, and -0 equals 0.
	nan := float32(negZero)
	nan = nan / nan
	vecs := map[Vec]int{}
	vecs[Vec{nan, 1}] = 1
	vecs[Vec{nan, 1}] = 2
	vecs[Vec{0, 1}] = 3
	vecs[Vec{float32(negZero), 1}] = 4
	_, nanOK := vecs[Vec{nan, 1}]
	println(len(vecs), nanOK, vecs[Vec{0, 1}])

	// Interface keys of two struct types with the same fields stay apart.
	anys := map[any]int{Pair{"a", "b"}: 1, Other{"a", "b"}: 2}
	anys[Pair{"a", "b"}] = 3
	println(len(anys), anys[Pair{"a", "b"}], anys[Other{"a", "b"}])

	// Complex fields compare by value.
	cs := map[Cplx]int{{complex(1, 2), 3}: 1}
	cs[Cplx{complex(1, 2), 3}] = 2
	println(len(cs), cs[Cplx{complex(1, 2), 3}], cs[Cplx{complex(1, 3), 3}])
}
