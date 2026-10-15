package main

type Pos struct{ Line, Char int }

type Region struct {
	Start, End Pos
}

type rule struct {
	off  bool
	name string
}

var calls int

// match returns its scope parameter, which it only reads, from most of its
// return statements.
func (r *rule) match(scope Region, depth int) (bool, Region, int) {
	calls++
	if r.off {
		return false, scope, 0
	}
	if depth > 3 {
		return false, scope, depth
	}
	if scope.Start.Line == scope.End.Line {
		return true, Region{Start: scope.Start, End: Pos{scope.End.Line, scope.End.Char + 1}}, depth
	}
	return true, scope, depth
}

// group returns the result of match as it is.
func (r *rule) group(scope Region, depth int) (bool, Region, int) {
	if depth > 10 {
		return false, scope, 0
	}
	return r.match(scope, depth+1)
}

// keep returns the region that match returns, through a local.
func (r *rule) keep(scope Region) Region {
	ok, nscope, _ := r.match(scope, 0)
	if !ok {
		return scope
	}
	return nscope
}

type matcher interface {
	match(scope Region, depth int) (bool, Region, int)
}

// first returns its parameter.
func first(a Region) Region {
	if a.Start.Line < 0 {
		return Region{}
	}
	return a
}

type Lines []Region

// at returns its parameter, as a method of a named slice type.
func (l Lines) at(reg Region) Region {
	if len(l) == 0 {
		return reg
	}
	return l[0]
}

// reads borrows the results of match while scope stays unchanged.
func reads(r *rule, scope Region) int {
	ok, nscope, depth := r.match(scope, 0)
	sum := nscope.Start.Line + nscope.End.Char + depth
	if ok {
		_, again, _ := r.match(nscope, 1)
		sum += again.End.Line
	}
	_, changed, _ := r.match(scope, 0)
	changed.Start.Line = 99
	sum += changed.Start.Line + scope.Start.Line
	for i := 0; i < 2; i++ {
		_, inLoop, _ := r.match(scope, i)
		sum += inLoop.Start.Char
	}
	return sum
}

// grow returns a local copy of its parameter that it changed.
func grow(scope Region) Region {
	n := scope
	n.End.Line++
	return n
}

// twice returns the same local twice.
func twice(scope Region) (Region, Region) {
	n := scope
	n.Start.Char++
	return n, n
}

// withStart returns a local and its start.
func withStart(scope Region) (Region, Pos) {
	n := scope
	return n, n.Start
}

// captured returns a local that a function literal changes later.
func captured(scope Region) (Region, func()) {
	n := scope
	return n, func() { n.Start.Line = 42 }
}

// deferred returns a local that a deferred call changes after the return.
func deferred(scope Region) (r Region) {
	n := scope
	defer func() { r.End.Char = 43 }()
	return n
}

// changedParam returns a parameter that it changes, which it owns.
func changedParam(scope Region) Region {
	scope.Start.Line += 100
	return scope
}

// pick returns its parameter, and calls nothing.
func pick(a Region, n int) Region {
	if n > 0 {
		return a
	}
	return Region{}
}

// aliasArg changes its argument through a pointer after borrowing a result.
func aliasArg(scope Region) int {
	p := &scope
	got := pick(scope, 1)
	p.Start.Line = 77
	return got.Start.Line
}

// methodArg changes its argument through a pointer method after borrowing.
func methodArg(scope Region) int {
	got := pick(scope, 1)
	scope.bump()
	return got.Start.Line
}

// aliasField changes its argument through a field pointer after borrowing.
func aliasField(scope Region) int {
	x := scope
	p := &x.Start
	got := pick(x, 1)
	p.Line = 78
	return got.Start.Line
}

// outer promotes the methods of rule and Region.
type outer struct {
	*rule
	Region
}

// span returns its parameter, as a method of a value receiver.
func (r Region) span(other Region) Region {
	if other.Start.Line > r.End.Line {
		return r
	}
	return other
}

