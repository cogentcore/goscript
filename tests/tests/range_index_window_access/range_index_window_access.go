package main

type P struct{ X, Y float32 }

func main() {
	xs := []float64{1, 2, 3, 4}
	for i := range xs {
		xs[i] = xs[i]*2 + 1
	}
	println(xs[0], xs[3])

	sub := xs[1:3]
	for i := range sub {
		sub[i] += 100
	}
	println(xs[1], xs[2], len(sub))

	ps := []P{{1, 2}, {3, 4}}
	for i, p := range ps {
		ps[i].X = p.Y * 2
		q := ps[i]
		q.Y = 99
	}
	println(ps[0].X, ps[0].Y, ps[1].X)

	m := [][]int{{1, 2}, {3, 4}}
	for i := range m {
		for j := range m[i] {
			m[i][j] *= 10
		}
	}
	println(m[0][1], m[1][0])

	ys := []int{1, 2, 3}
	grow := func() { ys = append(ys, 9) }
	for i := range ys {
		if i == 0 {
			grow()
		}
		ys[i] += 1
	}
	println(len(ys), ys[0], ys[2], ys[3])

	bs := []byte{250, 251}
	for i := range bs {
		bs[i] += 10
	}
	println(bs[0], bs[1])

	var f32 float32 = 1
	for i := range 3 {
		f32 = f32*1.1 + float32(i)/3
	}
	println(int(f32 * 1000000))
}
