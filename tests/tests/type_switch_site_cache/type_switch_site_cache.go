package main

type Shape interface{ Area() int }

type Namer interface{ Name() string }

type Square struct{ S int }

func (s Square) Area() int { return s.S * s.S }

func (s Square) Name() string { return "square" }

type Celsius int

func (c Celsius) Name() string { return "celsius" }

type Count int

func localA() any {
	type T int
	return T(1)
}

func localB() any {
	type T string
	return T("b")
}

// classify takes the first case each value matches.
func classify(v any) string {
	switch x := v.(type) {
	case nil:
		return "nil"
	case int:
		return "int"
	case string:
		return "string " + x
	case Celsius:
		return "celsius " + x.Name()
	case *Square:
		if x == nil {
			return "nil *Square"
		}
		return "*Square " + x.Name()
	case Namer:
		return "namer " + x.Name()
	case Shape:
		return "shape"
	case []int:
		return "[]int"
	case func() int:
		return "func"
	default:
		return "other"
	}
}

func main() {
	var nilSquare *Square
	sq := &Square{S: 2}
	values := []any{
		nil, 1, "a", Celsius(3), Count(4),
		Square{S: 2},
		sq, nilSquare,
		[]int{1},
		func() int { return 1 }, 2.5, localA(), localB(),
		Square{S: 3},
		&Square{S: 5}, Celsius(6), Count(7), "b", 8,
	}

	// Each value takes the same case the first time and again, when the
	// switch has seen its type.
	for pass := 0; pass < 3; pass++ {
		for i, v := range values {
			println(pass, i, classify(v))
		}
	}
}
