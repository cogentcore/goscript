package main

import (
	"reflect"
	"slices"
)

import "sort"

type descending struct {
	values []int
}

type byFreq []int

func (d descending) Len() int {
	return len(d.values)
}

func (d descending) Less(i, j int) bool {
	return d.values[i] > d.values[j]
}

func (d descending) Swap(i, j int) {
	d.values[i], d.values[j] = d.values[j], d.values[i]
}

func (s *byFreq) sort(a []int) {
	*s = byFreq(a)
	sort.Sort(s)
}

func (s byFreq) Len() int {
	return len(s)
}

func (s byFreq) Less(i, j int) bool {
	return s[i] < s[j]
}

func (s byFreq) Swap(i, j int) {
	s[i], s[j] = s[j], s[i]
}

func main() {
	// Test basic slice sorting
	ints := []int{3, 1, 4, 1, 5, 9}
	println("Original ints:", ints[0], ints[1], ints[2], ints[3], ints[4], ints[5])
	sort.Ints(ints)
	println("Sorted ints:", ints[0], ints[1], ints[2], ints[3], ints[4], ints[5])

	// Test if sorted
	isSorted := sort.IntsAreSorted(ints)
	println("Ints are sorted:", isSorted)

	// Test string sorting
	strings := []string{"banana", "apple", "cherry"}
	println("Original strings:", strings[0], strings[1], strings[2])
	sort.Strings(strings)
	println("Sorted strings:", strings[0], strings[1], strings[2])

	// Test if strings are sorted
	stringSorted := sort.StringsAreSorted(strings)
	println("Strings are sorted:", stringSorted)

	// Test float64 sorting
	floats := []float64{3.14, 2.71, 1.41}
	println("Original floats:", floats[0], floats[1], floats[2])
	sort.Float64s(floats)
	println("Sorted floats:", floats[0], floats[1], floats[2])

	// Test if floats are sorted
	floatSorted := sort.Float64sAreSorted(floats)
	println("Floats are sorted:", floatSorted)

	// Test search functions
	intIndex := sort.SearchInts(ints, 4)
	println("Index of 4 in sorted ints:", intIndex)

	stringIndex := sort.SearchStrings(strings, "banana")
	println("Index of 'banana' in sorted strings:", stringIndex)

	floatIndex := sort.SearchFloat64s(floats, 2.71)
	println("Index of 2.71 in sorted floats:", floatIndex)

	// Test generic Search function
	searchResult := sort.Search(len(ints), func(i int) bool {
		return ints[i] >= 5
	})
	println("First index where value >= 5:", searchResult)

	// A predicate that receives from a channel makes Search suspend.
	gate := make(chan int, 8)
	for range cap(gate) {
		gate <- 0
	}
	asyncSearch := sort.Search(len(ints), func(i int) bool {
		return ints[i]+<-gate >= 4
	})
	println("First index where value >= 4:", asyncSearch)
	findIndex, found := sort.Find(len(ints), func(i int) int {
		return 5 - ints[i]
	})
	println("Find 5:", findIndex, found)
	println("Sorted pair:", sortedPair(2, 1))

	// Test Slice function with custom comparator
	testSlice := []int{5, 2, 8, 1, 9}
	slices.Sort(testSlice)
	println("Custom sorted slice:", testSlice[0], testSlice[1], testSlice[2], testSlice[3], testSlice[4])

	asyncSlice := []int{2, 1}
	ready := make(chan bool, 1)
	ready <- true
	sort.Slice(asyncSlice, func(i, j int) bool {
		<-ready
		return asyncSlice[i] < asyncSlice[j]
	})
	println("Async sorted slice:", asyncSlice[0], asyncSlice[1])

	// Test SliceIsSorted
	isSliceSorted := sort.SliceIsSorted(testSlice, func(i, j int) bool {
		return testSlice[i] < testSlice[j]
	})
	println("Custom slice is sorted:", isSliceSorted)

	// Test custom sort.Interface values.
	custom := descending{values: []int{1, 3, 2}}
	sort.Sort(custom)
	println("Custom interface sort:", custom.values[0], custom.values[1], custom.values[2])

	namedSlice := []int{4, 1, 3}
	var namedSliceSorter byFreq
	namedSliceSorter.sort(namedSlice)
	println("Named slice pointer sort:", namedSlice[0], namedSlice[1], namedSlice[2])

	// sort.Slice takes the slice as an any, such as from reflect
	anySlice := []int{3, 1, 2}
	sort.Slice(reflect.ValueOf(anySlice).Interface(), func(i, j int) bool {
		return anySlice[i] < anySlice[j]
	})
	println("Any slice sort:", anySlice[0], anySlice[1], anySlice[2])
	println("Any slice sorted:", sort.SliceIsSorted(reflect.ValueOf(anySlice).Interface(), func(i, j int) bool {
		return anySlice[i] < anySlice[j]
	}))

	// a named slice type with methods passed as an any
	names := nameList{"c", "a", "b"}
	sort.Slice(names, func(i, j int) bool {
		return names[i] < names[j]
	})
	println("Named slice any sort:", names.First(), names[1], names[2])

	// Test the named slice types and their methods.
	wordSlice := []string{"c", "a", "b"}
	sort.StringSlice(wordSlice).Sort()
	println("StringSlice sort:", wordSlice[0], wordSlice[1], wordSlice[2], sort.StringSlice(wordSlice).Search("b"))
	floatSlice := sort.Float64Slice{2.5, 1.5}
	floatSlice.Sort()
	println("Float64Slice sort:", floatSlice.Len(), floatSlice.Less(0, 1), floatSlice.Search(2.5))
	var sorter sort.Interface = sort.IntSlice([]int{3, 1, 2})
	sort.Sort(sorter)
	intSlice := sorter.(sort.IntSlice)
	println("IntSlice interface sort:", intSlice[0], intSlice[1], intSlice[2], sorter.Len())
	sort.Sort(sort.Reverse(intSlice))
	intSlice.Swap(0, 2)
	println("IntSlice reverse and swap:", intSlice[0], intSlice[1], intSlice[2])

	println("test finished")
}

type nameList []string

func (n nameList) First() string { return n[0] }

// sortedPair stays synchronous: its sort.Slice callback cannot suspend.
func sortedPair(a, b int) int {
	pair := []int{a, b}
	sort.Slice(pair, func(i, j int) bool {
		return pair[i] < pair[j]
	})
	return pair[0]*10 + pair[1]
}
