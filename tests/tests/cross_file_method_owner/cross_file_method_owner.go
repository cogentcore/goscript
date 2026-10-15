package main

func (b box) total() int {
	return b.base() + 1
}

// drain sums a stack in chunks. Its locals resolve against this file, not the
// file that declares pile.
func (p *pile) drain(items []int) int {
	sum := 0
	p.each(func() {
		stack := []int{}
		p.each(func() {
			stack = append(stack, items...)
		})
		for len(stack) != 0 {
			chunk := stack[max(0, len(stack)-p.step):]
			for _, item := range chunk {
				sum += item
			}
			stack = stack[:len(stack)-len(chunk)]
		}
	})
	return sum
}

func (p *pile) each(fn func()) {
	fn()
}

func main() {
	println(box(3).total())
	println((&pile{step: 2}).drain([]int{1, 2, 3, 4, 5}))
}
