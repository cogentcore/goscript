package main

// Action is the type of a callback stored in a struct field, like the actions
// of parser rules. Every function of its shape in the program is sync, so a
// call through the field does not make its caller async.
type Action func(r *Rule, n int) int

type Rule struct {
	name string
	act  Action
}

func double(r *Rule, n int) int {
	return n * 2
}

func applyRules(rules []*Rule, n int) int {
	for _, r := range rules {
		n = r.act(r, n)
	}
	return n
}

// counter.add is used as a method value of a sync shape.
type counter struct {
	total int
}

func (c *counter) add(k int) {
	c.total += k
}

func each(xs []int, f func(int)) {
	for _, x := range xs {
		f(x)
	}
}

// addTo calls a method expression of a sync method.
func addTo(c *counter, f func(*counter, int)) {
	f(c, 4)
}

// receive is async, and its value is taken with the shape func(chan int)
// int, so a call through a value of that shape makes its caller async.
func receive(ch chan int) int {
	return <-ch
}

func plain(ch chan int) int {
	return cap(ch)
}

func callWith(f func(chan int) int, ch chan int) int {
	return f(ch)
}

// The literal is async because it calls a method of an interface with an
// async implementation, so calls of its shape are async, and fnSource.Next,
// which calls a value of that shape, is async too: interfaces and function
// values reach a fixed point together.
type Source interface {
	Next() int
}

type chanSource struct {
	ch chan int
}

func (s *chanSource) Next() int {
	s.ch <- 1
	return <-s.ch + 1
}

type fnSource struct {
	f func() int
}

func (s *fnSource) Next() int {
	return s.f()
}

func sum(src Source, n int) int {
	total := 0
	for range n {
		total += src.Next()
	}
	return total
}

// Labels and their callbacks are all sync, so formatting stays sync.
type labeler func(int) string

func label(k int) string {
	return "item"
}

func labelAll(n int, l labeler) int {
	count := 0
	for i := range n {
		count += len(l(i))
	}
	return count
}

func main() {
	rules := []*Rule{
		{name: "double", act: double},
		{name: "inc", act: func(r *Rule, n int) int { return n + len(r.name) }},
	}
	println("rules:", applyRules(rules, 1))

	c := &counter{}
	each([]int{1, 2, 3}, c.add)
	addTo(c, (*counter).add)
	println("counter:", c.total)

	ch := make(chan int, 1)
	ch <- 7
	println("receive:", callWith(receive, ch))
	println("plain:", callWith(plain, ch))

	inner := &chanSource{ch: make(chan int, 1)}
	var src Source = inner
	outer := &fnSource{f: func() int { return src.Next() * 10 }}
	println("sum:", sum(outer, 2), sum(inner, 1))

	println("labels:", labelAll(3, label), labelAll(2, func(int) string { return "xy" }))
}
