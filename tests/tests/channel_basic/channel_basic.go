package main

func main() {
	messages := make(chan string)

	go func() {
		messages <- "ping"
	}()

	msg := <-messages
	println(msg)

	// A compound assignment keeps its operator when the operand is a receive.
	numbers := make(chan int, 2)
	numbers <- 3
	numbers <- 4
	sum := 10
	sum += <-numbers
	sum *= <-numbers
	println("sum:", sum)
}
