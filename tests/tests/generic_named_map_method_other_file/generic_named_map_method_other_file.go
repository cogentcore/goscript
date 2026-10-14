package main

func main() {
	tr := make(trie[string])
	old, n := tr.insert(1, "a")
	println(old == "", n)
	old, n = tr.insert(1, "b")
	println(old, n)
	nm := make(names)
	nm.add("x")
	println(nm.add("x"))
}
