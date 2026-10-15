package compiler

import (
	"go/ast"
	"go/token"
	"go/types"
	"slices"

	"golang.org/x/tools/go/packages"
)

// Async report (-report-async).
//
// The async coloring marks a function async at a root, a cause that makes
// it async by itself, or along an edge from another mark. With a report, the
// coloring also records every root and every edge from the mark it is
// propagating to the function, class or interface method that mark makes
// async, whether or not that one was already marked. The recorded graph is
// the async part of the program, so the report can tell how far each root
// spreads. The coloring itself is unchanged.

// Kinds of the roots and of the intermediate marks the report lists.
const (
	// asyncCauseChannel is a channel send or receive, or a select.
	asyncCauseChannel = "channel"
	// asyncCauseSync is a call of an async method of the sync package, such
	// as a mutex lock.
	asyncCauseSync = "sync"
	// asyncCauseOverrideCall is a call of another async override.
	asyncCauseOverrideCall = "override-call"
	// asyncCauseJSCall is a call of an async override of syscall/js.
	asyncCauseJSCall = "js-call"
	// asyncCausePrint is a call of the print or println builtin.
	asyncCausePrint = "print"
	// asyncCauseInitOrder is a lazy package variable initializer that calls
	// another compiled package, whose initialization may be pending.
	asyncCauseInitOrder = "init-order"
	// asyncCauseOwnBody is a function marked async by a stored body summary,
	// which does not keep the cause.
	asyncCauseOwnBody = "own-body"
	// asyncCauseOverrideInterface is a method of an interface that override
	// packages declare, implement or expose.
	asyncCauseOverrideInterface = "override-interface"
	// asyncCauseOpenInterface is a method of an interface that stays open for
	// another reason.
	asyncCauseOpenInterface = "open-interface"
	// asyncCauseLibraryBuild is a class or interface that a build without the
	// whole program keeps open, as -assume-async would.
	asyncCauseLibraryBuild = "library-build"
	// asyncCauseReflectFunc is a class of a func type asserted from an
	// interface value in a program that makes functions by reflection.
	asyncCauseReflectFunc = "reflect-func"
	// asyncCauseOverrideValue is an async override function or method taken
	// as a value.
	asyncCauseOverrideValue = "override-value"
	// asyncCauseOverrideMethod is an async override method that implements an
	// interface of the program.
	asyncCauseOverrideMethod = "override-method"
	// asyncCauseAsyncWhen is an asyncWhenMethods target that an async
	// override method of a named method makes async.
	asyncCauseAsyncWhen = "async-when"
	// asyncCauseShapeClass is a class of calls through function values that
	// a value of its shape made async.
	asyncCauseShapeClass = "shape-class"
	// asyncCauseInterface is an interface method that an implementation made
	// async.
	asyncCauseInterface = "interface"
)

// Packages whose async overrides the report names by kind.
const (
	syncPackagePath = "sync"
	jsPackagePath   = "syscall/js"
)

// boundaryAsyncCauses are the root kinds at the JavaScript and override
// boundary, the ones most likely to be conservative rather than real.
var boundaryAsyncCauses = map[string]bool{
	asyncCauseJSCall:            true,
	asyncCauseOverrideInterface: true,
	asyncCauseReflectFunc:       true,
}

// asyncCause is why a node's own code suspends: the first suspending
// operation the fact walk met.
type asyncCause struct {
	pos    token.Pos
	kind   string
	detail string
}

// markOwnAsync marks node async by an operation of its own code at pos and
// records the first such cause.
func markOwnAsync(node *semanticFunction, pos token.Pos, kind, detail string) {
	if markFunctionAsync(node) {
		node.asyncCause = &asyncCause{pos: pos, kind: kind, detail: detail}
	}
}

// suspendingCallCause classifies a call that callSuspends reports.
func suspendingCallCause(pkg *packages.Package, overrideFacts *OverrideFacts, fun ast.Expr) (string, string) {
	// The print builtins render output asynchronously.
	if isBuiltinPrintCall(pkg, fun) {
		return asyncCausePrint, ast.Unparen(fun).(*ast.Ident).Name
	}

	// Otherwise an async override method or function is called.
	pkgPath, name := overrideCallPackage(pkg, fun), overrideCallMethod(pkg, fun)
	if !overrideFacts.IsMethodAsync(pkgPath, name) {
		pkgPath, name = overrideFunctionCallPackage(pkg, fun), overrideFunctionCallName(pkg, fun)
	}

	// The sync package waits, and syscall/js and the overrides built on it
	// call JavaScript.
	switch {
	case pkgPath == syncPackagePath:
		return asyncCauseSync, pkgPath + "." + name
	case pkgPath == jsPackagePath || overrideImportsJS(calledFunction(pkg, fun)):
		return asyncCauseJSCall, pkgPath + "." + name
	}
	return asyncCauseOverrideCall, pkgPath + "." + name
}

