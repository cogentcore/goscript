package main

type entry struct {
	value int
}

func (e *entry) add(value int) {
	e.value += value
}

var box struct {
	table [2]entry
}

func entries() *[2]entry {
	return &box.table
}

// config holds a field of anonymous struct type, whose address a function
// that only reads and writes through it receives.
type config struct {
	core struct {
		bare bool
		name string
	}
}

func mergeCore(dst, src *struct {
	bare bool
	name string
}) {
	if src.name != "" {
		dst.name = src.name
	}
	dst.bare = dst.bare || src.bare
}

func merge(dst, src *config) {
	mergeCore(&dst.core, &src.core)
}

func main() {
	table := entries()
	table[0].add(5)
	println(table[0].value)

	dst := &config{}
	src := &config{}
	src.core.bare = true
	src.core.name = "origin"
	merge(dst, src)
	println(dst.core.bare, dst.core.name)
}
