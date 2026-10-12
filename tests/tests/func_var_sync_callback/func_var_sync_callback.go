package main

import (
	"os"
	"strings"
)

type matcher struct {
	match func(r rune) bool
}

func main() {
	isX := func(r rune) bool { return r == 'x' }
	println(strings.IndexFunc("abxc", isX))

	// a function value in a struct field
	m := matcher{match: isX}
	println(strings.IndexFunc("xyz", m.match), strings.LastIndexFunc("axbx", m.match))

	env := map[string]string{"A": "1"}
	expand := func(s string) string { return env[s] }
	println(os.Expand("$A-$B", expand))
}
