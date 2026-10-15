package main

import (
	"bytes"
	"encoding/json"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/s4wave/goscript/compiler"
)

// runCompileReport compiles a main package whose receive makes main async,
// with the report flag args, and returns stderr and the generated main.
func runCompileReport(t *testing.T, args ...string) (string, string) {
	t.Helper()
	dir := t.TempDir()
	outputDir := filepath.Join(dir, "output")
	writeFile(t, filepath.Join(dir, "go.mod"), "module example.test/report\n\ngo 1.25.3\n")
	writeFile(t, filepath.Join(dir, "main.go"), strings.Join([]string{
		"package main",
		"func recv(ch chan int) int { return <-ch }",
		"func main() { ch := make(chan int, 1); ch <- 1; _ = recv(ch) }",
		"",
	}, "\n"))

	// The flag goes before the others, with or without a value.
	app := newApp()
	var stderr bytes.Buffer
	app.ErrWriter = &stderr
	cmd := append([]string{"goscript", "compile"}, args...)
	cmd = append(cmd, "--package", ".", "--dir", dir, "--output", outputDir)
	if err := app.Run(cmd); err != nil {
		t.Fatalf("compile command failed: %v", err)
	}
	generated, err := os.ReadFile(filepath.Join(outputDir, "@goscript", "example.test", "report", "main.gs.ts"))
	if err != nil {
		t.Fatal(err)
	}
	return stderr.String(), string(generated)
}

func TestCompileCommandReportsAsync(t *testing.T) {
	// Without the flag there is no report.
	quiet, plain := runCompileReport(t)
	if strings.Contains(quiet, "async report") {
		t.Fatalf("unexpected report:\n%s", quiet)
	}

	// The flag alone writes the text form and does not change the output.
	text, generated := runCompileReport(t, "-report-async")
	if !strings.Contains(text, "async report: 2 of 2 functions and methods are async") ||
		!strings.Contains(text, "[channel] example.test/report.recv") {
		t.Fatalf("text report:\n%s", text)
	}
	if generated != plain {
		t.Fatalf("the report changed the output:\n%s\nwant:\n%s", generated, plain)
	}

	// The json value writes JSON.
	out, _ := runCompileReport(t, "--report-async=json")
	var report compiler.AsyncReport
	if err := json.Unmarshal([]byte(out), &report); err != nil {
		t.Fatalf("decode JSON report: %v\n%s", err, out)
	}
	if report.AsyncFunctions != 2 || len(report.Roots) == 0 {
		t.Fatalf("JSON report = %#v", report)
	}
}

func TestReportAsyncFlagRejectsUnknownFormat(t *testing.T) {
	var flag reportAsyncFlag
	if err := flag.Set("xml"); err == nil {
		t.Fatal("expected an error for an unknown format")
	}
}
