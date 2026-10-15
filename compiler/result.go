package compiler

// CompilationResult describes a compiler run after adapter normalization.
type CompilationResult struct {
	// CompiledPackages contains package paths compiled to TypeScript.
	CompiledPackages []string
	// CopiedPackages contains package paths copied from override packages.
	CopiedPackages []string
	// OriginalPackages contains the package patterns or package paths requested.
	OriginalPackages []string
	// Diagnostics contains all diagnostics produced by the compile request.
	Diagnostics []Diagnostic
	// AsyncReport tells where the program's async functions come from, when
	// the request asked for it.
	AsyncReport *AsyncReport
}
