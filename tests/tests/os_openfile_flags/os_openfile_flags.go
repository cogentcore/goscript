package main

import (
	"os"
	"path/filepath"
)

func write(name string, flag int, data string) {
	f, err := os.OpenFile(name, flag, 0o644)
	if err != nil {
		println("open error:", err.Error())
		return
	}
	f.WriteString(data)
	f.Close()
}

func read(name string) string {
	b, err := os.ReadFile(name)
	if err != nil {
		return "read error: " + err.Error()
	}
	return string(b)
}

func main() {
	dir, err := os.MkdirTemp("", "openflags")
	if err != nil {
		println("mkdirtemp error:", err.Error())
		return
	}
	defer os.RemoveAll(dir)
	name := filepath.Join(dir, "f.txt")

	// Create truncates an existing file.
	os.WriteFile(name, []byte("a much longer first line"), 0o644)
	f, _ := os.Create(name)
	f.WriteString("short")
	f.Close()
	println(read(name))

	// WriteFile also truncates.
	os.WriteFile(name, []byte("x"), 0o644)
	println(read(name))

	// O_APPEND adds to the end.
	write(name, os.O_WRONLY|os.O_APPEND, "yz")
	println(read(name))

	// O_TRUNC without O_CREATE truncates an existing file.
	write(name, os.O_WRONLY|os.O_TRUNC, "t")
	println(read(name))

	// O_EXCL with O_CREATE fails for an existing file.
	_, err = os.OpenFile(name, os.O_WRONLY|os.O_CREATE|os.O_EXCL, 0o644)
	println(err != nil, os.IsExist(err))
}
