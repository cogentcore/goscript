package ast

type Node interface{ AsContainer() *Container }

type Container struct {
	Parent   Node
	Children []Node
}

func (c *Container) AsContainer() *Container { return c }

type List struct {
	Container
	Tight bool
}

type ListItem struct{ Container }

type Paragraph struct{ Container }

type Type struct{ IDName string }
