package compiler

import (
	"context"
	"path/filepath"
	"strings"
	"testing"
)

func TestWholeProgramBuild(t *testing.T) {
	moduleDir := writePackageGraphFixture(t, map[string]string{
		"go.mod": "module example.test/wholeprogram\n\ngo 1.25.3\n",
		"main.go": strings.Join([]string{
			"package main",
			"import \"example.test/wholeprogram/used\"",
			"func main() { used.Use() }",
			"",
		}, "\n"),
		"used/used.go":     "package used\n\nfunc Use() {}\n",
		"unused/unused.go": "package unused\n\nfunc Unused() {}\n",
	})
	for _, tc := range []struct {
		name     string
		patterns []string
		mode     DependencyMode
		tests    bool
		want     bool
	}{
		{name: "main", patterns: []string{"."}, mode: DependencyModeAll, want: true},
		{name: "main and its dependency", patterns: []string{".", "./used"}, mode: DependencyModeAll, want: true},
		{name: "library", patterns: []string{"./used"}, mode: DependencyModeAll},
		{name: "main and an unused library", patterns: []string{".", "./unused"}, mode: DependencyModeAll},
		{name: "main without dependencies", patterns: []string{"."}, mode: DependencyModeRequested},
		{name: "test binary", patterns: []string{"./used"}, mode: DependencyModeAll, tests: true, want: true},
	} {
		t.Run(tc.name, func(t *testing.T) {
			req := &CompileRequest{
				Patterns:            tc.patterns,
				Dir:                 moduleDir,
				OutputPath:          filepath.Join(t.TempDir(), "out"),
				DependencyMode:      tc.mode,
				RuntimeEmissionMode: RuntimeEmissionModeEmit,
				Tests:               tc.tests,
			}
			graph := loadPackageGraph(t, req)
			if got := wholeProgramBuild(req, graph); got != tc.want {
				t.Fatalf("wholeProgramBuild = %v, want %v", got, tc.want)
			}
		})
	}
}

func TestSemanticModelClosesExportedInterfacesInWholeProgram(t *testing.T) {
	// One interface has only compiled implementations, and an override type
	// implements the other.
	moduleDir := writePackageGraphFixture(t, map[string]string{
		"go.mod": "module example.test/closed\n\ngo 1.25.3\n",
		"main.go": strings.Join([]string{
			"package main",
			"import \"errors\"",
			// Shape's implementations are all sync compiled methods.
			"type Shape interface { Area() int }",
			"type Rect struct{ w, h int }",
			"func (r Rect) Area() int { return r.w * r.h }",
			"func area(s Shape) int { return s.Area() }",
			// Override types such as the errors package's implement Errorer.
			"type Errorer interface { Error() string }",
			"type myErr struct{}",
			"func (myErr) Error() string { return \"x\" }",
			"func message(e Errorer) string { return e.Error() }",
			// Wrapped forwards to Errorer, which stays open.
			"type Wrapped interface { Error() string; Unwrap() error }",
			"type wrapper struct{ Errorer }",
			"func (wrapper) Unwrap() error { return nil }",
			"func unwrapMessage(w Wrapped) string { return w.Error() }",
			"func main() {",
			"  _ = area(Rect{})",
			"  _ = message(myErr{})",
			"  _ = message(errors.New(\"y\"))",
			"  _ = unwrapMessage(wrapper{myErr{}})",
			"}",
			"",
		}, "\n"),
	})
	req := &CompileRequest{
		Patterns:            []string{"."},
		Dir:                 moduleDir,
		OutputPath:          filepath.Join(t.TempDir(), "out"),
		DependencyMode:      DependencyModeAll,
		RuntimeEmissionMode: RuntimeEmissionModeEmit,
	}
	graph := loadPackageGraph(t, req)
	if !wholeProgramBuild(req, graph) {
		t.Fatal("expected a whole program build")
	}

	// Only a whole program build closes the interface of compiled code.
	for _, tc := range []struct {
		fn               string
		library, program bool
	}{
		{fn: "area", library: true, program: false},
		{fn: "message", library: true, program: true},
		{fn: "unwrapMessage", library: true, program: true},
	} {
		for _, wholeProgram := range []bool{false, true} {
			model, diagnostics := NewSemanticModelOwner(NewOverrideRegistryOwner()).Build(
				context.Background(), graph, SemanticBuildOptions{WholeProgram: wholeProgram})
			if diagnosticsHaveErrors(diagnostics) {
				t.Fatalf("semantic model build failed: %#v", diagnostics)
			}
			want := tc.library
			if wholeProgram {
				want = tc.program
			}
			semFn := model.functions[requireDefinedFunc(t, graph, "example.test/closed", tc.fn)]
			if semFn == nil || semFn.async != want {
				t.Fatalf("whole program %v: %s async = %v, want %v", wholeProgram, tc.fn, semFn != nil && semFn.async, want)
			}
		}
	}
}

