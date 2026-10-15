package compiler

import (
	"go/ast"
	"go/token"
	"go/types"
	"maps"
	"slices"
	"strconv"
	"strings"
	"sync"

	"golang.org/x/tools/go/ast/astutil"
	"golang.org/x/tools/go/packages"
)

// A body summary records what a package's function bodies contribute to the
// whole-program semantic model. A package whose closure sources are unchanged
// is type-checked without bodies, and the summary stored by the compile that
// last checked it with bodies replaces the body walk.
//
// The declaration region, everything outside function and function literal
// bodies, gets the same objects from either check and is collected live. The
// summary names declared objects by their object key, and the decl-only check
// resolves the keys again. Bodies declare one kind of object facts name: the
// methods of interface literals. A package checked without bodies rebuilds
// each literal with types.CheckExpr at file scope, so a literal is summarized
// only when every name it uses is package level.
//
// A package is not summarized, and so is always checked with bodies, when its
// bodies declare a named interface or a type with methods, or when its facts
// name an object no key resolves, such as a field of a generic instance.

// bodySummary holds the body facts of one package.
type bodySummary struct {
	// functions holds the facts of each function declared with a body.
	functions []summaryFunction
	// literals locates the interface literals the bodies declare, in the order
	// the fact walk meets them.
	literals []summaryLiteral
	// addressTaken and needsVarRef hold the marks the package sets on declared
	// objects.
	addressTaken []string
	needsVarRef  []string
	// localFacts holds the fact digest lines of the marks on body locals.
	localFacts []string
	// varRefNames holds the names of the body locals needing a variable
	// reference.
	varRefNames []string
	// interfaces holds the named interfaces the package's types reach.
	interfaces []string
	// assertions holds the body type assertions from package-sealed interfaces.
	assertions []summaryAssertion
	// asyncArgumentCalls holds the package's async argument calls.
	asyncArgumentCalls []summaryAsyncArgumentCall
	// lazyVars holds the package variables initialized lazily.
	lazyVars []string
	// funcValues holds the function values the package takes.
	funcValues []summaryFuncValue
	// assertedFuncShapes and topValueCalls hold the shapes of the func types
	// the package asserts and calls through outside function bodies.
	assertedFuncShapes []string
	topValueCalls      []string
}

// summaryFunction holds the facts of one node: a declared function (kind
// func, keyed by its object key), a function literal (kind lit, keyed by its
// file and offset) or a lazy initializer (kind init, keyed by its variable's
// object key). Calls name nodes by summary references (see summaryKeys.ref).
type summaryFunction struct {
	kind        string
	key         string
	async       bool
	calls       []string
	packageVars []string
	valueCalls  []string
}

// summaryFuncValue is a function value by shape and node reference.
type summaryFuncValue struct {
	shape string
	ref   string
}

type summaryLiteral struct {
	file   string
	offset int
}

// summaryAssertion names each side of a type assertion by a named type's key
// or by the index of an interface literal.
type summaryAssertion struct {
	source summaryType
	target summaryType
}

type summaryType struct {
	key     string
	literal int
}

type summaryAsyncArgumentCall struct {
	called string
	deps   []string
	shapes []string
}

// Summary references to synthetic nodes start with a prefix no object key
// has, since an object key starts with a package path.
const (
	summaryLiteralRefPrefix = "@lit "
	summaryInitRefPrefix    = "@init "
)

// objectKey names obj by its package path and objectFactID.
func objectKey(fset *token.FileSet, obj types.Object) string {
	pkgPath := universeFactsPackage
	if obj.Pkg() != nil {
		pkgPath = obj.Pkg().Path()
	}
	return pkgPath + " " + objectFactID(fset, obj)
}

// summaryObjects resolves object keys to the declared objects of the current
// check. Each package's declarations index on first use.
type summaryObjects struct {
	fset     *token.FileSet
	packages map[string]func() map[string]types.Object
}

// newSummaryObjects indexes every package Check checked, including those
// only override candidates import. A graph node wins over a test variant with
// the same path.
func newSummaryObjects(graph *PackageGraph) *summaryObjects {
	objects := &summaryObjects{packages: make(map[string]func() map[string]types.Object)}
	for _, pkg := range graph.reachablePackages() {
		if objects.fset == nil {
			objects.fset = pkg.Fset
		}
		if node := graph.packagesByPath[pkg.PkgPath]; node != nil {
			pkg = node
		}
		if objects.packages[pkg.PkgPath] != nil {
			continue
		}
		objects.packages[pkg.PkgPath] = sync.OnceValue(func() map[string]types.Object {
			return declaredObjects(objects.fset, pkg)
		})
	}
	return objects
}

// universeError is the universe error interface's Error method.
var universeError = types.Universe.Lookup("error").Type().Underlying().(*types.Interface).Method(0)

