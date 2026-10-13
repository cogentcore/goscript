package main

import (
	"encoding/xml"
	"fmt"
	"reflect"
)

type Rule struct {
	Pattern string `xml:"pattern,attr"`
}

type Rules map[string][]Rule

type xmlState struct {
	Name  string `xml:"name,attr"`
	Rules []Rule `xml:"rule"`
}

type xmlRules struct {
	States []xmlState `xml:"state"`
}

func (r *Rules) UnmarshalXML(d *xml.Decoder, start xml.StartElement) error {
	xr := xmlRules{}
	if err := d.DecodeElement(&xr, &start); err != nil {
		return err
	}
	if *r == nil {
		*r = Rules{}
	}
	for _, st := range xr.States {
		(*r)[st.Name] = st.Rules
	}
	return nil
}

type Lexer struct {
	Name  string `xml:"name"`
	Rules Rules  `xml:"rules"`
}

func main() {
	showArray()
	var l Lexer
	t := reflect.TypeOf(l).Field(1).Type
	fmt.Println("field type:", t.String(), t.Kind(), t.Name())
	pt := reflect.PointerTo(t)
	fmt.Println("ptr methods:", pt.NumMethod())
	v := reflect.ValueOf(&l).Elem().Field(1)
	fmt.Println("value type:", v.Type().String(), v.Addr().Type().String())
	_, ok := v.Addr().Interface().(xml.Unmarshaler)
	fmt.Println("addr implements Unmarshaler:", ok)
}

type Names []string

func (n Names) First() string { return n[0] }

type Grid [2]int

func (g Grid) Sum() int { return g[0] + g[1] }

func showArray() {
	nt := reflect.TypeOf(Names{"a"})
	fmt.Println("names:", nt.String(), nt.Name(), nt.Kind(), nt.NumMethod())
	gt := reflect.TypeOf(Grid{1, 2})
	fmt.Println("grid:", gt.String(), gt.Name(), gt.Kind(), gt.NumMethod())
	m, ok := gt.MethodByName("Sum")
	fmt.Println("grid Sum:", m.Name, ok)
	mt := reflect.TypeOf(Rules{})
	fmt.Println("rules:", mt.String(), mt.Name(), mt.Kind(), mt.NumMethod(), reflect.PointerTo(mt).NumMethod())
}
