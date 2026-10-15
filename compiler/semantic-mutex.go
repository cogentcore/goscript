package compiler

import (
	"go/ast"
	"go/token"
	"go/types"

	"golang.org/x/tools/go/packages"
)

// Mutex locks decided by their critical sections.
//
// A Lock or RLock of a sync.Mutex or sync.RWMutex suspends only when another
// goroutine holds the lock. The runtime runs one goroutine at a time and
// switches only where one suspends, so a lock can be held by another
// goroutine only across a suspension inside a critical section. When no
// critical section of a mutex can suspend, every Lock of it finds it free,
// the runtime acquires it synchronously, and the call need not be awaited.
//
// Mutexes are told apart by where they are declared: a struct field (all
// values of the struct share it) or a package variable. A Lock whose mutex
// is reached any other way, such as through a pointer or a local variable,
// stays async, as does every Lock of a mutex that escapes the analysis:
//
//   - its address is taken, so code the analysis does not see may lock it
//     through the pointer;
//   - a method of it is taken as a value;
//   - a Lock of it has no Unlock of it in the same function body, so the
//     lock may be held after the function returns;
//   - it is embedded in a struct, and the program converts a type to an
//     interface whose Lock or RLock method the mutex implements, or makes
//     functions by reflection.
//
// The critical section of a Lock is the statements up to the first Unlock
// of the same mutex after it in the same statement list, or, when that
// Unlock is deferred or elsewhere in the body, the whole function body. It
// is an analysis node of its own, like a function literal: it records the
// calls and suspending operations in its statements. Each mutex has a node
// that calls its critical sections, and a function that locks it calls that
// node, so the coloring decides the Lock calls with everything else.

// Names of the synthetic nodes of critical sections and mutexes.
const (
	lockSectionNodeName = "mutex·section"
	mutexNodeName       = "mutex·"
)

// The sync methods the analysis decides.
const (
	mutexLock    = "Lock"
	mutexRLock   = "RLock"
	mutexUnlock  = "Unlock"
	mutexRUnlock = "RUnlock"
)

// mutexMethod returns the name of a method of sync.Mutex or sync.RWMutex,
// or "".
func mutexMethod(fn *types.Func) string {
	signature, _ := fn.Type().(*types.Signature)
	if signature == nil || signature.Recv() == nil {
		return ""
	}
	if named := receiverNamedType(signature.Recv().Type()); named == nil || !isMutexType(named) {
		return ""
	}
	return fn.Name()
}

// isMutexType reports whether typ is sync.Mutex or sync.RWMutex.
func isMutexType(typ types.Type) bool {
	named, ok := types.Unalias(typ).(*types.Named)
	if !ok || named == nil || named.Obj().Pkg() == nil || named.Obj().Pkg().Path() != syncPackagePath {
		return false
	}
	return named.Obj().Name() == "Mutex" || named.Obj().Name() == "RWMutex"
}

// mutexMethodCall returns the method of sync.Mutex or sync.RWMutex that a
// selector selects, and the mutex it is called on: the struct field or
// package variable holding it, or nil when the mutex is reached another way.
func mutexMethodCall(pkg *packages.Package, expr ast.Expr) (string, types.Object) {
	// Only a mutex method qualifies.
	sel, ok := ast.Unparen(expr).(*ast.SelectorExpr)
	if !ok {
		return "", nil
	}
	selection := pkg.TypesInfo.Selections[sel]
	if selection == nil || selection.Kind() != types.MethodVal {
		return "", nil
	}
	method, _ := selection.Obj().(*types.Func)
	name := ""
	if method != nil {
		name = mutexMethod(method)
	}
	if name == "" {
		return "", nil
	}

	// A promoted method locks the embedded field; any other the mutex its
	// operand names.
	if index := selection.Index(); len(index) > 1 {
		return name, embeddedMutexField(selection.Recv(), index[:len(index)-1])
	}
	return name, mutexOperand(pkg, sel.X)
}

// embeddedMutexField returns the field that the embedded field path reaches
// from typ, when it holds a mutex value.
func embeddedMutexField(typ types.Type, path []int) types.Object {
	var field *types.Var
	for _, idx := range path {
		if pointer, ok := types.Unalias(typ).Underlying().(*types.Pointer); ok {
			typ = pointer.Elem()
		}
		structType, ok := types.Unalias(typ).Underlying().(*types.Struct)
		if !ok || idx >= structType.NumFields() {
			return nil
		}
		field = structType.Field(idx)
		typ = field.Type()
	}
	if field == nil || !isMutexType(field.Type()) {
		return nil
	}
	return field.Origin()
}