// resolve returns the declared object named by key, or nil.
func (s *summaryObjects) resolve(key string) types.Object {
	pkgPath, id, ok := strings.Cut(key, " ")
	if !ok {
		return nil
	}
	if pkgPath == universeFactsPackage {
		if id == universeError.Name() {
			return universeError
		}
		return nil
	}
	objects := s.packages[pkgPath]
	if objects == nil {
		return nil
	}
	return objects()[id]
}

// declaredObjects indexes the objects pkg defines outside function bodies by
// objectFactID. A function literal's parameters are in the declaration region
// when the literal is.
func declaredObjects(fset *token.FileSet, pkg *packages.Package) map[string]types.Object {
	objects := make(map[string]types.Object)
	if pkg.TypesInfo == nil {
		return objects
	}
	for _, file := range pkg.Syntax {
		ast.Inspect(file, func(node ast.Node) bool {
			switch typed := node.(type) {
			case *ast.BlockStmt:
				return false
			case *ast.Ident:
				if obj := pkg.TypesInfo.Defs[typed]; obj != nil {
					objects[objectFactID(fset, obj)] = obj
				}
			}
			return true
		})
	}
	return objects
}

// bodyRegion holds the syntax facts of a package's function bodies that the
// summary needs.
type bodyRegion struct {
	// locals holds the objects the bodies define, implicit ones included.
	locals map[types.Object]bool
	// literals holds the outermost interface literals with methods or
	// embeddings that the fact walk visits, in visit order.
	literals []*ast.InterfaceType
	// assertions holds the type assertions the fact walk visits.
	assertions []*ast.TypeAssertExpr
	// typeNames holds the types the bodies declare.
	typeNames []*types.TypeName
}

// collectBodyRegion walks the function bodies of pkg the way collectFacts
// does: a function literal contributes its body, and its parameters only as
// locals.
func collectBodyRegion(pkg *packages.Package) *bodyRegion {
	region := &bodyRegion{locals: make(map[types.Object]bool)}
	var literalEnd token.Pos
	var walkBody func(node ast.Node)
	visit := func(node ast.Node) bool {
		if obj := pkg.TypesInfo.Implicits[node]; obj != nil {
			region.locals[obj] = true
		}
		switch typed := node.(type) {
		case *ast.Ident:
			obj := pkg.TypesInfo.Defs[typed]
			if obj == nil {
				return true
			}
			region.locals[obj] = true
			if typeName, ok := obj.(*types.TypeName); ok {
				region.typeNames = append(region.typeNames, typeName)
			}
		case *ast.FuncLit:
			ast.Inspect(typed.Type, func(node ast.Node) bool {
				if ident, ok := node.(*ast.Ident); ok && pkg.TypesInfo.Defs[ident] != nil {
					region.locals[pkg.TypesInfo.Defs[ident]] = true
				}
				return true
			})
			walkBody(typed.Body)
			return false
		case *ast.InterfaceType:
			if typed.Pos() >= literalEnd && len(typed.Methods.List) != 0 {
				region.literals = append(region.literals, typed)
				literalEnd = typed.End()
			}
		case *ast.TypeAssertExpr:
			if typed.Type != nil {
				region.assertions = append(region.assertions, typed)
			}
		}
		return true
	}
	walkBody = func(node ast.Node) { ast.Inspect(node, visit) }
	for _, file := range pkg.Syntax {
		ast.Inspect(file, func(node ast.Node) bool {
			switch typed := node.(type) {
			case *ast.BlockStmt:
				walkBody(typed)
				return false
			case *ast.FuncLit:
				walkBody(typed.Body)
				return false
			}
			return true
		})
	}
	return region
}

// summaryKeys keys the objects one package's summary names: declared objects
// of any package and the package's own interface literal methods.
type summaryKeys struct {
	objects *summaryObjects
	// literalObjects indexes the interface literal methods by key.
	literalObjects map[string]types.Object
}

// key returns obj's key when it resolves back to obj.
func (k *summaryKeys) key(obj types.Object) (string, bool) {
	if obj == nil {
		return "", false
	}
	key := objectKey(k.objects.fset, obj)
	if k.objects.resolve(key) == obj || k.literalObjects[key] == obj {
		return key, true
	}
	return "", false
}

// keys returns the sorted keys of objs.
func keys[T interface {
	comparable
	types.Object
}](k *summaryKeys, objs map[T]bool) ([]string, bool) {
	out := make([]string, 0, len(objs))
	for obj := range objs {
		key, ok := k.key(obj)
		if !ok {
			return nil, false
		}
		out = append(out, key)
	}
	slices.Sort(out)
	return out, true
}

// resolve returns the object named by key.
func (k *summaryKeys) resolve(key string) types.Object {
	if obj := k.literalObjects[key]; obj != nil {
		return obj
	}
	return k.objects.resolve(key)
}

