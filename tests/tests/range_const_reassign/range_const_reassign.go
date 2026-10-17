package main

func main() {
	s := "abc"
	for _, c := range s {
		if c >= 'a' {
			c = c - 'a' + 10
		}
		println(int(c))
	}

	// An assignment of the key of a slice or integer range changes only the
	// copy of this iteration, not the iterations.
	xs := []string{"a", "b", "c", "d"}
	for i, x := range xs {
		if x == "b" {
			i++
			continue
		}
		println("slice:", i, x)
	}
	sum := 0
	for i := range 4 {
		if i == 1 {
			i += 10
		}
		sum += i
	}
	println("int:", sum)

	// A key whose address is taken is also a copy of the iteration's index.
	arr := [3]int{5, 6, 7}
	for i := range arr {
		p := &i
		*p += 100
		println("array:", i, arr[i-100])
	}
}
