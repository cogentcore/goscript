package compiler

import (
	"go/ast"
	"go/constant"
	"go/token"
	"go/types"
	"regexp"
	"strings"
)

// Dead code elimination.
//
// A program build can leave out the functions and methods that no execution
// of the program can reach, as the Go linker does. The analysis walks the
// bodies of the reachable functions from the roots: the main function, the
// package initializers and the functions that hand-written TypeScript can
// call. Calls and references of functions make them reachable directly. A
// method is reachable when it is called or referenced through its type, or
// when it can be called dynamically: its type is used by reachable code (so
// that a value of it can exist) and a method of the same name is called
// through an interface or a type parameter, named by an interface type that
// reachable code uses (a type assertion can check for it), or named in the
// TypeScript of an override package. When reachable code looks up methods
// by reflection (reflect Value.Method, Value.MethodByName, Type.Method and
// Type.MethodByName), every exported method of a used type is reachable,
// which is the Go linker's rule for reflect method lookups.
//
// Matching by name alone, without the signature, keeps more methods than
// needed, never fewer. Types are used when any reachable code mentions them,
// with the types of their fields and elements, which also over-approximates
// the types that values can have at run time.
//
// Lowering leaves out the unreachable functions and the bodies of the
// unreachable methods, and keeps the method metadata of the types, so that
// the runtime type information of every type is unchanged.

// liveCode holds the reachable functions and method set members of a
// program after dead code elimination.
type liveCode struct {
	funcs   map[*types.Func]bool
	members map[liveMember]bool
}

// liveMember is a method of the method set of a pointer to a named type:
// one declared on the type or promoted from an embedded field.
type liveMember struct {
	named *types.Named
	name  string
}

// functionLive reports whether a function or method declaration is
// reachable. Every function is reachable without dead code elimination.
func (m *SemanticModel) functionLive(fn *types.Func) bool {
	if m == nil || m.liveCode == nil || fn == nil {
		return true
	}
	return m.liveCode.funcs[fn.Origin()]
}

// methodLive reports whether the method called name of the method set of a
// pointer to named is reachable, so that the type's method or forwarder for
// it is emitted.
func (m *SemanticModel) methodLive(named *types.Named, name string) bool {
	if m == nil || m.liveCode == nil || named == nil {
		return true
	}
	return m.liveCode.members[liveMember{named: named.Origin(), name: name}]
}

// deadCodeRoots are the inputs of the analysis beyond the compiled Go code.
type deadCodeRoots struct {
	// names are the identifiers that override TypeScript may call as methods.
	names map[string]bool
	// packages are compiled packages that override TypeScript imports, all
	// of whose functions and methods are kept.
	packages map[string]bool
	// functions are package functions (package/path.Function) kept as roots,
	// such as deferred functions.
	functions []string
}

// deadCodeDecl is a function declaration with the type information of its
// package.
type deadCodeDecl struct {
	decl *ast.FuncDecl
	info *types.Info
}

// deadCodeAnalysis is the state of one dead code elimination.
type deadCodeAnalysis struct {
	live       *liveCode
	decls      map[*types.Func]deadCodeDecl
	work       []deadCodeDecl
	seenTypes  map[types.Type]bool
	usedNamed  map[*types.Named]bool
	names      map[string]bool
	byName     map[string][]*types.Named
	methodSets map[*types.Named]*types.MethodSet
	reflect    bool
	// lookups holds the selectors of MethodByName calls with a constant
	// name.
	lookups map[*ast.SelectorExpr]bool
}

// collectLiveCode computes the reachable functions and methods of a whole
// program from its compiled packages and the override roots.
func collectLiveCode(model *SemanticModel, roots deadCodeRoots) *liveCode {
	// Index the declarations of every compiled function and method.
	a := &deadCodeAnalysis{
		live:       &liveCode{funcs: make(map[*types.Func]bool), members: make(map[liveMember]bool)},
		decls:      make(map[*types.Func]deadCodeDecl),
		seenTypes:  make(map[types.Type]bool),
		usedNamed:  make(map[*types.Named]bool),
		names:      make(map[string]bool),
		byName:     make(map[string][]*types.Named),
		methodSets: make(map[*types.Named]*types.MethodSet),
		lookups:    make(map[*ast.SelectorExpr]bool),
	}
	for _, semPkg := range model.packages {
		for fn, decl := range semPkg.functionDecls {
			a.decls[fn.Origin()] = deadCodeDecl{decl: decl, info: semPkg.source.TypesInfo}
		}
	}

	// Mark the roots, then walk the reachable bodies until nothing changes.
	for name := range roots.names {
		a.addName(name)
	}
	for _, semPkg := range model.packages {
		a.markPackageRoots(semPkg, roots)
	}
	a.markFunctionRoots(model, roots.functions)
	a.drain()
	return a.live
}

