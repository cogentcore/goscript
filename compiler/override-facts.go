package compiler

import (
	"bytes"
	"context"
	"errors"
	"go/ast"
	"go/parser"
	"go/token"
	"io"
	"io/fs"
	"maps"
	"os"
	"path"
	"path/filepath"
	"regexp"
	"slices"
	"strings"

	jsoniter "github.com/aperturerobotics/json-iterator-lite"
	gs "github.com/s4wave/goscript"
)

var (
	overrideBehaviorTestIdentifierPattern      = regexp.MustCompile(`\b[A-Za-z_$][A-Za-z0-9_$]*\b`)
	overrideBehaviorTestNamedImportPattern     = regexp.MustCompile(`(?s)import\s+(type\s+)?\{([^}]*)\}\s+from\s+['"]\.[^'"]*['"]`)
	overrideBehaviorTestNamespaceImportPattern = regexp.MustCompile(`import\s+\*\s+as\s+([A-Za-z_$][A-Za-z0-9_$]*)\s+from\s+['"]\.[^'"]*['"]`)
)

// OverrideFacts is the immutable compiler-visible view of GoScript overrides.
type OverrideFacts struct {
	packages map[string]overridePackageFacts
}

type overridePackageFacts struct {
	metadata            OverrideMetadata
	parity              overrideParityLedger
	behaviorTestSymbols map[string]bool
	copyPackage         overrideCopyPackage
	dependencies        []string
}

type overridePackageRoot struct {
	pkgPath  string
	fsys     fs.FS
	dir      string
	embedded bool
}

// HasPackage returns true when pkgPath has a GoScript override package.
func (f *OverrideFacts) HasPackage(pkgPath string) bool {
	if f == nil || pkgPath == "" {
		return false
	}
	_, ok := f.packages[pkgPath]
	return ok
}

// Metadata returns compiler-visible override metadata for a package path.
func (f *OverrideFacts) Metadata(pkgPath string) OverrideMetadata {
	if f == nil {
		return newOverrideMetadata()
	}
	pkg := f.packages[pkgPath]
	return cloneOverrideMetadata(pkg.metadata)
}

func (f *OverrideFacts) parityLedger(pkgPath string) overrideParityLedger {
	if f == nil {
		return newOverrideParityLedger()
	}
	pkg := f.packages[pkgPath]
	return cloneOverrideParityLedger(pkg.parity)
}

// behaviorTestSymbols returns the symbols the package's behavior tests
// exercise, or nil when its tests are unavailable.
func (f *OverrideFacts) behaviorTestSymbols(pkgPath string) map[string]bool {
	if f == nil {
		return nil
	}
	return maps.Clone(f.packages[pkgPath].behaviorTestSymbols)
}

// IsMethodAsync returns true when override metadata marks a method async.
func (f *OverrideFacts) IsMethodAsync(pkgPath, method string) bool {
	if f == nil {
		return false
	}
	pkg := f.packages[pkgPath]
	return pkg.metadata.AsyncMethods[method]
}

// AwaitsCallback returns true when override metadata names param of the
// package-level function or Type.Method callee as a callback the runtime awaits.
func (f *OverrideFacts) AwaitsCallback(pkgPath, callee, param string) bool {
	if f == nil {
		return false
	}
	pkg := f.packages[pkgPath]
	return slices.Contains(pkg.metadata.AsyncCallbacks[callee], param)
}

// IsFunctionCallbackAsync returns true when override metadata marks a
// package-level function async exactly when one of its function arguments is.
func (f *OverrideFacts) IsFunctionCallbackAsync(pkgPath, function string) bool {
	if f == nil {
		return false
	}
	pkg := f.packages[pkgPath]
	return pkg.metadata.CallbackAsyncFunctions[function]
}

// AsyncWhenMethods returns the method names whose async implementations make
// the package-level function async, per override metadata.
func (f *OverrideFacts) AsyncWhenMethods(pkgPath, function string) []string {
	if f == nil {
		return nil
	}
	pkg := f.packages[pkgPath]
	return pkg.metadata.AsyncWhenMethods[function]
}