// mutexOperand returns the struct field or package variable an expression
// names when it holds a mutex value, or nil.
func mutexOperand(pkg *packages.Package, expr ast.Expr) types.Object {
	// A struct field, or a package variable of this or another package.
	var obj types.Object
	switch typed := ast.Unparen(expr).(type) {
	case *ast.Ident:
		obj = pkg.TypesInfo.Uses[typed]
	case *ast.SelectorExpr:
		if selection := pkg.TypesInfo.Selections[typed]; selection != nil {
			if selection.Kind() != types.FieldVal {
				return nil
			}
			obj = selection.Obj()
		} else {
			obj = pkg.TypesInfo.Uses[typed.Sel]
		}
	}

	// It must hold the mutex itself, not a pointer to one.
	v, ok := obj.(*types.Var)
	if !ok || !isMutexType(v.Type()) {
		return nil
	}
	if !v.IsField() && (v.Pkg() == nil || v.Parent() != v.Pkg().Scope()) {
		return nil
	}
	return v.Origin()
}

// lockSite is a Lock or RLock call statement of a known mutex, with the
// statements of its critical section, or none when the mutex escapes there.
type lockSite struct {
	mutex  types.Object
	region []ast.Stmt
	ok     bool
}

// collectLockSites finds the Lock and RLock statements of known mutexes in
// a function body, outside its function literals, and their critical
// sections.
func collectLockSites(pkg *packages.Package, body *ast.BlockStmt, sites map[*ast.CallExpr]lockSite) {
	// Find the Unlock calls of each mutex, and whether one is deferred.
	unlocks := make(map[types.Object]map[string]bool)
	deferred := make(map[types.Object]bool)
	inspectBody(body, func(node ast.Node) {
		call, isDefer := unlockCallOf(node)
		if call == nil {
			return
		}
		name, mutex := mutexMethodCall(pkg, call.Fun)
		if mutex == nil || name != mutexUnlock && name != mutexRUnlock {
			return
		}
		if unlocks[mutex] == nil {
			unlocks[mutex] = make(map[string]bool)
		}
		unlocks[mutex][name] = true
		deferred[mutex] = deferred[mutex] || isDefer
	})

	// Each Lock statement in a statement list has a critical section.
	inspectBody(body, func(node ast.Node) {
		for idx, stmt := range statementList(node) {
			call, name, mutex := lockStatement(pkg, stmt)
			if call == nil {
				continue
			}
			unlock := map[string]string{mutexLock: mutexUnlock, mutexRLock: mutexRUnlock}[name]
			site := lockSite{mutex: mutex, region: body.List, ok: unlocks[mutex][unlock]}
			if end := unlockAfter(pkg, node, idx, mutex, unlock); end > idx && !deferred[mutex] {
				site.region = statementList(node)[idx+1 : end]
			}
			sites[call] = site
		}
	})
}

// inspectBody calls visit for each node of body outside its function
// literals.
func inspectBody(body *ast.BlockStmt, visit func(ast.Node)) {
	ast.Inspect(body, func(node ast.Node) bool {
		if _, ok := node.(*ast.FuncLit); ok {
			return false
		}
		visit(node)
		return true
	})
}

// unlockCallOf returns the call of an expression or defer statement, and
// whether it is deferred.
func unlockCallOf(node ast.Node) (*ast.CallExpr, bool) {
	switch typed := node.(type) {
	case *ast.ExprStmt:
		call, _ := ast.Unparen(typed.X).(*ast.CallExpr)
		return call, false
	case *ast.DeferStmt:
		return typed.Call, true
	}
	return nil, false
}

// statementList returns the statements a block or clause holds.
func statementList(node ast.Node) []ast.Stmt {
	switch typed := node.(type) {
	case *ast.BlockStmt:
		return typed.List
	case *ast.CaseClause:
		return typed.Body
	case *ast.CommClause:
		return typed.Body
	}
	return nil
}

// lockStatement returns the Lock or RLock call of a known mutex that stmt
// is, with the method name and the mutex.
func lockStatement(pkg *packages.Package, stmt ast.Stmt) (*ast.CallExpr, string, types.Object) {
	exprStmt, ok := stmt.(*ast.ExprStmt)
	if !ok {
		return nil, "", nil
	}
	call, ok := ast.Unparen(exprStmt.X).(*ast.CallExpr)
	if !ok {
		return nil, "", nil
	}
	name, mutex := mutexMethodCall(pkg, call.Fun)
	if mutex == nil || name != mutexLock && name != mutexRLock {
		return nil, "", nil
	}
	return call, name, mutex
}

