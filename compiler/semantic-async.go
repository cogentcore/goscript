package compiler

import (
	"context"
	"go/ast"
	"go/types"
	"slices"

	"golang.org/x/tools/go/packages"
)

// asyncArgumentCallSite is a call that passes function arguments to a callee
// with a body. The callee becomes async when any function, literal or value
// class in deps becomes async.
type asyncArgumentCallSite struct {
	semFn *semanticFunction
	deps  []*types.Func
}

// interfaceAsyncEdges lists the distinct interface methods that each
// implementation colors. An interface method waits on its implementations and
// becomes async when any of them does.
type interfaceAsyncEdges map[*semanticFunction][]*types.Func

// asyncOverrideMethod stands for every override method its package's metadata
// marks async, as the source of interface async edges.
var asyncOverrideMethod = &semanticFunction{async: true}

// add records that ifaceMethod waits on implFn, once.
func (e interfaceAsyncEdges) add(implFn *semanticFunction, ifaceMethod *types.Func) {
	if !slices.Contains(e[implFn], ifaceMethod) {
		e[implFn] = append(e[implFn], ifaceMethod)
	}
}

// asyncArgumentCall is a call in one package that passes function arguments
// whose async marks can make the callee async: declared functions and
// literal nodes in deps, and values of the shapes in shapes.
type asyncArgumentCall struct {
	called *types.Func
	deps   []*types.Func
	shapes []string
}

// collectAsyncArgumentCalls finds the calls in pkg whose function arguments
// can make the callee async. literalKey returns the key of a literal's node.
func collectAsyncArgumentCalls(pkg *packages.Package, literalKey func(*ast.FuncLit) *types.Func) []asyncArgumentCall {
	var calls []asyncArgumentCall
	for _, file := range pkg.Syntax {
		ast.Inspect(file, func(node ast.Node) bool {
			// Only a call of a declared function qualifies.
			expr, ok := node.(*ast.CallExpr)
			if !ok {
				return true
			}
			called := calledFunction(pkg, expr.Fun)
			if called == nil {
				return true
			}

			// Record the call when a function argument can decide it.
			signature, _ := called.Type().(*types.Signature)
			deps, shapes := asyncArgumentFacts(pkg, signature, expr.Args, literalKey)
			if len(deps) != 0 || len(shapes) != 0 {
				calls = append(calls, asyncArgumentCall{called: called, deps: deps, shapes: shapes})
			}
			return true
		})
	}
	return calls
}

// asyncArgumentCallSites resolves every package's async argument calls to the
// callees with a body, and their shapes to the value classes.
func asyncArgumentCallSites(model *SemanticModel) []asyncArgumentCallSite {
	var sites []asyncArgumentCallSite
	for _, semPkg := range model.packages {
		for _, call := range semPkg.asyncArgumentCalls {
			semFn := semanticFunctionFor(model, call.called)
			if semFn == nil || !semFn.hasBody {
				continue
			}
			deps := slices.Clone(call.deps)
			for _, shape := range call.shapes {
				deps = append(deps, model.funcValueClasses[shape])
			}
			sites = append(sites, asyncArgumentCallSite{semFn: semFn, deps: deps})
		}
	}
	return sites
}

// asyncArgumentFacts inspects the arguments passed to function-typed
// parameters and returns what decides whether one may suspend: the declared
// functions and literal nodes in deps, and the shapes of any other function
// values, whose classes decide them.
//
// Deps are function origins. Coloring resolves a generic instance and its
// origin to the same semantic function and full name, and an origin is a
// declared object a body summary can name.
func asyncArgumentFacts(
	pkg *packages.Package,
	signature *types.Signature,
	args []ast.Expr,
	literalKey func(*ast.FuncLit) *types.Func,
) ([]*types.Func, []string) {
	// Only arguments of function-typed parameters count.
	if signature == nil || signature.Params() == nil {
		return nil, nil
	}
	params := signature.Params()
	var deps []*types.Func
	var shapes []string
	for idx, arg := range args {
		paramIdx := idx
		if signature.Variadic() && idx >= params.Len()-1 {
			paramIdx = params.Len() - 1
		}
		if paramIdx < 0 || paramIdx >= params.Len() || signatureForType(params.At(paramIdx).Type()) == nil {
			continue
		}

		// A literal or a declared function decides itself; any other value
		// is decided by its class.
		if dep := asyncArgumentDep(pkg, arg, literalKey); dep != nil {
			deps = append(deps, dep)
		} else if shape := funcValueShape(pkg.TypesInfo.TypeOf(arg)); shape != "" {
			shapes = append(shapes, shape)
		}
	}
	return deps, shapes
}