// IsFunctionAsync returns true when override metadata marks a package-level function async.
func (f *OverrideFacts) IsFunctionAsync(pkgPath, function string) bool {
	if f == nil {
		return false
	}
	pkg := f.packages[pkgPath]
	return pkg.metadata.AsyncFunctions[function]
}

func (f *OverrideFacts) copyPackage(pkgPath string) (overrideCopyPackage, []string, bool) {
	if f == nil {
		return overrideCopyPackage{}, nil, false
	}
	pkg, ok := f.packages[pkgPath]
	if !ok {
		return overrideCopyPackage{}, nil, false
	}
	return cloneOverrideCopyPackage(pkg.copyPackage), slices.Clone(pkg.dependencies), true
}

// importPackageRoot returns the override package that provides importPath, the
// longest package path prefix of the import with an override.
func (f *OverrideFacts) importPackageRoot(importPath string) (string, bool) {
	// Nil facts have no packages.
	if f == nil {
		return "", false
	}

	// Reduce the TypeScript import specifier to a package-style path.
	importPath = strings.TrimPrefix(importPath, "@goscript/")
	importPath = strings.TrimSuffix(importPath, ".js")
	importPath = strings.TrimSuffix(importPath, ".ts")
	if before, ok := strings.CutSuffix(importPath, "/index"); ok {
		importPath = before
	}

	// Match the longest prefix that names an override package.
	parts := strings.Split(importPath, "/")
	for idx := len(parts); idx > 0; idx-- {
		candidate := strings.Join(parts[:idx], "/")
		if f.HasPackage(candidate) {
			return candidate, true
		}
	}
	return "", false
}

// buildOverrideFacts reads every override package under overrideDirs and the
// embedded gs tree. A package in overrideDirs replaces the embedded one.
func buildOverrideFacts(ctx context.Context, overrideDirs []string) (*OverrideFacts, []Diagnostic) {
	// Discover the package roots and visit them in a stable order.
	roots, diagnostics := discoverOverridePackageRoots(overrideDirs)
	if diagnosticsHaveErrors(diagnostics) {
		return nil, diagnostics
	}
	paths := slices.Sorted(maps.Keys(roots))

	// Index the golden tests when the compiler runs in its source tree.
	sourceDir, inSource := findGoscriptSourceDir()
	var goldenBehaviorTests map[string]map[string]bool
	if inSource {
		goldenBehaviorTests = loadGoldenBehaviorTests(filepath.Join(sourceDir, "tests", "tests"))
	}

	// Build each package's facts, stopping when the context ends.
	facts := &OverrideFacts{packages: make(map[string]overridePackageFacts, len(paths))}
	for _, pkgPath := range paths {
		if err := ctx.Err(); err != nil {
			return facts, []Diagnostic{contextCanceledDiagnostic(err)}
		}

		// Read the package's metadata, parity ledger, and sources.
		metadata, err := loadOverrideMetadata(roots[pkgPath])
		if err != nil {
			diagnostics = append(diagnostics, overrideError("read override metadata", pkgPath, err))
			continue
		}
		parity, err := loadOverrideParityLedger(roots[pkgPath])
		if err != nil {
			diagnostics = append(diagnostics, overrideError("read override parity ledger", pkgPath, err))
			continue
		}
		copyPackage, dependencies, packageDiagnostics := loadOverrideCopyPackage(roots[pkgPath], roots, metadata)
		diagnostics = append(diagnostics, packageDiagnostics...)
		if diagnosticsHaveErrors(packageDiagnostics) {
			continue
		}

		// The embedded gs tree ships without its tests, so its packages read
		// them from the goscript source tree and go unchecked outside it.
		var behaviorTests map[string]bool
		if root := roots[pkgPath]; !root.embedded || inSource {
			if root.embedded {
				root.fsys = os.DirFS(sourceDir)
			}
			behaviorTests, err = loadOverrideBehaviorTests(root, roots)
			if err != nil {
				diagnostics = append(diagnostics, overrideError("read override behavior tests", pkgPath, err))
				continue
			}
			maps.Copy(behaviorTests, goldenBehaviorTests[pkgPath])
		}

		// Record the package's facts.
		facts.packages[pkgPath] = overridePackageFacts{
			metadata:            cloneOverrideMetadata(metadata),
			parity:              cloneOverrideParityLedger(parity),
			behaviorTestSymbols: behaviorTests,
			copyPackage:         copyPackage,
			dependencies:        dependencies,
		}
	}
	return facts, diagnostics
}

