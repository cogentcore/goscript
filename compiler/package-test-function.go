package compiler

// PackageTestFunction describes one discovered ordinary Go test function.
type PackageTestFunction struct {
	// Name is the Go TestXxx or BenchmarkXxx function name.
	Name string
	// PackagePath is the package variant that exports the function.
	PackagePath string
}
