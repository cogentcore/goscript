package main

import (
	"reflect"
	"runtime"
	"strings"
)

// funcName names a function value, as Cogent Core's types.FuncName does.
func funcName(f any) string {
	return runtime.FuncForPC(reflect.ValueOf(f).Pointer()).Name()
}

type T struct{ n int }

func (t *T) PtrMethod() int { return t.n }

func (t T) ValMethod() int { return t.n }

type G[E any] struct{ v E }

func (g *G[E]) Get() E { return g.v }

func helperFunc() {}

func main() {
	println("func:", funcName(helperFunc))
	println("imported:", funcName(strings.ToUpper))

	t := &T{n: 1}
	println("pointer method:", funcName(t.PtrMethod))
	println("value method:", funcName(t.ValMethod))

	g := &G[int]{v: 2}
	println("generic method:", funcName(g.Get))
}
