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

// TestEliminateDeadCodeProtobufBinding checks dead code elimination with
// protobuf TypeScript bindings: a used message keeps the bound methods that
// the protobuf-go-lite runtime calls back into, and loses its unreachable
// hand-written methods, and an unused message binds nothing.
func TestEliminateDeadCodeProtobufBinding(t *testing.T) {
	// Compile a program over two bound messages, one of them unused.
	dir := t.TempDir()
	writeTestFile(t, dir, "go.mod", `module example.test/deadcodebinding

go 1.27.0

require github.com/aperturerobotics/protobuf-go-lite v0.0.0

replace github.com/aperturerobotics/protobuf-go-lite => ./protobuf-go-lite
`)
	writeTestFile(t, dir, "protobuf-go-lite/go.mod", "module github.com/aperturerobotics/protobuf-go-lite\n\ngo 1.27.0\n")
	writeTestFile(t, dir, "protobuf-go-lite/protobuf-go-lite.go", "package protobuf_go_lite\n\ntype Message interface{ MarshalVT() ([]byte, error) }\n")
	writeTestFile(t, dir, "msg.pb.go", `package main

type Foo struct{ Name string }

func (x *Foo) MarshalVT() ([]byte, error) {
	data := make([]byte, x.SizeVT())
	n, err := x.MarshalToSizedBufferVT(data)
	return data[:n], err
}
func (x *Foo) MarshalToSizedBufferVT(data []byte) (int, error) { return copy(data, x.Name), nil }
func (x *Foo) SizeVT() int                                      { return len(x.Name) }

type Bar struct{ Count int32 }

func (x *Bar) SizeVT() int { return 4 }
`)
	writeTestFile(t, dir, "msg.pb.ts", "export const Foo = {} as any\nexport const Bar = {} as any\n")
	writeTestFile(t, dir, "main.go", `package main

import protobuf_go_lite "github.com/aperturerobotics/protobuf-go-lite"

func (x *Foo) DeadFoo() int { return 1 }

func main() {
	var m protobuf_go_lite.Message = &Foo{Name: "hi"}
	data, _ := m.MarshalVT()
	println(len(data))
}
`)
	out := filepath.Join(dir, "out")
	comp, err := NewCompiler(&Config{
		Dir:                       dir,
		OutputPath:                out,
		ProtobufTypeScriptBinding: true,
		EliminateDeadCode:         true,
	}, nil, nil)
	if err != nil {
		t.Fatal(err)
	}
	if _, err := comp.CompilePackages(context.Background(), "."); err != nil {
		t.Fatal(err)
	}

	// Foo binds the methods the runtime calls; Bar binds none.
	binding := readTestFile(t, filepath.Join(out, "@goscript", "example.test", "deadcodebinding", "msg.pb.ts"))
	if want := `BindMessageMethods(this, "*main.Foo", ["MarshalToSizedBufferVT", "MarshalVT", "SizeVT"])`; !strings.Contains(binding, want) {
		t.Errorf("missing %q in binding output:\n%s", want, binding)
	}
	if strings.Contains(binding, `"*main.Bar"`) {
		t.Errorf("unused Bar should bind no methods:\n%s", binding)
	}

	// The unreachable hand-written method goes.
	main := readTestFile(t, filepath.Join(out, "@goscript", "example.test", "deadcodebinding", "main.gs.ts"))
	if strings.Contains(main, "DeadFoo(") {
		t.Errorf("unreachable DeadFoo in generated output:\n%s", main)
	}
}
