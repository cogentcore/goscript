package main

// Type is declared in a different file than the init function that uses it.
type Type struct {
	Name   string
	Fields []Field
}

func (t *Type) FieldNames() []string {
	names := []string{}
	for _, f := range t.Fields {
		names = append(names, f.Name)
	}
	return names
}
