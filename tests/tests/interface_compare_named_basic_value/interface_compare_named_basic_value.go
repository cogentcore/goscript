package main

type FormatError string

func (e FormatError) Error() string { return "format: " + string(e) }

type Code int

func (c Code) Error() string { return "code" }

var errMissing = FormatError("missing")

const errConst = FormatError("const")

func get(i int) error {
	switch i {
	case 0:
		return errMissing
	case 1:
		return errConst
	case 2:
		return Code(3)
	}
	return nil
}

func main() {
	err := get(0)
	println("var eq:", err == errMissing, err != errMissing, errMissing == err)
	println("const eq:", get(1) == errConst, get(1) != errConst)
	println("other:", get(1) == errMissing, get(2) == Code(3), get(2) == Code(4))
	var e2 error = FormatError("missing")
	println("boxed eq:", err == e2)
	var a any = errMissing
	println("any eq:", a == errMissing, a == any("missing"))
}
