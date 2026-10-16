package main

func classify(value int) string {
	switch value {
	default:
		fallthrough
	case 1:
		return "one"
	case 2:
		return "two"
	}
}

// select jumps from a nested block to a labeled fallthrough at the end of a
// case, as yaegi's selector resolution does.
func selectKind(value int, small bool) string {
	result := ""
	switch {
	case value > 10:
		if small {
			if value < 20 {
				goto fallback
			}
			result = "big"
			break
		}
		result = "huge"
		break
	fallback:
		fallthrough
	default:
		result += "fallback"
	}
	return result
}

func main() {
	println(classify(0))
	println(classify(1))
	println(classify(2))
	println(selectKind(15, true))
	println(selectKind(25, true))
	println(selectKind(15, false))
	println(selectKind(5, true))
}