// summarizeBody summarizes the body facts of the package shard just built
// from a check with bodies. It reports false when the package cannot be
// summarized.
func summarizeBody(shard *SemanticModel, semPkg *semanticPackage, objects *summaryObjects) (*bodySummary, bool) {
	pkg := semPkg.source
	fset := pkg.Fset
	region := collectBodyRegion(pkg)
	for _, typeName := range region.typeNames {
		named, ok := typeName.Type().(*types.Named)
		if !ok {
			continue
		}
		if _, ok := named.Underlying().(*types.Interface); ok {
			return nil, false
		}
		if types.NewMethodSet(types.NewPointer(named)).Len() != 0 {
			return nil, false
		}
	}

	summary := &bodySummary{}
	k := &summaryKeys{objects: objects, literalObjects: make(map[string]types.Object)}
	literalTypes := make(map[types.Type]int, len(region.literals))
	for idx, literal := range region.literals {
		if !literalUsesPackageNames(pkg, literal) {
			return nil, false
		}
		ast.Inspect(literal, func(node ast.Node) bool {
			if ident, ok := node.(*ast.Ident); ok {
				if fn, ok := pkg.TypesInfo.Defs[ident].(*types.Func); ok {
					k.literalObjects[objectKey(fset, fn)] = fn
				}
			}
			return true
		})
		position := fset.Position(literal.Pos())
		summary.literals = append(summary.literals, summaryLiteral{file: baseName(position.Filename), offset: position.Offset})
		literalTypes[pkg.TypesInfo.TypeOf(literal)] = idx
	}

	for _, file := range pkg.Syntax {
		for _, decl := range file.Decls {
			fnDecl, ok := decl.(*ast.FuncDecl)
			if !ok || fnDecl.Body == nil {
				continue
			}
			fn, _ := pkg.TypesInfo.Defs[fnDecl.Name].(*types.Func)
			semFn := shard.functions[fn]
			if semFn == nil {
				continue
			}
			key, ok := k.key(fn)
			if !ok || !summary.addNode(k, summaryRecordFunction, key, semFn) {
				return nil, false
			}
		}
	}
	if !summarizeValueNodes(summary, k, semPkg) {
		return nil, false
	}

	var ok bool
	summary.addressTaken, summary.localFacts, ok = summarizeMarks(k, region, semPkg, shard.addressTaken, "address-taken", summary.localFacts)
	if !ok {
		return nil, false
	}
	summary.needsVarRef, summary.localFacts, ok = summarizeMarks(k, region, semPkg, shard.needsVarRef, "var-ref", summary.localFacts)
	if !ok {
		return nil, false
	}
	slices.Sort(summary.localFacts)
	for _, value := range semPkg.values {
		if region.locals[value.object] && shard.needsVarRef[value.object] {
			summary.varRefNames = append(summary.varRefNames, value.name)
		}
	}
	slices.Sort(summary.varRefNames)
	summary.varRefNames = slices.Compact(summary.varRefNames)

	candidates := newInterfaceCandidates()
	candidates.collectModel(shard)
	for _, named := range candidates.interfaces {
		key, ok := k.key(named.Obj())
		if !ok {
			return nil, false
		}
		summary.interfaces = append(summary.interfaces, key)
	}
	slices.Sort(summary.interfaces)

	for _, expr := range region.assertions {
		source := types.Unalias(pkg.TypesInfo.TypeOf(expr.X))
		target := types.Unalias(pkg.TypesInfo.TypeOf(expr.Type))
		if !assertionReachesAnonymousGraph(source, target) {
			continue
		}
		sourceRef, sourceOK := summaryTypeRef(k, literalTypes, source)
		targetRef, targetOK := summaryTypeRef(k, literalTypes, target)
		if !sourceOK || !targetOK {
			return nil, false
		}
		summary.assertions = append(summary.assertions, summaryAssertion{source: sourceRef, target: targetRef})
	}

	for _, call := range semPkg.asyncArgumentCalls {
		called, ok := k.key(functionOriginOrSelf(call.called))
		if !ok {
			return nil, false
		}
		summaryCall := summaryAsyncArgumentCall{called: called, shapes: call.shapes}
		for _, dep := range call.deps {
			ref, ok := k.ref(dep)
			if !ok {
				return nil, false
			}
			summaryCall.deps = append(summaryCall.deps, ref)
		}
		summary.asyncArgumentCalls = append(summary.asyncArgumentCalls, summaryCall)
	}
	summary.lazyVars, ok = keys(k, semPkg.lazyVars)
	if !ok {
		return nil, false
	}
	return summary, true
}

// addNode records the facts of one node. It reports false when a call or
// variable has no reference.
func (s *bodySummary) addNode(k *summaryKeys, kind, key string, semFn *semanticFunction) bool {
	// Name the calls and variables.
	var calls []string
	for called := range semFn.calls {
		ref, ok := k.ref(called)
		if !ok {
			return false
		}
		calls = append(calls, ref)
	}
	packageVars, ok := keys(k, semFn.packageVars)
	if !ok {
		return false
	}

	// Record the node in a stable order.
	slices.Sort(calls)
	s.functions = append(s.functions, summaryFunction{
		kind:        kind,
		key:         key,
		async:       semFn.async,
		calls:       calls,
		packageVars: packageVars,
		valueCalls:  slices.Sorted(maps.Keys(semFn.valueCalls)),
	})
	return true
}

