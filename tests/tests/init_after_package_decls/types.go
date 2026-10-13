package main

// Types is a registry filled in by init using a generic helper.
var Types = map[string]*Type{}

// Default is initialized by a function that uses a type from another file.
var Default = newDefault()

var order []string

func newDefault() *Type {
	order = append(order, "Default")
	return &Type{Name: "default", Fields: []Field{{Name: "x"}}}
}

func addBuiltin[T any](name string) {
	var zero T
	_ = zero
	Types[name] = &Type{Name: name}
}

func TypeByName(name string) *Type {
	return Types[name]
}

func init() {
	order = append(order, "init types.go")
	addBuiltin[int]("int")
	addBuiltin[string]("string")
}
