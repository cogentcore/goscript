package main

import (
	"encoding/json"
	"fmt"
)

type Hooked struct {
	Calls int
	Seen  string
}

func (h *Hooked) UnmarshalJSON(data []byte) error {
	h.Calls++
	h.Seen = string(data)
	return nil
}

type Box struct {
	Value *Hooked `json:"value"`
}

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

// Missing hooks remain nil when returned through standard-library aliases.
func missingHooks() (json.Marshaler, json.Unmarshaler) {
	return nil, nil
}

func main() {
	marshaler, unmarshaler := missingHooks()
	fmt.Println("missing hooks", marshaler == nil, unmarshaler == nil)

	// A non-nil *T field with UnmarshalJSON must use the hook before any
	// pointer-to-struct population path can inspect fields.
	box := Box{Value: &Hooked{Seen: "before"}}
	if err := json.Unmarshal([]byte(`{"value":{"ignored":0}}`), &box); err != nil {
		fmt.Println("unmarshal error:", err.Error())
		return
	}
	fmt.Printf("calls=%d seen=%s\n", box.Value.Calls, box.Value.Seen)

	// A pointer to a named slice or map type with methods, but no
	// UnmarshalJSON, decodes into the value it points to.
	var maps Maps
	err := maps.CopyFrom(Maps{{Name: "a", Map: map[string]int{"x": 1}}, {Name: "b"}})
	fmt.Println("copy:", err == nil, len(maps), maps[0].Name, maps[0].Map["x"], maps[1].Name)

	var names Names
	err = json.Unmarshal([]byte(`{"p":1,"q":2}`), &names)
	fmt.Println("names:", err == nil, names.Len(), names["q"])
}
