package main

import (
	"fmt"
	"reflect"
	"sort"
	"strconv"
)

// reflect.Type is declared by the reflect override, whose metadata declares
// every override value of it sync, so its calls do not make callers async.
func kindName(t reflect.Type) string {
	if t.Kind() == reflect.Slice {
		return "slice of " + t.Elem().Name()
	}
	return t.Name()
}

// Celsius is a compiled Stringer. The fmt metadata declares the override
// values of fmt.Stringer sync, so calls of String stay sync.
type Celsius float64

func (c Celsius) String() string {
	return strconv.FormatFloat(float64(c), 'f', 1, 64) + "C"
}

func describeStringer(s fmt.Stringer) string {
	return "[" + s.String() + "]"
}

// Namer is a compiled interface that override types implement too, such
// as time.Duration with its String method, which the fmt metadata trusts
// as a fmt.Stringer.
type Namer interface {
	String() string
}

func describe(n Namer) string {
	return "<" + n.String() + ">"
}

// byLen is a compiled sort.Interface, and the sort metadata declares the
// override values, such as sort.Reverse's, sync.
type byLen []string

func (s byLen) Len() int           { return len(s) }
func (s byLen) Less(i, j int) bool { return len(s[i]) < len(s[j]) }
func (s byLen) Swap(i, j int)      { s[i], s[j] = s[j], s[i] }

func firstShorter(data sort.Interface) bool {
	return data.Len() > 1 && data.Less(0, 1)
}

func main() {
	println(kindName(reflect.TypeOf([]int{})))
	println(kindName(reflect.TypeOf(Celsius(0))))
	println(describe(Celsius(21.5)))
	println(describeStringer(Celsius(-3)))
	words := byLen{"ccc", "a", "bb"}
	println(firstShorter(words))
	println(firstShorter(sort.Reverse(words)))
}
