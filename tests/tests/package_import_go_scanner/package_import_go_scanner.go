package main

import (
	"fmt"
	"go/scanner"
	"go/token"
)

func main() {
	// Use scanner package functionality that should generate imports
	var errorList scanner.ErrorList

	// This should require importing both scanner and token packages
	pos := token.Position{Filename: "test.go", Line: 1, Column: 1}
	errorList.Add(pos, "test error")

	fmt.Printf("ErrorList length: %d\n", len(errorList))

	// End reports the position after the last scanned token.
	fset := token.NewFileSet()
	file := fset.AddFile("empty.go", -1, 0)
	var s scanner.Scanner
	s.Init(file, nil, nil, 0)
	fmt.Println("End before Scan:", s.End() == token.NoPos)
	_, tok, _ := s.Scan()
	fmt.Println("Scan:", tok.String(), s.End() == file.Pos(0))

	// Scan reads each token of a statement.
	src := []byte("x := 42 // answer")
	file = fset.AddFile("stmt.go", -1, len(src))
	s.Init(file, src, nil, scanner.ScanComments)
	for {
		pos, tok, lit := s.Scan()
		if tok == token.EOF {
			break
		}
		fmt.Printf("%s %s %q\n", fset.Position(pos), tok, lit)
	}
}
