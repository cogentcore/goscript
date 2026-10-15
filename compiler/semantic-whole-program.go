package compiler

import (
	"go/token"
	"go/types"
	"maps"
	"slices"
	"strings"
)

// Whole-program interface analysis.
//
// A call of an interface method suspends when the implementation it reaches
// does. For a package-sealed interface every implementation is in the
// compiled graph, so the implementation graph colors the method. A method of
// an exported interface could be implemented outside the graph, so a library
// build makes every caller of it async.
//
// A program build (a main package or a test binary) compiles every Go
// implementation, so an exported interface whose implementations are all
// compiled Go code is closed like a sealed one: its methods are async only
// when an implementation in the graph is async. Hand-written override
// packages are the exception. Their values are TypeScript objects whose
// methods may suspend without override metadata saying so, so an interface
// stays open when an override type or an override interface could stand
// behind it.

// wholeProgramBuild reports whether req compiles a whole program, so that the
// async analysis may close exported interfaces over the compiled graph. The
// build is a test binary, or it requests at least one main package and only
// main packages and their dependencies, and the graph holds every
// dependency. A requested package that no main package imports is a library
// for other consumers, which may implement its interfaces.
func wholeProgramBuild(req *CompileRequest, graph *PackageGraph) bool {
	// A graph without its dependencies is missing implementations.
	if req == nil || graph == nil || req.DependencyMode != DependencyModeAll {
		return false
	}

	// A test binary is a program.
	if req.Tests {
		return true
	}

	// Walk the dependencies of the requested main packages.
	reached := make(map[string]bool)
	var queue []string
	for _, path := range graph.RequestedPackagePaths {
		if node := graph.NodesByPackagePath[path]; node != nil && node.Name == "main" {
			queue = append(queue, path)
		}
	}
	for len(queue) != 0 {
		path := queue[len(queue)-1]
		queue = queue[:len(queue)-1]
		if node := graph.NodesByPackagePath[path]; node != nil && !reached[path] {
			reached[path] = true
			queue = append(queue, node.Imports...)
		}
	}

	// Every requested package must be part of a main package's program.
	for _, path := range graph.RequestedPackagePaths {
		if !reached[path] {
			return false
		}
	}
	return len(reached) != 0
}

// overrideBoundary describes the values that hand-written override packages
// can hand to compiled code: the override types and their method sets, and
// the interfaces that override packages declare or expose in their API.
type overrideBoundary struct {
	pkgPaths       map[string]bool
	methodSets     []semanticImplementationMethodSet
	methodSetIndex map[string][]int
	ifaces         []*types.Interface
	ifaceIndex     map[string][]int
	seen           map[types.Type]bool
	// ifaceNames names each boundary interface and the override object
	// that exposes it, for the async report.
	ifaceNames []string
	// source names the override object whose types are being exposed.
	source string
	// syncInterfaces lists the interfaces that override metadata declares
	// sync.
	syncInterfaces []*types.Named
	facts          *OverrideFacts
}

// newOverrideBoundary collects the boundary of the override packages in the
// graph.
func newOverrideBoundary(overridePkgs []*types.Package, overrideFacts *OverrideFacts) *overrideBoundary {
	// The override packages stop the walk of exposed types.
	b := &overrideBoundary{
		pkgPaths:   make(map[string]bool, len(overridePkgs)),
		ifaceIndex: make(map[string][]int),
		seen:       make(map[types.Type]bool),
		facts:      overrideFacts,
	}
	for _, pkg := range overridePkgs {
		b.pkgPaths[pkg.Path()] = true
		b.collectSyncInterfaces(pkg)
	}

	// Every declared type is a boundary type, and the exported API exposes
	// the interfaces it mentions.
	var concretes []*types.Named
	for _, pkg := range overridePkgs {
		concretes = append(concretes, b.collectPackage(pkg)...)
	}

	// Override types join by method set, interfaces by method name.
	sortNamedTypes(concretes)
	b.methodSets = implementationMethodSets(concretes)
	b.methodSetIndex = indexImplementationMethodSets(b.methodSets)
	for idx, iface := range b.ifaces {
		for method := range iface.Methods() {
			b.ifaceIndex[method.Name()] = append(b.ifaceIndex[method.Name()], idx)
		}
	}
	return b
}

