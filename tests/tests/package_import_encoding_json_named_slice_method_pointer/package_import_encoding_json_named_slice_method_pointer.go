package main

import "encoding/json"

type MapItem struct {
	Name string
	Map  map[string]int
}

// Maps is a named slice type with a pointer method, so a *Maps converted
// to an interface carries that method.
type Maps []MapItem

// CopyFrom copies cp by a JSON round trip, unmarshaling into the receiver.
func (km *Maps) CopyFrom(cp Maps) error {
	*km = make(Maps, 0, len(cp))
	b, err := json.Marshal(cp)
	if err != nil {
		return err
	}
	return json.Unmarshal(b, km)
}

// Names is a named map type with a pointer method.
type Names map[string]int

func (n *Names) Len() int { return len(*n) }

var standard = Maps{{Name: "a", Map: map[string]int{"x": 1}}, {Name: "b"}}

func main() {
	var available Maps
	err := available.CopyFrom(standard)
	println("copy:", err == nil, len(available))
	if len(available) == 2 {
		println("items:", available[0].Name, available[0].Map["x"], available[1].Name)
	}

	var names Names
	err = json.Unmarshal([]byte(`{"p":1,"q":2}`), &names)
	println("names:", err == nil, names.Len(), names["q"])
}
