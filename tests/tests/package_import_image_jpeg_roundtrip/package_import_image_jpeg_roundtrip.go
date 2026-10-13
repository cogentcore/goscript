package main

import (
	"bytes"
	"image"
	"image/color"
	"image/jpeg"
)

func main() {
	im := image.NewRGBA(image.Rect(0, 0, 16, 16))
	for y := range 16 {
		for x := range 16 {
			im.Set(x, y, color.RGBA{uint8(x * 16), uint8(y * 16), 128, 255})
		}
	}
	var buf bytes.Buffer
	if err := jpeg.Encode(&buf, im, &jpeg.Options{Quality: 90}); err != nil {
		println("encode error:", err.Error())
		return
	}
	b := buf.Bytes()
	println("len:", len(b))
	sum := 0
	for i, c := range b {
		sum = (sum*31 + int(c)*(i+1)) % 1000000007
	}
	println("sum:", sum)
	m, err := jpeg.Decode(bytes.NewReader(b))
	if err != nil {
		println("decode error:", err.Error())
		return
	}
	r, g, bb, _ := m.At(5, 7).RGBA()
	println("bounds:", m.Bounds().Dx(), m.Bounds().Dy(), "px:", r>>8, g>>8, bb>>8)
}