// discoverOverridePackageRoots finds the override packages in overrideDirs and
// the embedded gs tree, keyed by Go package path.
func discoverOverridePackageRoots(overrideDirs []string) (map[string]overridePackageRoot, []Diagnostic) {
	// Discover the packages in each override directory.
	roots := make(map[string]overridePackageRoot)
	var diagnostics []Diagnostic
	for _, dir := range overrideDirs {
		dir = strings.TrimSpace(dir)
		if dir == "" {
			continue
		}
		abs, err := filepath.Abs(dir)
		if err != nil {
			diagnostics = append(diagnostics, overrideError("resolve override directory", dir, err))
			continue
		}
		if err := discoverOverridePackageRootsInFS(roots, os.DirFS(abs), ".", false); err != nil {
			diagnostics = append(diagnostics, overrideError("discover override packages", abs, err))
		}
	}

	// Fill the remaining package paths from the embedded gs tree.
	if err := discoverOverridePackageRootsInFS(roots, gs.GsOverrides, "gs", true); err != nil {
		diagnostics = append(diagnostics, overrideError("discover override packages", "embedded gs", err))
	}
	return roots, diagnostics
}

// discoverOverridePackageRootsInFS adds a root for each directory under rootDir
// in fsys that holds an index.ts. An embedded root never replaces one already
// found.
func discoverOverridePackageRootsInFS(
	roots map[string]overridePackageRoot,
	fsys fs.FS,
	rootDir string,
	embedded bool,
) error {
	return fs.WalkDir(fsys, rootDir, func(filePath string, entry fs.DirEntry, err error) error {
		// Visit only package entry files.
		if err != nil {
			return err
		}
		if entry.IsDir() || path.Base(filePath) != "index.ts" {
			return nil
		}

		// Name the package by its directory below rootDir.
		dir := path.Dir(filePath)
		pkgPath := strings.TrimPrefix(dir, rootDir+"/")
		if pkgPath == "." {
			return nil
		}
		if _, exists := roots[pkgPath]; !exists || !embedded {
			roots[pkgPath] = overridePackageRoot{
				pkgPath:  pkgPath,
				fsys:     fsys,
				dir:      dir,
				embedded: embedded,
			}
		}
		return nil
	})
}

// packagePath returns the Go package path of filePath, a path in the root's
// directory tree.
func (root overridePackageRoot) packagePath(filePath string) string {
	return path.Join(root.pkgPath, strings.TrimPrefix(filePath, root.dir))
}

// ownsDir reports whether dir belongs to the root's package rather than to a
// nested override package.
func (root overridePackageRoot) ownsDir(dir string, roots map[string]overridePackageRoot) bool {
	nestedPkg := root.packagePath(dir)
	_, nested := roots[nestedPkg]
	return nestedPkg == root.pkgPath || !nested
}

