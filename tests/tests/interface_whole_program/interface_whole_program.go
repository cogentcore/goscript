package main

// Shape is exported, and every implementation in the program is sync, so a
// call of Area does not make its caller async.
type Shape interface {
	Area() int
}

type Rect struct {
	w, h int
}

func (r Rect) Area() int {
	return r.w * r.h
}

type Square struct {
	side int
}

func (s *Square) Area() int {
	return s.side * s.side
}

func totalArea(shapes []Shape) int {
	total := 0
	for _, shape := range shapes {
		total += shape.Area()
	}
	return total
}

// Source has one async implementation, so a call of Next makes its caller
// async.
type Source interface {
	Next() int
}

type Counter struct {
	n int
}

func (c *Counter) Next() int {
	c.n++
	return c.n
}

type ChanSource struct {
	ch chan int
}

func (c *ChanSource) Next() int {
	c.ch <- 10
	return <-c.ch
}

func sumNext(src Source, count int) int {
	sum := 0
	for range count {
		sum += src.Next()
	}
	return sum
}

// Getter's only implementation forwards to Valuer, which has an async
// implementation, so Get is async through both interfaces.
type Valuer interface {
	Value() int
}

type Getter interface {
	Get() int
}

type chanValuer struct {
	ch chan int
}

func (c chanValuer) Value() int {
	c.ch <- 5
	return <-c.ch
}

type plusOne struct {
	in Valuer
}

func (p plusOne) Get() int {
	return p.in.Value() + 1
}

func readGetter(g Getter) int {
	return g.Get()
}

// Namer's only implementation forwards to Labeler, whose implementations are
// all sync, so Name stays sync through both interfaces.
type Labeler interface {
	Label() string
}

type Namer interface {
	Name() string
}

type fixedLabel string

func (f fixedLabel) Label() string {
	return string(f)
}

type prefixNamer struct {
	labeler Labeler
}

func (p prefixNamer) Name() string {
	return "name:" + p.labeler.Label()
}

func describe(n Namer) string {
	return n.Name()
}

func main() {
	println("area:", totalArea([]Shape{Rect{w: 2, h: 3}, &Square{side: 4}}))

	println("counter:", sumNext(&Counter{}, 3))
	println("chan:", sumNext(&ChanSource{ch: make(chan int, 1)}, 2))

	println("getter:", readGetter(plusOne{in: chanValuer{ch: make(chan int, 1)}}))

	println("namer:", describe(prefixNamer{labeler: fixedLabel("x")}))
}
