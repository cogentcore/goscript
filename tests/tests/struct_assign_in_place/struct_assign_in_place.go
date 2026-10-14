package main

type Inner struct{ X, Y int }

type Outer struct {
	In  Inner
	Arr [2]int
	Ptr *Inner
	N   int
}

var global Outer

type Pair[T any] struct {
	Key string
	Val T
}

type Holder[T any] struct {
	P Pair[T]
}

func assignGeneric[T any](dst *Pair[T], src Pair[T]) {
	*dst = src
}

func make1() Outer { return Outer{In: Inner{1, 2}, Arr: [2]int{3, 4}, N: 5} }

// Kind names the kinds of an Event.
type Kind int

const (
	KindStart Kind = iota + 1
	KindValue
	KindEnd
)

// Event is a struct that a loop assigns again after testing its kind.
type Event struct{ Kind Kind }

func nextEvent(k Kind) (Event, error) { return Event{Kind: k}, nil }

func main() {
	a := make1()
	b := Outer{}
	b = a
	a.In.X = 10
	a.Arr[0] = 30
	println(b.In.X, b.Arr[0], a.In.X, a.Arr[0])

	p := &a
	a = *p
	println(a.In.X, a.N)

	s := []Outer{make1(), make1()}
	s[0] = s[1]
	s[1].In.Y = 20
	println(s[0].In.Y, s[1].In.Y)

	sh := &Inner{7, 8}
	a.Ptr = sh
	b = a
	b.Ptr.X = 70
	println(a.Ptr.X, sh.X)

	global = b
	b.N = 50
	println(global.N, b.N)

	var in Inner
	in = a.In
	a.In.Y = 99
	println(in.Y, a.In.Y)
	g1 := Pair[Inner]{"a", Inner{1, 2}}
	var g2 Pair[Inner]
	g2 = g1
	g1.Val.X = 11
	println(g2.Val.X, g1.Val.X)
	var g3 Pair[Inner]
	assignGeneric(&g3, g1)
	g1.Val.Y = 22
	println(g3.Val.Y, g1.Val.Y)
	h1 := Holder[Inner]{P: g1}
	var h2 Holder[Inner]
	h2 = h1
	h1.P.Val.X = 33
	println(h2.P.Val.X, h1.P.Val.X)
	m := map[string]Outer{"k": a}
	c := Outer{}
	c = m["k"]
	c.N = 77
	println(m["k"].N, c.N)

	// The kind tested before the loop does not decide the kind inside it.
	ev, err := nextEvent(KindStart)
	if ev.Kind != KindStart {
		return
	}
	for _, k := range []Kind{KindValue, KindEnd} {
		ev, err = nextEvent(k)
		switch ev.Kind {
		case KindValue:
			println("value", err == nil)
		case KindEnd:
			println("end")
		}
	}
}