// loadOverrideMetadata reads the root's meta.json, which is optional.
func loadOverrideMetadata(root overridePackageRoot) (OverrideMetadata, error) {
	// Read the file, treating a missing one as empty metadata.
	metadata := newOverrideMetadata()
	data, err := fs.ReadFile(root.fsys, path.Join(root.dir, "meta.json"))
	if err != nil {
		if errors.Is(err, fs.ErrNotExist) {
			return metadata, nil
		}
		return OverrideMetadata{}, err
	}

	// Decode the known fields and skip the rest.
	iter := jsoniter.ParseBytes(data)
	for field := iter.ReadObject(); field != ""; field = iter.ReadObject() {
		switch field {
		case "dependencies":
			for iter.ReadArray() {
				metadata.Dependencies = append(metadata.Dependencies, iter.ReadString())
			}
		case "nativeDependencies":
			for iter.ReadArray() {
				metadata.NativeDependencies = append(metadata.NativeDependencies, iter.ReadString())
			}
		case "asyncMethods":
			for method := iter.ReadObject(); method != ""; method = iter.ReadObject() {
				metadata.AsyncMethods[method] = iter.ReadBool()
			}
		case "asyncFunctions":
			for function := iter.ReadObject(); function != ""; function = iter.ReadObject() {
				metadata.AsyncFunctions[function] = iter.ReadBool()
			}
		case "callbackAsyncFunctions":
			for function := iter.ReadObject(); function != ""; function = iter.ReadObject() {
				metadata.CallbackAsyncFunctions[function] = iter.ReadBool()
			}
		case "asyncCallbacks":
			for callee := iter.ReadObject(); callee != ""; callee = iter.ReadObject() {
				for iter.ReadArray() {
					metadata.AsyncCallbacks[callee] = append(metadata.AsyncCallbacks[callee], iter.ReadString())
				}
			}
		case "asyncWhenMethods":
			for function := iter.ReadObject(); function != ""; function = iter.ReadObject() {
				for iter.ReadArray() {
					metadata.AsyncWhenMethods[function] = append(metadata.AsyncWhenMethods[function], iter.ReadString())
				}
			}
		default:
			iter.Skip()
		}
	}
	if iter.Error != nil && !errors.Is(iter.Error, io.EOF) {
		return OverrideMetadata{}, iter.Error
	}
	return metadata, nil
}

// loadOverrideCopyPackage reads the root's TypeScript sources and the override
// packages they and the metadata depend on.
func loadOverrideCopyPackage(
	root overridePackageRoot,
	roots map[string]overridePackageRoot,
	metadata OverrideMetadata,
) (overrideCopyPackage, []string, []Diagnostic) {
	// Require the package to be a discovered root.
	pkgPath := root.pkgPath
	if _, ok := roots[pkgPath]; !ok {
		return overrideCopyPackage{}, nil, []Diagnostic{{
			Severity: DiagnosticSeverityError,
			Code:     "goscript/overrides:missing-package",
			Message:  "override package does not exist",
			Detail:   pkgPath,
		}}
	}

	// Index the package paths so imports resolve to their override package.
	facts := &OverrideFacts{packages: make(map[string]overridePackageFacts, len(roots))}
	for root := range roots {
		facts.packages[root] = overridePackageFacts{}
	}

	// Seed the dependencies the metadata declares.
	copyPackage := overrideCopyPackage{path: pkgPath}
	dependencySet := make(map[string]bool)
	for _, dependency := range metadata.Dependencies {
		dependency = strings.TrimSpace(dependency)
		if dependency != "" && dependency != pkgPath {
			dependencySet[dependency] = true
		}
	}

	// Copy each source outside nested packages and add the packages it imports.
	err := fs.WalkDir(root.fsys, root.dir, func(filePath string, entry fs.DirEntry, walkErr error) error {
		// Skip directories that belong to nested packages.
		if walkErr != nil {
			return walkErr
		}
		if entry.IsDir() {
			if !root.ownsDir(filePath, roots) {
				return fs.SkipDir
			}
			return nil
		}
		if !isOverrideSourceFile(filePath) {
			return nil
		}

		// Copy the source under its package path and collect its imports.
		data, readErr := fs.ReadFile(root.fsys, filePath)
		if readErr != nil {
			return readErr
		}
		copyPackage.files = append(copyPackage.files, overrideCopyFile{
			path: root.packagePath(filePath),
			data: data,
		})
		for _, imported := range scanOverrideImports(string(data)) {
			dependency, ok := facts.importPackageRoot(imported)
			if ok && dependency != "builtin" && dependency != pkgPath {
				dependencySet[dependency] = true
			}
		}
		return nil
	})
	if err != nil {
		return overrideCopyPackage{}, nil, []Diagnostic{overrideError("read override package", pkgPath, err)}
	}

	// Reject a package with no sources and order the ones it has.
	if len(copyPackage.files) == 0 {
		return overrideCopyPackage{}, nil, []Diagnostic{{
			Severity: DiagnosticSeverityError,
			Code:     "goscript/overrides:empty-package",
			Message:  "override package does not contain TypeScript source files",
			Detail:   pkgPath,
		}}
	}
	slices.SortFunc(copyPackage.files, func(a, b overrideCopyFile) int {
		return strings.Compare(a.path, b.path)
	})
	return copyPackage, slices.Sorted(maps.Keys(dependencySet)), nil
}