// markPackageRoots marks the roots of one compiled package: its init
// functions, package variable initializers, main function and linknamed
// functions, or every function and method of a package that override
// TypeScript imports.
func (a *deadCodeAnalysis) markPackageRoots(semPkg *semanticPackage, roots deadCodeRoots) {
	// A package that TypeScript uses keeps all of its code.
	info := semPkg.source.TypesInfo
	keepAll := roots.packages[semPkg.pkgPath]
	for _, file := range semPkg.source.Syntax {
		linknamed := linknamedFunctions(file)
		for _, decl := range file.Decls {
			a.markDeclRoot(semPkg, info, decl, keepAll || linknamed[declFuncName(decl)])
		}
	}
}

// markDeclRoot marks one top-level declaration if it is a root: package
// variable initializers run at init, as do init functions, and main runs
// the program. keep marks any function or method.
func (a *deadCodeAnalysis) markDeclRoot(semPkg *semanticPackage, info *types.Info, decl ast.Decl, keep bool) {
	// Package variables initialize when the program starts.
	switch typed := decl.(type) {
	case *ast.GenDecl:
		if typed.Tok == token.VAR {
			a.walk(info, typed)
		}
		return
	case *ast.FuncDecl:
		fn, _ := info.Defs[typed.Name].(*types.Func)
		if fn == nil {
			return
		}
		root := keep || typed.Recv == nil && (typed.Name.Name == "init" || semPkg.name == "main" && typed.Name.Name == "main")
		if !root {
			return
		}
		a.markFunc(fn)

		// A kept method keeps its member of the receiver's method set.
		if named := methodReceiverNamedType(fn); named != nil {
			a.markTypeUsed(named)
			a.markMember(named.Origin(), fn.Name())
		}
	}
}

// markFunctionRoots marks the package functions named package/path.Function.
func (a *deadCodeAnalysis) markFunctionRoots(model *SemanticModel, functions []string) {
	for _, function := range functions {
		idx := strings.LastIndex(function, ".")
		if idx < 0 {
			continue
		}
		semPkg := model.packages[function[:idx]]
		if semPkg == nil || semPkg.source.Types == nil {
			continue
		}
		if fn, ok := semPkg.source.Types.Scope().Lookup(function[idx+1:]).(*types.Func); ok {
			a.markFunc(fn)
		}
	}
}

// declFuncName returns the name of a function declaration without receiver,
// or "".
func declFuncName(decl ast.Decl) string {
	if fn, ok := decl.(*ast.FuncDecl); ok && fn.Recv == nil {
		return fn.Name.Name
	}
	return ""
}

// linknamedFunctions returns the local names of the //go:linkname
// directives of a file, which other code can call by symbol name.
func linknamedFunctions(file *ast.File) map[string]bool {
	names := make(map[string]bool)
	for _, group := range file.Comments {
		for _, comment := range group.List {
			fields := strings.Fields(comment.Text)
			if len(fields) >= 2 && fields[0] == "//go:linkname" {
				names[fields[1]] = true
			}
		}
	}
	return names
}

// drain walks the bodies of the reachable functions until no more become
// reachable.
func (a *deadCodeAnalysis) drain() {
	for len(a.work) != 0 {
		next := a.work[len(a.work)-1]
		a.work = a.work[:len(a.work)-1]
		a.walk(next.info, next.decl)
	}
}

// markFunc makes a function or method declaration reachable and queues its
// body. An interface method has no body; calling it calls the methods of the
// same name.
func (a *deadCodeAnalysis) markFunc(fn *types.Func) {
	fn = fn.Origin()
	if a.live.funcs[fn] {
		return
	}
	a.live.funcs[fn] = true
	if sig, _ := fn.Type().(*types.Signature); sig != nil && sig.Recv() != nil && isInterfaceType(sig.Recv().Type()) {
		a.addName(fn.Name())
	}
	if decl, ok := a.decls[fn]; ok {
		a.work = append(a.work, decl)
	}
}

