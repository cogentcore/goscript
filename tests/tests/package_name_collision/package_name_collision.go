package main

import (
	"fmt"
	"reflect"

	aast "github.com/s4wave/goscript/tests/tests/package_name_collision/first/ast"
	bast "github.com/s4wave/goscript/tests/tests/package_name_collision/second/ast"
)

func kind(n aast.Node) string {
	switch n.(type) {
	case *aast.List:
		return "list"
	case *aast.ListItem:
		return "item"
	case *aast.Paragraph:
		return "para"
	}
	return "other"
}

// main checks that the types of two packages named ast are distinct types
// at run time, while they print with their Go names.
func main() {
	l := &aast.List{}
	it := &aast.ListItem{}
	it.Parent = l
	p := &aast.Paragraph{}
	p.Parent = it
	fmt.Println(kind(l), kind(it), kind(p), kind(p.Parent), kind(it.Parent))
	_, ok := it.Parent.(*aast.List)
	fmt.Println("parent list", ok)
	var bn bast.Node = &bast.List{N: 3}
	_, isA := any(bn).(aast.Node)
	fmt.Println("b list is a node", isA, bn.Pos())
	fmt.Println(reflect.TypeOf(aast.Type{}), reflect.TypeOf(bast.Type{}), reflect.TypeOf(aast.Type{}).NumField(), reflect.TypeOf(bast.Type{}).Field(0).Name)
	fmt.Printf("%T %T %#v\n", l, bn, bast.Type{Kind: 2})
	_, isB := any(l).(bast.Node)
	fmt.Println("a list is a b node", isB, reflect.TypeOf(l).Elem().PkgPath() != reflect.TypeOf(bn).Elem().PkgPath())
}
