package main

type Node struct {
	Name  string
	Count int
	Next  *Node
}

// Len checks for a nil receiver before it reads fields.
func (n *Node) Len() int {
	if n == nil {
		return 0
	}
	n.Count++
	return 1 + n.Next.Len() + n.Count - n.Count
}

// Describe reads fields of a pointer parameter.
func Describe(n *Node, prefix string) string {
	if n == nil {
		return prefix + "nil"
	}
	return prefix + n.Name + ":" + string(rune('0'+n.Count))
}

// Fill writes fields through its receiver.
func (n *Node) Fill(name string) {
	n.Name = name
	n.Count = len(name)
}

func deref(n *Node) (msg string) {
	defer func() {
		if r := recover(); r != nil {
			msg = "recovered: " + r.(error).Error()
		}
	}()
	n.Fill("x")
	return n.Name
}

type Holder struct {
	items []Node
}

func (h *Holder) touch(i int) {
	p := &h.items[i]
	p.Count += 10
	p.Name = p.Name + "!"
}

func main() {
	a := &Node{Name: "a", Next: &Node{Name: "b"}}
	println(a.Len(), a.Count, a.Next.Count)
	println(Describe(a, "> "), Describe(nil, "> "))
	b := &Node{}
	b.Fill("hello")
	println(b.Name, b.Count)
	println(deref(nil))
	var nn *Node
	println(nn.Len())

	h := &Holder{items: []Node{{Name: "p"}, {Name: "q"}}}
	h.touch(1)
	println(h.items[1].Name, h.items[1].Count)
}
