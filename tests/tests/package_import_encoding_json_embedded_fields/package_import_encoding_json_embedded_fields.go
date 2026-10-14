package main

import (
	"encoding/json"
	"fmt"
)

type Base struct {
	Name     string
	Kids     []string
	hidden   int
	Shadowed string
}

type inner struct {
	Deep int
}

type Extra struct {
	Note string
}

type Node struct {
	Base
	*Extra
	inner
	Tagged   Base `json:"tagged"`
	Shadowed string
	Size     int
	private  bool
}

func main() {
	n := Node{Base: Base{Name: "a", Kids: []string{"x"}, hidden: 3, Shadowed: "base"}, Extra: &Extra{Note: "n"}, inner: inner{Deep: 7}, Shadowed: "outer", Size: 2, private: true}
	b, err := json.Marshal(n)
	fmt.Println(string(b), err)

	var m Node
	m.Extra = &Extra{}
	err = json.Unmarshal([]byte(`{"Name":"b","Kids":["y","z"],"Note":"m","Deep":9,"Shadowed":"s","Size":4,"tagged":{"Name":"t"}}`), &m)
	fmt.Println(err, m.Name, m.Kids, m.Note, m.Deep, m.Shadowed, m.Base.Shadowed == "", m.Size, m.Tagged.Name)

	var nilExtra Node
	b, _ = json.Marshal(nilExtra)
	fmt.Println(string(b))
}