// asyncArgumentDep returns the node that decides whether arg may suspend
// when called: its literal node, or the origin of the declared function or
// method it names. It returns nil for any other value, such as a method of
// an interface.
func asyncArgumentDep(pkg *packages.Package, arg ast.Expr, literalKey func(*ast.FuncLit) *types.Func) *types.Func {
	// A literal has its own node.
	if lit, ok := ast.Unparen(arg).(*ast.FuncLit); ok {
		return literalKey(lit)
	}

	// A declared function or method decides itself, but an interface
	// method is any of its implementations.
	called := calledFunction(pkg, arg)
	if called == nil {
		return nil
	}
	if signature, _ := called.Type().(*types.Signature); signature != nil &&
		signature.Recv() != nil && isInterfaceType(signature.Recv().Type()) {
		return nil
	}
	return functionOriginOrSelf(called)
}

// callbackOverrideCallFacts returns what decides whether a call to an
// override function that metadata marks callback async suspends: the
// declared functions and literal nodes in deps, and the classes of the
// shapes. It reports ok false for any other call.
func callbackOverrideCallFacts(
	pkg *packages.Package,
	overrideFacts *OverrideFacts,
	call *ast.CallExpr,
	literalKey func(*ast.FuncLit) *types.Func,
) (ok bool, deps []*types.Func, shapes []string) {
	// Only a callback async override function qualifies.
	called := calledFunction(pkg, call.Fun)
	if called == nil || called.Pkg() == nil ||
		!overrideFacts.IsFunctionCallbackAsync(called.Pkg().Path(), called.Name()) {
		return false, nil, nil
	}

	// Its function arguments decide it.
	signature, _ := called.Type().(*types.Signature)
	deps, shapes = asyncArgumentFacts(pkg, signature, call.Args, literalKey)
	return true, deps, shapes
}

// recordCallbackOverrideCall records a call to a callback async override as
// calls of what decides it.
func recordCallbackOverrideCall(
	pkg *packages.Package,
	overrideFacts *OverrideFacts,
	semFn *semanticFunction,
	call *ast.CallExpr,
	literalKey func(*ast.FuncLit) *types.Func,
) {
	_, deps, shapes := callbackOverrideCallFacts(pkg, overrideFacts, call, literalKey)
	for _, dep := range deps {
		semFn.calls[dep] = true
	}
	for _, shape := range shapes {
		recordValueCall(semFn, shape)
	}
}

// asyncWhenMethodFunctions maps each method name that override metadata
// names in asyncWhenMethods to the called override functions it makes async.
func asyncWhenMethodFunctions(model *SemanticModel, overrideFacts *OverrideFacts) map[string][]*types.Func {
	asyncWhen := make(map[string][]*types.Func)
	for called := range model.functionCallers {
		signature, _ := called.Type().(*types.Signature)
		if called.Pkg() == nil || signature == nil || signature.Recv() != nil {
			continue
		}
		for _, method := range overrideFacts.AsyncWhenMethods(called.Pkg().Path(), called.Name()) {
			asyncWhen[method] = append(asyncWhen[method], called)
		}
	}
	return asyncWhen
}

