package main

type fixed int32

func main() {
	var u uint32 = 0xffffffff
	var z uint32
	println(u+1, u+u, z-1)
	var q int32 = 2147483647
	q++
	println(q)
	q--
	println(q, q+q)
	var a, b fixed = 40000 * 64, 30000 * 64
	println(a*a/64+b*b/64, a+b+2147483647)
	var i8 int8 = 127
	i8++
	println(i8, int8(-128)-i8)
	var u16 uint16 = 65535
	u16++
	one := uint16(1)
	println(u16, one<<15<<1)
	var u8 uint8 = 200
	println(u8+100, u8<<1)
}
