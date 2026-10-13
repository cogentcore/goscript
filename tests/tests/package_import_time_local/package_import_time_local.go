package main

import "time"

func main() {
	// Results here hold in any local time zone.
	t := time.Date(2026, 10, 13, 22, 30, 0, 0, time.UTC)
	l := t.Local()
	println("local location:", l.Location() == time.Local)
	println("same instant:", l.Equal(t))
	_, off := l.Zone()
	wall := (l.Hour()*3600 + l.Minute()*60 - off + 2*86400) % 86400
	println("wall clock matches offset:", wall == 22*3600+30*60)
	println("now location:", time.Now().Location() == time.Local)
	println("unix location:", time.Unix(0, 0).Location() == time.Local)
	println("unix milli location:", time.UnixMilli(0).Location() == time.Local)
	println("utc location:", l.UTC().Location().String())
	println("unix equal:", time.Unix(1760394600, 0).Equal(time.Date(2025, 10, 13, 22, 30, 0, 0, time.UTC)))
}
