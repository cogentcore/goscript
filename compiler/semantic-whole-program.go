package compiler

import (
	"go/types"
	"slices"
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
}

// newOverrideBoundary collects the boundary of the override packages in the
// graph.
func newOverrideBoundary(overridePkgs []*types.Package) *overrideBoundary {
	// The override packages stop the walk of exposed types.
	b := &overrideBoundary{
		pkgPaths:   make(map[string]bool, len(overridePkgs)),
		ifaceIndex: make(map[string][]int),
		seen:       make(map[types.Type]bool),
	}
	for _, pkg := range overridePkgs {
		b.pkgPaths[pkg.Path()] = true
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

// collectPackage records the interfaces pkg declares or exposes and returns
// its concrete named types.
func (b *overrideBoundary) collectPackage(pkg *types.Package) []*types.Named {
	// Every object in the package scope, exported or not, is visited.
	var concretes []*types.Named
	for _, name := range pkg.Scope().Names() {
		obj := pkg.Scope().Lookup(name)

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
			b.expose(typed.Underlying())
			b.exposeMethods(typed)
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
	// An override type implements iface.
	methods := interfaceMethodMap(iface)
	for _, idx := range implementationMethodSetCandidates(b.methodSetIndex, methods) {
		if types.Implements(b.methodSets[idx].receiver, iface) {
			return true
		}
	}

	// A boundary interface value may hold an object that implements iface.
	return slices.ContainsFunc(implementationMethodSetCandidates(b.ifaceIndex, methods), func(idx int) bool {
		return types.Implements(b.ifaces[idx], iface)
	})
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
	overridePkgs []*types.Package,
) map[*types.Named]bool {
	// Group the implementations by interface.
	entries := make(map[*types.Named][]semanticInterfaceImplementationGraphEntry)
	for _, graphEntry := range interfaceGraph {
		origin := namedOriginOrSelf(graphEntry.iface)
		entries[origin] = append(entries[origin], graphEntry)
	}

	// Find the candidates and the interfaces their implementations forward to.
	boundary := newOverrideBoundary(overridePkgs)
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
// implement. A sealed interface is already known; a generic interface or a
// constraint with type terms stays open.
func closedInterfaceCandidate(named *types.Named, boundary *overrideBoundary) bool {
	// Only an interface of a compiled package can be closed.
	iface, _ := named.Underlying().(*types.Interface)
	if iface == nil || named.Obj().Pkg() == nil || boundary.pkgPaths[named.Obj().Pkg().Path()] {
		return false
	}

	// Generic, constraint and sealed interfaces keep their own rules.
	if namedTypeHasParams(named) || !iface.IsMethodSet() || interfaceIsPackageSealed(iface) {
		return false
	}
	return iface.NumMethods() != 0 && !boundary.reaches(iface)
}

// implementationForwards returns the interfaces of compiled packages whose
// methods the implementations in list forward to. It reports false when an
// implementation method is neither such an interface method nor compiled Go
// code with a body.
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
				if dep == nil || dep.Obj().Pkg() == nil || boundary.pkgPaths[dep.Obj().Pkg().Path()] {
					return nil, false
				}
				deps = append(deps, namedOriginOrSelf(dep))
				continue
			}

			// Any other implementation must be a compiled method with a body.
			if semFn := semanticFunctionFor(model, implMethod); semFn == nil || !semFn.hasBody {
				return nil, false
			}
		}
	}
	return deps, true
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
