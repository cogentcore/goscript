package main

// Logger's only implementation in the program is sync, but its methods
// may be implemented later from JavaScript, so //goscript:async makes every
// call of them async.
//
//goscript:async
type Logger interface {
	Log(msg string) string
}

type prefixLogger struct {
	prefix string
}

func (l prefixLogger) Log(msg string) string {
	return l.prefix + msg
}

func logAll(l Logger, msgs []string) string {
	out := ""
	for _, msg := range msgs {
		out += l.Log(msg)
	}
	return out
}

// Sink has an implementation that receives from a channel, so its Put would
// be async, but //goscript:sync promises that the calls through it never
// reach that one.
type Sink interface {
	//goscript:sync
	Put(n int) int
}

type addSink struct {
	total int
}

func (s *addSink) Put(n int) int {
	s.total += n
	return s.total
}

type chanSink struct {
	ch chan int
}

func (s *chanSink) Put(n int) int {
	s.ch <- n
	return <-s.ch
}

func fill(s Sink, n int) int {
	last := 0
	for i := range n {
		last = s.Put(i)
	}
	return last
}

// Transform shares its shape with an async literal, so a call through a
// value of that shape is async, but //goscript:sync keeps the calls through
// Transform sync.
//
//goscript:sync
type Transform func(int) int

func applyAll(fs []Transform, n int) int {
	for _, f := range fs {
		n = f(n)
	}
	return n
}

// Button's OnClick is called from JavaScript in the real program, so
// //goscript:async makes calls through it async, though every handler here
// is sync.
type Button struct {
	//goscript:async
	OnClick func(clicks int) int

	// OnHover keeps the shape's coloring.
	OnHover func(clicks int) int
}

func click(b *Button, n int) int {
	return b.OnClick(n) + b.OnHover(n)
}

// countAll is marked sync: it calls through a value whose class is async,
// which it checks when the call runs.
//
//goscript:sync
func countAll(f func(int) int, n int) int {
	return f(n) + 1
}

// sum is a sync method marked sync.
type summer struct {
	n int
}

//goscript:sync
func (s *summer) sum(fs []func(int) int) int {
	total := 0
	for _, f := range fs {
		total += f(s.n)
	}
	return total
}

func main() {
	println("log:", logAll(prefixLogger{prefix: "> "}, []string{"a", "b"}))

	sink := &addSink{}
	println("fill:", fill(sink, 4))

	ch := make(chan int)
	go func() {
		n := <-ch
		ch <- n * 10
	}()
	println("chan put:", (&chanSink{ch: ch}).Put(3))

	// An async literal of Transform's shape.
	recv := func(n int) int {
		c := make(chan int, 1)
		c <- n
		return <-c
	}
	println("recv:", recv(5))
	double := func(n int) int { return n * 2 }
	println("apply:", applyAll([]Transform{double, Transform(double)}, 3))

	b := &Button{
		OnClick: func(clicks int) int { return clicks + 1 },
		OnHover: func(clicks int) int { return clicks + 2 },
	}
	println("click:", click(b, 1))

	println("count:", countAll(double, 4))
	s := &summer{n: 2}
	println("sum:", s.sum([]func(int) int{double, double}))
}