// summarizeValueNodes records the package's literal and lazy initializer
// nodes, the function values it takes, and the func types it asserts and
// calls through outside function bodies.
func summarizeValueNodes(summary *bodySummary, k *summaryKeys, semPkg *semanticPackage) bool {
	// Record the literal and initializer nodes in source order.
	for _, pos := range slices.Sorted(maps.Keys(semPkg.funcLits)) {
		ref, _ := k.ref(semPkg.funcLits[pos].function)
		if !summary.addNode(k, summaryRecordFuncLit, strings.TrimPrefix(ref, summaryLiteralRefPrefix), semPkg.funcLits[pos]) {
			return false
		}
	}
	for _, obj := range slices.SortedFunc(maps.Keys(semPkg.lazyInits), compareObjectPos) {
		key, ok := k.key(obj)
		if !ok || !summary.addNode(k, summaryRecordLazyInit, key, semPkg.lazyInits[obj]) {
			return false
		}
	}

	// Record the values by reference.
	for _, value := range semPkg.funcValues {
		ref, ok := k.ref(value.key)
		if !ok {
			return false
		}
		summary.funcValues = append(summary.funcValues, summaryFuncValue{shape: value.shape, ref: ref})
	}
	summary.assertedFuncShapes = slices.Sorted(maps.Keys(semPkg.assertedFuncShapes))
	summary.topValueCalls = slices.Sorted(maps.Keys(semPkg.topValueCalls))
	return true
}

// compareObjectPos orders objects by position.
func compareObjectPos(a, b types.Object) int {
	return int(a.Pos()) - int(b.Pos())
}

// ref returns the summary reference of a node key: a literal node by its
// file and offset, a lazy initializer by its variable's key, or any other
// function by its object key.
func (k *summaryKeys) ref(fn *types.Func) (string, bool) {
	// A synthetic node is named by its position.
	if fn.Name() == funcLitNodeName && fn.Pkg() != nil {
		position := k.objects.fset.Position(fn.Pos())
		return summaryLiteralRefPrefix + baseName(position.Filename) + ":" + strconv.Itoa(position.Offset), true
	}
	if varName, ok := strings.CutPrefix(fn.Name(), lazyInitNodeName); ok && fn.Pkg() != nil {
		obj := fn.Pkg().Scope().Lookup(varName)
		key, ok := k.key(obj)
		return summaryInitRefPrefix + key, ok
	}
	return k.key(fn)
}

// summarizeMarks splits the marks of one kind into the keys of declared
// objects and the digest lines of the package's body locals.
func summarizeMarks(
	k *summaryKeys,
	region *bodyRegion,
	semPkg *semanticPackage,
	marks map[types.Object]bool,
	kind string,
	localFacts []string,
) ([]string, []string, bool) {
	var declared []string
	for obj := range marks {
		if key, ok := k.key(obj); ok {
			declared = append(declared, key)
			continue
		}
		if !region.locals[obj] || obj.Pkg() == nil || obj.Pkg().Path() != semPkg.pkgPath {
			return nil, nil, false
		}
		localFacts = append(localFacts, kind+"|"+objectFactID(k.objects.fset, obj)+"|")
	}
	slices.Sort(declared)
	return declared, localFacts, true
}

// literalUsesPackageNames reports whether every name literal uses resolves at
// file scope to the same object: a package, a package-level object or a
// universe object.
func literalUsesPackageNames(pkg *packages.Package, literal *ast.InterfaceType) bool {
	ok := true
	ast.Inspect(literal, func(node ast.Node) bool {
		ident, isIdent := node.(*ast.Ident)
		if !isIdent || !ok {
			return ok
		}
		obj := pkg.TypesInfo.Uses[ident]
		switch {
		case obj == nil:
		case obj.Parent() == types.Universe:
		case obj.Pkg() != nil && obj.Parent() == obj.Pkg().Scope():
		default:
			_, ok = obj.(*types.PkgName)
		}
		return ok
	})
	return ok
}

// assertionReachesAnonymousGraph reports whether an assertion from source to
// target can add anonymous interface implementations.
func assertionReachesAnonymousGraph(source, target types.Type) bool {
	if source == nil || target == nil {
		return false
	}
	sourceIface, _ := source.Underlying().(*types.Interface)
	iface, _ := target.Underlying().(*types.Interface)
	return sourceIface != nil && iface != nil && interfaceIsPackageSealed(sourceIface) && iface.NumMethods() != 0
}

