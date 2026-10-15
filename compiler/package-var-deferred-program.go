package compiler

import (
	"go/ast"
	"go/constant"
	"go/token"
	"go/types"

	"golang.org/x/tools/go/packages"
)

// A package variable initializer that reads other package variables can be
// deferred to the first read of its variable too, as long as each variable it
// reads holds its initial value forever: nothing assigns it, changes a part of
// it or takes its address outside its own initializer. The variables of a
// package can only change in the package, but an exported variable can change
// in any package of the program, so it is read only in a whole program. Taking
// the address of a variable gives the same pointer whenever it happens, and a
// call of a function whose body only returns a value built from its
// parameters and unchanging variables has no effects either.
//
// The marks that rule out variables come from every package's syntax, with
// bodies or from their summaries, so the deferred variables are decided after
// the package shards merge.

// storageRootVar returns the package variable whose own storage expr names:
// the variable itself, a field of a struct it holds or an element of an array
// it holds. It returns nil for storage reached through a pointer, a slice or a
// map, which a change of does not change the variable's value.
func storageRootVar(info *types.Info, expr ast.Expr) *types.Var {
	for {
		switch typed := ast.Unparen(expr).(type) {
		case *ast.Ident:
			return packageLevelVar(info.Uses[typed])
		case *ast.SelectorExpr:
			// A qualified identifier names a variable of another package, and
			// a field selected without indirection is part of its operand.
			selection := info.Selections[typed]
			if selection == nil {
				return packageLevelVar(info.Uses[typed.Sel])
			}
			if selection.Kind() != types.FieldVal || selection.Indirect() || exprIsPointer(info, typed.X) {
				return nil
			}
			expr = typed.X
		case *ast.IndexExpr:
			// An element of an array is part of the array.
			if !exprIsArray(info, typed.X) {
				return nil
			}
			expr = typed.X
		default:
			return nil
		}
	}
}

// packageLevelVar returns obj when it is a package-level variable.
func packageLevelVar(obj types.Object) *types.Var {
	v, ok := obj.(*types.Var)
	if !ok || v.Pkg() == nil || v.Parent() != v.Pkg().Scope() {
		return nil
	}
	return v
}

// exprIsPointer reports whether expr has a pointer type.
func exprIsPointer(info *types.Info, expr ast.Expr) bool {
	_, ok := types.Unalias(info.TypeOf(expr)).Underlying().(*types.Pointer)
	return ok
}

// exprIsArray reports whether expr has an array type.
func exprIsArray(info *types.Info, expr ast.Expr) bool {
	typ := info.TypeOf(expr)
	if typ == nil {
		return false
	}
	_, ok := types.Unalias(typ).Underlying().(*types.Array)
	return ok
}

// recordChangedPackageVars marks the package variable whose storage node may
// change: the target of an assignment, an increment or a range clause, an
// operand whose address is taken, explicitly, by a call of a pointer method or
// by slicing an array, wherever the node is.
func recordChangedPackageVars(model *SemanticModel, pkg *packages.Package, node ast.Node) {
	// Collect the expressions node changes or takes the address of.
	info := pkg.TypesInfo
	var changed []ast.Expr
	switch typed := node.(type) {
	case *ast.AssignStmt:
		changed = typed.Lhs
	case *ast.IncDecStmt:
		changed = []ast.Expr{typed.X}
	case *ast.RangeStmt:
		if typed.Tok == token.ASSIGN {
			changed = []ast.Expr{typed.Key, typed.Value}
		}
	case *ast.UnaryExpr:
		if typed.Op == token.AND {
			changed = []ast.Expr{typed.X}
		}
	case *ast.SelectorExpr:
		if selectorTakesReceiverAddress(info, typed) {
			changed = []ast.Expr{typed.X}
		}
	case *ast.SliceExpr:
		if exprIsArray(info, typed.X) {
			changed = []ast.Expr{typed.X}
		}
	}

	// Mark the variables that hold them.
	for _, expr := range changed {
		if expr == nil {
			continue
		}
		if v := storageRootVar(info, expr); v != nil {
			model.changedVars[v] = true
		}
	}
}

// selectorTakesReceiverAddress reports whether expr selects a pointer method
// of an operand that is not a pointer, which takes the operand's address.
func selectorTakesReceiverAddress(info *types.Info, expr *ast.SelectorExpr) bool {
	selection := info.Selections[expr]
	if selection == nil || selection.Kind() != types.MethodVal {
		return false
	}
	signature, _ := selection.Obj().Type().(*types.Signature)
	if signature == nil || signature.Recv() == nil {
		return false
	}
	_, pointerRecv := signature.Recv().Type().(*types.Pointer)
	return pointerRecv && !exprIsPointer(info, expr.X)
}

