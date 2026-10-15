package main

// command holds a call result and an action that suspends.
type command struct {
	name   string
	flags  []string
	action func() int
}

type config struct {
	flags func(prefix string) []string
}

var results = make(chan int, 4)

// newCommand stays sync: only its action literal receives from a channel.
func newCommand(c config) *command {
	return &command{
		name:  "status",
		flags: c.flags("--"),
		action: func() int {
			return <-results
		},
	}
}

// lazyCommand initializes without awaiting, since only its action suspends.
var lazyCommand = command{
	name:   "lazy",
	flags:  defaultFlags("-"),
	action: func() int { return <-results },
}

func defaultFlags(prefix string) []string {
	return []string{prefix + "verbose"}
}

func main() {
	cmd := newCommand(config{flags: defaultFlags})
	println(cmd.name, cmd.flags[0])
	results <- 7
	println(cmd.action())
	println(lazyCommand.name, lazyCommand.flags[0])
	results <- 9
	println(lazyCommand.action())
}
