package gotest

// Test describes one discovered Go test function.
type Test struct {
	// Name is the Go TestXxx or BenchmarkXxx function name.
	Name string
	// PackagePath is the package variant that exports the function.
	PackagePath string
	// Benchmark is whether this is a BenchmarkXxx function, which takes a
	// *testing.B instead of a *testing.T.
	Benchmark bool
}
