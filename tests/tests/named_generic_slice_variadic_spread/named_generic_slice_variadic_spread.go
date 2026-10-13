package main

// Stack is a named generic slice type, spread into a variadic call.
type Stack[T any] []T

func (st *Stack[T]) Push(it ...T) {
	*st = append(*st, it...)
}

// Names is a named non-generic slice type.
type Names []string

type Text []string

func join(txts ...Text) int {
	n := 0
	for _, t := range txts {
		n += len(t)
	}
	return n
}

func count(names ...string) int {
	return len(names)
}

func main() {
	st := make(Stack[Text], 0)
	st.Push(Text{"a", "b"}, Text{"c"})
	println("join:", join(st...))

	names := Names{"x", "y", "z"}
	println("count:", count(names...))
}
