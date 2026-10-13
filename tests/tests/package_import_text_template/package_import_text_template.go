package main

import (
	"os"
	"text/template"
)

type item struct {
	Name  string
	Count int
}

func main() {
	t := template.Must(template.New("x").Parse("{{range $i, $e := .}}{{$i}}:{{$e.Name}}={{$e.Count}}{{if gt $e.Count 1}} many{{end}}\n{{end}}"))
	if err := t.Execute(os.Stdout, []item{{"a", 1}, {"b", 2}}); err != nil {
		println(err.Error())
	}
}
