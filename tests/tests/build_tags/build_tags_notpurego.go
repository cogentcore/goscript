//go:build !purego

package main

func testPureGo() {
	println("Non-purego code compiled - WRONG! goscript builds with the purego tag")
}