// collectEffectFreeFunctions marks the package-level functions of pkg whose
// body only returns one value built from their parameters, constants and the
// unchanging unexported variables of pkg, without calls or operations that can
// panic. A call of one has no effects and gives the same value whenever it
// happens, and never awaits, as the variables it reads are initialized
// without calls. It runs after the shard's changed variables are marked.
func collectEffectFreeFunctions(shard *SemanticModel, pkg *packages.Package) {
	// The package's own variable initializers are known.
	inits := newPackageVarInitsOf(pkg.Types)
	for _, file := range pkg.Syntax {
		inits.addFile(pkg.TypesInfo, file)
	}

	for _, file := range pkg.Syntax {
		for _, decl := range file.Decls {
			// Only a plain function with a single return statement qualifies.
			fnDecl, ok := decl.(*ast.FuncDecl)
			if !ok || fnDecl.Recv != nil || fnDecl.Type.TypeParams != nil || fnDecl.Body == nil ||
				len(fnDecl.Body.List) != 1 {
				continue
			}
			ret, ok := fnDecl.Body.List[0].(*ast.ReturnStmt)
			fn, _ := pkg.TypesInfo.Defs[fnDecl.Name].(*types.Func)
			if !ok || len(ret.Results) != 1 || fn == nil {
				continue
			}

			// Its result is built without effects.
			pure := effectFreeExpr{info: pkg.TypesInfo, pkg: pkg.Types, changed: shard.changedVars, inits: inits}
			if pure.check(ret.Results[0]) {
				shard.effectFreeFuncs[fn] = true
			}
		}
	}
}

// effectFreeExpr judges the result expressions of effect-free functions.
type effectFreeExpr struct {
	info    *types.Info
	pkg     *types.Package
	changed map[types.Object]bool
	inits   *packageVarInits
}

// check reports whether expr evaluates without effects or panics to a value
// that depends only on the function's parameters.
func (e effectFreeExpr) check(expr ast.Expr) bool {
	// A constant is.
	if tv, ok := e.info.Types[expr]; ok && tv.Value != nil {
		return true
	}

	switch typed := expr.(type) {
	case *ast.Ident:
		return e.ident(typed)
	case *ast.ParenExpr:
		return e.check(typed.X)
	case *ast.CompositeLit:
		return e.composite(typed)
	case *ast.UnaryExpr:
		return e.unary(typed)
	case *ast.BinaryExpr:
		return safeBinaryOperation(e.info, typed) && e.check(typed.X) && e.check(typed.Y)
	case *ast.IndexExpr:
		return e.index(typed)
	case *ast.CallExpr:
		return safeConversion(e.info, typed) && e.check(typed.Args[0])
	case *ast.SelectorExpr:
		// A field of a struct value, not through a pointer.
		selection := e.info.Selections[typed]
		return selection != nil && selection.Kind() == types.FieldVal && !selection.Indirect() &&
			!exprIsPointer(e.info, typed.X) && e.check(typed.X)
	}
	return false
}

// ident reports whether ident reads nil, a parameter or local of the
// function, or an unchanging unexported variable of the package that is
// initialized without calls.
func (e effectFreeExpr) ident(ident *ast.Ident) bool {
	switch obj := e.info.Uses[ident].(type) {
	case *types.Nil:
		return true
	case *types.Var:
		if v := packageLevelVar(obj); v != nil {
			return v.Pkg() == e.pkg && !v.Exported() && !e.changed[v] && e.inits.sync(v)
		}
		return true
	}
	return false
}

// composite reports whether every element and key of lit is effect free.
// A non-constant interface map key can panic as unhashable.
func (e effectFreeExpr) composite(lit *ast.CompositeLit) bool {
	litType := types.Unalias(e.info.TypeOf(lit)).Underlying()
	for _, elt := range lit.Elts {
		// A key of a map is a value, and of a struct a field name.
		value := elt
		if kv, ok := elt.(*ast.KeyValueExpr); ok {
			value = kv.Value
			if _, isStruct := litType.(*types.Struct); !isStruct && !e.mapKey(litType, kv.Key) {
				return false
			}
		}

		// Each element is effect free.
		if !e.check(value) {
			return false
		}
	}
	return true
}