// loadOverrideBehaviorTests returns the package symbols that the root's
// .test.ts files exercise, excluding nested packages.
func loadOverrideBehaviorTests(
	root overridePackageRoot,
	roots map[string]overridePackageRoot,
) (map[string]bool, error) {
	symbols := make(map[string]bool)
	err := fs.WalkDir(root.fsys, root.dir, func(filePath string, entry fs.DirEntry, walkErr error) error {
		// Skip directories that belong to nested packages.
		if walkErr != nil {
			return walkErr
		}
		if entry.IsDir() {
			if !root.ownsDir(filePath, roots) {
				return fs.SkipDir
			}
			return nil
		}
		if !strings.HasSuffix(filePath, ".test.ts") {
			return nil
		}

		// Add the symbols this test file exercises.
		data, readErr := fs.ReadFile(root.fsys, filePath)
		if readErr != nil {
			return readErr
		}
		maps.Copy(symbols, scanOverrideBehaviorTestSymbols(string(data)))
		return nil
	})
	if err != nil {
		return nil, err
	}
	return symbols, nil
}

// scanOverrideBehaviorTestSymbols returns the imported symbols a test file's
// code uses, by named import or by namespace selector.
func scanOverrideBehaviorTestSymbols(data string) map[string]bool {
	// Collect the identifiers in the code outside imports, comments, and strings.
	body := stripTypeScriptCommentsAndStrings(typeScriptBodyWithoutImports(data))
	bodyIdentifiers := make(map[string]bool)
	for _, match := range overrideBehaviorTestIdentifierPattern.FindAllString(body, -1) {
		bodyIdentifiers[match] = true
	}

	// Keep each value named import the code uses.
	symbols := make(map[string]bool)
	for _, match := range overrideBehaviorTestNamedImportPattern.FindAllStringSubmatch(data, -1) {
		if match[1] != "" {
			continue
		}
		for _, namedImport := range parseNamedTypeScriptExports(match[2], false) {
			if bodyIdentifiers[namedImport.target] {
				symbols[namedImport.source] = true
			}
		}
	}

	// Keep each member the code selects from a namespace import.
	for _, match := range overrideBehaviorTestNamespaceImportPattern.FindAllStringSubmatch(data, -1) {
		namespaceSelectorPattern := regexp.MustCompile(`\b` + regexp.QuoteMeta(match[1]) + `\.([A-Za-z_$][A-Za-z0-9_$]*)\b`)
		for _, selector := range namespaceSelectorPattern.FindAllStringSubmatch(body, -1) {
			symbols[selector[1]] = true
		}
	}
	return symbols
}

