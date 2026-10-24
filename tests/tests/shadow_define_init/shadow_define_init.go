package main

func next(n int) (int, error) {
	return n + 1, nil
}

// switchInit redeclares pos in a switch init from the outer pos.
func switchInit(pos int) int {
	switch pos, err := next(pos); err {
	case nil:
		return pos
	}
	return -1
}

// ifInit redeclares pos in an if init from the outer pos.
func ifInit(pos int) int {
	if pos, err := next(pos); err == nil {
		return pos
	}
	return -1
}

// block redeclares pos in a nested block from the outer pos.
func block(pos int) int {
	{
		pos, err := next(pos)
		if err == nil {
			return pos
		}
	}
	return -1
}

// single redeclares pos with a single value in a switch init.
func single(pos int) int {
	switch pos := pos * 2; pos {
	case 4:
		return pos
	}
	return -1
}

// forInit redeclares i in a for init from the outer i.
func forInit(i int) int {
	sum := 0
	for i := i; i < 3; i++ {
		sum += i
	}
	return sum
}

// typeSwitchInit redeclares v in a type switch init from the outer v.
func typeSwitchInit(v any) int {
	switch v, ok := v.(int); any(ok).(type) {
	case bool:
		return v
	}
	return -1
}

func main() {
	println("switchInit:", switchInit(1))
	println("ifInit:", ifInit(1))
	println("block:", block(1))
	println("single:", single(2))
	println("forInit:", forInit(1))
	println("typeSwitchInit:", typeSwitchInit(5))
}
