package main

import (
	"fmt"
	"strings"
)

type Node struct {
	Name   string
	Parent *Node
	Kids   []*Node
}

// Base is a generic type embedded with a pointer to the embedding type.
type Base[W any] struct {
	Windows []W
	Active  W
}

type App struct {
	Base[*Win]
	Name string
}

type Win struct {
	App   *App
	Title string
}

// shape replaces pointer addresses, which vary, with a placeholder.
func shape(s string) string {
	var b strings.Builder
	for i := 0; i < len(s); i++ {
		if strings.HasPrefix(s[i:], "0x") {
			b.WriteString("PTR")
			i += 2
			for i < len(s) && strings.IndexByte("0123456789abcdef", s[i]) >= 0 {
				i++
			}
			i--
			continue
		}
		b.WriteByte(s[i])
	}
	return b.String()
}

func main() {
	root := &Node{Name: "root"}
	kid := &Node{Name: "kid", Parent: root}
	root.Kids = append(root.Kids, kid)
	fmt.Println(shape(fmt.Sprint(root)))
	fmt.Println(shape(fmt.Sprintf("%+v", kid)))

	app := &App{Name: "app"}
	win := &Win{App: app, Title: "main"}
	app.Windows = append(app.Windows, win)
	app.Active = win
	fmt.Println(shape(fmt.Sprint(win)))
	fmt.Println(shape(fmt.Sprint(app)))
}