// mapKey reports whether key is an effect-free key of a composite literal of
// type litType.
func (e effectFreeExpr) mapKey(litType types.Type, key ast.Expr) bool {
	if mapType, ok := litType.(*types.Map); ok && types.IsInterface(mapType.Key()) {
		tv := e.info.Types[key]
		return tv.Value != nil
	}
	return e.check(key)
}

// unary reports whether expr is the address of an effect-free composite
// literal or an arithmetic or logical operation on an effect-free operand.
func (e effectFreeExpr) unary(expr *ast.UnaryExpr) bool {
	switch expr.Op {
	case token.AND:
		lit, ok := ast.Unparen(expr.X).(*ast.CompositeLit)
		return ok && e.composite(lit)
	case token.ADD, token.SUB, token.XOR, token.NOT:
		return e.check(expr.X)
	}
	return false
}

// index reports whether expr reads a map with a key that cannot panic, or an
// array element whose index is always in range.
func (e effectFreeExpr) index(expr *ast.IndexExpr) bool {
	// A map read never panics unless its key is an unhashable interface.
	switch typ := types.Unalias(e.info.TypeOf(expr.X)).Underlying().(type) {
	case *types.Map:
		return !types.IsInterface(typ.Key()) && e.check(expr.X) && e.check(expr.Index)
	case *types.Array:
		return indexInRange(e.info, expr.Index, typ.Len()) && e.check(expr.X) && e.check(expr.Index)
	}
	return false
}

// indexInRange reports whether index is always below length: a constant, or
// a value masked by a constant below length.
func indexInRange(info *types.Info, index ast.Expr, length int64) bool {
	// A constant index is in range when it is below length.
	if value, ok := constantInt(info, index); ok {
		return value >= 0 && value < length
	}

	// x & c is at most c for any x when c is not negative.
	binary, ok := ast.Unparen(index).(*ast.BinaryExpr)
	if !ok || binary.Op != token.AND {
		return false
	}
	for _, operand := range []ast.Expr{binary.X, binary.Y} {
		if value, ok := constantInt(info, operand); ok && value >= 0 && value < length {
			return true
		}
	}
	return false
}

// constantInt returns the value of expr when it is an integer constant that
// fits 64 bits.
func constantInt(info *types.Info, expr ast.Expr) (int64, bool) {
	tv, ok := info.Types[expr]
	if !ok || tv.Value == nil || tv.Value.Kind() != constant.Int {
		return 0, false
	}
	return constant.Int64Val(tv.Value)
}

// safeBinaryOperation reports whether expr is an operation that cannot
// panic: arithmetic other than division and shifts, bitwise and logical
// operations, and comparisons of values that are not interfaces.
func safeBinaryOperation(info *types.Info, expr *ast.BinaryExpr) bool {
	switch expr.Op {
	case token.ADD, token.SUB, token.MUL, token.AND, token.OR, token.XOR, token.AND_NOT,
		token.LAND, token.LOR, token.EQL, token.NEQ, token.LSS, token.LEQ, token.GTR, token.GEQ:
	default:
		return false
	}
	for _, operand := range []ast.Expr{expr.X, expr.Y} {
		if _, ok := types.Unalias(info.TypeOf(operand)).Underlying().(*types.Basic); !ok {
			return false
		}
	}
	return true
}

// safeConversion reports whether call converts one value to a type without a
// panic: any conversion but one of a slice to an array or array pointer.
func safeConversion(info *types.Info, call *ast.CallExpr) bool {
	// Only a conversion to a type, not a call, qualifies.
	if len(call.Args) != 1 || call.Ellipsis.IsValid() {
		return false
	}
	tv, ok := info.Types[call.Fun]
	if !ok || !tv.IsType() {
		return false
	}

	// A slice converts to an array only when its length matches.
	target := types.Unalias(tv.Type).Underlying()
	if pointer, ok := target.(*types.Pointer); ok {
		target = types.Unalias(pointer.Elem()).Underlying()
	}
	_, toArray := target.(*types.Array)
	_, fromSlice := types.Unalias(info.TypeOf(call.Args[0])).Underlying().(*types.Slice)
	return !toArray || !fromSlice
}

