//go:build go1.27

package compiler

import (
	"context"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

// compileDeadCodeFixture compiles a main package with dead code elimination
// and returns its generated main module.
func compileDeadCodeFixture(t *testing.T, src string) string {
	t.Helper()

	// Compile the program with dead code elimination.
	moduleDir := writePackageGraphFixture(t, map[string]string{
		"go.mod":  "module example.test/deadcode\n\ngo 1.27.0\n",
		"main.go": src,
	})
	outputDir := filepath.Join(t.TempDir(), "output")
	conf := &Config{Dir: moduleDir, OutputPath: outputDir, EliminateDeadCode: true}
	comp, err := NewCompiler(conf, nil, nil)
	if err != nil {
		t.Fatal(err)
	}
	if _, err := comp.CompilePackages(context.Background(), "."); err != nil {
		t.Fatal(err)
	}

	// Read the generated main module.
	content, err := os.ReadFile(filepath.Join(outputDir, "@goscript", "example.test", "deadcode", "main.gs.ts"))
	if err != nil {
		t.Fatal(err)
	}
	return string(content)
}

// TestEliminateDeadCodeMethods checks that unreachable functions and methods
// are left out, while methods reachable through calls, method values,
// interfaces, interface assertions, promotion and generics stay.
func TestEliminateDeadCodeMethods(t *testing.T) {
	content := compileDeadCodeFixture(t, `package main

type Speaker interface{ Speak() string }

type checker interface{ Check() }

type Dog struct{}

func (*Dog) Speak() string { return "woof" }
func (*Dog) Check()        {}
func (*Dog) DeadDog() int  { return 1 }

type Inner struct{}

func (Inner) Promoted() string { return "promoted" }
func (Inner) DeadInner() int  { return 2 }

type Outer struct{ Inner }

type Level int

func (l Level) Up() Level     { return l + 1 }
func (l Level) DeadLevel() int { return 3 }

type Named interface{ Name() string }

type Cat struct{}

func (Cat) Name() string  { return "cat" }
func (Cat) DeadCat() int  { return 4 }

func name[T Named](v T) string { return v.Name() }

func deadFunc() int { return 5 }

func main() {
	var s Speaker = &Dog{}
	var v any = s
	_, ok := v.(checker)
	up := Level(1).Up
	println(s.Speak(), ok, Outer{}.Promoted(), up(), name(Cat{}))
}
`)

	// Reachable code stays.
	for _, want := range []string{"Speak(", "Check(", "Promoted(", "Level_Up(", "Name("} {
		if !strings.Contains(content, want) {
			t.Errorf("missing reachable %q in generated output:\n%s", want, content)
		}
	}

	// Unreachable code goes, but the runtime method metadata stays.
	for _, dead := range []string{"DeadDog(", "DeadInner(", "Level_DeadLevel", "DeadCat(", "deadFunc"} {
		if strings.Contains(content, dead) {
			t.Errorf("unreachable %q in generated output:\n%s", dead, content)
		}
	}
	if !strings.Contains(content, `"DeadDog"`) {
		t.Errorf("missing method metadata of DeadDog in generated output:\n%s", content)
	}
}

// TestEliminateDeadCodeReflectMethods checks the reflect method lookup rule:
// a lookup with a constant name keeps the methods of that name, and one with
// a name known only at run time keeps every exported method of used types.
func TestEliminateDeadCodeReflectMethods(t *testing.T) {
	// A constant name keeps only that method.
	constant := compileDeadCodeFixture(t, `package main

import "reflect"

type T struct{}

func (T) Ping() string { return "pong" }
func (T) Zorblax() int { return 1 }

func main() { println(reflect.ValueOf(T{}).MethodByName("Ping").IsValid()) }
`)
	if !strings.Contains(constant, "Ping(") || strings.Contains(constant, "Zorblax(") {
		t.Errorf("constant MethodByName should keep Ping and drop Zorblax:\n%s", constant)
	}

	// A dynamic name keeps every exported method.
	dynamic := compileDeadCodeFixture(t, `package main

import (
	"os"
	"reflect"
)

type T struct{}

func (T) Ping() string { return "pong" }
func (T) Zorblax() int { return 1 }
func (T) hidden() int  { return 2 }

func main() { println(reflect.ValueOf(T{}).MethodByName(os.Args[0]).IsValid()) }
`)
	if !strings.Contains(dynamic, "Ping(") || !strings.Contains(dynamic, "Zorblax(") || strings.Contains(dynamic, "hidden(") {
		t.Errorf("dynamic MethodByName should keep exported methods only:\n%s", dynamic)
	}
}
