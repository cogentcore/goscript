package compiler

import (
	"go/ast"
	"go/token"
	"go/types"

	"golang.org/x/tools/go/packages"
)

// Calls of the fmt print functions, decided by their operands.
//
// Sprint, Sprintf, Print, Append and the rest call the Error, Format,
// GoString and String methods of the values they format, and those of the
// values inside them, and return a plain value when every such call does.
// Fprint, Fprintf and Fprintln also call their writer's Write method.
// sort.Sort, Stable and IsSorted call only their argument's Len, Less and
// Swap, which the same rule for interface parameters decides.
// Override metadata lists them in asyncWhenOperands. Instead of making each
// call async when any method of those names in the program is, a call
// depends on the methods its operands' static types allow:
//
//   - A value of a concrete type has its own methods, and those of the types
//     fmt reaches inside it when it formats a struct, pointer, slice, array or
//     map, whose elements it formats with the same rules.
//   - A value of an interface type that has Error() is an error, whose
//     dynamic value fmt formats with its Error method, an implementation of
//     the error interface's method, or with any Format or GoString method.
//   - A value of an interface type that has String() and not Error() may
//     hold an error, or else a value of a type that implements its String
//     method; or one with any Format or GoString method.
//   - A value of any other interface type, a type parameter or a
//     reflect.Value may hold anything, so the call is async when any method of
//     those names is, as before.

// formatMethodNames are the methods fmt calls on the values it formats.
var formatMethodNames = []string{"Error", "Format", "GoString", "String"}

// formatAnyMethodKey is the key of a synthetic asyncWhenMethods target that
// is async when any Format or GoString method of the program is, which an
// interface operand may reach.
var formatAnyMethodKey = types.NewFunc(token.NoPos, nil, "fmt·Format",
	types.NewSignatureType(nil, nil, nil, nil, nil, false))

// formatAnyMethodNames are the methods that make formatAnyMethodKey async.
var formatAnyMethodNames = []string{"Format", "GoString"}

// formatOperandDeps is what decides whether a call of a format function
// suspends: any method of the names (global), or the methods in methods,
// which may be compiled methods, override methods, interface methods or
// formatAnyMethodKey.
type formatOperandDeps struct {
	global  bool
	methods []*types.Func
	seen    map[types.Type]bool
	added   map[*types.Func]bool
}

// formatCallDeps returns what decides a call of called, an asyncWhenOperands
// function, with the arguments args. An argument for a parameter of a
// non-empty interface type, such as fmt.Fprintf's io.Writer or sort.Sort's
// sort.Interface, is decided by its static type's methods of that
// interface, and any other by the methods fmt calls on the values it
// formats.
func formatCallDeps(pkg *packages.Package, called *types.Func, args []ast.Expr) *formatOperandDeps {
	deps := &formatOperandDeps{seen: make(map[types.Type]bool), added: make(map[*types.Func]bool)}
	signature, _ := called.Type().(*types.Signature)
	for idx, arg := range args {
		if iface := operandInterfaceParam(signature, idx); iface != nil {
			deps.walkInterfaceArg(pkg.TypesInfo.TypeOf(arg), iface)
			continue
		}
		deps.walk(pkg.TypesInfo.TypeOf(arg))
	}
	return deps
}

// operandInterfaceParam returns the non-empty interface type of the
// parameter for argument idx, or nil.
func operandInterfaceParam(signature *types.Signature, idx int) *types.Interface {
	if signature == nil || idx >= signature.Params().Len() || signature.Variadic() && idx >= signature.Params().Len()-1 {
		return nil
	}
	iface, ok := signature.Params().At(idx).Type().Underlying().(*types.Interface)
	if !ok || iface.NumMethods() == 0 {
		return nil
	}
	return iface
}

// walkInterfaceArg adds the methods of iface that an argument of static type
// typ has: a concrete type's methods, or an interface's methods, which the
// coloring decides by their implementations.
func (d *formatOperandDeps) walkInterfaceArg(typ types.Type, iface *types.Interface) {
	if _, ok := types.Unalias(typ).(*types.TypeParam); ok || typ == nil {
		d.global = true
		return
	}
	methodSet := types.NewMethodSet(typ)
	for want := range iface.Methods() {
		method, _ := selectionFunc(methodSet.Lookup(want.Pkg(), want.Name()))
		if method == nil {
			d.global = true
			return
		}
		d.add(method)
	}
}

// selectionFunc returns the method a selection selects, or nil.
func selectionFunc(selection *types.Selection) (*types.Func, bool) {
	if selection == nil {
		return nil, false
	}
	method, ok := selection.Obj().(*types.Func)
	return method, ok
}