// collectSyncInterfaces records the interfaces pkg's metadata declares sync.
func (b *overrideBoundary) collectSyncInterfaces(pkg *types.Package) {
	for _, name := range pkg.Scope().Names() {
		typeName, _ := pkg.Scope().Lookup(name).(*types.TypeName)
		if typeName == nil || !b.facts.IsSyncInterface(pkg.Path(), name) {
			continue
		}
		if named, _ := types.Unalias(typeName.Type()).(*types.Named); named != nil && types.IsInterface(named) {
			b.syncInterfaces = append(b.syncInterfaces, named)
		}
	}
}

// syncDeclared reports whether override metadata declares named sync.
func (b *overrideBoundary) syncDeclared(named *types.Named) bool {
	return slices.Contains(b.syncInterfaces, namedOriginOrSelf(named))
}

// trustedFor reports whether a value of typ, an override type or an
// interface it exposes, suspends in method only where metadata says: typ
// implements an interface that metadata declares sync and that has the
// method. Every value of typ is then a value of that interface, so it
// suspends in the method only as a named override type that metadata marks
// async, which the implementation graph colors.
func (b *overrideBoundary) trustedFor(typ types.Type, method *types.Func) bool {
	return slices.ContainsFunc(b.syncInterfaces, func(named *types.Named) bool {
		iface := named.Underlying().(*types.Interface)
		hasMethod := slices.ContainsFunc(slices.Collect(iface.Methods()), func(sync *types.Func) bool {
			return sync.Name() == method.Name() && types.Identical(sync.Type(), method.Type())
		})
		return hasMethod && types.Implements(typ, iface)
	})
}

// trustsAllFor reports whether a value of typ suspends in the methods of
// iface only where metadata says.
func (b *overrideBoundary) trustsAllFor(typ types.Type, iface *types.Interface) bool {
	for method := range iface.Methods() {
		if !b.trustedFor(typ, method) {
			return false
		}
	}
	return iface.NumMethods() != 0
}

// collectPackage records the interfaces pkg declares or exposes and returns
// its concrete named types.
func (b *overrideBoundary) collectPackage(pkg *types.Package) []*types.Named {
	// Every object in the package scope, exported or not, is visited.
	var concretes []*types.Named
	for _, name := range pkg.Scope().Names() {
		obj := pkg.Scope().Lookup(name)
		b.source = pkg.Path() + "." + name

		// A declared type is a boundary interface or a boundary concrete type.
		if typeName, ok := obj.(*types.TypeName); ok {
			named, _ := types.Unalias(typeName.Type()).(*types.Named)
			if named == nil {
				continue
			}
			if types.IsInterface(named) {
				b.expose(named)
			} else if !typeName.IsAlias() {
				concretes = append(concretes, named)
			}
			if typeName.Exported() {
				b.exposeMethods(named)
			}
			continue
		}

		// Exported functions and variables expose the types they mention.
		if obj.Exported() {
			b.expose(obj.Type())
		}
	}
	return concretes
}

// exposeMethods exposes the signatures of named's exported methods and, for
// a struct, the types of its exported fields.
func (b *overrideBoundary) exposeMethods(named *types.Named) {
	// Exported methods return values from the package.
	for method := range named.Methods() {
		if method.Exported() {
			b.expose(method.Type())
		}
	}

	// An override may fill the exported fields of a struct.
	if st, ok := named.Underlying().(*types.Struct); ok {
		for field := range st.Fields() {
			if field.Exported() {
				b.expose(field.Type())
			}
		}
	}
}

