package main

import "os"

func main() {
	stdin, stdout, stderr := os.Stdin, os.Stdout, os.Stderr

	os.Stdout = stderr
	os.Stderr = stdout
	os.Stdin = nil
	println(os.Stdout == stderr, os.Stderr == stdout, os.Stdin == nil)

	os.Stdin, os.Stdout, os.Stderr = stdin, stdout, stderr
	println(os.Stdin == stdin, os.Stdout == stdout, os.Stderr == stderr)

	os.Stdout, os.Stderr = swap(os.Stdout, os.Stderr)
	println(os.Stdout == stderr, os.Stderr == stdout)
	os.Stdout, os.Stderr = stdout, stderr
}

func swap(a, b *os.File) (*os.File, *os.File) {
	return b, a
}
