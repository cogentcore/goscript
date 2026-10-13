//go:build !noasm

package main

func testNoAsm() {
	println("Assembly-backed code compiled - WRONG! goscript builds with the noasm tag")
}