// deferPackageTables decides the package variables whose initializers are
// deferred to their first read, and makes them lazy: the large tables of
// constant data, and the variables whose initializers read deferred
// variables only through effect-free expressions. Deferring one variable can
// let another defer, across packages, so the decision repeats until none
// changes.
func (m *SemanticModel) deferPackageTables(wholeProgram bool) {
	deferred := make(map[types.Object]bool)
	inits := newPackageVarInits(m)
	for changed := true; changed; {
		changed = false
		for _, semPkg := range m.packages {
			if semPkg.source == nil || semPkg.source.TypesInfo == nil {
				continue
			}
			judge := deferredInitializer{model: m, semPkg: semPkg, deferred: deferred, inits: inits, wholeProgram: wholeProgram}
			changed = judge.deferPackage() || changed
		}
	}

	// Each deferred variable is lazy, and its package initializer skips it.
	for obj := range deferred {
		semPkg := m.packages[obj.Pkg().Path()]
		if semPkg.deferredVars == nil {
			semPkg.deferredVars = make(map[types.Object]bool)
		}
		if semPkg.lazyVars == nil {
			semPkg.lazyVars = make(map[types.Object]bool)
		}
		semPkg.deferredVars[obj] = true
		semPkg.lazyVars[obj] = true
	}
}

// deferredInitializer judges the package variable initializers of one
// package against the variables deferred so far.
type deferredInitializer struct {
	model        *SemanticModel
	semPkg       *semanticPackage
	deferred     map[types.Object]bool
	inits        *packageVarInits
	wholeProgram bool
	// alreadyLazy reports that the variable judged is lazy for another
	// reason, so its readers already read it through its getter.
	alreadyLazy bool
}

// deferPackage adds the package's variables that newly defer to deferred,
// and reports whether it added any.
func (d deferredInitializer) deferPackage() bool {
	added := false
	info := d.semPkg.source.TypesInfo
	for _, file := range d.semPkg.source.Syntax {
		for _, decl := range file.Decls {
			// Each variable with its own initializer is a candidate.
			genDecl, ok := decl.(*ast.GenDecl)
			if !ok || genDecl.Tok != token.VAR {
				continue
			}
			for _, spec := range genDecl.Specs {
				valueSpec, ok := spec.(*ast.ValueSpec)
				if !ok || len(valueSpec.Names) != len(valueSpec.Values) {
					continue
				}

				// A variable defers when its initializer is effect free and
				// is a large table or reads a deferred variable.
				for idx, name := range valueSpec.Names {
					obj := info.Defs[name]
					if obj == nil || name.Name == "_" || d.deferred[obj] {
						continue
					}
					d.alreadyLazy = d.semPkg.lazyVars[obj]
					elements, readsDeferred, ok := d.judge(valueSpec.Values[idx])
					if ok && (elements >= deferredInitMinElements || readsDeferred) {
						d.deferred[obj] = true
						added = true
					}
				}
			}
		}
	}
	return added
}

// judge returns the number of composite literal elements in expr and whether
// it reads a deferred variable, and reports whether evaluating expr has no
// effects and gives the same value whenever it happens.
func (d deferredInitializer) judge(expr ast.Expr) (int, bool, bool) {
	// A constant expression is constant data.
	info := d.semPkg.source.TypesInfo
	if tv, ok := info.Types[expr]; ok && tv.Value != nil {
		return 0, false, true
	}

	switch typed := expr.(type) {
	case *ast.Ident:
		return d.readVar(info.Uses[typed])
	case *ast.SelectorExpr:
		if info.Selections[typed] != nil {
			return 0, false, false
		}
		return d.readVar(info.Uses[typed.Sel])
	case *ast.ParenExpr:
		return d.judge(typed.X)
	case *ast.UnaryExpr:
		return d.unary(typed)
	case *ast.BinaryExpr:
		if !safeBinaryOperation(info, typed) {
			return 0, false, false
		}
		return d.judgeAll([]ast.Expr{typed.X, typed.Y})
	case *ast.CallExpr:
		return d.call(typed)
	case *ast.CompositeLit:
		return d.composite(typed)
	}
	return 0, false, false
}

// judgeAll judges exprs together.
func (d deferredInitializer) judgeAll(exprs []ast.Expr) (int, bool, bool) {
	total, readsDeferred := 0, false
	for _, expr := range exprs {
		elements, reads, ok := d.judge(expr)
		if !ok {
			return 0, false, false
		}
		total += elements
		readsDeferred = readsDeferred || reads
	}
	return total, readsDeferred, true
}

