package main

// Flags is a set of bit flags.
type Flags int64

// Base is a generic base type whose methods are promoted to the types that
// embed it.
type Base[A any] struct {
	App   A
	flags Flags
}

func (b *Base[A]) Is(flag Flags) bool { return b.flags&(1<<flag) != 0 }

func (b *Base[A]) Set(flag Flags) { b.flags |= 1 << flag }

type App struct{ Name string }

// Window is a non-generic type embedding the generic Base, so its Is and
// Set are promoted from Base[*App].
type Window struct {
	Base[*App]
	Title string
}

// Single is a generic type embedding Base, whose methods are promoted
// from Base[A] with its own type argument.
type Single[A any] struct {
	Base[A]
	Count int
}

type Flagger interface {
	Is(flag Flags) bool
	Set(flag Flags)
}

// check calls the promoted methods through a type parameter, whose
// method table is built for the type argument *Window.
func check[W Flagger](w W) bool {
	w.Set(6)
	return w.Is(6) && !w.Is(2)
}

// asFlagger converts a type parameter value to an interface.
func asFlagger[W Flagger](w W) Flagger {
	return any(w).(Flagger)
}

func main() {
	w := &Window{Title: "main"}
	println("check:", check(w))
	f := asFlagger(&Window{})
	f.Set(3)
	println("interface:", f.Is(3), f.Is(6))

	s := &Single[*App]{}
	println("generic outer:", check(s))
	println("generic outer string:", check(&Single[string]{}))
}
