package main

import (
	"reflect"
	"time"
)

func isZero(x any) bool {
	return reflect.DeepEqual(x, reflect.Zero(reflect.TypeOf(x)).Interface())
}

func main() {
	var i64 int64
	println(isZero(i64))
	var d time.Duration
	println(isZero(d))
	var tm time.Time
	println(isZero(tm))
	println(isZero(time.Time{}))
	println(reflect.ValueOf(d).IsZero(), reflect.ValueOf(tm).IsZero())
}
