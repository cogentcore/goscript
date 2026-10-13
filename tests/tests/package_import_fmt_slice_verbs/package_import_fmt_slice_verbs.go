package main

import "fmt"

func main() {
	fmt.Printf("%q\n", []string{"a", "b c"})
	fmt.Printf("%d\n", []int{1, 2, 3})
	fmt.Printf("%x\n", []int{10, 255})
	fmt.Printf("%.2f\n", []float64{1.5, 2.25})
	fmt.Printf("%t\n", []bool{true, false})
	fmt.Printf("%q\n", [2]string{"x", "y"})
	fmt.Printf("%q\n", []byte("hi"))
	fmt.Printf("%x\n", []byte("hi"))
	fmt.Printf("%s\n", []string{"a", "b"})
	fmt.Printf("%q\n", []string{})
}
