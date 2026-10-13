package main

import (
	"sync"
)

var cache sync.Map

// store records value under key, which suspends because of the sync.Map.
func store(key, value string) string {
	cache.Store(key, value)
	return value
}

var storeFunc = store

// stored calls a function variable that suspends during package
// initialization.
var stored = storeFunc("init", "from func value")

// This function calls an async method on a package-level variable
func getValueFromCache(key string) (any, bool) {
	return cache.Load(key)
}

func main() {
	cache.Store("hello", "world")

	val, ok := getValueFromCache("hello")
	if ok {
		println("Found:", val.(string))
	}

	val, ok = getValueFromCache("init")
	println("Stored:", stored, ok, val.(string))
}
