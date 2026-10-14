package main

import (
	"encoding/json"
	"fmt"
)

type Named interface{ GetName() string }

type Node struct{ Name string }

func (n *Node) GetName() string { return n.Name }

type Custom struct{ Text string }

func (c *Custom) GetName() string { return c.Text }

func (c *Custom) UnmarshalJSON(b []byte) error {
	c.Text = "custom:" + string(b)
	return nil
}

type Holder struct {
	Items []Named
}

func main() {
	a, b := &Node{}, &Custom{}
	h := Holder{Items: []Named{a, b}}
	err := json.Unmarshal([]byte(`{"Items":[{"Name":"x"},"y"]}`), &h)
	fmt.Println(err, len(h.Items), h.Items[0] == Named(a), a.Name, h.Items[1] == Named(b), b.Text)
}
