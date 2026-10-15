package main

type point struct{ X, Y int }

type quad [4]int32

func main() {
	// Elements of a made slice of arrays are zero arrays that can be written.
	a := make([][4]int32, 3)
	a[1][2] = 5
	println("arrays:", a[0][0], a[1][2], len(a[2]))

	// Arrays of structs and named array types too.
	b := make([][2]point, 2)
	b[1][1].X = 3
	q := make([]quad, 1)
	q[0][3] = 9
	println("struct arrays:", b[0][0].X, b[1][1].X, q[0][3])

	// Unnamed struct elements are zero structs.
	u := make([]struct{ A, B int }, 2)
	u[1].B = 4
	println("unnamed structs:", u[0].A, u[1].B)

	// Spare capacity holds zero arrays as well.
	c := make([][4]int32, 2, 5)
	c = c[:4]
	c[3][0] = 7
	println("spare capacity:", c[2][1], c[3][0])

	// Each element is its own array.
	a[0][0] = 1
	println("distinct:", a[0][0], a[2][0])

	// Clearing a slice of arrays or structs leaves zero values to write to.
	clear(a)
	a[2][1] = 6
	clear(u[1:])
	u[1].A = 8
	println("cleared:", a[0][0], a[1][2], a[2][1], u[1].A, u[1].B)
}
