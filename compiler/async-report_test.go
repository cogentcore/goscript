package compiler

import (
	"bytes"
	"context"
	"encoding/json"
	"path/filepath"
	"slices"
	"strings"
	"testing"
)

// asyncReportFixture is a program with one root of each of several kinds:
// a channel receive behind an interface, a mutex lock behind a function
// value, and a method of an interface the io override declares.
var asyncReportFixture = map[string]string{
	"go.mod": "module example.test/report\n\ngo 1.25.3\n",
	"main.go": strings.Join([]string{
		"package main",
		"import (",
		"  \"io\"",
		"  \"strings\"",
		"  \"sync\"",
		")",
		"type Source interface { Next() int }",
		"type chanSource struct{ ch chan int }",
		"func (s *chanSource) Next() int { return <-s.ch }",
		"type cached struct { mu sync.Mutex; v int }",
		"func (c *cached) get() int { c.mu.Lock(); defer c.mu.Unlock(); return c.v }",
		"func sum(s Source) int { return s.Next() }",
		"func apply(f func() int) int { return f() }",
		"func readOne(r io.Reader) int { var b [1]byte; n, _ := r.Read(b[:]); return n }",
		"func pure(a, b int) int { return a + b }",
		"func main() {",
		"  c := &cached{}",
		"  _ = apply(c.get)",
		"  _ = apply(func() int { return 1 })",
		"  _ = sum(&chanSource{ch: make(chan int, 1)})",
		"  _ = readOne(strings.NewReader(\"x\"))",
		"  _ = pure(1, 2)",
		"}",
		"",
	}, "\n"),
}

// buildAsyncReport builds the semantic model of the fixture with a report.
func buildAsyncReport(t *testing.T, wholeProgram bool) *AsyncReport {
	t.Helper()

	// The fixture is loaded as a whole program or as a library.
	moduleDir := writePackageGraphFixture(t, asyncReportFixture)
	req := &CompileRequest{
		Patterns:            []string{"."},
		Dir:                 moduleDir,
		OutputPath:          filepath.Join(t.TempDir(), "out"),
		DependencyMode:      DependencyModeAll,
		RuntimeEmissionMode: RuntimeEmissionModeEmit,
	}
	graph := loadPackageGraph(t, req)
	model, diagnostics := NewSemanticModelOwner(NewOverrideRegistryOwner()).Build(
		context.Background(), graph, SemanticBuildOptions{WholeProgram: wholeProgram, ReportAsync: true})
	if diagnosticsHaveErrors(diagnostics) {
		t.Fatalf("semantic model build failed: %#v", diagnostics)
	}
	if model.asyncReport == nil {
		t.Fatal("no async report")
	}
	return model.asyncReport.relativeTo(moduleDir)
}

// findAsyncRoot returns the entry of kind whose subject ends with suffix.
func findAsyncRoot(t *testing.T, entries []AsyncRoot, kind, suffix string) AsyncRoot {
	t.Helper()
	for _, entry := range entries {
		if entry.Kind == kind && strings.HasSuffix(entry.Subject, suffix) {
			return entry
		}
	}
	t.Fatalf("no %s entry for %s in %#v", kind, suffix, entries)
	return AsyncRoot{}
}

func TestAsyncReportRoots(t *testing.T) {
	// The report counts the async functions of the whole program.
	report := buildAsyncReport(t, true)
	if !report.WholeProgram || report.AsyncFunctions != 6 || report.Functions != 7 {
		t.Fatalf("report counts = whole %v, %d of %d async, want whole, 6 of 7", report.WholeProgram, report.AsyncFunctions, report.Functions)
	}

	// The io.Reader root is at the override boundary, so it comes first.
	first := report.Roots[0]
	if first.Kind != asyncCauseOverrideInterface || first.Subject != "(io.Reader).Read" || !first.Boundary ||
		!strings.Contains(first.Reason, "override package io") || first.Functions != 2 {
		t.Fatalf("first root = %#v", first)
	}

	// The channel receive spreads through the interface to sum and main.
	channel := findAsyncRoot(t, report.Roots, asyncCauseChannel, "chanSource).Next")
	if channel.Reason != "channel receive" || channel.Position != "main.go:9" ||
		channel.Functions != 3 || channel.Only != 2 || channel.Boundary {
		t.Fatalf("channel root = %#v", channel)
	}
	if want := []string{"(*example.test/report.chanSource).Next", "(example.test/report.Source).Next", "example.test/report.sum", "example.test/report.main"}; !slices.Equal(channel.Chain, want) {
		t.Fatalf("channel chain = %q, want %q", channel.Chain, want)
	}

	// The mutex lock spreads through the class of func() int to apply.
	lock := findAsyncRoot(t, report.Roots, asyncCauseSync, "cached).get")
	if lock.Reason != "sync.Mutex.Lock" || lock.Position != "main.go:11" || lock.Functions != 3 ||
		len(lock.Packages) != 1 || lock.Packages[0] != (AsyncPackageCount{Package: "example.test/report", Count: 3}) {
		t.Fatalf("lock root = %#v", lock)
	}
}