// addName records that methods called name can be called dynamically, so
// the member of that name of every used type is reachable.
func (a *deadCodeAnalysis) addName(name string) {
	if a.names[name] {
		return
	}
	a.names[name] = true
	for _, named := range a.byName[name] {
		a.markMember(named, name)
	}
}

// markReflect records that reachable code looks up methods by reflection,
// which reaches every exported method of every used type.
func (a *deadCodeAnalysis) markReflect() {
	if a.reflect {
		return
	}
	a.reflect = true
	for name, used := range a.byName {
		if !ast.IsExported(name) {
			continue
		}
		for _, named := range used {
			a.markMember(named, name)
		}
	}
}

// methodSet returns the method set of a pointer to a named type, which has
// every method of the type, its own and promoted ones.
func (a *deadCodeAnalysis) methodSet(named *types.Named) *types.MethodSet {
	if ms, ok := a.methodSets[named]; ok {
		return ms
	}
	ms := types.NewMethodSet(types.NewPointer(named))
	a.methodSets[named] = ms
	return ms
}

// markMember makes the members called name of the method set of a pointer
// to named reachable, with the method that a promoted member forwards to.
func (a *deadCodeAnalysis) markMember(named *types.Named, name string) {
	// Interface types have no members of their own.
	key := liveMember{named: named, name: name}
	if a.live.members[key] || isInterfaceType(named) {
		return
	}
	a.live.members[key] = true

	// A declared method is reachable; a promoted one is reached through the
	// embedded field that the forwarder calls.
	for sel := range a.methodSet(named).Methods() {
		fn, _ := sel.Obj().(*types.Func)
		if fn == nil || fn.Name() != name {
			continue
		}
		if len(sel.Index()) == 1 {
			a.markFunc(fn)
			continue
		}
		a.markEmbeddedMember(named, sel.Index()[0], name)
	}
}

// markEmbeddedMember makes the member called name of the embedded field at
// index of a named struct type reachable, which a promoted member calls.
func (a *deadCodeAnalysis) markEmbeddedMember(named *types.Named, index int, name string) {
	// The field is an embedded named type, a pointer to one, an interface
	// or a type parameter.
	st, _ := named.Underlying().(*types.Struct)
	if st == nil || index >= st.NumFields() {
		a.addName(name)
		return
	}
	fieldType := st.Field(index).Type()
	embedded := receiverNamedType(fieldType)
	if embedded == nil || isInterfaceType(embedded) {
		a.addName(name)
		return
	}
	a.markTypeUsed(fieldType)
	a.markMember(embedded.Origin(), name)
}

// markTypeUsed records that values of a type, and of the types it is made
// of, can exist at run time, which makes the members of their method sets
// callable through interfaces.
func (a *deadCodeAnalysis) markTypeUsed(typ types.Type) {
	if typ == nil || a.seenTypes[typ] {
		return
	}
	a.seenTypes[typ] = true

	// Composite types use their element types.
	switch typed := typ.(type) {
	case *types.Alias:
		a.markTypeUsed(types.Unalias(typed))
	case *types.Named:
		a.markNamedUsed(typed)
	case *types.Pointer:
		a.markTypeUsed(typed.Elem())
	case *types.Slice:
		a.markTypeUsed(typed.Elem())
	case *types.Array:
		a.markTypeUsed(typed.Elem())
	case *types.Chan:
		a.markTypeUsed(typed.Elem())
	case *types.Map:
		a.markTypeUsed(typed.Key())
		a.markTypeUsed(typed.Elem())
	default:
		a.markOtherTypeUsed(typ)
	}
}

// markOtherTypeUsed handles the types that markTypeUsed does not: structs,
// signatures, tuples, interfaces and type parameters.
func (a *deadCodeAnalysis) markOtherTypeUsed(typ types.Type) {
	switch typed := typ.(type) {
	case *types.Struct:
		for field := range typed.Fields() {
			a.markTypeUsed(field.Type())
		}
	case *types.Signature:
		a.markTypeUsed(typed.Params())
		a.markTypeUsed(typed.Results())
	case *types.Tuple:
		for v := range typed.Variables() {
			a.markTypeUsed(v.Type())
		}
	case *types.Interface:
		a.markInterfaceUsed(typed)
	case *types.TypeParam:
		a.markTypeUsed(typed.Constraint())
	}
}

