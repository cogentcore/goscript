package main

type word uint

func main() {
	words := []word{1 << 63, 5, 1<<64 - 1}
	clear(words[:2])
	println("words", words[0], words[1], words[2] == 1<<64-1)
	clear(words)
	println("words", words[0], words[1], words[2])

	wide := []uint64{1 << 63, 1 << 62}
	clear(wide)
	println("wide", wide[0], wide[1], wide[0] == 0)
}
