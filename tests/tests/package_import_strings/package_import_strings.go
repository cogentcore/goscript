package main

import "strings"

func main() {
	// This should trigger the unhandled make call error
	// strings.Builder uses make internally for its buffer
	var builder strings.Builder
	builder.WriteString("Hello")
	builder.WriteString(" ")
	builder.WriteString("World")
	n, err := builder.Write([]byte("!"))
	println("Write:", n, err == nil)

	result := builder.String()
	println("Result:", result)
	printBuilderPointer(&builder)
	println("After pointer:", builder.String())

	// Also test direct make with strings.Builder
	builderPtr := &strings.Builder{}
	builderPtr.WriteString("Direct make test")
	println("Direct:", builderPtr.String())
	println("LastIndexByte:", strings.LastIndexByte("hello", 'l'))
	println("LastIndex:", strings.LastIndex("hello", "l"))

	splits()
}

// show prints the substrings of a split, each in brackets.
func show(name string, parts []string) {
	line := name
	for _, p := range parts {
		line += " [" + p + "]"
	}
	println(line, len(parts))
}

// splits keeps the rest of s, even when empty, as the last substring.
func splits() {
	for _, s := range []string{"a,b", "a,", ",", "a,b,c", "ab", ""} {
		show("SplitAfterN 2 "+s+":", strings.SplitAfterN(s, ",", 2))
		show("SplitAfter "+s+":", strings.SplitAfter(s, ","))
		show("SplitN 2 "+s+":", strings.SplitN(s, ",", 2))
		show("Split "+s+":", strings.Split(s, ","))
	}
	show("SplitN empty sep 2:", strings.SplitN("abc", "", 2))
	show("SplitAfterN empty sep 2:", strings.SplitAfterN("abc", "", 2))
	show("SplitN empty sep 5:", strings.SplitN("abc", "", 5))
	show("Split empty sep:", strings.Split("abc", ""))
}

func printBuilderPointer(builder *strings.Builder) {
	println("Pointer Len Before:", builder.Len())
	builder.WriteString(" Pointer")
	println("Pointer Len After:", builder.Len())
}
