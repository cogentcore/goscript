package main

import (
	"errors"
	"fmt"
	"io"
	"os"
	"strings"
)

func main() {
	// Methods of a nil *os.File report os.ErrInvalid, as Go's checkValid does.
	var f *os.File
	n, err := f.Write([]byte("x"))
	println("Write:", n, errors.Is(err, os.ErrInvalid))
	n, err = f.WriteString("x")
	println("WriteString:", n, errors.Is(err, os.ErrInvalid))
	n, err = f.Read(make([]byte, 1))
	println("Read:", n, errors.Is(err, os.ErrInvalid))
	_, err = f.Seek(0, io.SeekStart)
	println("Seek:", errors.Is(err, os.ErrInvalid))
	_, err = f.Stat()
	println("Stat:", errors.Is(err, os.ErrInvalid))
	_, err = f.ReadDir(-1)
	println("ReadDir:", errors.Is(err, os.ErrInvalid))
	println("Close:", errors.Is(f.Close(), os.ErrInvalid))
	println("Sync:", errors.Is(f.Sync(), os.ErrInvalid))
	println("Fd:", f.Fd() == ^uintptr(0))

	// fmt writes to a nil *os.File without panicking, and reports the error.
	_, err = fmt.Fprintln(f, "lost")
	println("Fprintln:", errors.Is(err, os.ErrInvalid))
	_, err = io.Copy(f, strings.NewReader("lost"))
	println("io.Copy:", errors.Is(err, os.ErrInvalid))
}