// add records that method decides the call.
func (d *formatOperandDeps) add(method *types.Func) {
	method = functionOriginOrSelf(method)
	if !d.added[method] {
		d.added[method] = true
		d.methods = append(d.methods, method)
	}
}

// walk adds the methods fmt may call on a value of static type typ, and on
// the values it formats inside it.
func (d *formatOperandDeps) walk(typ types.Type) {
	// Each type is walked once.
	if typ == nil || d.global {
		return
	}
	typ = types.Unalias(typ)
	if d.seen[typ] {
		return
	}
	d.seen[typ] = true

	// A type parameter, an interface or a reflect.Value holds a dynamic
	// value.
	if _, ok := typ.(*types.TypeParam); ok || isReflectValue(typ) {
		d.global = true
		return
	}
	if iface, ok := typ.Underlying().(*types.Interface); ok {
		d.walkInterface(typ, iface)
		return
	}

	// A concrete type has its own methods.
	methodSet := types.NewMethodSet(typ)
	for _, name := range formatMethodNames {
		if selection := methodSet.Lookup(nil, name); selection != nil {
			if method, ok := selection.Obj().(*types.Func); ok {
				d.add(method)
			}
		}
	}
	d.walkElements(typ.Underlying())
}

// walkElements walks the types of the values fmt formats inside a value of
// underlying type typ.
func (d *formatOperandDeps) walkElements(typ types.Type) {
	switch typed := typ.(type) {
	case *types.Pointer:
		d.walk(typed.Elem())
	case *types.Slice:
		d.walk(typed.Elem())
	case *types.Array:
		d.walk(typed.Elem())
	case *types.Map:
		d.walk(typed.Key())
		d.walk(typed.Elem())
	case *types.Struct:
		for field := range typed.Fields() {
			d.walk(field.Type())
		}
	}
}

// walkInterface adds what decides the formatting of a value of interface
// type typ.
func (d *formatOperandDeps) walkInterface(typ types.Type, iface *types.Interface) {
	// An error is formatted by its Error method.
	methodSet := types.NewMethodSet(typ)
	if formatMethodSelection(methodSet, "Error") != nil {
		d.add(universeError)
		d.add(formatAnyMethodKey)
		return
	}

	// A Stringer may hold an error or a value with its String method.
	if selection := formatMethodSelection(methodSet, "String"); selection != nil {
		d.add(selection.Obj().(*types.Func))
		d.add(universeError)
		d.add(formatAnyMethodKey)
		return
	}
	d.global = true
}

// formatMethodSelection returns the method name() string of an interface's
// method set, or nil.
func formatMethodSelection(methodSet *types.MethodSet, name string) *types.Selection {
	// The method must take nothing and return a string.
	selection := methodSet.Lookup(nil, name)
	if selection == nil {
		return nil
	}
	signature, _ := selection.Obj().Type().(*types.Signature)
	if signature == nil || signature.Params().Len() != 0 || signature.Results().Len() != 1 {
		return nil
	}
	if basic, ok := signature.Results().At(0).Type().(*types.Basic); !ok || basic.Kind() != types.String {
		return nil
	}
	return selection
}

// isReflectValue reports whether typ is reflect.Value, which fmt formats as
// the value it holds.
func isReflectValue(typ types.Type) bool {
	named, ok := typ.(*types.Named)
	return ok && named.Obj().Pkg() != nil && named.Obj().Pkg().Path() == "reflect" && named.Obj().Name() == "Value"
}

// formatDepIsCall reports whether a dependency of a format call is a call
// the coloring decides: an interface method, formatAnyMethodKey, or a
// compiled method. An override package's concrete method is decided by its
// metadata instead.
func formatDepIsCall(overrideFacts *OverrideFacts, method *types.Func) bool {
	if method == formatAnyMethodKey || isInterfaceMethod(method) || method.Pkg() == nil {
		return true
	}
	return !overrideFacts.HasPackage(method.Pkg().Path())
}

// formatCallAsync reports whether a call of a format function that override
// metadata lists in asyncWhenOperands may suspend, by its operands.
func (m *SemanticModel) formatCallAsync(
	pkg *packages.Package,
	overrideFacts *OverrideFacts,
	called *types.Func,
	call *ast.CallExpr,
) bool {
	// An operand that may hold anything leaves the function's own coloring.
	deps := formatCallDeps(pkg, called, call.Args)
	if deps.global {
		return m.functionAsync(called)
	}

	// Otherwise any of its methods decides.
	for _, method := range deps.methods {
		if !formatDepIsCall(overrideFacts, method) {
			if overrideMethodAsync(overrideFacts, method) {
				return true
			}
			continue
		}
		if m.functionAsync(method) || m.openMethods[method] {
			return true
		}
	}
	return false
}
