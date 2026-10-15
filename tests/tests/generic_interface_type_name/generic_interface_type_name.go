package main

import "fmt"

type node interface {
	Name() string
}

type label struct{ text string }

func (l *label) Name() string { return "label:" + l.text }

type icon struct{ size int }

func (i *icon) Name() string { return fmt.Sprint("icon:", i.size) }

func (i *icon) Size() int { return i.size }

type sizer interface {
	Size() int
}

// newNode returns a new value of the type that PT points to, as a node.
func newNode[T any, PT interface {
	*T
	node
}]() node {
	return PT(new(T))
}

// box converts values of a type parameter and types made from it.
func box[T any](v T) []any {
	return []any{v, &v, []T{v}, map[string]T{"k": v}}
}

func main() {
	// Values made in generic code keep the names of their own types.
	nodes := []node{newNode[label](), newNode[icon](), newNode[label](), newNode[icon]()}
	for _, n := range nodes {
		_, isSizer := n.(sizer)
		fmt.Printf("%T %v %v\n", n, isSizer, n.Name())
	}
	for _, v := range box(label{"x"}) {
		fmt.Printf("%T\n", v)
	}
	for _, v := range box(nodes[0]) {
		fmt.Printf("%T\n", v)
	}
	for _, v := range box(3) {
		fmt.Printf("%T\n", v)
	}
	switch nodes[1].(type) {
	case *label:
		fmt.Println("switch: label")
	case *icon:
		fmt.Println("switch: icon")
	}
}