// expose records the interfaces typ can carry across the override boundary.
// A named type of an override package stops the walk, since the package's
// own collection covers it; a named type of a compiled package is walked, as
// an override may fill its fields.
func (b *overrideBoundary) expose(typ types.Type) {
	// Each type is walked once.
	if typ == nil || b.seen[typ] {
		return
	}
	b.seen[typ] = true

	// An interface is a boundary interface, and its methods expose more.
	if iface, ok := typ.Underlying().(*types.Interface); ok {
		if _, param := typ.(*types.TypeParam); !param {
			iface.Complete()
			b.ifaces = append(b.ifaces, iface)
			b.ifaceNames = append(b.ifaceNames, types.TypeString(typ, nil)+" through "+b.source)
			for method := range iface.Methods() {
				b.expose(method.Type())
			}
		}
		return
	}

	// Composite types expose their elements.
	switch typed := typ.(type) {
	case *types.Alias:
		b.expose(types.Unalias(typed))
	case *types.Named:
		if typed.Obj().Pkg() == nil || !b.pkgPaths[typed.Obj().Pkg().Path()] {
			b.exposeCompiled(typed)
		}
	case *types.Pointer:
		b.expose(typed.Elem())
	case *types.Slice:
		b.expose(typed.Elem())
	case *types.Array:
		b.expose(typed.Elem())
	case *types.Chan:
		b.expose(typed.Elem())
	case *types.Map:
		b.expose(typed.Key())
		b.expose(typed.Elem())
	case *types.Signature:
		b.exposeTuple(typed.Params())
		b.exposeTuple(typed.Results())
	case *types.Struct:
		for field := range typed.Fields() {
			b.expose(field.Type())
		}
	}
}

// exposeCompiled exposes what an override can reach of a value of named, a
// type of a compiled package: its exported methods and, for a struct, its
// exported fields, which exposeMethods covers. An unexported field is set
// only by the compiled package's own code, since override TypeScript fills
// only the exported fields of a compiled struct it builds (only crypto and
// net/url are compiled packages that overrides import), so it is not
// walked: *big.Int's Rand method exposes *rand.Rand, but not the Source
// in its unexported field.
func (b *overrideBoundary) exposeCompiled(named *types.Named) {
	if _, ok := named.Underlying().(*types.Struct); !ok {
		b.expose(named.Underlying())
	}
	b.exposeMethods(named)
}

// exposeTuple exposes the types of a parameter or result list.
func (b *overrideBoundary) exposeTuple(tuple *types.Tuple) {
	for v := range tuple.Variables() {
		b.expose(v.Type())
	}
}

// reaches reports whether a value from an override package could implement
// iface: an override type implements it, or a boundary interface has all of
// its methods.
func (b *overrideBoundary) reaches(iface *types.Interface) bool {
	return b.witness(iface) != ""
}

// witness describes an override value that could implement iface and
// suspend in it without metadata saying so, or returns "" when none could.
func (b *overrideBoundary) witness(iface *types.Interface) string {
	// An override type implements iface.
	methods := interfaceMethodMap(iface)
	for _, idx := range implementationMethodSetCandidates(b.methodSetIndex, methods) {
		receiver := b.methodSets[idx].receiver
		if types.Implements(receiver, iface) && !b.trustsAllFor(receiver, iface) {
			return "override type " + types.TypeString(receiver, nil) + " implements it"
		}
	}

	// A boundary interface value may hold an object that implements iface.
	for _, idx := range implementationMethodSetCandidates(b.ifaceIndex, methods) {
		if types.Implements(b.ifaces[idx], iface) && !b.trustsAllFor(b.ifaces[idx], iface) {
			return "an override package exposes " + b.ifaceNames[idx] + ", which has its methods"
		}
	}
	return ""
}

