package main

type Node interface {
	Name() string
	SetName(name string)
}

type Base struct {
	name  string
	inits int
}

func (b *Base) Name() string        { return b.name }
func (b *Base) SetName(name string) { b.name = name }

type Widget struct {
	Base
	Text string
}

// newNode returns a new *T, as a generic tree constructor does.
func newNode[T any]() *T {
	n := new(T)
	return n
}

// asNode converts a new *T to the Node interface.
func asNode[T any]() Node {
	return any(newNode[T]()).(Node)
}

// initAs runs init on the node asserted back to *T, as a plan does.
func initAs[T any](n Node, init func(w *T)) {
	init(any(n).(*T))
}

// store writes v through the generic pointer p.
func store[T any](p *T, v T) {
	*p = v
}

// load reads through the generic pointer p.
func load[T any](p *T) T {
	return *p
}

func main() {
	n := asNode[Widget]()
	n.SetName("text")
	initAs(n, func(w *Widget) {
		w.Text = "hello"
		w.inits++
	})
	w := n.(*Widget)
	println("name:", w.Name(), "text:", w.Text, "inits:", w.inits)
	println("same:", any(w) == any(n))

	p := newNode[Widget]()
	store(p, Widget{Text: "stored"})
	println("stored:", p.Text, load(p).Text)

	q := newNode[Widget]()
	v := load(q)
	v.Text = "copy"
	println("copy is independent:", q.Text == "", v.Text)

	ip := newNode[int]()
	store(ip, 7)
	*ip += 1
	println("int:", *ip, load(ip))
}
