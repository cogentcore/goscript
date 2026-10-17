package main

func main() {
	i := 2
	println("Integer switch:")
	switch i {
	case 1:
		println("one")
	case 2:
		println("two")
	case 3:
		println("three")
	default:
		println("other integer")
	}

	s := "hello"
	println("\nString switch:")
	switch s {
	case "world":
		println("world")
	case "hello":
		println("hello")
	default:
		println("other string")
	}
	x := -5
	println("\nSwitch without expression:")
	switch {
	case x < 0:
		println("negative")
	case x == 0:
		println("zero")
	default: // x > 0
		println("positive")
	}

	x = 0
	println("\nSwitch without expression (zero):")
	switch {
	case x < 0:
		println("negative")
	case x == 0:
		println("zero")
	default: // x > 0
		println("positive")
	}

	x = 10
	println("\nSwitch without expression (positive):")
	switch {
	case x < 0:
		println("negative")
	case x == 0:
		println("zero")
	default: // x > 0
		println("positive")
	}

	// Conditions set only inside a callback are still runtime values.
	var data []byte
	rejected := false
	hold(func() {
		data = []byte("x")
		rejected = true
	})
	println("\nSwitch on conditions set in a callback:")
	switch {
	case data == nil && rejected:
		println("rejected")
	case data == nil:
		println("missing")
	default:
		println("found")
	}

	// Arrays, structs, and complex numbers match their cases by value.
	slots := [][2]uint64{{3, 4}, {}}
	println("\nArray switch:")
	for _, slot := range slots {
		switch slot {
		case [2]uint64{3, 4}:
			println("three four")
		case [2]uint64{}:
			println("empty")
		}
	}
	type point struct{ x, y int }
	println("\nStruct switch:")
	switch p := (point{1, 2}); p {
	case point{2, 1}:
		println("two one")
	case point{1, 2}:
		println("one two")
	}
	println("\nComplex switch:")
	switch c := complex(1, 2); c {
	case 1 + 2i:
		println("one plus two i")
	default:
		println("other complex")
	}

	// A string built from bytes that are not UTF-8 matches its constant.
	binary := string([]byte{0xff, 'a'})
	println("\nBinary string switch:")
	switch binary {
	case "\xffa":
		println("binary")
	default:
		println("other binary")
	}

	var ptr *int
	var err error
	println("\nNil pointer and interface switch:")
	switch ptr {
	case nil:
		println("nil pointer")
	default:
		println("pointer")
	}
	switch err {
	case nil:
		println("nil error")
	default:
		println("error")
	}
}

func hold(fn func()) {
	fn()
}
