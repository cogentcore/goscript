package main

// cursor reads successive values, as a message decoder does.
type cursor struct {
	pos int
}

// next returns the next value and advances the cursor.
func (c *cursor) next() int {
	c.pos++
	return c.pos * 10
}

// recv advances the cursor through a channel round trip.
func (c *cursor) recv(ch chan int) int {
	ch <- c.next()
	return <-ch
}

func main() {
	// Each blank target still evaluates its value, in order.
	c := &cursor{}
	a, _, b, _ := c.next(), c.next(), c.next(), c.next()
	println(a, b, c.pos)

	// So does one that awaits.
	ch := make(chan int, 1)
	_, d := c.recv(ch), c.next()
	println(d, c.pos)
}