// overrideImportsJS reports whether fn's package imports syscall/js.
func overrideImportsJS(fn *types.Func) bool {
	if fn == nil || fn.Pkg() == nil {
		return false
	}
	return slices.ContainsFunc(fn.Pkg().Imports(), func(imported *types.Package) bool {
		return imported.Path() == jsPackagePath
	})
}

// asyncReportNode is a node of the recorded graph: a function, literal or
// value node, or a class, interface method or override function key.
type asyncReportNode struct {
	semFn *semanticFunction
	fn    *types.Func
}

// asyncReportRoot is a recorded root at a node.
type asyncReportRoot struct {
	node    int
	kind    string
	pos     token.Pos
	subject string
	detail  string
}

// asyncReporter records the roots and edges of one coloring.
type asyncReporter struct {
	model        *SemanticModel
	wholeProgram bool
	boundary     *overrideBoundary
	ids          map[any]int
	nodes        []asyncReportNode
	edges        [][]int
	edgeSet      map[[2]int]bool
	// firstFrom holds the node whose edge first reached each node, or
	// noReportNode for a root.
	firstFrom []int
	roots     []asyncReportRoot
	rootNodes map[int]bool
	// cur is the node whose mark is being propagated.
	cur int
}

// noReportNode is the missing node.
const noReportNode = -1

// newAsyncReporter returns a reporter for a coloring of model.
func newAsyncReporter(model *SemanticModel, boundary *overrideBoundary, wholeProgram bool) *asyncReporter {
	return &asyncReporter{
		model:        model,
		wholeProgram: wholeProgram,
		boundary:     boundary,
		ids:          make(map[any]int),
		edgeSet:      make(map[[2]int]bool),
		rootNodes:    make(map[int]bool),
		cur:          noReportNode,
	}
}

// node returns the id of the node with identity key, adding it when new.
func (r *asyncReporter) node(key any, node asyncReportNode) int {
	// A known key keeps its node; a new one gets the next id.
	if id, ok := r.ids[key]; ok {
		return id
	}
	id := len(r.nodes)
	r.ids[key] = id
	r.nodes = append(r.nodes, node)
	r.edges = append(r.edges, nil)
	r.firstFrom = append(r.firstFrom, noReportNode)
	return id
}

// keyNode returns the node of a coloring key.
func (r *asyncReporter) keyNode(key *types.Func) int {
	if isInterfaceMethod(key) {
		return r.interfaceNode(key)
	}
	if semFn := semanticFunctionFor(r.model, key); semFn != nil {
		return r.semFnNode(semFn)
	}
	return r.node(key, asyncReportNode{fn: key})
}

// semFnNode returns the node of a semantic function. The function of an
// interface method is the interface method's node.
func (r *asyncReporter) semFnNode(semFn *semanticFunction) int {
	if semFn.function != nil && isInterfaceMethod(semFn.function) {
		return r.interfaceNode(semFn.function)
	}
	return r.node(semFn, asyncReportNode{semFn: semFn})
}

// interfaceNode returns the node of an interface method. The coloring marks
// a named interface's method by full name, so its instances share a node.
func (r *asyncReporter) interfaceNode(method *types.Func) int {
	var key any = method
	if interfaceMethodHasNamedReceiver(method) {
		if fullName := r.model.functionFullName(method); fullName != "" {
			key = "iface:" + fullName
		}
	}
	return r.node(key, asyncReportNode{fn: method})
}

// isInterfaceMethod reports whether fn is a method of an interface.
func isInterfaceMethod(fn *types.Func) bool {
	signature, _ := fn.Type().(*types.Signature)
	return signature != nil && signature.Recv() != nil && isInterfaceType(signature.Recv().Type())
}

// root records a root at node and makes it the node being propagated.
func (r *asyncReporter) root(node int, kind string, pos token.Pos, subject, detail string) {
	if !r.rootNodes[node] {
		r.rootNodes[node] = true
		r.roots = append(r.roots, asyncReportRoot{node: node, kind: kind, pos: pos, subject: subject, detail: detail})
	}
	r.cur = node
}

// edge records that the node being propagated makes to async.
func (r *asyncReporter) edge(to int) {
	// Each edge is recorded once, and the first one to reach a node that is
	// not a root is its parent.
	from := r.cur
	if from == noReportNode || from == to || r.edgeSet[[2]int{from, to}] {
		return
	}
	r.edgeSet[[2]int{from, to}] = true
	r.edges[from] = append(r.edges[from], to)
	if r.firstFrom[to] == noReportNode && !r.rootNodes[to] {
		r.firstFrom[to] = from
	}
}

// addOwnRoots records each function, literal and initializer whose own code
// suspends as a root.
func (r *asyncReporter) addOwnRoots() {
	// Every node async before the coloring is async by its own code.
	var nodes []*semanticFunction
	for fn, semFn := range r.model.functions {
		if semFn.async && fn == semFn.function {
			nodes = append(nodes, semFn)
		}
	}
	for _, node := range r.model.valueNodes {
		if node.async {
			nodes = append(nodes, node)
		}
	}

	// Each is a root of its cause's kind.
	for _, semFn := range nodes {
		kind, pos, detail := asyncCauseOwnBody, semFn.function.Pos(), "suspends in its own body"
		if cause := semFn.asyncCause; cause != nil {
			kind, pos, detail = cause.kind, cause.pos, cause.detail
		}
		r.root(r.semFnNode(semFn), kind, pos, "", detail)
	}
	r.cur = noReportNode
}

