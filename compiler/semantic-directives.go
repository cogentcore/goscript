package compiler

import (
	"go/ast"
	"go/token"
	"go/types"
	"strings"

	"golang.org/x/tools/go/packages"
)

// Async directives.
//
// A //goscript:async or //goscript:sync line in the doc comment of a
// declaration overrides the async analysis there:
//
//   - //goscript:async on an interface type, an interface method, a func type
//     or a func-typed struct field or package variable makes every call
//     through it async, whatever the implementations and values the program
//     has. A directive on an interface type covers the methods it declares,
//     not those of the interfaces it embeds.
//   - //goscript:sync on the same declarations makes calls through them sync:
//     the analysis stops at the declaration, so their callers do not become
//     async through it. On a function or method it makes the function sync:
//     a suspending operation in its own body, such as a channel operation or
//     a call of an async override, and a direct call of a compiled function
//     the analysis colors async are compile errors, and calls through
//     interface methods and function values that may suspend are checked when
//     they run.
//
// The sync directive is a promise by the programmer: a value or
// implementation that does suspend is not awaited.

// asyncDirective is the directive on one declaration.
type asyncDirective uint8

const (
	asyncDirectiveNone asyncDirective = iota
	asyncDirectiveAsync
	asyncDirectiveSync
)

// The directive lines.
const (
	asyncDirectiveLine = "//goscript:async"
	syncDirectiveLine  = "//goscript:sync"
)

// String returns the directive line.
func (d asyncDirective) String() string {
	switch d {
	case asyncDirectiveAsync:
		return asyncDirectiveLine
	case asyncDirectiveSync:
		return syncDirectiveLine
	}
	return ""
}

// asyncDirectives holds the directives of the compiled packages by the
// declared object they annotate: a type name, an interface method, a
// function or method, a struct field or a package variable. Generic
// declarations are keyed by their origin.
type asyncDirectives map[types.Object]asyncDirective

// collectAsyncDirectives finds the directives in the declarations of pkgs.
// A directive on a declaration it does not apply to is an error.
func collectAsyncDirectives(pkgs []*packages.Package) (asyncDirectives, []Diagnostic) {
	directives := make(asyncDirectives)
	var diagnostics []Diagnostic
	for _, pkg := range pkgs {
		if pkg == nil || pkg.TypesInfo == nil {
			continue
		}
		c := directiveCollector{pkg: pkg, directives: directives}
		for _, file := range pkg.Syntax {
			for _, decl := range file.Decls {
				c.collectDecl(decl)
			}
		}
		diagnostics = append(diagnostics, c.diagnostics...)
	}
	return directives, diagnostics
}

// directiveCollector collects the directives of one package.
type directiveCollector struct {
	pkg         *packages.Package
	directives  asyncDirectives
	diagnostics []Diagnostic
}

// collectDecl collects the directives of one top-level declaration.
func (c *directiveCollector) collectDecl(decl ast.Decl) {
	// A function or method is annotated by its doc comment.
	if fnDecl, ok := decl.(*ast.FuncDecl); ok {
		c.add(fnDecl.Doc, c.pkg.TypesInfo.Defs[fnDecl.Name])
		return
	}

	// A type or variable spec is annotated by its own doc comment, or by the
	// declaration's when it is not grouped.
	genDecl, ok := decl.(*ast.GenDecl)
	if !ok || genDecl.Tok != token.TYPE && genDecl.Tok != token.VAR {
		return
	}
	for _, spec := range genDecl.Specs {
		switch typed := spec.(type) {
		case *ast.TypeSpec:
			c.add(specDoc(genDecl, typed.Doc), c.pkg.TypesInfo.Defs[typed.Name])
			c.collectTypeExpr(typed.Type)
		case *ast.ValueSpec:
			for _, name := range typed.Names {
				c.add(specDoc(genDecl, typed.Doc), c.pkg.TypesInfo.Defs[name])
			}
			if typed.Type != nil {
				c.collectTypeExpr(typed.Type)
			}
		}
	}
}

// specDoc returns the doc comment of a spec: its own, or the declaration's
// when the declaration is not grouped.
func specDoc(decl *ast.GenDecl, doc *ast.CommentGroup) *ast.CommentGroup {
	if doc == nil && !decl.Lparen.IsValid() {
		return decl.Doc
	}
	return doc
}

// collectTypeExpr collects the directives on the methods of interface types
// and the fields of struct types in a type expression.
func (c *directiveCollector) collectTypeExpr(expr ast.Expr) {
	ast.Inspect(expr, func(node ast.Node) bool {
		// Only interface methods and struct fields carry directives.
		var fields *ast.FieldList
		switch typed := node.(type) {
		case *ast.InterfaceType:
			fields = typed.Methods
		case *ast.StructType:
			fields = typed.Fields
		}
		if fields == nil {
			return true
		}
		for _, field := range fields.List {
			for _, name := range field.Names {
				c.add(field.Doc, c.pkg.TypesInfo.Defs[name])
			}
		}
		return true
	})
}

