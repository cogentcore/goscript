package main

type point struct {
	X   int
	S   string
	U8  uint8
	I64 int64
	U32 uint32
	F32 float32
}

var calls int

func idx() int {
	calls++
	return calls % 3
}

func key() string {
	calls++
	return "k"
}

var pt = &point{}

func ptr() *point {
	calls++
	return pt
}

func arr() *[3]int {
	calls++
	return &backing
}

var backing [3]int

type counter interface {
	Next() int
}

type chanCounter struct {
	ch chan int
}

// Next receives from a channel, so it may block and is async.
func (c *chanCounter) Next() int {
	calls++
	return <-c.ch % 3
}

func fill(ch chan int) {
	for i := 1; i <= 3; i++ {
		ch <- i
	}
}

func main() {
	s := []int{10, 20, 30}

	// Slice index from a call.
	calls = 0
	s[idx()] += 5
	println("slice +=", s[0], s[1], s[2], calls)

	calls = 0
	s[idx()]++
	println("slice ++", s[0], s[1], s[2], calls)

	calls = 0
	s[idx()] <<= 1
	println("slice <<=", s[0], s[1], s[2], calls)

	// Array index from a call.
	a := [3]int{1, 2, 3}
	calls = 0
	a[idx()] *= 7
	println("array *=", a[0], a[1], a[2], calls)

	calls = 0
	a[idx()]--
	println("array --", a[0], a[1], a[2], calls)

	// Map index from a call.
	m := map[string]int{"k": 1}
	calls = 0
	m[key()] += 4
	println("map +=", m["k"], calls)

	calls = 0
	m[key()]++
	println("map ++", m["k"], calls)

	// Field of a pointer returned by a call.
	calls = 0
	ptr().X += 3
	println("field +=", pt.X, calls)

	calls = 0
	ptr().X++
	println("field ++", pt.X, calls)

	calls = 0
	ptr().S += "ab"
	println("string field +=", pt.S, calls)

	// Pointer to array from a call, indexed by a call.
	calls = 0
	arr()[idx()] += 9
	println("array ptr +=", backing[0], backing[1], backing[2], calls)

	// Narrow integer element.
	b := []byte{250, 251, 252}
	calls = 0
	b[idx()] += 10
	println("byte +=", b[0], b[1], b[2], calls)

	// String element.
	ss := []string{"a", "b", "c"}
	calls = 0
	ss[idx()] += "z"
	println("string +=", ss[0], ss[1], ss[2], calls)

	// Dereference of a call result.
	calls = 0
	*(&ptr().X) += 2
	println("deref +=", pt.X, calls)

	// Narrow, wide, unsigned and float32 fields.
	pt.U8 = 255
	calls = 0
	ptr().U8++
	println("uint8 field ++", pt.U8, calls)

	calls = 0
	ptr().I64 -= 7
	println("int64 field -=", pt.I64, calls)

	pt.U32 = 1 << 31
	calls = 0
	ptr().U32 >>= 3
	println("uint32 field >>=", pt.U32, calls)

	pt.F32 = 1.5
	calls = 0
	ptr().F32 *= 3
	println("float32 field *=", pt.F32, calls)

	// Integer division.
	q := []int{7, -9, 11}
	calls = 0
	q[idx()] /= 2
	println("int /=", q[0], q[1], q[2], calls)

	calls = 0
	q[idx()] %= 4
	println("int %=", q[0], q[1], q[2], calls)

	// A for loop post statement and an if statement init.
	sum := []int{0, 0, 0}
	calls = 0
	for n := 0; n < 3; sum[idx()] += n {
		n++
	}
	println("for post", sum[0], sum[1], sum[2], calls)

	calls = 0
	for n := 0; n < 3; m[key()]++ {
		n++
	}
	println("for post map", m["k"], calls)

	calls = 0
	if s[idx()] -= 1; s[1] > 0 {
		println("if init", s[0], s[1], s[2], calls)
	}

	// A slice captured by a closure, indexed by a call.
	captured := []int{1, 2, 3}
	bump := func() {
		captured[idx()] += 100
	}
	calls = 0
	bump()
	println("closure +=", captured[0], captured[1], captured[2], calls)

	// An index from an async interface method.
	ch := make(chan int, 3)
	go fill(ch)
	var c counter = &chanCounter{ch: ch}
	vals := []int{0, 0, 0}
	calls = 0
	vals[c.Next()] += 5
	vals[c.Next()] += 6
	println("async index +=", vals[0], vals[1], vals[2], calls)
}
