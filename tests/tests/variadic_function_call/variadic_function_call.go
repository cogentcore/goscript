package main

import "errors"

// TestFS simulates the function signature from the user's example
func TestFS(fsys string, expected ...string) error {
	return testFS(fsys, expected...)
}

// testFS is the variadic function being called
func testFS(fsys string, expected ...string) error {
	if len(expected) == 0 {
		return errors.New("no expected values")
	}

	for i, exp := range expected {
		println("Expected[" + string(rune(i+'0')) + "]: " + exp)
	}

	println("File system: " + fsys)
	return nil
}

// Stack is a named generic slice type, spread into a variadic call.
type Stack[T any] []T

// Push appends items to the stack.
func (st *Stack[T]) Push(items ...T) {
	*st = append(*st, items...)
}

// Names is a named non-generic slice type.
type Names []string

// Text is a named slice type used as a variadic element.
type Text []string

// join counts the strings in all of txts.
func join(txts ...Text) int {
	n := 0
	for _, t := range txts {
		n += len(t)
	}
	return n
}

// count counts names.
func count(names ...string) int {
	return len(names)
}

// Handler is a named function type with several results.
type Handler func(name string) (bool, error)

// countHandlers calls each of handlers and counts the ones that handled name.
func countHandlers(name string, handlers ...Handler) int {
	n := 0
	for _, h := range handlers {
		if ok, _ := h(name); ok {
			n++
		}
	}
	return n
}

func main() {
	expected := []string{"file1.txt", "file2.txt", "file3.txt"}

	// This is the problematic line - should generate spread syntax in TypeScript
	err := TestFS("myfs", expected...)

	if err != nil {
		println("Error: " + err.Error())
	} else {
		println("Success!")
	}

	// Named slices spread into variadic parameters of their element type.
	st := make(Stack[Text], 0)
	st.Push(Text{"a", "b"}, Text{"c"})
	println("join:", join(st...))

	names := Names{"x", "y", "z"}
	println("count:", count(names...))

	// A conversion to a multi-result function type is one variadic argument.
	println("handlers:", countHandlers("x", Handler(func(name string) (bool, error) {
		return name == "x", nil
	})))
}
