package compiler

import (
	"context"
	"path/filepath"
	"strings"
	"testing"
)

// buildDirectiveModel builds the whole-program semantic model of a main
// package with the given source, with an async report.
func buildDirectiveModel(t *testing.T, source string) (*SemanticModel, []Diagnostic, string) {
	t.Helper()
	moduleDir := writePackageGraphFixture(t, map[string]string{
		"go.mod":  "module example.test/directives\n\ngo 1.25.3\n",
		"main.go": source,
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
		context.Background(), graph, SemanticBuildOptions{WholeProgram: true, ReportAsync: true})
	return model, diagnostics, moduleDir
}

func TestAsyncDirectivesColorCalls(t *testing.T) {
	model, diagnostics, moduleDir := buildDirectiveModel(t, strings.Join([]string{
		"package main",
		// Every implementation of Logger is sync, but the directive makes
		// calls of Log async.
		"//goscript:async",
		"type Logger interface { Log() int }",
		"type plain struct{}",
		"func (plain) Log() int { return 1 }",
		"func viaLogger(l Logger) int { return l.Log() }",
		// Put has an async implementation, but the directive keeps its calls
		// sync.
		"type Sink interface {",
		"  //goscript:sync",
		"  Put() int",
		"}",
		"type chanSink struct{ ch chan int }",
		"func (s chanSink) Put() int { return <-s.ch }",
		"func viaSink(s Sink) int { return s.Put() }",
		// The class of func() int is async, but calls through Thunk are sync.
		"//goscript:sync",
		"type Thunk func() int",
		"func viaThunk(f Thunk) int { return f() }",
		"func viaFunc(f func() int) int { return f() }",
		// OnClick's calls are async whatever the values.
		"type Button struct {",
		"  //goscript:async",
		"  OnClick func(int) int",
		"}",
		"func click(b *Button) int { return b.OnClick(1) }",
		// wait calls an async function value, but the directive keeps it and
		// its callers sync.
		"//goscript:sync",
		"func wait(f func() int) int { return f() }",
		"func callsWait() int { return wait(func() int { return 2 }) }",
		"func main() {",
		"  ch := make(chan int)",
		"  _ = viaLogger(plain{})",
		"  _ = viaSink(chanSink{ch: ch})",
		"  _ = viaThunk(func() int { return <-ch })",
		"  _ = viaFunc(func() int { return 1 })",
		"  _ = click(&Button{OnClick: func(n int) int { return n }})",
		"  _ = callsWait()",
		"}",
		"",
	}, "\n"))
	if diagnosticsHaveErrors(diagnostics) {
		t.Fatalf("semantic model build failed: %#v", diagnostics)
	}

	// Each function is async exactly as its directives decide.
	for fn, want := range map[string]bool{
		"viaLogger": true,
		"viaSink":   false,
		"viaThunk":  false,
		"viaFunc":   true,
		"click":     true,
		"wait":      false,
		"callsWait": false,
	} {
		semFn := model.functionsByFullName["example.test/directives."+fn]
		if semFn == nil || semFn.async != want {
			t.Errorf("%s async = %v, want %v", fn, semFn != nil && semFn.async, want)
		}
	}

	// The report lists the directive roots and the cuts.
	report := model.asyncReport.relativeTo(moduleDir)
	findAsyncRoot(t, report.Roots, asyncCauseDirective, "Log")
	findAsyncRoot(t, report.Roots, asyncCauseDirective, "click")
	if len(report.Cuts) != 3 {
		t.Fatalf("cuts = %#v, want Put, Thunk and wait", report.Cuts)
	}
	for idx, want := range []struct{ subject, reason string }{
		{"Put", "keeps it sync against"},
		{"directives.Thunk", "other calls of its shape are async"},
		{"directives.wait", "keeps it sync against"},
	} {
		cut := report.Cuts[idx]
		if !strings.HasSuffix(cut.Subject, want.subject) || !strings.Contains(cut.Reason, want.reason) {
			t.Errorf("cut %d = %#v, want %s: %s", idx, cut, want.subject, want.reason)
		}
	}
}

func TestAsyncDirectiveErrors(t *testing.T) {
	for _, tc := range []struct {
		name, source, want string
	}{
		{
			name: "channel operation in a sync function",
			source: "//goscript:sync\nfunc recv(ch chan int) int { return <-ch }\n" +
				"func main() { _ = recv(make(chan int, 1)) }\n",
			want: "channel receive",
		},
		{
			name: "mutex lock in a sync function",
			source: "import \"sync\"\nvar mu sync.Mutex\n//goscript:sync\nfunc lock() { mu.Lock(); mu.Unlock() }\n" +
				"func main() { lock() }\n",
			want: "sync.Mutex.Lock",
		},
		{
			name: "call of an async function from a sync function",
			source: "func recv(ch chan int) int { return <-ch }\n" +
				"//goscript:sync\nfunc outer(ch chan int) int { return recv(ch) }\n" +
				"func main() { _ = outer(make(chan int, 1)) }\n",
			want: "it calls example.test/directives.recv, which may suspend",
		},
		{
			name:   "async directive on a function",
			source: "//goscript:async\nfunc f() {}\nfunc main() { f() }\n",
			want:   "a function's own body decides whether it is async",
		},
		{
			name:   "directive on a variable that is not a function",
			source: "//goscript:sync\nvar n int\nfunc main() { _ = n }\n",
			want:   "applies to interface types",
		},
	} {
		t.Run(tc.name, func(t *testing.T) {
			_, diagnostics, _ := buildDirectiveModel(t, "package main\n"+tc.source)
			for _, diag := range diagnostics {
				if diag.Severity == DiagnosticSeverityError && strings.Contains(diag.Message, tc.want) {
					if diag.Position == nil || diag.Position.Line == 0 {
						t.Errorf("error without a position: %#v", diag)
					}
					return
				}
			}
			t.Fatalf("no error containing %q in %#v", tc.want, diagnostics)
		})
	}
}