// asyncColoring propagates async marks to their fixpoint with one worklist.
//
// Every rule only adds marks, so each function key is visited once, when it
// first reports async through SemanticModel.functionAsync. Visiting a key marks
// its callers, the anonymous interface methods it implements, and the callees
// of the argument sites that pass it. The reverse indexes route a new mark to
// every key that it makes async.
type asyncColoring struct {
	model *SemanticModel
	// keysBySemFn lists the keys that resolve to each semantic function.
	keysBySemFn map[*semanticFunction][]*types.Func
	// keysByFullName lists the named-receiver interface method keys by full
	// name, which SemanticModel.interfaceMethodAsync also consults.
	keysByFullName    map[string][]*types.Func
	registered        map[*types.Func]bool
	ifaceEdges        interfaceAsyncEdges
	anonMethodsByImpl map[*types.Func][]*types.Func
	sitesByDep        map[*types.Func][]*semanticFunction
	// overrideFuncsByMethod lists the override functions each compiled method
	// makes async, per asyncWhenMethods metadata.
	overrideFuncsByMethod map[*types.Func][]*types.Func
	// values connects function values to classes of calls through values.
	values  *funcValueGraph
	visited map[*types.Func]bool
	queue   []*types.Func
}

// asyncRoots are the causes of async marks that the coloring seeds, besides
// the functions whose own bodies suspend, which their packages marked.
type asyncRoots struct {
	// sites are the calls that pass function arguments; a site that always
	// suspends is a root, and the others are edges from their dependencies.
	sites []asyncArgumentCallSite
	// openMethods are the called interface methods that the implementation
	// graph does not color; each makes its callers async.
	openMethods []*types.Func
	// values connects function values to the classes of calls that may
	// reach them; its open classes and async values are roots.
	values *funcValueGraph
}

// colorAsyncFunctions marks every function and interface method that can
// suspend, starting from the facts collected per package and roots.
//
// Every mark goes through asyncColoring.markFunction or markInterfaceMethod,
// from a root in the seeding below or along one edge kind in the worklist
// loop, so the cause of each mark is known at the point it is made.
func colorAsyncFunctions(
	ctx context.Context,
	model *SemanticModel,
	roots asyncRoots,
	ifaceEdges interfaceAsyncEdges,
	anonymousInterfaceGraph []semanticAnonymousInterfaceImplementation,
	asyncWhen map[string][]*types.Func,
) []Diagnostic {
	// Stop when the build was canceled.
	if err := ctx.Err(); err != nil {
		return []Diagnostic{contextCanceledDiagnostic(err)}
	}

	// Register every function whose async mark another rule consumes.
	c := &asyncColoring{
		model:                 model,
		keysBySemFn:           make(map[*semanticFunction][]*types.Func),
		keysByFullName:        make(map[string][]*types.Func),
		registered:            make(map[*types.Func]bool),
		ifaceEdges:            ifaceEdges,
		anonMethodsByImpl:     make(map[*types.Func][]*types.Func),
		sitesByDep:            make(map[*types.Func][]*semanticFunction),
		visited:               make(map[*types.Func]bool),
		overrideFuncsByMethod: make(map[*types.Func][]*types.Func),
		values:                roots.values,
	}
	for fn, semFn := range model.functions {
		signature, _ := fn.Type().(*types.Signature)
		if !semFn.hasBody || signature == nil || signature.Recv() == nil {
			continue
		}
		if funcs := asyncWhen[fn.Name()]; len(funcs) != 0 {
			c.register(fn)
			c.overrideFuncsByMethod[fn] = funcs
		}
	}
	for called := range model.functionCallers {
		c.register(called)
	}
	for _, graphEntry := range anonymousInterfaceGraph {
		for methodName, ifaceMethod := range graphEntry.ifaceMethods {
			implMethod := graphEntry.implMethods[methodName]
			c.register(implMethod)
			c.anonMethodsByImpl[implMethod] = append(c.anonMethodsByImpl[implMethod], ifaceMethod)
		}
	}
	for _, site := range roots.sites {
		for _, dep := range site.deps {
			c.register(dep)
			c.sitesByDep[dep] = append(c.sitesByDep[dep], site.semFn)
		}
	}

	// Register the value nodes, the function values and the classes.
	for key := range model.valueNodes {
		c.register(key)
	}
	for _, key := range roots.values.members {
		c.register(key)
	}
	for _, class := range model.funcValueClasses {
		c.register(class)
	}

	// Seed the functions that their packages marked async, and the interface
	// methods they implement.
	for key := range c.registered {
		if model.functionAsync(key) {
			c.visit(key)
		}
	}
	for implFn, ifaceMethods := range ifaceEdges {
		if !implFn.async {
			continue
		}
		for _, ifaceMethod := range ifaceMethods {
			c.markInterfaceMethod(ifaceMethod)
		}
	}

	// Seed the open classes and the function values that are async by
	// themselves.
	for _, class := range roots.values.open {
		c.markClass(class)
	}
	for _, key := range roots.values.asyncMembers {
		c.visit(key)
	}

	// Seed the callers of open interface methods. The method itself stays
	// sync until a compiled implementation proves it can suspend.
	for _, method := range roots.openMethods {
		for _, caller := range model.functionCallers[method] {
			c.markFunction(caller)
		}
	}

	// Propagate each new mark along its edges: to callers, to the anonymous
	// interface methods a key implements, to the callees of argument sites
	// that pass it, to the override functions asyncWhenMethods names, and to
	// the classes of calls through values that may reach it.
	for len(c.queue) != 0 {
		if err := ctx.Err(); err != nil {
			return []Diagnostic{contextCanceledDiagnostic(err)}
		}
		key := c.queue[len(c.queue)-1]
		c.queue = c.queue[:len(c.queue)-1]
		for _, caller := range model.functionCallers[key] {
			c.markFunction(caller)
		}
		for _, ifaceMethod := range c.anonMethodsByImpl[key] {
			if model.markInterfaceMethodAsync(ifaceMethod) {
				c.visitInterfaceMethod(ifaceMethod)
			}
		}
		for _, semFn := range c.sitesByDep[key] {
			c.markFunction(semFn)
		}
		for _, overrideFn := range c.overrideFuncsByMethod[key] {
			if model.markOverrideFunctionAsync(overrideFn) {
				c.visit(overrideFn)
			}
		}
		for _, class := range c.values.classesByMember[key] {
			c.markClass(class)
		}
	}
	return nil
}

