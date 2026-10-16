package main

import (
	"iter"
	"maps"
	"slices"
)

// Nothing in this program but iter.Pull makes a yield call or a call of a
// func() value suspend: the loops over sequences and the deferred calls do not
// print. The sequences must still suspend at yield when pulled.

// point is a struct element, whose zero value next returns at the end.
type point struct {
	x, y int
}

// numbers yields 0 through n-1.
func numbers(n int) iter.Seq[int] {
	return func(yield func(int) bool) {
		for i := range n {
			if !yield(i) {
				return
			}
		}
	}
}

// points yields a name and a point for each of 0 through n-1.
func points(n int) iter.Seq2[string, point] {
	return func(yield func(string, point) bool) {
		names := []string{"a", "b", "c"}
		for i := range n {
			if !yield(names[i], point{i, i * 10}) {
				return
			}
		}
	}
}

// words yields strings, which no Pull call pulls.
func words(yield func(string) bool) {
	for _, w := range []string{"b", "a"} {
		if !yield(w) {
			return
		}
	}
}

// sortedKeys collects a sequence of the shape of words that maps.Keys
// produces. It calls only the yield of slices.Sorted, so sortedKeys stays
// sync while words suspends.
func sortedKeys(m map[string]int) string {
	out := ""
	for _, k := range slices.Sorted(maps.Keys(m)) {
		out += k
	}
	return out
}

// sum ranges over seq with a loop body that never suspends.
func sum(seq iter.Seq[int]) int {
	total := 0
	for v := range seq {
		total += v
	}
	return total
}

// pullAll collects the values of seq through next.
func pullAll(seq iter.Seq[int]) []int {
	next, stop := iter.Pull(seq)
	defer stop()
	var out []int
	for {
		v, ok := next()
		if !ok {
			return out
		}
		out = append(out, v)
	}
}

// zip pulls two sequences in step until either ends.
func zip(a, b iter.Seq[int]) [][2]int {
	nextA, stopA := iter.Pull(a)
	defer stopA()
	nextB, stopB := iter.Pull(b)
	defer stopB()
	var out [][2]int
	for {
		va, okA := nextA()
		vb, okB := nextB()
		if !okA || !okB {
			return out
		}
		out = append(out, [2]int{va, vb})
	}
}

func main() {
	// A pulled sequence returns its values in order.
	for _, v := range pullAll(numbers(4)) {
		println("pulled:", v)
	}
	println("sum:", sum(numbers(4)))
	for _, pair := range zip(numbers(3), numbers(5)) {
		println("zip:", pair[0], pair[1])
	}

	// Collecting a sequence that suspends at yield waits for it.
	println("collect:", len(slices.Collect(numbers(3))))
	println("sorted:", slices.Sorted(numbers(3))[2])
	println("append:", len(slices.AppendSeq([]int{9}, numbers(2))))
	m := maps.Collect(points(3))
	println("map:", len(m), m["c"].y)
	maps.Insert(m, points(1))
	println("insert:", len(m))
	sortedWords := slices.Sorted(words)
	println("words:", sortedWords[0], sortedWords[1])
	println("keys:", sortedKeys(map[string]int{"b": 1, "a": 2}))

	// Pull2 returns zero values of its element types at the end.
	next, stop := iter.Pull2(points(2))
	for {
		name, p, ok := next()
		println("point:", name, p.x, p.y, ok)
		if !ok {
			break
		}
	}
	stop()

	// An explicit instantiation and a function value of Pull work too.
	nextInt, stopInt := iter.Pull[int](numbers(2))
	v, ok := nextInt()
	println("explicit:", v, ok)
	stopInt()
	pull := iter.Pull[int]
	nextValue, stopValue := pull(numbers(2))
	v, ok = nextValue()
	println("value:", v, ok)
	stopValue()
	_, ok = nextValue()
	println("value after stop:", ok)
}