// addOverrideMethodRoot records an async override method that implements
// interface methods as a root.
func (r *asyncReporter) addOverrideMethodRoot(implFn *semanticFunction) {
	r.root(r.semFnNode(implFn), asyncCauseOverrideMethod, token.NoPos, "",
		"override metadata marks the method async, and it implements an interface of the program")
}

// addClassRoot records a class that is async whatever the program as a root.
func (r *asyncReporter) addClassRoot(class *types.Func) {
	if !r.wholeProgram {
		r.root(r.keyNode(class), asyncCauseLibraryBuild, token.NoPos, "",
			"a library build keeps every class of calls through function values async, as -assume-async")
		return
	}
	r.root(r.keyNode(class), asyncCauseReflectFunc, token.NoPos, "",
		"the program asserts a func type of this shape from an interface value and makes functions by reflection")
}

// addValueRoot records a function value that is async by itself as a root:
// an async override function or method, or a method of an open interface.
func (r *asyncReporter) addValueRoot(key *types.Func) {
	if isInterfaceMethod(key) {
		kind, detail := r.openMethodCause(key)
		r.root(r.keyNode(key), kind, token.NoPos, "", "taken as a value; "+detail)
		return
	}
	r.root(r.keyNode(key), asyncCauseOverrideValue, token.NoPos, "",
		"override metadata marks it async, and the program takes its value")
}

// addAsyncWhenRoot records an asyncWhenMethods target that an async override
// method makes async as a root.
func (r *asyncReporter) addAsyncWhenRoot(target *types.Func) {
	r.root(r.keyNode(target), asyncCauseAsyncWhen, token.NoPos, "",
		"override metadata makes it async with an async method of a name it lists, and an override method of that name is async")
}

// addOpenMethodRoot records a called open interface method as a root.
func (r *asyncReporter) addOpenMethodRoot(method *types.Func) {
	kind, detail := r.openMethodCause(method)
	r.root(r.keyNode(method), kind, token.NoPos, "", detail)
}

// openMethodCause returns why the implementation graph does not color an
// interface method.
func (r *asyncReporter) openMethodCause(method *types.Func) (string, string) {
	// An anonymous interface has no declaration to close.
	signature, _ := method.Type().(*types.Signature)
	named := receiverNamedType(signature.Recv().Type())
	if named == nil {
		return asyncCauseOpenInterface, "method of an anonymous interface"
	}
	named = namedOriginOrSelf(named)
	iface, _ := named.Underlying().(*types.Interface)

	// An override package's interface, or a library build, stays open.
	if pkg := named.Obj().Pkg(); pkg != nil && r.boundary.pkgPaths[pkg.Path()] {
		return asyncCauseOverrideInterface, "interface declared by override package " + pkg.Path()
	}
	if !r.wholeProgram {
		return asyncCauseLibraryBuild, "a library build keeps exported interfaces open, as -assume-async"
	}
	if iface == nil || namedTypeHasParams(named) || !iface.IsMethodSet() {
		return asyncCauseOpenInterface, "generic interface or constraint"
	}

	// Otherwise an override value may implement it, or an implementation is
	// not compiled Go code.
	if witness := r.boundary.witness(iface); witness != "" {
		return asyncCauseOverrideInterface, witness
	}
	return asyncCauseOpenInterface, "an implementation is not compiled Go code with a body, or forwards to an open interface"
}

// The methods below do nothing on a nil reporter, so that the coloring
// calls them without checking for a report.

// edgeToSemFn records an edge to a semantic function.
func (r *asyncReporter) edgeToSemFn(semFn *semanticFunction) {
	if r != nil && semFn != nil {
		r.edge(r.semFnNode(semFn))
	}
}

// edgeToKey records an edge to a coloring key.
func (r *asyncReporter) edgeToKey(key *types.Func) {
	if r != nil && key != nil {
		r.edge(r.keyNode(key))
	}
}

// edgeToInterface records an edge to an interface method.
func (r *asyncReporter) edgeToInterface(method *types.Func) {
	if r != nil {
		r.edge(r.interfaceNode(method))
	}
}

// fromKey makes key's node the node being propagated.
func (r *asyncReporter) fromKey(key *types.Func) {
	if r != nil {
		r.cur = r.keyNode(key)
	}
}

// fromSemFn makes semFn's node the node being propagated and returns the
// previous one.
func (r *asyncReporter) fromSemFn(semFn *semanticFunction) int {
	if r == nil {
		return noReportNode
	}
	prev := r.cur
	r.cur = r.semFnNode(semFn)
	return prev
}

// restore makes prev the node being propagated again.
func (r *asyncReporter) restore(prev int) {
	if r != nil {
		r.cur = prev
	}
}
