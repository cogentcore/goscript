package main

import (
	"slices"

	"github.com/s4wave/goscript/tests/tests/generic_func_value_type_args/lib"
)

type Sim struct{}

type Config struct {
	lib.BaseConfig
	Rate float32
}

func (cfg *Config) Defaults() { cfg.Name = "neuron" }

// embed needs both of its type arguments.
func embed[S, C any](label string) {
	_, cfg := lib.NewConfig[C]()
	var s S
	println(label, cfg.AsBaseConfig().Name, any(&s) != nil)
}

func first[T any](v T) T { return v }

func main() {
	// A generic function instantiated with several type arguments keeps them
	// when it is used as a value, as in a call.
	embed[Sim, Config]("call")
	f := embed[Sim, Config]
	f("variable")
	sims := map[string]func(string){"neuron": embed[Sim, Config]}
	sims["neuron"]("map")

	// So does one with a single type argument.
	g := first[string]
	println("single", g("x"))

	// A function of the slices override, which takes no type arguments.
	index := slices.Index[[]int, int]
	println("slices", index([]int{4, 5, 6}, 5))
}
