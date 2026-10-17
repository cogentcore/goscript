package compiler

import (
	"context"
	"path/filepath"
	"strings"
	"testing"
)

// TestProtobufTypeScriptBindingSharedPackageNameFieldCtor verifies that a
// message-kind field of a bound package that shares its name with another
// package of the program resolves to the message of its own package. The
// runtime names the types of such a package with a hashed package name, but
// the binding spells the constructor by the Go package name.
func TestProtobufTypeScriptBindingSharedPackageNameFieldCtor(t *testing.T) {
	// Two packages named kv: a bound one, and one that renames it at runtime.
	dir := t.TempDir()
	writeTestFile(t, dir, "go.mod", "module example.test/sharedpb\n\ngo 1.25\n")
	writeTestFile(t, dir, "kv/kv.pb.go", `package kv

type Meta struct {
	Name string `+"`"+`protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`+"`"+`
}

type List struct {
	Metas []*Meta `+"`"+`protobuf:"bytes,1,rep,name=metas,proto3" json:"metas,omitempty"`+"`"+`
}
`)
	writeTestFile(t, dir, "kv/kv.pb.ts", `export interface Meta {
  name?: string
}
export const Meta = {} as any
export interface List {
  metas?: Meta[]
}
export const List = {} as any
`)
	writeTestFile(t, dir, "other/kv/kv.go", `package kv

type Store struct {
	Name string
}
`)
	writeTestFile(t, dir, "main.go", `package main

import (
	"example.test/sharedpb/kv"
	otherkv "example.test/sharedpb/other/kv"
)

func main() {
	println(len((&kv.List{}).Metas), (&otherkv.Store{}).Name)
}
`)

	// The program compiles without an unresolved field reference.
	out := filepath.Join(dir, "out")
	comp, err := NewCompiler(&Config{
		Dir:                       dir,
		OutputPath:                out,
		ProtobufTypeScriptBinding: true,
	}, nil, nil)
	if err != nil {
		t.Fatal(err)
	}
	if _, err := comp.CompilePackages(context.Background(), "."); err != nil {
		t.Fatalf("compile with protobuf TypeScript binding: %v", err)
	}

	// The field binds to the message of its own package.
	binding := readTestFile(t, filepath.Join(out, "@goscript", "example.test", "sharedpb", "kv", "kv.pb.ts"))
	if !strings.Contains(binding, `"metas": Meta`) {
		t.Fatalf("field of a renamed package should bind to its own message Meta, got:\n%s", binding)
	}
}