// summaryTypeRef names typ by a non-generic named type's key or by the index
// of the interface literal that declares it.
func summaryTypeRef(k *summaryKeys, literalTypes map[types.Type]int, typ types.Type) (summaryType, bool) {
	if idx, ok := literalTypes[typ]; ok {
		return summaryType{literal: idx}, true
	}
	named, ok := typ.(*types.Named)
	if !ok || named.TypeArgs().Len() != 0 {
		return summaryType{}, false
	}
	key, ok := k.key(named.Obj())
	return summaryType{key: key}, ok
}

// bodyApplier applies a stored summary to the shard of a package checked
// without bodies.
type bodyApplier struct {
	summary *bodySummary
	keys    *summaryKeys
	// literals holds the rebuilt interface literals in summary order.
	literals []*ast.InterfaceType
	info     *types.Info
	// next is the index of the next literal the fact walk reaches.
	next int
	// pkg and files locate the function literals of the package.
	pkg   *packages.Package
	files map[string]*ast.File
}

// newBodyApplier rebuilds the package's interface literals. It reports false
// when a literal is missing or fails to check.
func newBodyApplier(summary *bodySummary, pkg *packages.Package, objects *summaryObjects) (*bodyApplier, bool) {
	a := &bodyApplier{
		summary: summary,
		keys:    &summaryKeys{objects: objects, literalObjects: make(map[string]types.Object)},
		info: &types.Info{
			Types: make(map[ast.Expr]types.TypeAndValue),
			Defs:  make(map[*ast.Ident]types.Object),
			Uses:  make(map[*ast.Ident]types.Object),
		},
	}
	files := make(map[string]*ast.File, len(pkg.Syntax))
	for _, file := range pkg.Syntax {
		files[baseName(pkg.Fset.Position(file.Pos()).Filename)] = file
	}
	a.pkg, a.files = pkg, files
	for _, ref := range summary.literals {
		file := files[ref.file]
		if file == nil {
			return nil, false
		}
		tokenFile := pkg.Fset.File(file.Pos())
		if ref.offset < 0 || ref.offset >= tokenFile.Size() {
			return nil, false
		}
		pos := tokenFile.Pos(ref.offset)
		path, _ := astutil.PathEnclosingInterval(file, pos, pos)
		var literal *ast.InterfaceType
		for _, node := range path {
			if typed, ok := node.(*ast.InterfaceType); ok && typed.Pos() == pos {
				literal = typed
				break
			}
		}
		if literal == nil {
			return nil, false
		}
		// The literal names only package-level objects, so it checks at file
		// scope, which a body's scope would only shadow.
		if err := types.CheckExpr(pkg.Fset, pkg.Types, file.Package, literal, a.info); err != nil {
			return nil, false
		}
		a.literals = append(a.literals, literal)
	}
	for _, obj := range a.info.Defs {
		if fn, ok := obj.(*types.Func); ok {
			a.keys.literalObjects[objectKey(pkg.Fset, fn)] = fn
		}
	}
	return a, true
}

// addLiterals adds the methods of the literals inside a body the fact walk
// skips, as collectFacts would have added them walking the body.
func (a *bodyApplier) addLiterals(
	o *SemanticModelOwner,
	model *SemanticModel,
	semPkg *semanticPackage,
	tokenFile *token.File,
	body ast.Node,
) {
	for a.next < len(a.literals) {
		literal := a.literals[a.next]
		if literal.Pos() < body.Pos() || literal.Pos() >= body.End() {
			return
		}
		a.next++
		ast.Inspect(literal, func(node ast.Node) bool {
			if ident, ok := node.(*ast.Ident); ok {
				if fn, ok := a.info.Defs[ident].(*types.Func); ok {
					o.addFunction(model, semPkg, fn, sourcePosInFile(tokenFile, ident.Pos()))
				}
			}
			return true
		})
	}
}

