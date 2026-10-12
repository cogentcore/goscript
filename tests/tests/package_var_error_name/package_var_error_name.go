package main

// Error is a package variable that shadows the JavaScript Error class
// in the generated module, as in internal/buildcfg.
var Error error

// ready is initialized lazily, since load is in another file,
// and asynchronously, since load receives from a channel.
var ready = load()

func main() {
	println(ready, Error.Error())
	select {
	case v := <-make(chan int, 1):
		println(v)
	default:
		println("no value")
	}
}
