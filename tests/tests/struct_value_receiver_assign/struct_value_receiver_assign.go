package main

import "fmt"

type tag struct {
	lang   int
	region string
}

type outer struct {
	t tag
	n int
}

// reset assigns a whole new value to its value receiver, which the caller
// does not see.
func (t tag) reset() tag {
	t = tag{lang: 1, region: "x"}
	return t
}

// set assigns a whole new value through its pointer receiver.
func (t *tag) set(lang int) {
	*t = tag{lang: lang, region: "p"}
}

func main() {
	a := tag{lang: 5, region: "a"}
	b := a.reset()
	fmt.Println(a, b)

	a.set(9)
	fmt.Println(a)

	// Nested struct fields are assigned in place.
	o := outer{t: tag{lang: 2}, n: 1}
	held := &o.t
	o = outer{t: tag{lang: 3, region: "o"}, n: 4}
	fmt.Println(o, *held, held == &o.t)
}
