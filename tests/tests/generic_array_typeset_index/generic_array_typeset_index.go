package main

// search runs a binary search over ranges whose type parameter is an
// array type set, as in github.com/rivo/uniseg.
func search[E interface{ [3]int | [4]int }](dictionary []E, r rune) (result E) {
	from := 0
	to := len(dictionary)
	for to > from {
		middle := (from + to) / 2
		cpRange := dictionary[middle]
		if int(r) < cpRange[0] {
			to = middle
			continue
		}
		if int(r) > cpRange[1] {
			from = middle + 1
			continue
		}
		return cpRange
	}
	return
}

func main() {
	three := [][3]int{{0, 9, 1}, {10, 19, 2}, {20, 29, 3}}
	println(search(three, 15)[2], search(three, 25)[2], search(three, 40)[2])
	four := [][4]int{{0, 9, 1, 5}, {10, 19, 2, 6}}
	r := search(four, 3)
	println(r[2], r[3], len(r))
}