// register indexes key by every mark that can make it report async.
func (c *asyncColoring) register(key *types.Func) {
	if key == nil || c.registered[key] {
		return
	}
	c.registered[key] = true
	if semFn := semanticFunctionFor(c.model, key); semFn != nil {
		c.keysBySemFn[semFn] = append(c.keysBySemFn[semFn], key)
	}
	if interfaceMethodHasNamedReceiver(key) {
		if fullName := c.model.functionFullName(key); fullName != "" {
			c.keysByFullName[fullName] = append(c.keysByFullName[fullName], key)
		}
	}
}

func (c *asyncColoring) visit(key *types.Func) {
	if c.visited[key] {
		return
	}
	c.visited[key] = true
	c.queue = append(c.queue, key)
}

// markFunction marks semFn async and visits the keys and interface methods the
// new mark decides.
func (c *asyncColoring) markFunction(semFn *semanticFunction) {
	if !markFunctionAsync(semFn) {
		return
	}
	for _, key := range c.keysBySemFn[semFn] {
		c.visit(key)
	}
	for _, ifaceMethod := range c.ifaceEdges[semFn] {
		c.markInterfaceMethod(ifaceMethod)
	}
}

// markClass marks a class of calls through function values async and visits
// it, so that its callers follow.
func (c *asyncColoring) markClass(class *types.Func) {
	if class == nil || c.model.asyncValueClasses[class] {
		return
	}
	c.model.asyncValueClasses[class] = true
	c.visit(class)
}

// markInterfaceMethod colors an interface method whose implementation is async.
func (c *asyncColoring) markInterfaceMethod(ifaceMethod *types.Func) {
	if c.model.markInterfaceMethodAsync(ifaceMethod) {
		c.visitInterfaceMethod(ifaceMethod)
	}
	c.markFunction(semanticFunctionFor(c.model, ifaceMethod))
}

// visitInterfaceMethod visits the keys an async interface method mark decides.
func (c *asyncColoring) visitInterfaceMethod(ifaceMethod *types.Func) {
	if c.registered[ifaceMethod] {
		c.visit(ifaceMethod)
	}
	if interfaceMethodHasNamedReceiver(ifaceMethod) {
		for _, key := range c.keysByFullName[c.model.functionFullName(ifaceMethod)] {
			c.visit(key)
		}
	}
}