// closedInterfaces returns the exported named interfaces of a whole program
// whose implementations are all compiled Go code with bodies, so that the
// implementation graph decides whether their methods are async.
//
// An implementation that is itself an interface method, promoted from an
// embedded interface field, is as closed as that interface, so the set is
// narrowed to a fixed point.
func closedInterfaces(
	model *SemanticModel,
	interfaceGraph []semanticInterfaceImplementationGraphEntry,
	boundary *overrideBoundary,
) map[*types.Named]bool {
	// Group the implementations by interface. An interface that metadata
	// declares sync may have only override implementations, none of them in
	// the graph.
	entries := make(map[*types.Named][]semanticInterfaceImplementationGraphEntry)
	for _, graphEntry := range interfaceGraph {
		origin := namedOriginOrSelf(graphEntry.iface)
		entries[origin] = append(entries[origin], graphEntry)
	}
	for _, named := range boundary.syncInterfaces {
		if _, ok := entries[named]; !ok {
			entries[named] = nil
		}
	}

	// Find the candidates and the interfaces their implementations forward to.
	closed := make(map[*types.Named]bool)
	forwards := make(map[*types.Named][]*types.Named)
	for named, list := range entries {
		if !closedInterfaceCandidate(named, boundary) {
			continue
		}
		deps, ok := implementationForwards(model, boundary, list)
		if ok {
			closed[named] = true
			forwards[named] = deps
		}
	}

	// Open every interface that forwards to an interface that is not closed.
	for changed := true; changed; {
		changed = false
		for named := range closed {
			if slices.ContainsFunc(forwards[named], func(dep *types.Named) bool { return !interfaceKnown(dep, closed) }) {
				delete(closed, named)
				changed = true
			}
		}
	}
	return closed
}

// closedInterfaceCandidate reports whether named is an exported, non-generic
// method-set interface of a compiled package that no override value can
// implement and suspend in, or an interface of an override package whose
// methods are all trusted. A sealed interface is already known; a generic
// interface or a constraint with type terms stays open.
func closedInterfaceCandidate(named *types.Named, boundary *overrideBoundary) bool {
	// An override package's interface can be closed only when metadata
	// declares it sync.
	iface, _ := named.Underlying().(*types.Interface)
	if iface == nil || named.Obj().Pkg() == nil {
		return false
	}
	override := boundary.pkgPaths[named.Obj().Pkg().Path()]
	if override && !boundary.syncDeclared(named) {
		return false
	}

	// Generic and constraint interfaces keep their own rules, and so does a
	// sealed compiled one. A sealed override interface's implementations
	// are override values, which the graph does not hold.
	if namedTypeHasParams(named) || !iface.IsMethodSet() || interfaceIsPackageSealed(iface) && !override {
		return false
	}
	return iface.NumMethods() != 0 && !boundary.reaches(iface)
}

// implementationForwards returns the interfaces whose methods the
// implementations in list forward to: interfaces of compiled packages, or
// trusted override interfaces. It reports false when an implementation
// method is neither such an interface method, nor compiled Go code with a
// body, nor a trusted override method.
func implementationForwards(
	model *SemanticModel,
	boundary *overrideBoundary,
	list []semanticInterfaceImplementationGraphEntry,
) ([]*types.Named, bool) {
	var deps []*types.Named
	for _, graphEntry := range list {
		for name := range graphEntry.ifaceMethods {
			// A promoted interface method forwards to its interface.
			implMethod := graphEntry.implMethods[name]
			signature, _ := implMethod.Type().(*types.Signature)
			if signature != nil && signature.Recv() != nil && isInterfaceType(signature.Recv().Type()) {
				dep := receiverNamedType(signature.Recv().Type())
				if !boundary.forwardable(dep) {
					return nil, false
				}
				deps = append(deps, namedOriginOrSelf(dep))
				continue
			}

			// Any other implementation must be a compiled method with a body,
			// or a trusted override method.
			semFn := semanticFunctionFor(model, implMethod)
			if (semFn == nil || !semFn.hasBody) && !boundary.trustsImplementation(graphEntry, implMethod) {
				return nil, false
			}
		}
	}
	return deps, true
}

// forwardable reports whether an implementation may forward to the methods
// of dep: an interface of a compiled package, or an override interface that
// metadata declares sync.
func (b *overrideBoundary) forwardable(dep *types.Named) bool {
	if dep == nil || dep.Obj().Pkg() == nil {
		return false
	}
	return !b.pkgPaths[dep.Obj().Pkg().Path()] || b.syncDeclared(dep)
}

