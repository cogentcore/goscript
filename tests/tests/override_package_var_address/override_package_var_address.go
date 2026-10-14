package main

import (
	"errors"
	"reflect"
	"strconv"
	"time"
)

func main() {
	// Taking the address of a variable of a hand-written package does not
	// change how other uses of the variable read it.
	p := &time.UTC
	println((*p).String())
	e := reflect.ValueOf(&strconv.ErrRange).Elem()
	println(e.Interface().(error).Error())

	t := time.Date(2000, 1, 2, 3, 4, 5, 0, time.UTC)
	println(t.Year(), t.Location().String())
	_, err := strconv.Atoi("99999999999999999999999")
	println(errors.Is(err, strconv.ErrRange), strconv.ErrRange.Error())
}