// unlockAfter returns the index of the first unlock statement of mutex
// after idx in the statement list of node, or -1.
func unlockAfter(pkg *packages.Package, node ast.Node, idx int, mutex types.Object, unlock string) int {
	list := statementList(node)
	for end := idx + 1; end < len(list); end++ {
		call, isDefer := unlockCallOf(list[end])
		if call == nil || isDefer {
			continue
		}
		if name, other := mutexMethodCall(pkg, call.Fun); other == mutex && name == unlock {
			return end
		}
	}
	return -1
}

// newMutexNode returns the node of a mutex, which calls its critical
// sections.
func newMutexNode(mutex types.Object) *semanticFunction {
	return newSyntheticNode(mutex.Pos(), mutex.Pkg(), mutexNodeName+mutex.Name())
}

// recordLock records that node locks mutex.
func recordLock(node *semanticFunction, mutex types.Object) {
	if node.locks == nil {
		node.locks = make(map[types.Object]bool)
	}
	node.locks[mutex] = true
}

// recordMutexEscape records that a mutex escapes the analysis at pos.
func (p *semanticPackage) recordMutexEscape(mutex types.Object, pos token.Pos) {
	if p.mutexEscapes == nil {
		p.mutexEscapes = make(map[types.Object]token.Pos)
	}
	if _, ok := p.mutexEscapes[mutex]; !ok {
		p.mutexEscapes[mutex] = pos
	}
}

// addMutexNodes gives each mutex with a known critical section a node that
// calls its sections, in a model whose packages are merged.
func addMutexNodes(model *SemanticModel) {
	model.mutexNodes = make(map[types.Object]*semanticFunction)
	for _, semPkg := range model.packages {
		for _, section := range semPkg.lockSections {
			node := model.mutexNodes[section.mutex]
			if node == nil {
				node = newMutexNode(section.mutex)
				model.mutexNodes[section.mutex] = node
				model.valueNodes[node.function] = node
			}
			node.calls[section.function] = true
		}
	}
}

// embeddedMutexesExposed reports whether code the analysis does not see may
// lock an embedded mutex: the program has a type whose promoted Lock or
// RLock implements an interface method, or makes functions by reflection.
func embeddedMutexesExposed(
	interfaceGraph []semanticInterfaceImplementationGraphEntry,
	anonymousInterfaceGraph []semanticAnonymousInterfaceImplementation,
	makesFuncValues bool,
) bool {
	// Any implementation by a mutex's own Lock or RLock exposes it.
	exposes := func(implMethods map[string]*types.Func) bool {
		for _, name := range []string{mutexLock, mutexRLock} {
			if impl := implMethods[name]; impl != nil && mutexMethod(impl) != "" {
				return true
			}
		}
		return false
	}
	for _, entry := range interfaceGraph {
		if exposes(entry.implMethods) {
			return true
		}
	}
	for _, entry := range anonymousInterfaceGraph {
		if exposes(entry.implMethods) {
			return true
		}
	}
	return makesFuncValues
}

// markMutexEscapes marks the node of each mutex that escapes the analysis
// async by itself, and of each embedded mutex when embedded mutexes are
// exposed.
func markMutexEscapes(model *SemanticModel, embeddedExposed bool) {
	// Every package's escapes count.
	escapes := make(map[types.Object]token.Pos)
	for _, semPkg := range model.packages {
		for mutex, pos := range semPkg.mutexEscapes {
			escapes[mutex] = pos
		}
	}

	// Each escaping mutex's Lock suspends.
	for mutex, node := range model.mutexNodes {
		field, _ := mutex.(*types.Var)
		pos, escaped := escapes[mutex]
		switch {
		case escaped:
			markOwnAsync(node, pos, asyncCauseSync, "the mutex "+mutex.Name()+" escapes: its address or a method value is taken, or a Lock has no Unlock in its function")
		case embeddedExposed && field != nil && field.Embedded():
			markOwnAsync(node, mutex.Pos(), asyncCauseSync, "the embedded mutex "+mutex.Name()+" may be locked through an interface or by reflection")
		}
	}
}

// mutexCallAsync reports whether a Lock or RLock call with a critical
// section may suspend: its mutex's node is async. It reports ok false for
// any other call.
func (m *SemanticModel) mutexCallAsync(semPkg *semanticPackage, call *ast.CallExpr) (async, ok bool) {
	if m == nil || semPkg == nil || semPkg.lockSections[call.Pos()] == nil {
		return false, false
	}
	node := m.mutexNodes[semPkg.lockSections[call.Pos()].mutex]
	if node == nil {
		return false, false
	}
	return node.async, true
}
