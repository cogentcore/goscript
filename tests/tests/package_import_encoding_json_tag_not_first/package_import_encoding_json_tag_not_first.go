package main

import "encoding/json"

type Node struct {
	Name   string `copier:"-"`
	Parent *Node  `copier:"-" json:"-" xml:"-"`
	Label  string `xml:"label" json:"title"`
	Empty  string `display:"-" json:"empty,omitempty"`
	Kept   int    `table:"-" json:",omitempty"`
}

func main() {
	n := &Node{Name: "a", Label: "x", Kept: 3}
	n.Parent = n
	b, err := json.Marshal(n)
	println(string(b), err == nil)

	var m Node
	err = json.Unmarshal([]byte(`{"Name":"b","Parent":{"Name":"p"},"title":"y","empty":"e","Kept":4}`), &m)
	println(m.Name, m.Parent == nil, m.Label, m.Empty, m.Kept, err == nil)
}
