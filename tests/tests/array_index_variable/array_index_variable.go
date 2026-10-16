package main

// table is a package array of bytes, as lookup tables are.
var table = [8]byte{10, 11, 12, 13, 14, 15, 16, 17}

// grid is an array of arrays.
var grid = [2][3]int{{1, 2, 3}, {4, 5, 6}}

type point struct{ x, y int }

type holder struct {
	points [2]point
	names  [3]string
}

// lookup reads the table at a variable index.
func lookup(i int) byte {
	return table[i]
}

// recoverMsg runs fn and prints the recovered runtime error message.
func recoverMsg(label string, fn func()) {
	defer func() {
		if r := recover(); r != nil {
			if err, ok := r.(error); ok {
				println(label, err.Error())
			} else {
				println(label, "non-error panic")
			}
		}
	}()
	fn()
}

func main() {
	// Variable indexes of package, local, nested and field arrays.
	sum := 0
	for i := 0; i < len(table); i++ {
		sum += int(lookup(i))
	}
	println("sum", sum)
	local := [4]float64{0.5, 1.5, 2.5, 3.5}
	j := 2
	println("local", local[j], local[j+1])
	println("grid", grid[1][j], grid[j-1][0])
	h := holder{points: [2]point{{1, 2}, {3, 4}}, names: [3]string{"a", "b", "c"}}
	k := 1
	p := h.points[k]
	p.x = 100
	println("field", h.points[k].x, p.x, h.names[k+1])

	// An array seen through a pointer converted from a slice.
	s := []int{7, 8, 9, 10}
	ap := (*[3]int)(s[1:])
	arr := *ap
	println("view", arr[k], (*ap)[k+1])

	// Out of range variable indexes panic with the Go message.
	recoverMsg("high:", func() { println(lookup(j + 6)) })
	recoverMsg("negative:", func() { println(local[j-3]) })
	println("done")
}