// markInterfaceUsed records the methods of an interface type, which code can
// call or check for on any value, and the types of its type set terms.
func (a *deadCodeAnalysis) markInterfaceUsed(iface *types.Interface) {
	for fn := range iface.Methods() {
		a.addName(fn.Name())
		a.markTypeUsed(fn.Type())
	}
	for embedded := range iface.EmbeddedTypes() {
		a.markTypeUsed(embedded)
	}
}

// markNamedUsed records a used named type: its type arguments and
// underlying type are used, and the members of its method set whose names
// are called dynamically are reachable.
func (a *deadCodeAnalysis) markNamedUsed(named *types.Named) {
	// An instance uses its type arguments and its generic type.
	for arg := range named.TypeArgs().Types() {
		a.markTypeUsed(arg)
	}
	origin := named.Origin()
	if a.usedNamed[origin] {
		return
	}
	a.usedNamed[origin] = true
	a.markTypeUsed(origin.Underlying())
	if isInterfaceType(origin) {
		return
	}

	// Index the members by name for names that become dynamic later.
	for sel := range a.methodSet(origin).Methods() {
		name := sel.Obj().Name()
		a.byName[name] = append(a.byName[name], origin)
		if a.names[name] || a.reflect && ast.IsExported(name) {
			a.markMember(origin, name)
		}
	}
}

// walk marks what the code of a node references: functions, methods, used
// types and dynamically called method names.
func (a *deadCodeAnalysis) walk(info *types.Info, node ast.Node) {
	ast.Inspect(node, func(n ast.Node) bool {
		// The type of every expression is used.
		if expr, ok := n.(ast.Expr); ok {
			if tv, ok := info.Types[expr]; ok {
				a.markTypeUsed(tv.Type)
			}
		}
		switch typed := n.(type) {
		case *ast.Ident:
			a.walkIdent(info, typed)
		case *ast.SelectorExpr:
			a.walkSelector(info, typed)
		case *ast.CallExpr:
			a.walkConstantMethodLookup(info, typed)
		}
		return true
	})
}

// walkConstantMethodLookup handles a call of reflect MethodByName with a
// constant name, which only reaches the methods of that name, as in the Go
// linker. The walk of its selector then does not count as a lookup.
func (a *deadCodeAnalysis) walkConstantMethodLookup(info *types.Info, call *ast.CallExpr) {
	// Only reflect MethodByName with a constant string argument qualifies.
	fun, _ := ast.Unparen(call.Fun).(*ast.SelectorExpr)
	if fun == nil || len(call.Args) != 1 || !isReflectMethodLookup(info, fun, "MethodByName") {
		return
	}
	tv, ok := info.Types[call.Args[0]]
	if !ok || tv.Value == nil || tv.Value.Kind() != constant.String {
		return
	}
	a.addName(constant.StringVal(tv.Value))
	a.lookups[fun] = true
}

// isReflectMethodLookup reports whether a selector selects the reflect
// method called name of reflect.Value or reflect.Type.
func isReflectMethodLookup(info *types.Info, expr *ast.SelectorExpr, name string) bool {
	sel, ok := info.Selections[expr]
	if !ok || sel.Kind() == types.FieldVal || sel.Obj().Name() != name {
		return false
	}
	pkg := sel.Obj().Pkg()
	return pkg != nil && pkg.Path() == "reflect"
}

// walkIdent marks the object an identifier defines or uses: a function is
// reachable, a type or the type of a variable is used, and an instance of a
// generic function uses its type arguments.
func (a *deadCodeAnalysis) walkIdent(info *types.Info, id *ast.Ident) {
	// A generic instance uses its type arguments.
	if inst, ok := info.Instances[id]; ok {
		for arg := range inst.TypeArgs.Types() {
			a.markTypeUsed(arg)
		}
	}
	obj := info.Uses[id]
	if obj == nil {
		obj = info.Defs[id]
	}
	if obj == nil {
		return
	}

	// A method is reached through its selector.
	a.markTypeUsed(obj.Type())
	fn, _ := obj.(*types.Func)
	if fn == nil {
		return
	}
	if sig, _ := fn.Type().(*types.Signature); sig != nil && sig.Recv() == nil {
		a.markFunc(fn)
	}
}