// apply adds the summary's facts to the shard. It reports false when a key
// does not resolve or a literal was not reached.
func (a *bodyApplier) apply(shard *SemanticModel, semPkg *semanticPackage) bool {
	if a.next != len(a.literals) {
		return false
	}
	if !a.applyNodes(shard, semPkg) {
		return false
	}
	for _, marks := range []struct {
		keys []string
		set  map[types.Object]bool
	}{
		{a.summary.addressTaken, shard.addressTaken},
		{a.summary.needsVarRef, shard.needsVarRef},
	} {
		for _, key := range marks.keys {
			obj := a.keys.resolve(key)
			if obj == nil {
				return false
			}
			marks.set[obj] = true
		}
	}
	semPkg.localFacts = a.summary.localFacts
	if len(a.summary.varRefNames) != 0 {
		semPkg.varRefNames = make(map[string]bool, len(a.summary.varRefNames))
		for _, name := range a.summary.varRefNames {
			semPkg.varRefNames[name] = true
		}
	}
	for _, key := range a.summary.interfaces {
		typeName, _ := a.keys.resolve(key).(*types.TypeName)
		if typeName == nil {
			return false
		}
		named, _ := typeName.Type().(*types.Named)
		if named == nil {
			return false
		}
		semPkg.bodyInterfaces = append(semPkg.bodyInterfaces, named)
	}
	for _, assertion := range a.summary.assertions {
		source := a.resolveType(assertion.source)
		target := a.resolveType(assertion.target)
		if source == nil || target == nil {
			return false
		}
		semPkg.typeAssertions = append(semPkg.typeAssertions, semanticTypeAssertion{source: source, target: target})
	}
	for _, summaryCall := range a.summary.asyncArgumentCalls {
		call := asyncArgumentCall{called: a.resolveFunc(summaryCall.called), shapes: summaryCall.shapes}
		if call.called == nil {
			return false
		}
		for _, ref := range summaryCall.deps {
			dep := a.resolveRef(semPkg, ref)
			if dep == nil {
				return false
			}
			call.deps = append(call.deps, dep)
		}
		semPkg.asyncArgumentCalls = append(semPkg.asyncArgumentCalls, call)
	}
	semPkg.lazyVars = make(map[types.Object]bool, len(a.summary.lazyVars))
	for _, key := range a.summary.lazyVars {
		obj := a.keys.resolve(key)
		if obj == nil {
			return false
		}
		semPkg.lazyVars[obj] = true
	}
	return a.applyValues(semPkg)
}

// resolveFunc returns the function named by key, or nil.
func (a *bodyApplier) resolveFunc(key string) *types.Func {
	fn, _ := a.keys.resolve(key).(*types.Func)
	return fn
}

// resolveRef returns the node key a summary reference names, or nil.
func (a *bodyApplier) resolveRef(semPkg *semanticPackage, ref string) *types.Func {
	if key, ok := strings.CutPrefix(ref, summaryLiteralRefPrefix); ok {
		if node := semPkg.funcLits[a.literalPos(key)]; node != nil {
			return node.function
		}
		return nil
	}
	if key, ok := strings.CutPrefix(ref, summaryInitRefPrefix); ok {
		if node := semPkg.lazyInits[a.keys.resolve(key)]; node != nil {
			return node.function
		}
		return nil
	}
	return a.resolveFunc(ref)
}

// literalPos returns the position a literal key of file and offset names,
// or token.NoPos.
func (a *bodyApplier) literalPos(key string) token.Pos {
	// The key must name a known file and an offset inside it.
	name, offsetText, ok := cutLast(key, ":")
	offset, err := strconv.Atoi(offsetText)
	file := a.files[name]
	if !ok || err != nil || file == nil {
		return token.NoPos
	}
	tokenFile := a.pkg.Fset.File(file.Pos())
	if offset < 0 || offset >= tokenFile.Size() {
		return token.NoPos
	}
	return tokenFile.Pos(offset)
}

// cutLast slices s around the last instance of sep.
func cutLast(s, sep string) (string, string, bool) {
	idx := strings.LastIndex(s, sep)
	if idx < 0 {
		return s, "", false
	}
	return s[:idx], s[idx+len(sep):], true
}

// applyNodes adds the facts of every node. The literal and initializer nodes
// are created first, so that calls can name them.
func (a *bodyApplier) applyNodes(shard *SemanticModel, semPkg *semanticPackage) bool {
	// Resolve or create each node.
	semPkg.funcLits = make(map[token.Pos]*semanticFunction)
	semPkg.lazyInits = make(map[types.Object]*semanticFunction)
	nodes := make([]*semanticFunction, len(a.summary.functions))
	for idx, summaryFn := range a.summary.functions {
		nodes[idx] = a.node(shard, semPkg, summaryFn)
		if nodes[idx] == nil {
			return false
		}
	}

	// Record each node's facts.
	for idx, summaryFn := range a.summary.functions {
		if !a.applyNode(semPkg, nodes[idx], summaryFn) {
			return false
		}
	}
	return true
}

// node returns the node a summary function record names, creating a literal
// or initializer node.
func (a *bodyApplier) node(shard *SemanticModel, semPkg *semanticPackage, summaryFn summaryFunction) *semanticFunction {
	switch summaryFn.kind {
	case summaryRecordFuncLit:
		pos := a.literalPos(summaryFn.key)
		if !pos.IsValid() {
			return nil
		}
		node := newSyntheticNode(pos, a.pkg.Types, funcLitNodeName)
		semPkg.funcLits[pos] = node
		return node
	case summaryRecordLazyInit:
		obj := a.keys.resolve(summaryFn.key)
		if obj == nil {
			return nil
		}
		node := newSyntheticNode(obj.Pos(), obj.Pkg(), lazyInitNodeName+obj.Name())
		semPkg.lazyInits[obj] = node
		return node
	}
	return shard.functions[a.resolveFunc(summaryFn.key)]
}

