package main

import "fmt"

type Lex struct {
	Name  string
	Start int
}

func (lx *Lex) String() string { return fmt.Sprintf("[%s:%d]", lx.Name, lx.Start) }

type Line []Lex

func (ll *Line) String() string { return "line" }

type Val struct{ N int }

func (v Val) String() string { return fmt.Sprintf("val%d", v.N) }

func main() {
	lx := Lex{Name: "a", Start: 1}
	fmt.Println(lx, &lx)
	line := Line{{"b", 2}, {"c", 3}}
	fmt.Println(line, &line)
	fmt.Println(fmt.Sprint(line))
	ptrs := []*Lex{&line[0]}
	fmt.Println(ptrs[0], Val{4}, &Val{5}, []Val{{6}})
}
