package main

import (
	"bytes"
	"encoding/binary"
)

type inner struct {
	A uint16
	B [2]uint8
}

type vec4 struct {
	X, Y, Z, W float32
}

type item struct {
	Matrix [4]float32
	Colors [2]vec4
	Index  int32
	Flags  uint32
	_      [2]float32
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

	// A slice of structs is written and read as its elements, a blank field
	// as zeros.
	objs := make([]item, 3)
	for i := range objs {
		objs[i].Matrix[3] = float32(i) + 0.5
		objs[i].Colors[1].Y = float32(-i)
		objs[i].Index = int32(-i)
		objs[i].Flags = uint32(7 * i)
	}
	ob := make([]byte, binary.Size(objs)+1)
	ob[len(ob)-1] = 9
	n, err := binary.Encode(ob, binary.LittleEndian, objs[1:])
	println("objects:", binary.Size(objs), n, err == nil, ob[12], ob[13], ob[14], ob[15], ob[48], ob[52], ob[64], ob[len(ob)-1])
	back := make([]item, 2)
	n, err = binary.Decode(ob, binary.LittleEndian, back)
	println("decoded:", n, err == nil, back[0] == objs[1], back[1] == objs[2], back[1].Colors[1].Y, back[1].Index)

	// Big-endian order and arrays of structs work the same way.
	be, _ := binary.Append(nil, binary.BigEndian, objs[2:])
	var arr [2]vec4
	arr[1].W = 3
	ab, _ := binary.Append(nil, binary.LittleEndian, arr)
	var arr2 [2]vec4
	_, err = binary.Decode(ab, binary.LittleEndian, &arr2)
	println("big-endian:", len(be), be[12], be[13], "array:", len(ab), err == nil, arr2[1].W)
}
