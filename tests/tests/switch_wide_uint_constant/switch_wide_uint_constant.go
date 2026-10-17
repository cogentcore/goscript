package main

// Class is number-backed (uint), and its maximum value is beyond the safe
// integers of JavaScript, as for bidi.Class in golang.org/x/text, whose
// paragraph level switches on such a constant.
type Class uint

const unknownClass = ^Class(0)

func classify(c Class) int {
	switch c {
	case unknownClass:
		return 1
	case 0:
		return 2
	}
	return 3
}

func main() {
	strong := Class(unknownClass)
	println("switch:", classify(strong), classify(0), classify(5))

	// The constant itself and a value computed from it are cases too.
	var unknown Class = unknownClass
	println("var:", classify(unknown), classify(^Class(0)))

	// A wide constant of int is a case in the same way.
	var i int = 1<<62 + 1
	switch i {
	case 1<<62 + 1:
		println("int: ok")
	default:
		println("int: bad")
	}
}