// trustsImplementation reports whether an override method implements an
// interface method like a compiled one: its receiver is trusted for it, and
// metadata does not make it async only in some programs, which the
// implementation graph would not see.
func (b *overrideBoundary) trustsImplementation(graphEntry semanticInterfaceImplementationGraphEntry, method *types.Func) bool {
	// Only an override method can be trusted.
	pkgPath, name, ok := overrideMetadataName(method)
	if !ok || !b.pkgPaths[pkgPath] || len(b.facts.AsyncWhenMethods(pkgPath, name)) != 0 {
		return false
	}

	// Its receiver must implement a sync interface with the method.
	var receiver types.Type = graphEntry.typ
	if graphEntry.pointer {
		receiver = types.NewPointer(receiver)
	}
	return b.trustedFor(receiver, method)
}

// interfaceKnown reports whether the implementation graph colors the methods
// of named: it is closed, or a non-generic package-sealed interface.
func interfaceKnown(named *types.Named, closed map[*types.Named]bool) bool {
	if closed[named] {
		return true
	}
	iface, _ := named.Underlying().(*types.Interface)
	return interfaceIsPackageSealed(iface) && !namedTypeHasParams(named)
}

// Function values from override packages.
//
// An override is hand-written TypeScript, so the function values it hands to
// compiled code have no compiled body: its function results, the func-typed
// fields of its types and variables, and the callbacks it passes to Go
// functions it takes. Such a value suspends only by calling the Go functions
// it was given: its own function arguments, and those of the override
// function or method that produced it. sync.OnceFunc's result calls its
// argument, and an iterator from slices.Values calls its yield callback.
// Each value is a node that calls through the classes of those parameters.

// overrideValueWalker finds the function values override packages produce.
type overrideValueWalker struct {
	model    *SemanticModel
	pkgPaths map[string]bool
	values   []funcValue
	// nodes holds the node of each value shape and dependency set.
	nodes map[string]*semanticFunction
	seen  map[overrideValueSeen]bool
}

// overrideValueSeen is a type walked with a polarity.
type overrideValueSeen struct {
	typ     types.Type
	outward bool
}

// addOverrideFuncValues adds a node for each function value override
// packages produce and returns the values.
func addOverrideFuncValues(model *SemanticModel, overridePkgs []*types.Package) []funcValue {
	// The override packages are boundary packages.
	w := &overrideValueWalker{
		model:    model,
		pkgPaths: make(map[string]bool, len(overridePkgs)),
		nodes:    make(map[string]*semanticFunction),
		seen:     make(map[overrideValueSeen]bool),
	}
	for _, pkg := range overridePkgs {
		w.pkgPaths[pkg.Path()] = true
	}

	// Walk the exported API of each package.
	for _, pkg := range overridePkgs {
		for _, name := range pkg.Scope().Names() {
			if obj := pkg.Scope().Lookup(name); obj.Exported() {
				w.walkObject(obj)
			}
		}
	}
	return w.values
}

// addSuspendingFuncValues adds a value of each shape that the program's
// calls of suspendingValues override functions receive, and returns the
// values. They share one node that suspends by itself: iter.Pull's next and
// stop wait for the sequence, and its yield waits for the next call.
func addSuspendingFuncValues(model *SemanticModel) []funcValue {
	// Collect the shapes of every package.
	shapes := make(map[string]bool)
	for _, semPkg := range model.packages {
		maps.Copy(shapes, semPkg.suspendingValueShapes)
	}
	if len(shapes) == 0 {
		return nil
	}

	// The node is async by its own code.
	node := newSyntheticNode(token.NoPos, nil, funcValueNodeName)
	markOwnAsync(node, token.NoPos, asyncCauseOverrideValue, "override metadata says the function values of a call suspend (suspendingValues)")
	model.valueNodes[node.function] = node

	// Each shape is a value of the node.
	values := make([]funcValue, 0, len(shapes))
	for _, shape := range slices.Sorted(maps.Keys(shapes)) {
		values = append(values, funcValue{shape: shape, key: node.function})
	}
	return values
}

