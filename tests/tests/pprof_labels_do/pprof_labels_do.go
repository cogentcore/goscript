package main

import (
	"context"
	"runtime/pprof"
)

func main() {
	labels := pprof.Labels("rpc", "svc/Method", "client", "a")
	ctx := pprof.WithLabels(context.Background(), pprof.Labels("client", "b", "pid", "7"))

	ch := make(chan int, 1)
	ch <- 17
	value := 0
	pprof.Do(ctx, labels, func(ctx context.Context) {
		value = <-ch
		rpc, ok := pprof.Label(ctx, "rpc")
		println("rpc", rpc, ok)
		pprof.ForLabels(ctx, func(key, value string) bool {
			println("label", key, value)
			return key != "pid"
		})
	})
	println("value", value)

	_, ok := pprof.Label(ctx, "rpc")
	println("outer rpc", ok)
}