// walkSelector marks the method that a method value, method expression or
// method call selects: through an interface or a type parameter, every
// method of that name can run; otherwise the member of the receiver type.
func (a *deadCodeAnalysis) walkSelector(info *types.Info, expr *ast.SelectorExpr) {
	// Only method selections select methods.
	sel, ok := info.Selections[expr]
	if !ok || sel.Kind() == types.FieldVal {
		return
	}
	name := sel.Obj().Name()
	if !a.lookups[expr] && (isReflectMethodLookup(info, expr, "Method") || isReflectMethodLookup(info, expr, "MethodByName")) {
		a.markReflect()
	}

	// A selection through an interface or type parameter is dynamic.
	recv := sel.Recv()
	named := receiverNamedType(recv)
	if named == nil || isInterfaceType(named) || isInterfaceType(derefPointerType(recv)) {
		a.addName(name)
		if fn, _ := sel.Obj().(*types.Func); fn != nil {
			a.markFunc(fn)
		}
		return
	}
	a.markTypeUsed(recv)
	a.markMember(named.Origin(), name)
}

// overrideMemberNamePattern matches the identifiers that TypeScript can call
// as methods: property accesses and quoted names.
var overrideMemberNamePattern = regexp.MustCompile(`\.\s*([A-Za-z_$][\w$]*)|["'\x60]([A-Za-z_$][\w$]*)["'\x60]`)

// overrideDeadCodeRoots collects the dead code roots of the override
// packages a program uses: the names their TypeScript can call as methods of
// compiled values, and the compiled packages they import.
func overrideDeadCodeRoots(facts *OverrideFacts, graph *PackageGraph) deadCodeRoots {
	// Visit the used override packages and the ones they depend on.
	roots := deadCodeRoots{names: make(map[string]bool), packages: make(map[string]bool)}
	visited := make(map[string]bool)
	queue := []string{"builtin"}
	for _, node := range graph.Nodes {
		if node.OverrideCandidate {
			queue = append(queue, node.PkgPath)
		}
	}
	for len(queue) != 0 {
		pkgPath := queue[len(queue)-1]
		queue = queue[:len(queue)-1]
		if visited[pkgPath] {
			continue
		}
		visited[pkgPath] = true
		queue = append(queue, roots.addOverridePackage(facts, pkgPath)...)
	}
	return roots
}

// addOverridePackage adds the names in the TypeScript of one override package
// and its compiled imports to the roots, and returns the override packages it
// depends on.
func (r *deadCodeRoots) addOverridePackage(facts *OverrideFacts, pkgPath string) []string {
	// Collect the member names of the package's TypeScript files.
	pkg, dependencies, ok := facts.copyPackage(pkgPath)
	if !ok {
		return nil
	}
	for _, file := range pkg.files {
		for _, match := range overrideMemberNamePattern.FindAllSubmatch(file.data, -1) {
			r.names[string(match[1])+string(match[2])] = true
		}
	}

	// Compiled packages that the TypeScript imports keep all of their code.
	for _, native := range facts.Metadata(pkgPath).NativeDependencies {
		if !facts.HasPackage(native) {
			r.packages[native] = true
		}
	}
	return dependencies
}

// funcDeclLive reports whether a function or method declaration of a
// package is reachable. A declaration without type information is kept.
func (m *SemanticModel) funcDeclLive(semPkg *semanticPackage, decl *ast.FuncDecl) bool {
	if m == nil || m.liveCode == nil || semPkg == nil || decl == nil {
		return true
	}
	fn, _ := semPkg.source.TypesInfo.Defs[decl.Name].(*types.Func)
	if fn == nil {
		return true
	}
	if named := methodReceiverNamedType(fn); named != nil {
		return m.methodLive(named, fn.Name())
	}
	return m.functionLive(fn)
}

// addTestPackages keeps all of the code of the packages under test of a test
// binary, whose tests, benchmarks, examples and fuzz targets the test runner
// calls by name.
func (r *deadCodeRoots) addTestPackages(req *CompileRequest, graph *PackageGraph) {
	if !req.Tests {
		return
	}
	for _, node := range graph.Nodes {
		if node.Requested || node.Name == "main" || strings.HasSuffix(node.PkgPath, "_test") {
			r.packages[node.PkgPath] = true
		}
	}
}
