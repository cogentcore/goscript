package main

type Pos int

func (p Pos) Position() Pos { return p }

type NodeType int

func (t NodeType) Type() NodeType { return t }

type Node interface {
	Type() NodeType
	Position() Pos
}

type TextNode struct {
	NodeType
	Pos
	Text string
}

// BranchNode promotes Pos and NodeType methods through two levels.
type BranchNode struct {
	NodeType
	Pos
	Line int
}

type IfNode struct {
	BranchNode
}

func newText(pos Pos, text string) *TextNode {
	return &TextNode{NodeType: 3, Pos: pos, Text: text}
}

func main() {
	t := newText(7, "hi")
	println(t.Position(), t.Type(), t.Text)
	v := *t
	println(v.Position(), v.Type())
	var n Node = t
	println(n.Position(), n.Type())
	t.Pos = 9
	println(n.Position(), t.Pos)

	i := &IfNode{BranchNode{NodeType: 10, Pos: 42, Line: 3}}
	println(i.Position(), i.Type(), i.Line)
	n = i
	println(n.Position(), n.Type())
}