func TestAsyncReportAmplifiersAndKinds(t *testing.T) {
	// The whole program has a class and an interface amplifier.
	report := buildAsyncReport(t, true)

	// The class names the method value that makes it async, with its root.
	class := findAsyncRoot(t, report.Amplifiers, asyncCauseShapeClass, "calls of func() int values")
	if len(class.Values) != 1 || !strings.HasPrefix(class.Values[0], "(*example.test/report.cached).get (sync: sync.Mutex.Lock at main.go:11)") ||
		class.Functions != 2 || class.Literals != 0 {
		t.Fatalf("class amplifier = %#v", class)
	}

	// The interface names its async implementation.
	iface := findAsyncRoot(t, report.Amplifiers, asyncCauseInterface, "Source).Next")
	if len(iface.Values) != 1 || !strings.HasPrefix(iface.Values[0], "(*example.test/report.chanSource).Next (channel") {
		t.Fatalf("interface amplifier = %#v", iface)
	}

	// Each kind counts what only its roots make async.
	kinds := make(map[string]AsyncKind)
	for _, kind := range report.Kinds {
		kinds[kind.Kind] = kind
	}
	if got := kinds[asyncCauseChannel]; got.Roots != 1 || got.Functions != 3 || got.Only != 2 {
		t.Fatalf("channel kind = %#v", got)
	}
	if got := kinds[asyncCauseSync]; got.Roots != 1 || got.Functions != 3 || got.Only != 2 {
		t.Fatalf("sync kind = %#v", got)
	}
}

func TestAsyncReportLibraryBuild(t *testing.T) {
	// The report says that it is of a library build.
	report := buildAsyncReport(t, false)
	if report.WholeProgram {
		t.Fatal("expected a library build")
	}

	// A library build keeps the exported interface and the class open.
	iface := findAsyncRoot(t, report.Roots, asyncCauseLibraryBuild, "(example.test/report.Source).Next")
	if iface.Functions != 2 {
		t.Fatalf("library interface root = %#v", iface)
	}
	findAsyncRoot(t, report.Roots, asyncCauseLibraryBuild, "calls of func() int values")
}

func TestAsyncReportWriters(t *testing.T) {
	// Both writers render the report of the whole program.
	report := buildAsyncReport(t, true)

	// The text form lists the kinds, the roots and the amplifiers.
	var text bytes.Buffer
	if err := report.WriteText(&text); err != nil {
		t.Fatal(err)
	}
	for _, want := range []string{
		"async report: 6 of 7 functions and methods are async",
		"[override-interface] (io.Reader).Read",
		"   at main.go:9",
		"chain (*example.test/report.chanSource).Next\n      -> (example.test/report.Source).Next",
		"[shape-class] calls of func() int values",
	} {
		if !strings.Contains(text.String(), want) {
			t.Fatalf("text report lacks %q:\n%s", want, text.String())
		}
	}

	// The JSON form decodes back to the report.
	var buf bytes.Buffer
	if err := report.WriteJSON(&buf); err != nil {
		t.Fatal(err)
	}
	var decoded AsyncReport
	if err := json.Unmarshal(buf.Bytes(), &decoded); err != nil {
		t.Fatal(err)
	}
	if len(decoded.Roots) != len(report.Roots) || decoded.Roots[0].Subject != report.Roots[0].Subject {
		t.Fatalf("decoded report differs: %#v", decoded.Roots)
	}
}

func TestReadableFuncShape(t *testing.T) {
	for shape, want := range map[string]string{
		"(f0,0,0)":                            "func()",
		"(f0,1,1 3:int 4:bool)":               "func(int) bool",
		"(f1,2,2 ? ([] 6:string) ? 5:error)":  "func(_, []string) (_, error)",
		"(f0,1,0 (map 6:string (* 3:int)))":   "func(map[string]*int)",
		"(f0,1,0 (n14:pkg.Box[T any] 3:int))": "func(pkg.Box[int])",
		"(f0,1,0 (chan3 (f0,0,1 5:error)))":   "func(chan func() error)",
	} {
		if got := readableFuncShape(shape); got != want {
			t.Errorf("readableFuncShape(%q) = %q, want %q", shape, got, want)
		}
	}
}