// readVar judges a read of obj by value: nil, or a package variable that
// holds its initial value forever.
func (d deferredInitializer) readVar(obj types.Object) (int, bool, bool) {
	// nil is constant data.
	if _, ok := obj.(*types.Nil); ok {
		return 0, false, true
	}

	// A variable never changes when no package changes it, and an exported
	// one only when the program has no other packages.
	v := packageLevelVar(obj)
	if v == nil || !d.compiledVar(v) || d.model.changedVars[v] || (v.Exported() && !d.wholeProgram) {
		return 0, false, false
	}
	return d.reads(v)
}

// reads judges a read of the value or the address of v, which is effect
// free. A variable that is not lazy yet must stay sync, so it reads only
// variables whose initializers make no calls.
func (d deferredInitializer) reads(v *types.Var) (int, bool, bool) {
	if !d.alreadyLazy && !d.inits.sync(v) {
		return 0, false, false
	}
	return 0, d.deferred[v], true
}

// compiledVar reports whether v is declared by a package compiled from Go
// source, whose initializer the model knows.
func (d deferredInitializer) compiledVar(v *types.Var) bool {
	semPkg := d.model.packages[v.Pkg().Path()]
	return semPkg != nil && semPkg.source != nil
}

// unary judges the address of a composite literal or of a package
// variable, which is the same pointer whenever it is taken, or another
// operation on a value.
func (d deferredInitializer) unary(expr *ast.UnaryExpr) (int, bool, bool) {
	// The address of a variable reads none of its value.
	info := d.semPkg.source.TypesInfo
	if expr.Op == token.AND {
		operand := ast.Unparen(expr.X)
		if lit, ok := operand.(*ast.CompositeLit); ok {
			return d.composite(lit)
		}
		v := addressedVar(info, operand)
		if v == nil || !d.compiledVar(v) {
			return 0, false, false
		}
		return d.reads(v)
	}

	// Other operations cannot panic.
	switch expr.Op {
	case token.ADD, token.SUB, token.XOR, token.NOT:
		return d.judge(expr.X)
	}
	return 0, false, false
}

// addressedVar returns the package variable expr names itself, or nil.
func addressedVar(info *types.Info, expr ast.Expr) *types.Var {
	switch typed := expr.(type) {
	case *ast.Ident:
		return packageLevelVar(info.Uses[typed])
	case *ast.SelectorExpr:
		if info.Selections[typed] == nil {
			return packageLevelVar(info.Uses[typed.Sel])
		}
	}
	return nil
}

// call judges a conversion, or a call of an effect-free function with
// effect-free arguments, which never awaits.
func (d deferredInitializer) call(call *ast.CallExpr) (int, bool, bool) {
	// A conversion converts its operand.
	info := d.semPkg.source.TypesInfo
	if safeConversion(info, call) {
		return d.judge(call.Args[0])
	}

	// A function call needs an effect-free function.
	fn, _ := calledObject(info, call.Fun).(*types.Func)
	if fn == nil || call.Ellipsis.IsValid() || !d.model.effectFreeFuncs[fn] {
		return 0, false, false
	}
	return d.judgeAll(call.Args)
}

// calledObject returns the object a plain or qualified function name names.
func calledObject(info *types.Info, fun ast.Expr) types.Object {
	switch typed := ast.Unparen(fun).(type) {
	case *ast.Ident:
		return info.Uses[typed]
	case *ast.SelectorExpr:
		if info.Selections[typed] == nil {
			return info.Uses[typed.Sel]
		}
	}
	return nil
}

// composite judges a composite literal by its keys and elements, as
// constantDataComposite does. A non-constant interface map key can panic as
// unhashable.
func (d deferredInitializer) composite(lit *ast.CompositeLit) (int, bool, bool) {
	// The keys of a struct literal, also one whose & is elided in a table of
	// pointers, are field names, not values.
	info := d.semPkg.source.TypesInfo
	litType := types.Unalias(info.TypeOf(lit)).Underlying()
	if pointer, ok := litType.(*types.Pointer); ok {
		litType = types.Unalias(pointer.Elem()).Underlying()
	}
	_, isStruct := litType.(*types.Struct)
	mapType, _ := litType.(*types.Map)
	interfaceKeys := mapType != nil && types.IsInterface(mapType.Key())

	// Each element, and each key that is a value, is judged.
	exprs := make([]ast.Expr, 0, len(lit.Elts))
	for _, elt := range lit.Elts {
		kv, ok := elt.(*ast.KeyValueExpr)
		if !ok {
			exprs = append(exprs, elt)
			continue
		}
		if interfaceKeys && info.Types[kv.Key].Value == nil {
			return 0, false, false
		}
		if !isStruct {
			exprs = append(exprs, kv.Key)
		}
		exprs = append(exprs, kv.Value)
	}
	elements, readsDeferred, ok := d.judgeAll(exprs)
	return elements + len(lit.Elts), readsDeferred, ok
}

