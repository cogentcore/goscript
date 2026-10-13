package main

type Setter interface {
	Has(v int64) bool
	Set(v int64)
}

type Flag int64

func (f *Flag) Has(v int64) bool { return int64(*f)&v != 0 }
func (f *Flag) Set(v int64)      { *f = Flag(int64(*f) | v) }

type Constraint interface {
	~int64
}

// Describe converts a pointer to a type parameter value to an interface
// that needs the pointer method set of the type argument.
func Describe[T Constraint](i T, values []int64) int64 {
	p := any(&i).(Setter)
	var n int64
	for _, v := range values {
		if p.Has(v) {
			n++
		}
	}
	p.Set(8)
	return n + int64(i)
}

func main() {
	println("count:", Describe(Flag(3), []int64{1, 2, 4}))
	var f Flag = 1
	if s, ok := any(&f).(Setter); ok {
		s.Set(2)
	}
	println("flag:", int64(f))
}
