package main

var Later = newLater()

func newLater() string {
	order = append(order, "Later")
	return "later"
}

func init() {
	order = append(order, "init main.go")
}

func main() {
	println(len(Types), Types["int"].Name, Types["string"].Name)
	println(Default.Name, len(Default.FieldNames()), Later)
	println(Field{Name: "int"}.Owner().Name)
	for _, o := range order {
		println(o)
	}
}
