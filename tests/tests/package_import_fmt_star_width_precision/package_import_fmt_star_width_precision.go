package main

import (
	"errors"
	"fmt"
)

type num float32

func (f num) String() string {
	return fmt.Sprintf("%.*g", 7, float32(f))
}

func main() {
	fmt.Println(fmt.Sprintf("[%.*f]", 3, 3.14159))
	fmt.Println(fmt.Sprintf("[%*d]", 5, 42))
	fmt.Println(fmt.Sprintf("[%*d]", -5, 42))
	fmt.Println(fmt.Sprintf("[%*.*f]", 8, 2, 3.14159))
	fmt.Println(fmt.Sprintf("[%.*g]", 7, float32(13.333333)))
	fmt.Println(fmt.Sprintf("[%.*d] [%s]", -1, 5, "after"))
	fmt.Println(fmt.Sprintf("[%v]", num(6.6666665)))
	fmt.Println(fmt.Sprintf("[%.*d]", "x", 5))
	err := fmt.Errorf("%*s: %w", 6, "ctx", errors.New("base"))
	fmt.Println(err, errors.Unwrap(err) != nil)
}
