package main

import (
	"html/template"
	"os"
)

func main() {
	// html/template, compiled from source, uses json.Marshaler, which is an
	// alias of a type of encoding/json/v2 since Go 1.27.
	t := template.Must(template.New("t").Parse(`<a title="{{.}}">{{.}}</a>` + "\n"))
	if err := t.Execute(os.Stdout, "x < y"); err != nil {
		println("error:", err.Error())
	}
}