// add records the directive in doc on obj, or reports a directive on a
// declaration it does not apply to.
func (c *directiveCollector) add(doc *ast.CommentGroup, obj types.Object) {
	// Only a declaration with a directive counts.
	directive, pos := directiveIn(doc)
	if directive == asyncDirectiveNone || obj == nil {
		return
	}

	// The directive must apply to the declaration.
	if reason := directiveTargetError(obj, directive); reason != "" {
		c.diagnostics = append(c.diagnostics, Diagnostic{
			Severity: DiagnosticSeverityError,
			Code:     "goscript/directive:target",
			Message:  directive.String() + " " + reason,
			Detail:   obj.Name(),
			Position: diagnosticPositionFromSource(sourcePos(c.pkg, pos), ""),
		})
		return
	}
	c.directives[obj] = directive
}

// directiveIn returns the directive a doc comment holds and its position.
func directiveIn(doc *ast.CommentGroup) (asyncDirective, token.Pos) {
	if doc == nil {
		return asyncDirectiveNone, token.NoPos
	}
	for _, comment := range doc.List {
		for _, directive := range []asyncDirective{asyncDirectiveAsync, asyncDirectiveSync} {
			rest, ok := strings.CutPrefix(comment.Text, directive.String())
			if ok && (rest == "" || rest[0] == ' ' || rest[0] == '\t') {
				return directive, comment.Pos()
			}
		}
	}
	return asyncDirectiveNone, token.NoPos
}

// directiveTargetError returns why directive does not apply to obj, or "".
func directiveTargetError(obj types.Object, directive asyncDirective) string {
	const valueTargets = "applies to interface types, interface methods, func types, and func-typed fields and variables"
	switch typed := obj.(type) {
	case *types.TypeName:
		switch typed.Type().Underlying().(type) {
		case *types.Interface, *types.Signature:
			return ""
		}
		return valueTargets
	case *types.Var:
		if signatureForType(typed.Type()) != nil {
			return ""
		}
		return valueTargets
	case *types.Func:
		if isInterfaceMethod(typed) || directive == asyncDirectiveSync {
			return ""
		}
		return valueTargets + "; a function's own body decides whether it is async"
	}
	return valueTargets
}

// of returns the directive on obj's origin.
func (d asyncDirectives) of(obj types.Object) asyncDirective {
	if len(d) == 0 || obj == nil {
		return asyncDirectiveNone
	}
	switch typed := obj.(type) {
	case *types.Func:
		obj = typed.Origin()
	case *types.Var:
		obj = typed.Origin()
	}
	return d[obj]
}

// namedType returns the directive on a named type's declaration.
func (d asyncDirectives) namedType(typ types.Type) asyncDirective {
	named, ok := types.Unalias(typ).(*types.Named)
	if !ok || len(d) == 0 {
		return asyncDirectiveNone
	}
	return d[named.Origin().Obj()]
}

// function returns the directive on a declared function or method.
func (d asyncDirectives) function(fn *types.Func) asyncDirective {
	if fn == nil || isInterfaceMethod(fn) {
		return asyncDirectiveNone
	}
	return d.of(fn)
}

// interfaceMethod returns the directive on an interface method, or on the
// named interface type that declares it.
func (d asyncDirectives) interfaceMethod(fn *types.Func) asyncDirective {
	if fn == nil || len(d) == 0 || !isInterfaceMethod(fn) {
		return asyncDirectiveNone
	}
	if directive := d.of(fn); directive != asyncDirectiveNone {
		return directive
	}
	return d.namedType(fn.Type().(*types.Signature).Recv().Type())
}

// valueCall returns the directive on what a call through a function value
// calls through: the field or variable it reads, or else its named func
// type. It also returns the annotated object.
func (d asyncDirectives) valueCall(pkg *packages.Package, fun ast.Expr) (asyncDirective, types.Object) {
	// A package without directives has none to find.
	if len(d) == 0 {
		return asyncDirectiveNone, nil
	}

	// A field or variable comes first.
	var obj types.Object
	switch typed := ast.Unparen(fun).(type) {
	case *ast.Ident:
		obj = pkg.TypesInfo.Uses[typed]
	case *ast.SelectorExpr:
		if selection := pkg.TypesInfo.Selections[typed]; selection != nil {
			if selection.Kind() == types.FieldVal {
				obj = selection.Obj()
			}
		} else {
			obj = pkg.TypesInfo.Uses[typed.Sel]
		}
	}
	if v, ok := obj.(*types.Var); ok {
		if directive := d.of(v); directive != asyncDirectiveNone {
			return directive, v.Origin()
		}
	}

	// Otherwise the named func type decides.
	named, ok := types.Unalias(pkg.TypesInfo.TypeOf(fun)).(*types.Named)
	if !ok {
		return asyncDirectiveNone, nil
	}
	return d[named.Origin().Obj()], named.Origin().Obj()
}

// asyncInterfaceMethods returns the interface methods an async directive
// makes async: those it annotates, and those declared by the interface
// types it annotates.
func (d asyncDirectives) asyncInterfaceMethods() []*types.Func {
	var methods []*types.Func
	for obj, directive := range d {
		if directive != asyncDirectiveAsync {
			continue
		}
		switch typed := obj.(type) {
		case *types.Func:
			methods = append(methods, typed)
		case *types.TypeName:
			if iface, ok := typed.Type().Underlying().(*types.Interface); ok {
				for method := range iface.ExplicitMethods() {
					methods = append(methods, method)
				}
			}
		}
	}
	return methods
}
