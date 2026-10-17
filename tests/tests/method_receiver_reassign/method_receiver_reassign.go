package main

type item struct {
	n int
}

func (s item) dec() item {
	if s.n > 0 {
		s = item{n: s.n - 1}
	}
	return s
}

// addrDec takes the address of the value receiver after reassigning it.
func (s item) addrDec() int {
	s = item{n: s.n + 10}
	ps := &s
	ps.n--
	return s.n
}

type list struct {
	n    int
	next *list
}

// add reassigns a nil pointer receiver.
func (p *list) add(n int) *list {
	if p == nil {
		p = &list{}
	}
	p.n += n
	return p
}

// last reassigns the receiver in a loop.
func (p *list) last() *list {
	for p.next != nil {
		p = p.next
	}
	return p
}

// lastFunc reassigns the receiver inside a closure.
func (p *list) lastFunc() *list {
	step := func() bool {
		if p.next == nil {
			return false
		}
		p = p.next
		return true
	}
	for step() {
	}
	return p
}

// addr takes the address of the receiver after reassigning it.
func (p *list) addr() **list {
	p = p.next
	pp := &p
	return pp
}

// sum only reads the receiver.
func (p *list) sum() int {
	return p.n + p.next.n
}

func main() {
	original := item{n: 2}
	out := original.dec()
	println("original:", original.n)
	println("out:", out.n)
	println("addrDec:", original.addrDec(), original.n)

	var l *list
	l = l.add(3)
	println("add nil:", l.n)
	println("add again:", l.add(4) == l, l.n)

	l.next = &list{n: 5, next: &list{n: 6}}
	println("last:", l.last().n, l.n)
	println("lastFunc:", l.lastFunc().n, l.n)
	pp := l.addr()
	println("addr:", (*pp).n)
	*pp = l
	println("addr set:", (*pp).n, l.next.n)
	println("sum:", l.sum())
}
