package main

type outer struct {
	inner inner
}

type inner struct {
	value int
}

var defaultOuter = outer{}

type pair struct {
	first  inner
	second int
	third  string
}

var calls []string

func next(name string, v int) int {
	calls = append(calls, name)
	return v
}

func main() {
	defaultOuter.inner.value = 7
	println(defaultOuter.inner.value)

	// Keys out of field order evaluate their calls in source order.
	p := pair{third: "t", second: next("second", 2), first: inner{value: next("first", 1)}}
	for _, call := range calls {
		println(call)
	}
	println(p.first.value, p.second, p.third)

	// A stored struct value in a literal is copied.
	in := inner{value: 3}
	q := pair{first: in}
	in.value = 4
	println(q.first.value, in.value, q.second, q.third == "")
}
