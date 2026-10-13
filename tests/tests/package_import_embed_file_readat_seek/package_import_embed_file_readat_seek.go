package main

import (
	"embed"
	"io"
)

//go:embed data.txt
var files embed.FS

func main() {
	f, err := files.Open("data.txt")
	if err != nil {
		println("open error:", err.Error())
		return
	}
	defer f.Close()

	// A regular embedded file implements io.ReaderAt and io.Seeker.
	ra, isReaderAt := f.(io.ReaderAt)
	sk, isSeeker := f.(io.Seeker)
	println("interfaces:", isReaderAt, isSeeker)

	b := make([]byte, 8)
	n, err := ra.ReadAt(b, 7)
	println("readat:", n, err == nil, string(b[:n]))
	n, err = ra.ReadAt(b, 16)
	println("readat end:", n, err == io.EOF, string(b[:n]))

	pos, err := sk.Seek(-5, io.SeekEnd)
	println("seek end:", pos, err == nil)
	n, _ = f.Read(b)
	println("read after seek:", string(b[:n]))
	pos, _ = sk.Seek(0, io.SeekStart)
	pos, _ = sk.Seek(6, io.SeekCurrent)
	println("seek current:", pos)
	_, err = sk.Seek(-1, io.SeekStart)
	println("seek invalid:", err != nil)

	// A directory does not.
	d, _ := files.Open(".")
	_, dirReaderAt := d.(io.ReaderAt)
	println("dir readerat:", dirReaderAt)
}
