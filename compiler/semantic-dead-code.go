package compiler

import (
	"go/ast"
	"go/constant"
	"go/token"
	"go/types"
	"maps"
	"regexp"
	"slices"
	"strconv"
	"strings"
	"sync"

	"golang.org/x/tools/go/packages"
)

// Dead code elimination.
//
// A program build can leave out the functions and methods that no execution
// of the program can reach, as the Go linker does. The analysis follows what
// the reachable functions reference from the roots: the main function, the
// package initializers and the functions that hand-written TypeScript can
// call. References of functions make them reachable directly. A method is
// reachable when it is called or referenced through its type, or when it can
// be called dynamically: its type is used by reachable code (so that a value
// of it can exist) and a method of the same name is called through an
// interface or a type parameter, named by an interface type that reachable
// code uses (a type assertion can check for it), or named in the TypeScript
// of an override package. When reachable code looks up methods by reflection
// (reflect Value.Method, Value.MethodByName, Type.Method and
// Type.MethodByName), every exported method of a used type is reachable,
// which is the Go linker's rule for reflect method lookups.
//
// Matching by name alone, without the signature, keeps more methods than
// needed, never fewer. Types are used when any reachable code mentions them,
// with the types of their fields and elements, which also over-approximates
// the types that values can have at run time.
//
// The semantic build records what each function references (see
// deadCodeRefs) from its body, or takes it from the package's body summary
// when the package was checked without bodies, so the analysis itself never
// walks a body. A function-local type declares no methods, so its members are
// promoted forwarders: they are always kept, and the references through them
// name the package-level types they promote from.
//
// Lowering leaves out the unreachable functions and the bodies of the
// unreachable methods, and keeps the method metadata of the types, so that
// the runtime type information of every type is unchanged.