// packageVarInits indexes the initializers of the package variables of a
// model and memoizes which of them are sync.
type packageVarInits struct {
	// exprs holds each variable's own initializer, and nil for a variable
	// initialized by a multi-value expression.
	exprs map[types.Object]ast.Expr
	// infos holds the type information of each variable's package.
	infos map[types.Object]*types.Info
	// syncMemo holds the answers of sync; a variable being judged is
	// recorded as not sync, which ends a cycle.
	syncMemo map[types.Object]bool
	// local, when set, is the only package indexed, and a variable of
	// another package is not known to be sync.
	local *types.Package
}

// newPackageVarInitsOf returns an empty index of the variables of pkg only.
func newPackageVarInitsOf(pkg *types.Package) *packageVarInits {
	return &packageVarInits{
		exprs:    make(map[types.Object]ast.Expr),
		infos:    make(map[types.Object]*types.Info),
		syncMemo: make(map[types.Object]bool),
		local:    pkg,
	}
}

// newPackageVarInits indexes the variable declarations of every package of
// m, which are outside function bodies, so known also for a package checked
// without bodies.
func newPackageVarInits(m *SemanticModel) *packageVarInits {
	inits := &packageVarInits{
		exprs:    make(map[types.Object]ast.Expr),
		infos:    make(map[types.Object]*types.Info),
		syncMemo: make(map[types.Object]bool),
	}
	for _, semPkg := range m.packages {
		if semPkg.source == nil || semPkg.source.TypesInfo == nil {
			continue
		}
		for _, file := range semPkg.source.Syntax {
			inits.addFile(semPkg.source.TypesInfo, file)
		}
	}
	return inits
}

// addFile indexes the package variable declarations of file.
func (p *packageVarInits) addFile(info *types.Info, file *ast.File) {
	for _, decl := range file.Decls {
		// Only variable declarations declare variables.
		genDecl, ok := decl.(*ast.GenDecl)
		if !ok || genDecl.Tok != token.VAR {
			continue
		}

		// Each name maps to its own value, if it has one.
		for _, spec := range genDecl.Specs {
			valueSpec, ok := spec.(*ast.ValueSpec)
			if !ok {
				continue
			}
			for idx, name := range valueSpec.Names {
				obj := info.Defs[name]
				if obj == nil {
					continue
				}
				p.infos[obj] = info
				if len(valueSpec.Names) == len(valueSpec.Values) {
					p.exprs[obj] = valueSpec.Values[idx]
				} else if len(valueSpec.Values) != 0 {
					p.exprs[obj] = nil
				}
			}
		}
	}
}

// sync reports whether reading v never awaits: its initializer, if any,
// calls no function, other than a builtin or a conversion, and reads only
// variables that are sync too.
func (p *packageVarInits) sync(v *types.Var) bool {
	// An answer is known, or v is being judged, or v is of a package not
	// indexed.
	if answer, ok := p.syncMemo[v]; ok {
		return answer
	}
	if p.local != nil && v.Pkg() != p.local {
		return false
	}
	p.syncMemo[v] = false

	// A variable without an initializer is sync, and one initialized by a
	// multi-value expression is not.
	expr, declared := p.exprs[v]
	info := p.infos[v]
	answer := !declared || (expr != nil && p.syncExpr(info, expr))
	p.syncMemo[v] = answer
	return answer
}

// syncExpr reports whether expr calls no function other than a builtin or a
// conversion, and reads only sync package variables.
func (p *packageVarInits) syncExpr(info *types.Info, expr ast.Expr) bool {
	sync := true
	ast.Inspect(expr, func(node ast.Node) bool {
		switch typed := node.(type) {
		case *ast.FuncLit:
			return false
		case *ast.CallExpr:
			// A builtin or a conversion runs inline.
			_, builtin := calledObject(info, typed.Fun).(*types.Builtin)
			tv := info.Types[typed.Fun]
			sync = sync && (builtin || tv.IsType())
		case *ast.Ident:
			// A read package variable is sync too.
			if v := packageLevelVar(info.Uses[typed]); v != nil {
				sync = sync && p.sync(v)
			}
		}
		return sync
	})
	return sync
}
