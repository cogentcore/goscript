package main

type pos struct {
	Line, Char int
}

var calls int

func next() int {
	calls++
	return calls % 3
}

func sum(s []int) int {
	t := 0
	for i := 0; i < len(s); i++ {
		t += s[i]
	}
	return t
}

func main() {
	// A slice of structs indexed in a range loop over an integer.
	ps := make([]pos, 4)
	for i := range 10 {
		j := i % len(ps)
		ps[j].Line += i
		ps[j].Char = ps[j].Line * 2
	}
	println(ps[0].Line, ps[1].Char, ps[3].Line)

	// A compound assignment reads and writes the same element.
	counts := []int{0, 0, 0}
	for range 6 {
		k := next()
		counts[k] += 10
	}
	println(counts[0], counts[1], counts[2], calls)

	// A slice window offsets into its backing array, and a nil slice has none.
	base := []int{1, 2, 3, 4, 5, 6}
	sub := base[2:5]
	println(sum(sub), sum(nil), sum(base))

	// Writing elements of a sub-slice writes the shared backing array.
	for i := 0; i < len(sub); i++ {
		sub[i] *= 10
	}
	println(base[1], base[2], base[4], base[5])

	// A slice assigned in the loop is read through the slice each time.
	grow := []int{1}
	for i := 0; i < 4; i++ {
		grow = append(grow, grow[i]*2)
	}
	println(len(grow), grow[4])

	// A slice that a closure assigns is not windowed.
	shrink := []int{5, 6, 7}
	cut := func() { shrink = shrink[1:] }
	n := 0
	for len(shrink) > 0 {
		n += shrink[0]
		cut()
	}
	println(n)

	// Bytes are read and written in place.
	b := []byte("hello")
	for i := range len(b) {
		b[i] -= 32
	}
	println(string(b))

	// A range loop over one slice indexes another.
	keys := []int{2, 0, 1}
	vals := []string{"a", "b", "c"}
	out := ""
	for _, k := range keys {
		out += vals[k]
	}
	println(out)

	// Nested loops and labeled continue.
	grid := [][]int{{1, 2}, {3, 4}, {5, 6}}
	total := 0
outer:
	for i := 0; i < len(grid); i++ {
		row := grid[i]
		for j := 0; j < len(row); j++ {
			if row[j] == 4 {
				continue outer
			}
			total += row[j]
		}
	}
	println(total)

	// A slice declared in the loop body is read through itself.
	acc := 0
	for i := 0; i < len(grid); i++ {
		var r []int = grid[i]
		acc += r[1]
	}
	println(acc)

	// A loop in a function literal reads a slice that its function assigns
	// through the slice.
	shared := []int{1, 2, 3}
	read := func() int {
		t := 0
		for i := 0; i < 3; i++ {
			t += shared[i]
		}
		return t
	}
	first := read()
	shared = []int{10, 20, 30}
	println(first, read())

	// An index out of range panics.
	defer func() {
		r := recover()
		println("recovered:", r != nil)
	}()
	short := []int{1, 2}
	for i := 0; i < 3; i++ {
		println(short[i])
	}
}