// walkObject walks the values an exported object can produce.
func (w *overrideValueWalker) walkObject(obj types.Object) {
	switch typed := obj.(type) {
	case *types.Func:
		signature, _ := typed.Type().(*types.Signature)
		w.walkSignatureParts(signature, signature, true)
	case *types.Var:
		w.walk(typed.Type(), true, nil)
	case *types.TypeName:
		w.walk(typed.Type(), true, nil)
	}
}

// walkSignatureParts walks the parameters and results of a function called
// in the given direction: compiled code calls an outward function, so its
// parameters flow in and its results flow out, and the reverse for an inward
// one. producer is the override function whose arguments a value may call.
func (w *overrideValueWalker) walkSignatureParts(signature, producer *types.Signature, outward bool) {
	if signature == nil {
		return
	}
	for v := range signature.Params().Variables() {
		w.walk(v.Type(), !outward, nil)
	}
	for v := range signature.Results().Variables() {
		w.walk(v.Type(), outward, producer)
	}
}

// walk walks typ, which flows to compiled code when outward.
func (w *overrideValueWalker) walk(typ types.Type, outward bool, producer *types.Signature) {
	// Each type is walked once per direction.
	typ = types.Unalias(typ)
	key := overrideValueSeen{typ: typ, outward: outward}
	if typ == nil || w.seen[key] {
		return
	}
	w.seen[key] = true

	// A function flowing out is a value; its own parts flow by its direction.
	switch typed := typ.(type) {
	case *types.Signature:
		if outward {
			w.addValue(typed, producer)
		}
		w.walkSignatureParts(typed, producer, outward)
	case *types.Named:
		w.walkNamed(typed, outward, producer)
	case *types.Interface:
		for method := range typed.Methods() {
			signature, _ := method.Type().(*types.Signature)
			w.walkSignatureParts(signature, signature, outward)
		}
	case *types.Struct:
		for field := range typed.Fields() {
			if field.Exported() {
				w.walk(field.Type(), outward, producer)
			}
		}
	case *types.Map:
		w.walk(typed.Key(), outward, producer)
		w.walk(typed.Elem(), outward, producer)
	case interface{ Elem() types.Type }:
		w.walk(typed.Elem(), outward, producer)
	}
}

// walkNamed walks a named type's underlying type and, for a type of an
// override package, the methods compiled code calls on it.
func (w *overrideValueWalker) walkNamed(named *types.Named, outward bool, producer *types.Signature) {
	w.walk(named.Underlying(), outward, producer)
	if named.Obj().Pkg() == nil || !w.pkgPaths[named.Obj().Pkg().Path()] {
		return
	}
	for method := range named.Methods() {
		if method.Exported() {
			signature, _ := method.Type().(*types.Signature)
			w.walkSignatureParts(signature, signature, true)
		}
	}
}

// addValue adds a value of signature produced by producer: a node calling
// the classes of the function parameters of both.
//
// A producer parameter of the value's own type is left out. The function
// passed for it is a value of that type, so the classes that may reach the
// produced value already reach it: sync.OnceFunc's result is async exactly
// where its argument makes calls of its type async. A value that calls
// nothing else is never async by itself and is not added.
func (w *overrideValueWalker) addValue(signature, producer *types.Signature) {
	// The node calls through the classes of the function parameters.
	shapes := make(map[string]bool)
	for _, sig := range []*types.Signature{signature, producer} {
		if sig == nil {
			continue
		}
		for v := range sig.Params().Variables() {
			shape := funcValueShape(v.Type())
			if shape != "" && (sig == signature || !types.Identical(v.Type().Underlying(), signature)) {
				shapes[shape] = true
			}
		}
	}
	if len(shapes) == 0 {
		return
	}

	// Values with the same shape and dependencies share a node.
	shape := funcValueShape(signature)
	nodeKey := shape + "|" + strings.Join(slices.Sorted(maps.Keys(shapes)), "|")
	if w.nodes[nodeKey] != nil {
		return
	}
	node := newSyntheticNode(token.NoPos, nil, funcValueNodeName)
	if len(shapes) != 0 {
		node.valueCalls = shapes
	}
	w.nodes[nodeKey] = node
	w.model.valueNodes[node.function] = node
	w.values = append(w.values, funcValue{shape: shape, key: node.function})
}
