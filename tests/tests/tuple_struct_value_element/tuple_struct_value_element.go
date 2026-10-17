package main

// order is a struct value returned beside other results.
type order struct {
	keys [][]byte
	done int
}

// split returns how many keys ready holds, the order, and no error. The
// channel receive makes it async, so its caller reads the results from a
// tuple value.
func split(ready chan []string) (int, order, error) {
	var o order
	for _, k := range <-ready {
		o.keys = append(o.keys, []byte(k))
	}
	o.done = 1
	return len(o.keys), o, nil
}

func main() {
	var err error
	ready := make(chan []string, 1)
	ready <- []string{"a", "bc", "def"}

	// A struct value declared beside a reused err keeps its type, so ranging
	// over a reslice of its [][]byte field yields []byte elements.
	n, placed, err := split(ready)
	if err != nil {
		panic(err)
	}
	println(n)
	for _, h := range placed.keys[placed.done:] {
		println(string(h), len(h))
	}
}