// liveCode holds the reachable functions and method set members of a
// program after dead code elimination.
type liveCode struct {
	funcs   map[*types.Func]bool
	members map[liveMember]bool
	// fset positions the object keys of keyed.
	fset *token.FileSet
	// keyed holds the liveQueries keys of funcs and members (see keys).
	keysOnce sync.Once
	keyed    map[string]bool
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
// it is emitted. The members of a function-local type are always kept.
func (m *SemanticModel) methodLive(named *types.Named, name string) bool {
	if m == nil || m.liveCode == nil || named == nil || !packageLevelNamed(named) {
		return true
	}
	return m.liveCode.members[liveMember{named: named.Origin(), name: name}]
}

// packageLevelNamed reports whether a named type is declared at package
// level, so that an object key names it, rather than in the universe or a
// function body.
func packageLevelNamed(named *types.Named) bool {
	obj := named.Obj()
	return obj.Pkg() != nil && obj.Parent() == obj.Pkg().Scope()
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

// deadCodeRefs is what one function, or the variable initializers of a
// package, references. Every named type in it is declared at package level:
// recording flattens composite, universe and function-local types into the
// package-level types and method names they are made of, so a body summary
// can name each reference by object key.
type deadCodeRefs struct {
	// funcs are the functions called or referenced, and the methods
	// selected through an unnamed type that embeds them.
	funcs []*types.Func
	// members are the methods selected through a package-level named type.
	members []liveMember
	// names are the method names that can be called dynamically.
	names []string
	// types are the package-level named types used.
	types []*types.Named
	// reflect is set when the code looks up methods by reflection with a
	// name known only at run time.
	reflect bool
}

// packageDeadCodeRefs holds the references of one package's functions and of
// its variable initializers, which run when the program starts.
type packageDeadCodeRefs struct {
	funcs map[*types.Func]*deadCodeRefs
	vars  *deadCodeRefs
}

// collectPackageDeadCodeRefs records the references of a package checked
// with bodies.
func collectPackageDeadCodeRefs(pkg *packages.Package) *packageDeadCodeRefs {
	// Variable initializers share one record; each function has its own.
	refs := &packageDeadCodeRefs{funcs: make(map[*types.Func]*deadCodeRefs)}
	vars, fns := newDeadCodeRecorder(pkg.TypesInfo), newDeadCodeRecorder(pkg.TypesInfo)
	for _, file := range pkg.Syntax {
		for _, decl := range file.Decls {
			switch typed := decl.(type) {
			case *ast.GenDecl:
				if typed.Tok == token.VAR {
					vars.walk(typed)
				}
			case *ast.FuncDecl:
				if fn, _ := pkg.TypesInfo.Defs[typed.Name].(*types.Func); fn != nil {
					fns.walk(typed)
					refs.funcs[fn] = fns.take()
				}
			}
		}
	}
	refs.vars = vars.take()
	return refs
}

// deadCodeRecorder collects the references of the code it walks until take.
type deadCodeRecorder struct {
	info    *types.Info
	funcs   map[*types.Func]bool
	members map[liveMember]bool
	names   map[string]bool
	types   map[*types.Named]bool
	reflect bool
	// seen holds the types already recorded.
	seen map[types.Type]bool
	// lookups holds the selectors of MethodByName calls with a constant
	// name.
	lookups map[*ast.SelectorExpr]bool
}

func newDeadCodeRecorder(info *types.Info) *deadCodeRecorder {
	return &deadCodeRecorder{
		info:    info,
		funcs:   make(map[*types.Func]bool),
		members: make(map[liveMember]bool),
		names:   make(map[string]bool),
		types:   make(map[*types.Named]bool),
		seen:    make(map[types.Type]bool),
		lookups: make(map[*ast.SelectorExpr]bool),
	}
}

// take returns the references recorded since the last take.
func (r *deadCodeRecorder) take() *deadCodeRefs {
	// Copy out the references.
	refs := &deadCodeRefs{
		funcs:   slices.Collect(maps.Keys(r.funcs)),
		members: slices.Collect(maps.Keys(r.members)),
		names:   slices.Collect(maps.Keys(r.names)),
		types:   slices.Collect(maps.Keys(r.types)),
		reflect: r.reflect,
	}

	// Reset the recorder for the next function.
	clear(r.funcs)
	clear(r.members)
	clear(r.names)
	clear(r.types)
	clear(r.seen)
	clear(r.lookups)
	r.reflect = false
	return refs
}

// walk records what the code of a node references: functions, methods, used
// types and dynamically called method names.
func (r *deadCodeRecorder) walk(node ast.Node) {
	ast.Inspect(node, func(n ast.Node) bool {
		// The type of every expression is used.
		if expr, ok := n.(ast.Expr); ok {
			if tv, ok := r.info.Types[expr]; ok {
				r.recordType(tv.Type)
			}
		}
		switch typed := n.(type) {
		case *ast.Ident:
			r.ident(typed)
		case *ast.SelectorExpr:
			r.selector(typed)
		case *ast.CallExpr:
			r.constantMethodLookup(typed)
		}
		return true
	})
}

// constantMethodLookup handles a call of reflect MethodByName with a
// constant name, which only reaches the methods of that name, as in the Go
// linker. The walk of its selector then does not count as a lookup.
func (r *deadCodeRecorder) constantMethodLookup(call *ast.CallExpr) {
	// Only reflect MethodByName with a constant string argument qualifies.
	fun, _ := ast.Unparen(call.Fun).(*ast.SelectorExpr)
	if fun == nil || len(call.Args) != 1 || !isReflectMethodLookup(r.info, fun, "MethodByName") {
		return
	}
	tv, ok := r.info.Types[call.Args[0]]
	if !ok || tv.Value == nil || tv.Value.Kind() != constant.String {
		return
	}
	r.names[constant.StringVal(tv.Value)] = true
	r.lookups[fun] = true
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

// ident records the object an identifier defines or uses: a function is
// referenced, a type or the type of a variable is used, and an instance of a
// generic function uses its type arguments.
func (r *deadCodeRecorder) ident(id *ast.Ident) {
	// A generic instance uses its type arguments.
	if inst, ok := r.info.Instances[id]; ok {
		for arg := range inst.TypeArgs.Types() {
			r.recordType(arg)
		}
	}
	obj := r.info.Uses[id]
	if obj == nil {
		obj = r.info.Defs[id]
	}
	if obj == nil {
		return
	}

	// A method is reached through its selector.
	r.recordType(obj.Type())
	if fn, _ := obj.(*types.Func); fn != nil && fn.Signature().Recv() == nil {
		r.funcs[fn.Origin()] = true
	}
}

// selector records the method that a method value, method expression or
// method call selects: through an interface or a type parameter, every
// method of that name can run; otherwise the member of the receiver type.
func (r *deadCodeRecorder) selector(expr *ast.SelectorExpr) {
	// Only method selections select methods.
	sel, ok := r.info.Selections[expr]
	if !ok || sel.Kind() == types.FieldVal {
		return
	}
	name := sel.Obj().Name()
	if !r.lookups[expr] && (isReflectMethodLookup(r.info, expr, "Method") || isReflectMethodLookup(r.info, expr, "MethodByName")) {
		r.reflect = true
	}

	// A selection through an interface, a type parameter or an unnamed type
	// is dynamic. A concrete method selected through an unnamed type that
	// embeds it runs too.
	recv := sel.Recv()
	named := receiverNamedType(recv)
	if named == nil || isInterfaceType(named) || isInterfaceType(derefPointerType(recv)) {
		r.names[name] = true
		if fn, _ := sel.Obj().(*types.Func); fn != nil && !isInterfaceType(fn.Signature().Recv().Type()) {
			r.funcs[fn.Origin()] = true
		}
		return
	}
	r.recordType(recv)
	r.member(named, sel.Index(), name)
}

// member records the member called name of the method set of a pointer to
// named, selected through the path of embedded fields index. A member of a
// function-local type is promoted, so the member it forwards to is recorded.
func (r *deadCodeRecorder) member(named *types.Named, index []int, name string) {
	// An object key names a member of a package-level type.
	origin := named.Origin()
	if packageLevelNamed(origin) {
		r.members[liveMember{named: origin, name: name}] = true
		return
	}

	// Follow the embedded field to the type that the member promotes from.
	st, _ := origin.Underlying().(*types.Struct)
	if st == nil || len(index) < 2 || index[0] >= st.NumFields() {
		r.names[name] = true
		return
	}
	fieldType := st.Field(index[0]).Type()
	embedded := receiverNamedType(fieldType)
	if embedded == nil || isInterfaceType(embedded) {
		r.names[name] = true
		return
	}
	r.recordType(fieldType)
	r.member(embedded, index[1:], name)
}

// recordType records the package-level named types and the interface method
// names that a used type is made of.
func (r *deadCodeRecorder) recordType(typ types.Type) {
	if typ == nil || r.seen[typ] {
		return
	}
	r.seen[typ] = true

	// Composite, universe and function-local types record their parts.
	switch typed := typ.(type) {
	case *types.Alias:
		r.recordType(types.Unalias(typed))
	case *types.Named:
		for arg := range typed.TypeArgs().Types() {
			r.recordType(arg)
		}
		origin := typed.Origin()
		if packageLevelNamed(origin) {
			r.types[origin] = true
			return
		}
		r.recordType(origin.Underlying())
	case *types.Pointer:
		r.recordType(typed.Elem())
	case *types.Slice:
		r.recordType(typed.Elem())
	case *types.Array:
		r.recordType(typed.Elem())
	case *types.Chan:
		r.recordType(typed.Elem())
	case *types.Map:
		r.recordType(typed.Key())
		r.recordType(typed.Elem())
	default:
		r.recordOtherType(typ)
	}
}

// recordOtherType handles the types that recordType does not: structs,
// signatures, tuples, interfaces and type parameters.
func (r *deadCodeRecorder) recordOtherType(typ types.Type) {
	switch typed := typ.(type) {
	case *types.Struct:
		for field := range typed.Fields() {
			r.recordType(field.Type())
		}
	case *types.Signature:
		r.recordType(typed.Params())
		r.recordType(typed.Results())
	case *types.Tuple:
		for v := range typed.Variables() {
			r.recordType(v.Type())
		}
	case *types.Interface:
		for fn := range typed.Methods() {
			r.names[fn.Name()] = true
			r.recordType(fn.Type())
		}
		for embedded := range typed.EmbeddedTypes() {
			r.recordType(embedded)
		}
	case *types.TypeParam:
		r.recordType(typed.Constraint())
	}
}

// deadCodeAnalysis is the state of one dead code elimination.
type deadCodeAnalysis struct {
	live       *liveCode
	refs       map[*types.Func]*deadCodeRefs
	work       []*deadCodeRefs
	seenTypes  map[types.Type]bool
	usedNamed  map[*types.Named]bool
	names      map[string]bool
	byName     map[string][]*types.Named
	methodSets map[*types.Named]*types.MethodSet
	reflect    bool
}

// collectLiveCode computes the reachable functions and methods of a whole
// program from the references of its compiled packages and the override
// roots.
func collectLiveCode(model *SemanticModel, roots deadCodeRoots) *liveCode {
	// Index the references of every compiled function and method.
	a := &deadCodeAnalysis{
		live:       &liveCode{funcs: make(map[*types.Func]bool), members: make(map[liveMember]bool)},
		refs:       make(map[*types.Func]*deadCodeRefs),
		seenTypes:  make(map[types.Type]bool),
		usedNamed:  make(map[*types.Named]bool),
		names:      make(map[string]bool),
		byName:     make(map[string][]*types.Named),
		methodSets: make(map[*types.Named]*types.MethodSet),
	}
	for _, semPkg := range model.packages {
		a.live.fset = semPkg.source.Fset
		if semPkg.deadCode != nil {
			maps.Copy(a.refs, semPkg.deadCode.funcs)
		}
	}

	// Mark the roots, then follow the references until nothing changes.
	for name := range roots.names {
		a.addName(name)
	}
	for _, semPkg := range model.packages {
		a.markPackageRoots(semPkg, roots)
	}
	a.markFunctionRoots(model, roots.functions)
	for len(a.work) != 0 {
		next := a.work[len(a.work)-1]
		a.work = a.work[:len(a.work)-1]
		a.apply(next)
	}
	return a.live
}

// markPackageRoots marks the roots of one compiled package: its variable
// initializers, init functions, main function and linknamed functions, or
// every function and method of a package that override TypeScript imports.
func (a *deadCodeAnalysis) markPackageRoots(semPkg *semanticPackage, roots deadCodeRoots) {
	// Package variables initialize when the program starts.
	if semPkg.deadCode != nil {
		a.work = append(a.work, semPkg.deadCode.vars)
	}

	// A package that TypeScript uses keeps all of its code.
	info := semPkg.source.TypesInfo
	keepAll := roots.packages[semPkg.pkgPath]
	for _, file := range semPkg.source.Syntax {
		linknamed := linknamedFunctions(file)
		for _, decl := range file.Decls {
			if fnDecl, ok := decl.(*ast.FuncDecl); ok {
				a.markFuncDeclRoot(semPkg, info, fnDecl, keepAll || linknamed[declFuncName(decl)])
			}
		}
	}
}

// markFuncDeclRoot marks a function declaration if it is a root: init
// functions run at init and main runs the program. keep marks any function
// or method.
func (a *deadCodeAnalysis) markFuncDeclRoot(semPkg *semanticPackage, info *types.Info, decl *ast.FuncDecl, keep bool) {
	// Only a declaration with type information and a root role counts.
	fn, _ := info.Defs[decl.Name].(*types.Func)
	if fn == nil {
		return
	}
	root := keep || decl.Recv == nil && (decl.Name.Name == "init" || semPkg.name == "main" && decl.Name.Name == "main")
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

// apply marks what reachable code references.
func (a *deadCodeAnalysis) apply(refs *deadCodeRefs) {
	// Each kind of reference marks through its own primitive.
	for _, fn := range refs.funcs {
		a.markFunc(fn)
	}
	for _, name := range refs.names {
		a.addName(name)
	}
	for _, named := range refs.types {
		a.markTypeUsed(named)
	}
	for _, member := range refs.members {
		a.markMember(member.named, member.name)
	}
	if refs.reflect {
		a.markReflect()
	}
}

// markFunc makes a function or method declaration reachable and queues its
// references. An interface method has no body; calling it calls the methods
// of the same name.
func (a *deadCodeAnalysis) markFunc(fn *types.Func) {
	// Mark the generic origin once.
	fn = fn.Origin()
	if a.live.funcs[fn] {
		return
	}
	a.live.funcs[fn] = true
	if sig, _ := fn.Type().(*types.Signature); sig != nil && sig.Recv() != nil && isInterfaceType(sig.Recv().Type()) {
		a.addName(fn.Name())
	}
	if refs, ok := a.refs[fn]; ok {
		a.work = append(a.work, refs)
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

// summaryDeadCodeVars keys the references of the variable initializers in a
// body summary.
const summaryDeadCodeVars = "@vars"

// summaryDeadCode holds the references of one function, keyed by its object
// key, or of the package's variable initializers, keyed summaryDeadCodeVars.
type summaryDeadCode struct {
	fn      string
	funcs   []string
	members []summaryMember
	names   []string
	types   []string
	reflect bool
}

// summaryMember is a liveMember with its named type keyed.
type summaryMember struct {
	named string
	name  string
}

// summarizeDeadCode keys the references of a package. It reports false when
// an object has no key.
func summarizeDeadCode(k *summaryKeys, refs *packageDeadCodeRefs) ([]summaryDeadCode, bool) {
	// A build without dead code elimination records no references.
	if refs == nil {
		return nil, true
	}

	// Key the variable initializers, then each function, in key order.
	out := make([]summaryDeadCode, 0, len(refs.funcs)+1)
	vars, ok := summarizeDeadCodeRefs(k, summaryDeadCodeVars, refs.vars)
	if !ok {
		return nil, false
	}
	out = append(out, vars)
	for fn, fnRefs := range refs.funcs {
		key, ok := k.key(fn)
		if !ok {
			return nil, false
		}
		summarized, ok := summarizeDeadCodeRefs(k, key, fnRefs)
		if !ok {
			return nil, false
		}
		out = append(out, summarized)
	}
	slices.SortFunc(out, func(a, b summaryDeadCode) int { return strings.Compare(a.fn, b.fn) })
	return out, true
}

// summarizeDeadCodeRefs keys the references of one function.
func summarizeDeadCodeRefs(k *summaryKeys, fn string, refs *deadCodeRefs) (summaryDeadCode, bool) {
	// Key each referenced object; the encoding is sorted to be stable.
	out := summaryDeadCode{fn: fn, names: slices.Sorted(slices.Values(refs.names)), reflect: refs.reflect}
	for _, ref := range refs.funcs {
		key, ok := k.key(ref)
		if !ok {
			return summaryDeadCode{}, false
		}
		out.funcs = append(out.funcs, key)
	}
	for _, named := range refs.types {
		key, ok := k.key(named.Obj())
		if !ok {
			return summaryDeadCode{}, false
		}
		out.types = append(out.types, key)
	}
	for _, member := range refs.members {
		key, ok := k.key(member.named.Obj())
		if !ok {
			return summaryDeadCode{}, false
		}
		out.members = append(out.members, summaryMember{named: key, name: member.name})
	}
	slices.Sort(out.funcs)
	slices.Sort(out.types)
	slices.SortFunc(out.members, func(a, b summaryMember) int {
		if c := strings.Compare(a.named, b.named); c != 0 {
			return c
		}
		return strings.Compare(a.name, b.name)
	})
	return out, true
}

// decodeDeadCode parses a reach record, or a reference record of the reach
// record before it. It reports false on a malformed record.
func (s *bodySummary) decodeDeadCode(fields []string) bool {
	// A reach record starts the references of one function.
	if fields[0] == summaryRecordReach {
		if len(fields) != 3 {
			return false
		}
		reflect, err := strconv.ParseBool(fields[2])
		if err != nil {
			return false
		}
		s.deadCode = append(s.deadCode, summaryDeadCode{fn: fields[1], reflect: reflect})
		return true
	}

	// The other records add to the reach record before them.
	if len(s.deadCode) == 0 {
		return false
	}
	refs := &s.deadCode[len(s.deadCode)-1]
	if fields[0] == summaryRecordReachMember {
		if len(fields) != 3 {
			return false
		}
		refs.members = append(refs.members, summaryMember{named: fields[1], name: fields[2]})
		return true
	}
	if len(fields) != 2 {
		return false
	}
	target := map[string]*[]string{
		summaryRecordReachFunc: &refs.funcs,
		summaryRecordReachName: &refs.names,
		summaryRecordReachType: &refs.types,
	}[fields[0]]
	*target = append(*target, fields[1])
	return true
}

// applyDeadCode resolves the summarized references of the package. It
// reports false when a key does not resolve.
func (a *bodyApplier) applyDeadCode(semPkg *semanticPackage) bool {
	// A summary of a build without dead code elimination has no references.
	if len(a.summary.deadCode) == 0 {
		return true
	}

	// Resolve the references of each function and of the initializers.
	refs := &packageDeadCodeRefs{funcs: make(map[*types.Func]*deadCodeRefs, len(a.summary.deadCode))}
	for _, summarized := range a.summary.deadCode {
		resolved, ok := a.resolveDeadCodeRefs(summarized)
		if !ok {
			return false
		}
		if summarized.fn == summaryDeadCodeVars {
			refs.vars = resolved
			continue
		}
		fn := a.resolveFunc(summarized.fn)
		if fn == nil {
			return false
		}
		refs.funcs[fn] = resolved
	}
	if refs.vars == nil {
		return false
	}
	semPkg.deadCode = refs
	return true
}

// resolveDeadCodeRefs resolves the references of one function.
func (a *bodyApplier) resolveDeadCodeRefs(summarized summaryDeadCode) (*deadCodeRefs, bool) {
	// Every key must resolve in the current check.
	refs := &deadCodeRefs{names: summarized.names, reflect: summarized.reflect}
	for _, key := range summarized.funcs {
		fn := a.resolveFunc(key)
		if fn == nil {
			return nil, false
		}
		refs.funcs = append(refs.funcs, fn)
	}
	for _, key := range summarized.types {
		named := a.resolveNamed(key)
		if named == nil {
			return nil, false
		}
		refs.types = append(refs.types, named)
	}
	for _, member := range summarized.members {
		named := a.resolveNamed(member.named)
		if named == nil {
			return nil, false
		}
		refs.members = append(refs.members, liveMember{named: named, name: member.name})
	}
	return refs, true
}

// resolveNamed returns the named type whose type name key names, or nil.
func (a *bodyApplier) resolveNamed(key string) *types.Named {
	typeName, _ := a.keys.resolve(key).(*types.TypeName)
	if typeName == nil {
		return nil
	}
	named, _ := typeName.Type().(*types.Named)
	return named
}

// liveQueries records the reachability answers that lowering one package
// reads, so that the package's cached artifact replays only while each answer
// still holds. Entries are "+key" for a reachable function or member and
// "-key" for an unreachable one, keyed as liveKeys keys them. A nil
// liveQueries answers without recording.
type liveQueries struct {
	fset    *token.FileSet
	answers map[string]bool
}

// newLiveQueries returns the recorder of a package lowered by a build with
// dead code elimination, or nil.
func newLiveQueries(model *SemanticModel, semPkg *semanticPackage) *liveQueries {
	if model == nil || model.liveCode == nil {
		return nil
	}
	return &liveQueries{fset: semPkg.source.Fset, answers: make(map[string]bool)}
}

// methodLive answers SemanticModel.methodLive and records the answer.
func (q *liveQueries) methodLive(model *SemanticModel, named *types.Named, name string) bool {
	live := model.methodLive(named, name)
	if q != nil && model.liveCode != nil && packageLevelNamed(named) {
		q.answers[liveMemberKey(q.fset, named.Origin(), name)] = live
	}
	return live
}

// funcDeclLive reports whether a function or method declaration of a
// package is reachable and records the answer. A declaration without type
// information is kept.
func (q *liveQueries) funcDeclLive(model *SemanticModel, semPkg *semanticPackage, decl *ast.FuncDecl) bool {
	// A method is a member of its receiver's method set.
	fn, _ := semPkg.source.TypesInfo.Defs[decl.Name].(*types.Func)
	if fn == nil {
		return true
	}
	if named := methodReceiverNamedType(fn); named != nil {
		return q.methodLive(model, named, fn.Name())
	}
	live := model.functionLive(fn)
	if q != nil && model.liveCode != nil {
		q.answers[liveFuncKey(q.fset, fn.Origin())] = live
	}
	return live
}

// entries returns the recorded answers, sorted.
func (q *liveQueries) entries() []string {
	// Prefix each key with its answer.
	if q == nil {
		return nil
	}
	out := make([]string, 0, len(q.answers))
	for key, live := range q.answers {
		if live {
			out = append(out, "+"+key)
		} else {
			out = append(out, "-"+key)
		}
	}
	slices.Sort(out)
	return out
}

// liveFuncKey keys a function for liveQueries.
func liveFuncKey(fset *token.FileSet, fn *types.Func) string {
	return "f " + objectKey(fset, fn)
}

// liveMemberKey keys a member of a package-level named type for
// liveQueries.
func liveMemberKey(fset *token.FileSet, named *types.Named, name string) string {
	return "m " + objectKey(fset, named.Obj()) + " " + name
}

// liveAnswersHold reports whether every answer recorded by liveQueries
// still holds for the model's reachable code.
func (m *SemanticModel) liveAnswersHold(entries []string) bool {
	// No answers always hold; answers need a build with reachable code.
	if len(entries) == 0 {
		return true
	}
	if m == nil || m.liveCode == nil {
		return false
	}
	keys := m.liveCode.keys()
	for _, entry := range entries {
		live, key := entry[0] == '+', entry[1:]
		if keys[key] != live {
			return false
		}
	}
	return true
}

// keys returns the liveQueries keys of the reachable functions and members,
// computed on first use.
func (l *liveCode) keys() map[string]bool {
	l.keysOnce.Do(func() {
		l.keyed = make(map[string]bool, len(l.funcs)+len(l.members))
		for fn := range l.funcs {
			if fn.Signature().Recv() == nil {
				l.keyed[liveFuncKey(l.fset, fn)] = true
			}
		}
		for member := range l.members {
			if packageLevelNamed(member.named) {
				l.keyed[liveMemberKey(l.fset, member.named, member.name)] = true
			}
		}
	})
	return l.keyed
}
