package main

import "sort"

// sort.Sort, Stable and IsSorted call only the Len, Less and Swap methods of
// their argument, so a call is async only when its argument's static type
// allows an async such method.

// byLen's methods are sync, so sorting it is sync.
type byLen []string

func (s byLen) Len() int           { return len(s) }
func (s byLen) Less(i, j int) bool { return len(s[i]) < len(s[j]) }
func (s byLen) Swap(i, j int)      { s[i], s[j] = s[j], s[i] }

// slowInts compares through a channel, so its Less is async.
type slowInts struct {
	xs []int
	ch chan int
}

func (s *slowInts) Len() int { return len(s.xs) }

func (s *slowInts) Less(i, j int) bool {
	s.ch <- s.xs[i]
	return <-s.ch < s.xs[j]
}

func (s *slowInts) Swap(i, j int) { s.xs[i], s.xs[j] = s.xs[j], s.xs[i] }

func sortWords(words []string) []string {
	sort.Sort(byLen(words))
	return words
}

func stableWords(words []string) []string {
	sort.Stable(byLen(words))
	return words
}

func wordsSorted(words []string) bool {
	return sort.IsSorted(byLen(words))
}

func sortSlow(s *slowInts) []int {
	sort.Sort(s)
	return s.xs
}

// An interface argument may hold a slowInts, so this is async.
func sortAny(data sort.Interface) {
	sort.Sort(data)
}

func main() {
	println(len(sortWords([]string{"ccc", "a", "bb"})), wordsSorted([]string{"a", "bb"}))
	w := stableWords([]string{"bb", "a", "cc", "d"})
	println(w[0], w[1], w[2], w[3])
	s := sortSlow(&slowInts{xs: []int{3, 1, 2}, ch: make(chan int, 1)})
	println(s[0], s[1], s[2])
	words := byLen{"xyz", "x", "xy"}
	sortAny(words)
	println(words[0], words[1], words[2], sort.IsSorted(words))
}
