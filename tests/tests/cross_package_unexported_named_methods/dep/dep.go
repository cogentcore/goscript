package dep

// list is an unexported named slice type with unexported methods.
type list []int

func (l *list) add(v int) { *l = append(*l, v) }

func (l *list) Len() int { return len(*l) }

type adder interface {
	add(v int)
	Len() int
}

// All is a package variable of the unexported type.
var All list

// Add calls the unexported method of a value boxed in another package.
func Add(v any, n int) int {
	a := v.(adder)
	a.add(n)
	return a.Len()
}