// typeScriptBodyWithoutImports blanks the import statements in data, keeping
// its line structure.
func typeScriptBodyWithoutImports(data string) string {
	var body strings.Builder
	inImport := false
	for line := range strings.SplitAfterSeq(data, "\n") {
		trimmed := strings.TrimSpace(line)
		if !inImport && strings.HasPrefix(trimmed, "import ") {
			if !strings.Contains(trimmed, " from ") &&
				!strings.HasPrefix(trimmed, `import "`) &&
				!strings.HasPrefix(trimmed, `import '`) {
				inImport = true
			}
			body.WriteByte('\n')
			continue
		}
		if inImport {
			if strings.Contains(trimmed, " from ") {
				inImport = false
			}
			body.WriteByte('\n')
			continue
		}
		body.WriteString(line)
	}
	return body.String()
}

// stripTypeScriptCommentsAndStrings blanks the comments and string literals in
// data, keeping its line structure.
func stripTypeScriptCommentsAndStrings(data string) string {
	// Track the lexical mode of the current byte.
	var body strings.Builder
	const (
		modeCode = iota
		modeLineComment
		modeBlockComment
		modeSingleString
		modeDoubleString
		modeTemplateString
	)
	mode := modeCode
	escaped := false
	for i := 0; i < len(data); i++ {
		ch := data[i]
		next := byte(0)
		if i+1 < len(data) {
			next = data[i+1]
		}
		switch mode {
		case modeCode:
			switch {
			case ch == '/' && next == '/':
				body.WriteByte(' ')
				body.WriteByte(' ')
				i++
				mode = modeLineComment
			case ch == '/' && next == '*':
				body.WriteByte(' ')
				body.WriteByte(' ')
				i++
				mode = modeBlockComment
			case ch == '\'':
				body.WriteByte(' ')
				mode = modeSingleString
			case ch == '"':
				body.WriteByte(' ')
				mode = modeDoubleString
			case ch == '`':
				body.WriteByte(' ')
				mode = modeTemplateString
			default:
				body.WriteByte(ch)
			}
		case modeLineComment:
			if ch == '\n' {
				body.WriteByte(ch)
				mode = modeCode
				continue
			}
			body.WriteByte(' ')
		case modeBlockComment:
			if ch == '*' && next == '/' {
				body.WriteByte(' ')
				body.WriteByte(' ')
				i++
				mode = modeCode
				continue
			}
			if ch == '\n' {
				body.WriteByte(ch)
				continue
			}
			body.WriteByte(' ')
		case modeSingleString, modeDoubleString, modeTemplateString:
			quote := byte('\'')
			if mode == modeDoubleString {
				quote = '"'
			}
			if mode == modeTemplateString {
				quote = '`'
			}
			if ch == '\n' {
				body.WriteByte(ch)
				escaped = false
				if mode != modeTemplateString {
					mode = modeCode
				}
				continue
			}
			body.WriteByte(' ')
			if escaped {
				escaped = false
				continue
			}
			if ch == '\\' {
				escaped = true
				continue
			}
			if ch == quote {
				mode = modeCode
			}
		}
	}
	return body.String()
}

