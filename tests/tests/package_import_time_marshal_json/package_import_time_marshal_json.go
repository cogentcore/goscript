package main

import (
	"encoding/json"
	"time"
)

type geom struct {
	Name string
	At   time.Time
}

func main() {
	t := time.Date(2025, time.May, 15, 1, 10, 42, 123456789, time.UTC)

	// Direct method calls, as core's windowgeometry does.
	b, err := t.MarshalJSON()
	println(string(b), err == nil)
	var u time.Time
	err = u.UnmarshalJSON(b)
	println(err == nil, u.Equal(t))
	println(u.UnmarshalJSON([]byte("null")) == nil, u.Equal(t))
	println(u.UnmarshalJSON([]byte("12")) != nil)

	text, err := t.MarshalText()
	println(string(text), err == nil)
	var v time.Time
	println(v.UnmarshalText(text) == nil, v.Equal(t))
	println(v.UnmarshalText([]byte("bad")) != nil, v.IsZero())

	// Through encoding/json.
	data, err := json.Marshal(geom{Name: "win", At: t})
	println(string(data), err == nil)
	var g geom
	err = json.Unmarshal(data, &g)
	println(err == nil, g.Name, g.At.Equal(t))
}
