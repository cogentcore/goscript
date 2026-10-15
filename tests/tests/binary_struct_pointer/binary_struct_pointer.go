package main

import (
	"bytes"
	"encoding/binary"
)

type inner struct {
	A uint16
	B [2]uint8
}

type header struct {
	Sig   [2]byte
	Size  uint32
	Res   [2]uint16
	In    inner
	Width int32
}

func main() {
	// A pointer to a struct is written field by field, as image/bmp does.
	h := &header{Sig: [2]byte{'B', 'M'}, Size: 70, Res: [2]uint16{1, 2}, In: inner{A: 0x0102, B: [2]uint8{3, 4}}, Width: -5}
	var buf bytes.Buffer
	if err := binary.Write(&buf, binary.LittleEndian, h); err != nil {
		println("write error:", err.Error())
		return
	}
	println("size:", binary.Size(h), "written:", buf.Len())
	println("bytes:", buf.Bytes()[0], buf.Bytes()[1], buf.Bytes()[2], buf.Bytes()[10], buf.Bytes()[12])

	// Reading into a pointer to a struct fills its fields.
	var r header
	if err := binary.Read(bytes.NewReader(buf.Bytes()), binary.LittleEndian, &r); err != nil {
		println("read error:", err.Error())
		return
	}
	println("read:", string(r.Sig[:]), r.Size, r.Res[1], r.In.A, r.In.B[1], r.Width)
}
