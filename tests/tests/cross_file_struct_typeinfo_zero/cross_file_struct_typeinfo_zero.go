package main

func main() {
	a := makeA()
	b := makeB()
	println("ok:", a.next == nil, b.inner.next == nil)
	println("table:", countC(), cCopy[1].inner.next == nil)
}
