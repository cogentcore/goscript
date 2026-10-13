package main

type Matrix [4]float32

// Scaled returns a scaled copy, leaving the receiver unchanged.
func (m Matrix) Scaled(s float32) Matrix {
	m.Scale(s)
	return m
}

func (m *Matrix) Scale(s float32) {
	for i := range m {
		m[i] *= s
	}
}

// Sum modifies its receiver copy only.
func (m Matrix) Sum() float32 {
	var t float32
	for i := range m {
		t += m[i]
		m[i] = 0
	}
	return t
}

func main() {
	m := Matrix{1, 2, 3, 4}
	original := m
	r := m.Scaled(2)
	println("m:", m[0], m[1], m[2], m[3])
	println("r:", r[0], r[1], r[2], r[3])
	println("original equal:", original == m)
	println("sum:", m.Sum(), m[0])
	p := &m
	println("ptr sum:", p.Sum(), p[0])
}
