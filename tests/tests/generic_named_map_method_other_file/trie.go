package main

type trie[V any] map[int]V

func (tr trie[V]) insert(key int, val V) (V, int) {
	if old, ok := tr[key]; ok {
		return old, len(tr)
	}
	tr[key] = val
	var zero V
	return zero, len(tr)
}

type names map[string]int

func (n names) add(name string) int {
	n[name]++
	return n[name]
}
