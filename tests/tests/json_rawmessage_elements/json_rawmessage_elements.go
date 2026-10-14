package main

import "encoding/json"

func main() {
	var fields map[string]json.RawMessage
	err := json.Unmarshal([]byte(`{"name":"a","kids":[{"x":1},"b"],"n":3}`), &fields)
	println("map:", err == nil, string(fields["name"]), string(fields["kids"]), string(fields["n"]))

	var kids []json.RawMessage
	err = json.Unmarshal(fields["kids"], &kids)
	println("slice:", err == nil, len(kids), string(kids[0]), string(kids[1]))

	var name string
	err = json.Unmarshal(fields["name"], &name)
	println("name:", err == nil, name)
}
