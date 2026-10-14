package main

func last(a []int) int {
	len := len(a) - 1
	for i := 0; i < len; i++ {
		a[i+1] += a[i]
	}
	return a[len]
}

func capacity(a []int) int {
	cap, n := cap(a), len(a)
	return cap - n
}

func grow(a []int) []int {
	append := append(a, 4)
	return append
}

func main() {
	println(last([]int{1, 2, 3}))
	println(capacity(make([]int, 2, 5)))
	println(len(grow([]int{1, 2, 3})))
	new := new(int)
	*new = 7
	println(*new)
}