func TestSemanticModelTrustsSyncOverrideInterfaces(t *testing.T) {
	moduleDir := writePackageGraphFixture(t, map[string]string{
		"go.mod": "module example.test/trusted\n\ngo 1.25.3\n",
		"main.go": strings.Join([]string{
			"package main",
			"import (",
			"  \"fmt\"",
			"  \"os\"",
			"  \"reflect\"",
			"  \"time\"",
			")",
			// reflect.Type is declared sync by the reflect metadata.
			"func kind(t reflect.Type) reflect.Kind { return t.Kind() }",
			// time.Duration's String is trusted as a fmt.Stringer.
			"type Namer interface { String() string }",
			"func name(n Namer) string { return n.String() }",
			"func stringer(s fmt.Stringer) string { return s.String() }",
			// *os.File's Name is not a method of a sync interface.
			"type Named interface { Name() string }",
			"func fileName(n Named) string { return n.Name() }",
			"func main() {",
			"  _ = kind(reflect.TypeOf(0))",
			"  _ = name(time.Second)",
			"  _ = stringer(time.Second)",
			"  _ = fileName(os.Stdout)",
			"}",
			"",
		}, "\n"),
	})
	req := &CompileRequest{
		Patterns:            []string{"."},
		Dir:                 moduleDir,
		OutputPath:          filepath.Join(t.TempDir(), "out"),
		DependencyMode:      DependencyModeAll,
		RuntimeEmissionMode: RuntimeEmissionModeEmit,
	}
	graph := loadPackageGraph(t, req)

	for _, tc := range []struct {
		fn               string
		library, program bool
	}{
		{fn: "kind", library: true, program: false},
		{fn: "name", library: true, program: false},
		{fn: "stringer", library: true, program: false},
		{fn: "fileName", library: true, program: true},
	} {
		for _, wholeProgram := range []bool{false, true} {
			model, diagnostics := NewSemanticModelOwner(NewOverrideRegistryOwner()).Build(
				context.Background(), graph, SemanticBuildOptions{WholeProgram: wholeProgram})
			if diagnosticsHaveErrors(diagnostics) {
				t.Fatalf("semantic model build failed: %#v", diagnostics)
			}
			want := tc.library
			if wholeProgram {
				want = tc.program
			}
			semFn := model.functions[requireDefinedFunc(t, graph, "example.test/trusted", tc.fn)]
			if semFn == nil || semFn.async != want {
				t.Fatalf("whole program %v: %s async = %v, want %v", wholeProgram, tc.fn, semFn != nil && semFn.async, want)
			}
		}
	}
}

// TestOverrideBoundarySkipsUnexportedFields checks that the override boundary
// does not walk the unexported fields of compiled types: crypto/rand.Int
// exposes *big.Int, whose Rand method exposes *rand.Rand, but not the
// rand.Source in its unexported src field, so a local interface with
// Source's methods stays closed.
func TestOverrideBoundarySkipsUnexportedFields(t *testing.T) {
	model, diagnostics, _ := buildDirectiveModel(t, strings.Join([]string{
		"package main",
		"import (",
		"  \"crypto/rand\"",
		"  \"math/big\"",
		")",
		"type source interface { Int63() int64; Seed(seed int64) }",
		"type counter struct{ n int64 }",
		"func (c *counter) Int63() int64 { c.n++; return c.n }",
		"func (c *counter) Seed(seed int64) { c.n = seed }",
		"func next(s source) int64 { return s.Int63() }",
		"func main() {",
		"  _, _ = rand.Int(rand.Reader, big.NewInt(10))",
		"  _ = next(&counter{})",
		"}",
		"",
	}, "\n"))
	if diagnosticsHaveErrors(diagnostics) {
		t.Fatalf("semantic model build failed: %#v", diagnostics)
	}
	if semFn := model.functionsByFullName["example.test/directives.next"]; semFn == nil || semFn.async {
		t.Fatalf("next async = %v, want false", semFn != nil && semFn.async)
	}
}

func TestSemanticModelPullValuesSuspend(t *testing.T) {
	// gen is pulled and strs only ranged over; neither suspends by itself.
	moduleDir := writePackageGraphFixture(t, map[string]string{
		"go.mod": "module example.test/pull\n\ngo 1.25.3\n",
		"main.go": strings.Join([]string{
			"package main",
			"import \"iter\"",
			"func gen(yield func(int) bool) { yield(1) }",
			"func strs(yield func(string) bool) { yield(\"a\") }",
			"func first() int {",
			"  next, stop := iter.Pull(gen)",
			"  defer stop()",
			"  v, _ := next()",
			"  return v",
			"}",
			"func count() int {",
			"  n := 0",
			"  for range strs { n++ }",
			"  return n",
			"}",
			"func main() { _ = first(); _ = count() }",
			"",
		}, "\n"),
	})
	req := &CompileRequest{
		Patterns:            []string{"."},
		Dir:                 moduleDir,
		OutputPath:          filepath.Join(t.TempDir(), "out"),
		DependencyMode:      DependencyModeAll,
		RuntimeEmissionMode: RuntimeEmissionModeEmit,
	}
	graph := loadPackageGraph(t, req)
	model, diagnostics := NewSemanticModelOwner(NewOverrideRegistryOwner()).Build(
		context.Background(), graph, SemanticBuildOptions{WholeProgram: true})
	if diagnosticsHaveErrors(diagnostics) {
		t.Fatalf("semantic model build failed: %#v", diagnostics)
	}

	// Pull's yield suspends gen, and next and stop suspend first; the yield
	// of a range loop over strings stays sync.
	for name, want := range map[string]bool{"gen": true, "first": true, "strs": false, "count": false} {
		semFn := model.functions[requireDefinedFunc(t, graph, "example.test/pull", name)]
		if semFn == nil || semFn.async != want {
			t.Fatalf("%s async = %v, want %v", name, semFn != nil && semFn.async, want)
		}
	}
}
