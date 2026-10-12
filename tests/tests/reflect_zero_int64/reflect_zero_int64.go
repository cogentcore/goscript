package main

import (
	"reflect"
	"time"
)

type timer struct {
	start time.Time
	total time.Duration
}

func (t *timer) Start() {
	t.start = time.Now()
}

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
	println(tm.Year(), tm.String(), tm.Format("2006-01-02"))

	// assigning a Time field through a pointer copies the Time
	var t timer
	println(isZero(t.start), isZero(t.total))
	t.Start()
	println(isZero(t.start), t.start.Year() > 2000)
}