// loadGoldenBehaviorTests returns, per imported package path, the symbols the
// golden test programs under testsDir use. Unreadable programs are skipped.
func loadGoldenBehaviorTests(testsDir string) map[string]map[string]bool {
	result := make(map[string]map[string]bool)
	_ = filepath.WalkDir(testsDir, func(filePath string, entry fs.DirEntry, err error) error {
		// Parse each Go source, skipping what cannot be read.
		if err != nil || entry.IsDir() || filepath.Ext(filePath) != ".go" {
			return nil
		}
		file, parseErr := parser.ParseFile(token.NewFileSet(), filePath, nil, parser.SkipObjectResolution)
		if parseErr != nil {
			return nil
		}

		// Map each import's local name to its package path.
		importAliases := make(map[string]string)
		dotImports := make(map[string]bool)
		for _, spec := range file.Imports {
			if spec.Path == nil {
				continue
			}
			pkgPath := strings.Trim(spec.Path.Value, `"`)
			if spec.Name != nil {
				switch spec.Name.Name {
				case ".":
					dotImports[pkgPath] = true
				case "_":
				default:
					importAliases[spec.Name.Name] = pkgPath
				}
				continue
			}
			importAliases[path.Base(pkgPath)] = pkgPath
		}
		if len(importAliases) == 0 && len(dotImports) == 0 {
			return nil
		}

		// Record each package-qualified selector and dot-imported identifier.
		ast.Inspect(file, func(node ast.Node) bool {
			switch expr := node.(type) {
			case *ast.SelectorExpr:
				ident, ok := expr.X.(*ast.Ident)
				if !ok {
					return true
				}
				pkgPath, ok := importAliases[ident.Name]
				if !ok {
					return true
				}
				addBehaviorTestSymbol(result, pkgPath, expr.Sel.Name)
			case *ast.Ident:
				for pkgPath := range dotImports {
					addBehaviorTestSymbol(result, pkgPath, expr.Name)
				}
			}
			return true
		})
		return nil
	})
	return result
}

// findGoscriptSourceDir returns the goscript source tree enclosing the
// working directory, which holds the gs tests and golden tests.
func findGoscriptSourceDir() (string, bool) {
	wd, err := os.Getwd()
	if err != nil {
		return "", false
	}
	for {
		_, gsErr := os.Stat(filepath.Join(wd, "gs", "builtin", "index.ts"))
		info, testsErr := os.Stat(filepath.Join(wd, "tests", "tests"))
		if gsErr == nil && testsErr == nil && info.IsDir() {
			return wd, true
		}
		parent := filepath.Dir(wd)
		if parent == wd {
			return "", false
		}
		wd = parent
	}
}

func addBehaviorTestSymbol(index map[string]map[string]bool, pkgPath, symbol string) {
	if pkgPath == "" || symbol == "" {
		return
	}
	if index[pkgPath] == nil {
		index[pkgPath] = make(map[string]bool)
	}
	index[pkgPath][symbol] = true
}

func newOverrideMetadata() OverrideMetadata {
	return OverrideMetadata{
		AsyncFunctions:         make(map[string]bool),
		CallbackAsyncFunctions: make(map[string]bool),
		AsyncMethods:           make(map[string]bool),
		AsyncCallbacks:         make(map[string][]string),
		AsyncWhenMethods:       make(map[string][]string),
	}
}

func cloneOverrideMetadata(metadata OverrideMetadata) OverrideMetadata {
	return OverrideMetadata{
		Dependencies:           slices.Clone(metadata.Dependencies),
		NativeDependencies:     slices.Clone(metadata.NativeDependencies),
		AsyncFunctions:         cloneBoolMap(metadata.AsyncFunctions),
		CallbackAsyncFunctions: cloneBoolMap(metadata.CallbackAsyncFunctions),
		AsyncMethods:           cloneBoolMap(metadata.AsyncMethods),
		AsyncCallbacks:         cloneStringSlicesMap(metadata.AsyncCallbacks),
		AsyncWhenMethods:       cloneStringSlicesMap(metadata.AsyncWhenMethods),
	}
}

func cloneBoolMap(values map[string]bool) map[string]bool {
	cloned := make(map[string]bool, len(values))
	maps.Copy(cloned, values)
	return cloned
}

func cloneStringSlicesMap(values map[string][]string) map[string][]string {
	cloned := make(map[string][]string, len(values))
	for key, value := range values {
		cloned[key] = slices.Clone(value)
	}
	return cloned
}

func cloneOverrideCopyPackage(pkg overrideCopyPackage) overrideCopyPackage {
	cloned := overrideCopyPackage{
		path:  pkg.path,
		files: make([]overrideCopyFile, 0, len(pkg.files)),
	}
	for _, file := range pkg.files {
		cloned.files = append(cloned.files, overrideCopyFile{
			path: file.path,
			data: bytes.Clone(file.data),
		})
	}
	return cloned
}
