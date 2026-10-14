package main

type counter struct {
	n int
}

func (c *counter) add(i int) int {
	if c == nil {
		return -1
	}
	c.n += i
	return c.n
}

func (c *counter) get() int { return c.n }

type adder interface{ add(i int) int }

func next(c *counter) *counter {
	if c.n > 2 {
		return nil
	}
	return c
}

func main() {
	// A pointer method is called directly on a plain struct pointer.
	c := &counter{}
	for i := range 4 {
		c.add(i)
	}
	println(c.get())

	// A nil receiver still reaches the method.
	var nilc *counter
	println(nilc.add(5))

	// The arguments are evaluated once, whichever way the method is called.
	calls := 0
	arg := func() int { calls++; return 2 }
	println(c.add(arg()), nilc.add(arg()), calls)

	// A pointer to a struct variable that a closure reassigns.
	var v counter
	pv := &v
	reset := func() { v = counter{n: 100} }
	pv.add(1)
	reset()
	println(pv.add(1), v.n)

	// Interface calls on a struct pointer, and on a nil interface, which panics.
	var a adder = c
	println(a.add(10))
	a = next(c)
	defer func() {
		println("recovered:", recover() != nil)
	}()
	var none adder
	println(none.add(1))
}