// promoted borrows results of promoted methods.
func promoted(o outer, scope Region) int {
	_, got, _ := o.match(scope, 0)
	sp := o.span(scope)
	return got.Start.Line + sp.End.Line
}

func (r *Region) bump() { r.Start.Line++ }

func main() {
	r := &rule{name: "r"}
	scope := Region{Start: Pos{1, 2}, End: Pos{3, 4}}

	// a result that is only read shares nothing that changes
	ok, nscope, depth := r.match(scope, 0)
	println("read:", ok, nscope.Start.Line, nscope.End.Char, depth)

	// a result that is changed must not change the argument
	_, changed, _ := r.match(scope, 0)
	changed.Start.Line = 99
	println("changed result, scope:", scope.Start.Line, changed.Start.Line)

	// an argument that changes after the call must not change the result
	arg := scope
	_, held, _ := r.match(arg, 0)
	arg.End.Char = 77
	println("changed argument, result:", held.End.Char, arg.End.Char)

	// an argument changed in a loop around the call
	loopArg := scope
	var last Region
	for i := 0; i < 3; i++ {
		_, got, _ := r.match(loopArg, 0)
		if i == 0 {
			last = got
		}
		loopArg.Start.Char += 10
		println("loop:", got.Start.Char, loopArg.Start.Char)
	}
	println("loop last:", last.Start.Char)

	// discarded results
	r.match(scope, 0)
	_, _, _ = r.match(scope, 0)

	// a returned call passes the request on
	gok, gscope, _ := r.group(scope, 0)
	println("group:", gok, gscope.Start.Line, gscope.End.Line)
	_, gchanged, _ := r.group(scope, 0)
	gchanged.End.Line = 55
	println("group changed, scope:", scope.End.Line, gchanged.End.Line)

	// a returned local copies
	kept := r.keep(scope)
	kept.Start.Char = 66
	println("keep:", scope.Start.Char, kept.Start.Char)

	// interface and method value calls get copies
	var m matcher = r
	_, viaIface, _ := m.match(scope, 0)
	viaIface.Start.Line = 11
	fn := r.match
	_, viaValue, _ := fn(scope, 0)
	viaValue.Start.Line = 12
	println("indirect:", scope.Start.Line, viaIface.Start.Line, viaValue.Start.Line)

	// functions and methods of named non-struct types
	f := first(scope)
	println("first:", f.Start.Line)
	cp := first(scope)
	cp.Start.Line = 13
	println("first changed:", scope.Start.Line, cp.Start.Line)
	var lines Lines
	at := lines.at(scope)
	at.End.Char = 14
	println("at:", scope.End.Char, at.End.Char)

	// the same region read through a result of an off rule
	off := &rule{off: true}
	_, offScope, _ := off.match(scope, 0)
	println("off:", offScope == scope)
	scope.Start.Line = 21
	println("off after change:", offScope.Start.Line, scope.Start.Line)
	base := Region{Start: Pos{1, 2}, End: Pos{3, 4}}
	g := grow(base)
	g.Start.Line = 7
	println("grow:", base.End.Line, g.End.Line, g.Start.Line)
	t1, t2 := twice(base)
	t1.End.Char = 50
	println("twice:", t1.Start.Char, t2.Start.Char, t1.End.Char, t2.End.Char)
	ws, st := withStart(base)
	ws.Start.Line = 60
	println("withStart:", ws.Start.Line, st.Line)
	cr, set := captured(base)
	set()
	println("captured:", cr.Start.Line)
	println("deferred:", deferred(base).End.Char, base.End.Char)
	cp1 := changedParam(base)
	cp2 := changedParam(cp1)
	println("changedParam:", base.Start.Line, cp1.Start.Line, cp2.Start.Line)
	println("aliasArg:", aliasArg(base), "methodArg:", methodArg(base), "aliasField:", aliasField(base))
	println("promoted:", promoted(outer{rule: r, Region: base}, base))
	println("reads:", reads(r, Region{Start: Pos{1, 2}, End: Pos{3, 4}}))
	println("calls:", calls)
}
