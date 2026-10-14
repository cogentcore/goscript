package main

type object struct {
	name string
}

func (o *object) Name() string { return o.name }

type Var struct {
	object
	kind int
}

type number struct{ n int }

type Holder struct {
	*number
	string string
}

func main() {
	v := &Var{object: object{name: "x"}}
	println(v.object.Name(), v.object.name, v.Name(), v.name)
	o := &v.object
	o.name = "y"
	println(v.name)
	h := Holder{number: &number{n: 3}, string: "s"}
	println(h.number.n, h.n, h.string)
}
