package main

// Field refers to both Type and the registry in types.go, so the generated
// files import each other in a cycle.
type Field struct {
	Name string
}

func (f Field) Owner() *Type {
	return TypeByName(f.Name)
}