// applyNode adds a summary record's facts to its node.
func (a *bodyApplier) applyNode(semPkg *semanticPackage, semFn *semanticFunction, summaryFn summaryFunction) bool {
	// The node may be async by itself.
	if summaryFn.async {
		markFunctionAsync(semFn)
	}

	// Resolve its calls and package variables.
	for _, ref := range summaryFn.calls {
		called := a.resolveRef(semPkg, ref)
		if called == nil {
			return false
		}
		semFn.calls[called] = true
	}
	for _, key := range summaryFn.packageVars {
		v, _ := a.keys.resolve(key).(*types.Var)
		if v == nil {
			return false
		}
		recordPackageVarUse(semFn, v)
	}

	// Its value calls are shapes.
	for _, shape := range summaryFn.valueCalls {
		recordValueCall(semFn, shape)
	}
	return true
}

// applyValues adds the function values the package takes and the shapes it
// asserts and calls outside function bodies.
func (a *bodyApplier) applyValues(semPkg *semanticPackage) bool {
	// Each value names its node.
	for _, value := range a.summary.funcValues {
		key := a.resolveRef(semPkg, value.ref)
		if key == nil {
			return false
		}
		semPkg.funcValues = append(semPkg.funcValues, funcValue{shape: value.shape, key: key})
	}

	// The shapes apply as they are.
	for _, shape := range a.summary.assertedFuncShapes {
		if semPkg.assertedFuncShapes == nil {
			semPkg.assertedFuncShapes = make(map[string]bool)
		}
		semPkg.assertedFuncShapes[shape] = true
	}
	for _, shape := range a.summary.topValueCalls {
		if semPkg.topValueCalls == nil {
			semPkg.topValueCalls = make(map[string]bool)
		}
		semPkg.topValueCalls[shape] = true
	}
	return true
}

// resolveType returns the type a summary type reference names.
func (a *bodyApplier) resolveType(ref summaryType) types.Type {
	if ref.key == "" {
		if ref.literal < 0 || ref.literal >= len(a.literals) {
			return nil
		}
		return a.info.TypeOf(a.literals[ref.literal])
	}
	typeName, _ := a.keys.resolve(ref.key).(*types.TypeName)
	if typeName == nil {
		return nil
	}
	return typeName.Type()
}

