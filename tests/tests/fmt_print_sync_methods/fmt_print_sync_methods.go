package main

import (
	"errors"
	"fmt"
	"strconv"
)

// Every String, Error, Format and GoString method in this program is sync,
// so the fmt print functions, the error values fmt.Errorf and strconv
// return, and the error interface's Error method are sync too, and so are
// their callers.

type point struct {
	x, y int
}

func (p point) String() string {
	return fmt.Sprintf("(%d, %d)", p.x, p.y)
}

type lineError struct {
	line int
	err  error
}

func (e *lineError) Error() string {
	return "line " + strconv.Itoa(e.line) + ": " + e.err.Error()
}

func (e *lineError) Unwrap() error {
	return e.err
}

func describe(p point, n int) string {
	return fmt.Sprintf("%v has %d items", p, n)
}

func parse(line int, s string) (int64, error) {
	n, err := strconv.ParseInt(s, 10, 64)
	if err != nil {
		return 0, &lineError{line: line, err: err}
	}
	return n, nil
}

func message(err error) string {
	return fmt.Sprint("error: ", err)
}

func main() {
	println(describe(point{1, 2}, 3))
	println(fmt.Sprint(point{4, 5}, "x", 6))

	_, err := parse(3, "abc")
	println(err.Error())
	println(message(err))

	wrapped := fmt.Errorf("wrap %v: %w", point{7, 8}, err)
	println(wrapped.Error(), errors.Unwrap(wrapped) == err)
}
