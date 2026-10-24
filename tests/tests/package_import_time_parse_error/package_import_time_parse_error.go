package main

import (
	"errors"
	"time"
)

func main() {
	// A parse failure is a *time.ParseError that errors.As finds.
	_, err := time.Parse("2006-01-02", "2024-13-01")
	var pe *time.ParseError
	println("as:", errors.As(err, &pe))
	println("fields:", pe.Layout, pe.Value, pe.Message)
	println("error:", err.Error())

	// A composite literal sets the exported fields, and Error formats them.
	lit := &time.ParseError{Layout: "15:04", Value: "x", LayoutElem: "15", ValueElem: "x"}
	println("literal:", lit.Error())
	lit = &time.ParseError{Value: "y", Message: ": bad"}
	println("message:", lit.Error())
}