// baseName returns the final element of a slash or platform path.
func baseName(path string) string {
	return path[strings.LastIndexAny(path, `/\`)+1:]
}

// Summaries encode as lines of tab-separated fields. The first field names the
// record; call, var and value call records belong to the node record before
// them, and async dependency records to the async call record before them.
const (
	summaryRecordFunction     = "func"
	summaryRecordFuncLit      = "lit"
	summaryRecordLazyInit     = "init"
	summaryRecordCall         = "call"
	summaryRecordPackageVar   = "var"
	summaryRecordValueCall    = "value-call"
	summaryRecordFuncValue    = "value"
	summaryRecordAssertedFunc = "asserted-func"
	summaryRecordTopCall      = "top-value-call"
	summaryRecordAsyncDep     = "async-dep"
	summaryRecordAsyncShape   = "async-shape"
	summaryRecordLiteral      = "literal"
	summaryRecordAddressTaken = "address-taken"
	summaryRecordNeedsVarRef  = "var-ref"
	summaryRecordLocalFact    = "local"
	summaryRecordVarRefName   = "var-ref-name"
	summaryRecordInterface    = "interface"
	summaryRecordAssertion    = "assert"
	summaryRecordAsyncCall    = "async-call"
	summaryRecordLazyVar      = "lazy"
)

// encode returns the summary's lines, or false when a field holds a tab or a
// newline.
func (s *bodySummary) encode() ([]byte, bool) {
	var b strings.Builder
	ok := true
	line := func(fields ...string) {
		for idx, field := range fields {
			if strings.ContainsAny(field, "\t\n") {
				ok = false
			}
			if idx != 0 {
				b.WriteByte('\t')
			}
			b.WriteString(field)
		}
		b.WriteByte('\n')
	}
	for _, fn := range s.functions {
		line(fn.kind, fn.key, strconv.FormatBool(fn.async))
		for _, key := range fn.calls {
			line(summaryRecordCall, key)
		}
		for _, key := range fn.packageVars {
			line(summaryRecordPackageVar, key)
		}
		for _, shape := range fn.valueCalls {
			line(summaryRecordValueCall, shape)
		}
	}
	for _, literal := range s.literals {
		line(summaryRecordLiteral, literal.file, strconv.Itoa(literal.offset))
	}
	for _, records := range []struct {
		record string
		values []string
	}{
		{summaryRecordAddressTaken, s.addressTaken},
		{summaryRecordNeedsVarRef, s.needsVarRef},
		{summaryRecordLocalFact, s.localFacts},
		{summaryRecordVarRefName, s.varRefNames},
		{summaryRecordInterface, s.interfaces},
		{summaryRecordLazyVar, s.lazyVars},
		{summaryRecordAssertedFunc, s.assertedFuncShapes},
		{summaryRecordTopCall, s.topValueCalls},
	} {
		for _, value := range records.values {
			line(records.record, value)
		}
	}
	for _, value := range s.funcValues {
		line(summaryRecordFuncValue, value.shape, value.ref)
	}
	for _, assertion := range s.assertions {
		line(summaryRecordAssertion,
			assertion.source.key, strconv.Itoa(assertion.source.literal),
			assertion.target.key, strconv.Itoa(assertion.target.literal))
	}
	for _, call := range s.asyncArgumentCalls {
		line(summaryRecordAsyncCall, call.called)
		for _, ref := range call.deps {
			line(summaryRecordAsyncDep, ref)
		}
		for _, shape := range call.shapes {
			line(summaryRecordAsyncShape, shape)
		}
	}
	return []byte(b.String()), ok
}

// decodeBodySummary parses an encoded summary. It reports false on a
// malformed record.
func decodeBodySummary(data []byte) (*bodySummary, bool) {
	s := &bodySummary{}
	for line := range strings.Lines(string(data)) {
		fields := strings.Split(strings.TrimSuffix(line, "\n"), "\t")
		value := func(n int) (string, bool) {
			if len(fields) != n+1 {
				return "", false
			}
			return fields[n], true
		}
		switch fields[0] {
		case summaryRecordFunction, summaryRecordFuncLit, summaryRecordLazyInit:
			if len(fields) != 3 {
				return nil, false
			}
			async, err := strconv.ParseBool(fields[2])
			if err != nil {
				return nil, false
			}
			s.functions = append(s.functions, summaryFunction{kind: fields[0], key: fields[1], async: async})
		case summaryRecordCall, summaryRecordPackageVar, summaryRecordValueCall:
			key, ok := value(1)
			if !ok || len(s.functions) == 0 {
				return nil, false
			}
			fn := &s.functions[len(s.functions)-1]
			target := map[string]*[]string{
				summaryRecordCall:       &fn.calls,
				summaryRecordPackageVar: &fn.packageVars,
				summaryRecordValueCall:  &fn.valueCalls,
			}[fields[0]]
			*target = append(*target, key)
		case summaryRecordFuncValue:
			if len(fields) != 3 {
				return nil, false
			}
			s.funcValues = append(s.funcValues, summaryFuncValue{shape: fields[1], ref: fields[2]})
		case summaryRecordLiteral:
			if len(fields) != 3 {
				return nil, false
			}
			offset, err := strconv.Atoi(fields[2])
			if err != nil {
				return nil, false
			}
			s.literals = append(s.literals, summaryLiteral{file: fields[1], offset: offset})
		case summaryRecordAddressTaken, summaryRecordNeedsVarRef, summaryRecordLocalFact,
			summaryRecordVarRefName, summaryRecordInterface, summaryRecordLazyVar,
			summaryRecordAssertedFunc, summaryRecordTopCall:
			v, ok := value(1)
			if !ok {
				return nil, false
			}
			target := map[string]*[]string{
				summaryRecordAddressTaken: &s.addressTaken,
				summaryRecordNeedsVarRef:  &s.needsVarRef,
				summaryRecordLocalFact:    &s.localFacts,
				summaryRecordVarRefName:   &s.varRefNames,
				summaryRecordInterface:    &s.interfaces,
				summaryRecordLazyVar:      &s.lazyVars,
				summaryRecordAssertedFunc: &s.assertedFuncShapes,
				summaryRecordTopCall:      &s.topValueCalls,
			}[fields[0]]
			*target = append(*target, v)
		case summaryRecordAssertion:
			if len(fields) != 5 {
				return nil, false
			}
			sourceLiteral, sourceErr := strconv.Atoi(fields[2])
			targetLiteral, targetErr := strconv.Atoi(fields[4])
			if sourceErr != nil || targetErr != nil {
				return nil, false
			}
			s.assertions = append(s.assertions, summaryAssertion{
				source: summaryType{key: fields[1], literal: sourceLiteral},
				target: summaryType{key: fields[3], literal: targetLiteral},
			})
		case summaryRecordAsyncCall:
			called, ok := value(1)
			if !ok {
				return nil, false
			}
			s.asyncArgumentCalls = append(s.asyncArgumentCalls, summaryAsyncArgumentCall{called: called})
		case summaryRecordAsyncDep, summaryRecordAsyncShape:
			v, ok := value(1)
			if !ok || len(s.asyncArgumentCalls) == 0 {
				return nil, false
			}
			call := &s.asyncArgumentCalls[len(s.asyncArgumentCalls)-1]
			if fields[0] == summaryRecordAsyncDep {
				call.deps = append(call.deps, v)
			} else {
				call.shapes = append(call.shapes, v)
			}
		default:
			return nil, false
		}
	}
	return s, true
}
