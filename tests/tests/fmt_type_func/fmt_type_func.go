package main

import "fmt"

type handler func(string) error

func add(a, b int) int { return a + b }

func main() {
	f := func(a int) string { return "" }
	var g func()
	var h handler = func(string) error { return nil }
	fmt.Printf("%T|%T|%T|%T\n", f, add, h, func(...any) (int, error) { return 0, nil })
	fmt.Printf("%T\n", g)
	var x any = f
	fmt.Println(fmt.Sprintf("%T", x))
}
