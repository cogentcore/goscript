package main

// Flag is a named integer type with methods, like an enum of bit flags.
type Flag int64

// Int64 returns the flag as an int64.
func (f Flag) Int64() int64 { return int64(f) }

// Plus returns the flag plus n.
func (f Flag) Plus(n int64) int64 { return int64(f) + n }

// Kind is a named unsigned 64-bit type.
type Kind uint64

// Name returns the name of the kind.
func (k Kind) Name() string { return "kind" }

// Name is a named string type.
type Name string

// Upper returns the name with an exclamation mark.
func (n Name) Upper() string { return string(n) + "!" }

// Inter is satisfied by Flag.
type Inter interface {
	Int64() int64
	Plus(n int64) int64
}

// Namer is satisfied by Kind and Name.
type Namer interface{ Upper() string }

const (
	FlagA Flag = iota
	FlagB
	FlagC
)

// has reports whether bits has flag f set, the way generated HasFlag
// methods take the flag as an interface.
func has(bits *int64, f Inter) bool {
	return *bits&(1<<uint32(f.Int64())) != 0
}

func main() {
	// Constant flags boxed in a loop share their boxes but keep their values.
	var bits int64 = 1 << FlagB
	n := 0
	for i := 0; i < 3; i++ {
		if has(&bits, FlagB) {
			n++
		}
		if has(&bits, FlagC) {
			n += 10
		}
	}
	println("count", n)

	// Boxes of equal constants are equal, and of different constants not.
	var x, y, z Inter = FlagA, FlagA, FlagC
	println("equal", x == y, x == z)

	// Methods with and without arguments are called through the box.
	println("methods", z.Int64(), z.Plus(5), x.Plus(-1))

	// A boxed variable is not shared with a later value of the variable.
	v := FlagB
	var w Inter = v
	v = FlagC
	println("variable", w.Int64(), int64(v))

	// Type switches see the dynamic type of a boxed constant.
	switch t := z.(type) {
	case Flag:
		println("switch", int64(t))
	}

	// Strings and unsigned 64-bit values box the same way.
	var s Namer = Name("go")
	println("string", s.Upper(), s == Namer(Name("go")))

	// 64-bit conversions between named and basic types keep the value.
	k := Kind(1<<63 + 5)
	u := uint64(k)
	p := uintptr(u)
	i := int64(Flag(-7))
	println("convert", u, uint64(p) == u, i, Flag(i).Int64(), k.Name())
}
