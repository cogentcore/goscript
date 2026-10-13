package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"strconv"
)

type T struct {
	A string
	B float32
}

const c32 float32 = 0.1

func main() {
	// constants are rounded to float32 like computed values
	var f float32 = 3.14
	g, _ := strconv.ParseFloat("3.14", 32)
	h := float32(g)
	fmt.Println(f == h, c32 == float32(g/31.4), c32)
	s := T{A: "aaa", B: 3.14}
	t := T{A: "aaa", B: h}
	fmt.Println(s == t, s, t)

	// float32 values format with the digits needed at 32 bits
	fmt.Println(f, h, float64(f))
	fmt.Printf("%v %g %.3f %f %e %G\n", f, f, f, f, f, f)
	fmt.Println(strconv.FormatFloat(float64(f), 'g', -1, 32), strconv.FormatFloat(float64(f), 'g', -1, 64))
	fmt.Println(strconv.FormatFloat(float64(f), 'b', -1, 32), strconv.FormatFloat(2.5, 'b', -1, 64))
	x := float32(0.1)
	y := float32(0.2)
	z := x + y
	fmt.Println(z, z == float32(0.3), float64(z))
	var d float64 = 0.1
	e := float32(d)
	fmt.Println(e, float64(e))
	m := f * 3
	fmt.Println(m, m/7)
	fmt.Printf("%v %v\n", []float32{1.1, 2.2}, [2]float32{3.3, 4.4})

	// float64 values use Go's %v format
	fmt.Println(1e6, 123456.0, 0.00001, 2.5)
	fmt.Printf("%v %f %.2e %g\n", 1e21, 1.5, 1234.5678, 100.0)

	// float32 fields decoded from JSON are rounded to float32
	b, _ := json.Marshal(s)
	var j T
	err := json.Unmarshal(b, &j)
	fmt.Println(string(b), j == s, j, err)
	var buf bytes.Buffer
	enc := json.NewEncoder(&buf)
	enc.SetIndent("", "\t")
	err = enc.Encode(&s)
	var k T
	err2 := json.NewDecoder(bytes.NewReader(buf.Bytes())).Decode(&k)
	fmt.Println(buf.Len() > 0, k == s, k, err, err2)
}
