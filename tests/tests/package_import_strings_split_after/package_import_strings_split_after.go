package main

import "strings"

func show(name string, parts []string) {
	println(name, len(parts))
	for _, p := range parts {
		println("  [" + p + "]")
	}
}

func main() {
	for _, s := range []string{"a\nb", "a\n", "\n", "a\nb\nc", "ab", ""} {
		println("input:", len(s))
		show("SplitAfterN 2:", strings.SplitAfterN(s, "\n", 2))
		show("SplitAfter:", strings.SplitAfter(s, "\n"))
		show("SplitN 2:", strings.SplitN(s, "\n", 2))
	}
	show("SplitN empty sep 2:", strings.SplitN("abc", "", 2))
	show("SplitAfterN empty sep 2:", strings.SplitAfterN("abc", "", 2))
	show("SplitN empty sep 5:", strings.SplitN("abc", "", 5))
	show("SplitN empty sep -1:", strings.SplitN("abc", "", -1))
}
