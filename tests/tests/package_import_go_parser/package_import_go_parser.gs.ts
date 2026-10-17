// Generated file based on package_import_go_parser.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as ast from "@goscript/go/ast/index.js"
import * as parser from "@goscript/go/parser/index.js"
import * as token from "@goscript/go/token/index.js"
import * as slices from "@goscript/slices/index.js"
import "@goscript/go/ast/index.js"

export async function main(): globalThis.Promise<void> {
	// Create a new token file set
	let fset = token.NewFileSet()

	// Test parsing expressions
	let results: $.Slice<string> = null! as $.Slice<string>

	// Parse some simple expressions
	let expressions = $.arrayToSlice<string>(["42", "x + y", "len(slice)", "map[string]int{}"])

	for (let __goscriptRangeTarget0 = expressions, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let expr = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as string)
		let [node, err] = await parser.ParseExpr(expr)
		if (err != null) {
			results = $.appendOne(results, "Error parsing " + expr + ": " + (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
			continue
		}

		// Extract type information from the parsed expression
		{
			const __goscriptTypeSwitchValue = node
			switch ($.typeSwitchCase(__goscriptTypeSwitchValue, __goscriptStatic0())) {
				case 0:
					{
						let n: ast.BasicLit | $.VarRef<ast.BasicLit> | null = $.typeAssert<ast.BasicLit | $.VarRef<ast.BasicLit> | null>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.pointerType("ast.BasicLit")).value
						results = $.appendOne(results, "BasicLit: " + $.pointerValue<ast.BasicLit>(n).Value)
					}
					break
				case 1:
					{
						let n: ast.BinaryExpr | $.VarRef<ast.BinaryExpr> | null = $.typeAssert<ast.BinaryExpr | $.VarRef<ast.BinaryExpr> | null>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.pointerType("ast.BinaryExpr")).value
						results = $.appendOne(results, "BinaryExpr with operator: " + token.Token_String($.pointerValue<ast.BinaryExpr>(n).Op))
					}
					break
				case 2:
					{
						let n: ast.CallExpr | $.VarRef<ast.CallExpr> | null = $.typeAssert<ast.CallExpr | $.VarRef<ast.CallExpr> | null>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.pointerType("ast.CallExpr")).value
						{
							let __goscriptTuple0: any = $.typeAssertTuple<ast.Ident | $.VarRef<ast.Ident> | null>($.pointerValue<ast.CallExpr>(n).Fun, /* @__PURE__ */ $.pointerType("ast.Ident"))
							let ident: ast.Ident | $.VarRef<ast.Ident> | null = __goscriptTuple0[0]
							let ok: boolean = __goscriptTuple0[1]
							if (ok) {
								results = $.appendOne(results, "CallExpr: " + $.pointerValue<ast.Ident>(ident).Name)
							}
						}
					}
					break
				case 3:
					{
						let n: ast.CompositeLit | $.VarRef<ast.CompositeLit> | null = $.typeAssert<ast.CompositeLit | $.VarRef<ast.CompositeLit> | null>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.pointerType("ast.CompositeLit")).value
						results = $.appendOne(results, "CompositeLit (composite literal)")
					}
					break
				default:
					{
						let n: any = __goscriptTypeSwitchValue
						results = $.appendOne(results, "Unknown expression type")
					}
					break
			}
		}
	}

	// Test parsing a simple Go source file
	let src = "package main\n\t\nfunc add(a, b int) int {\n\treturn a + b\n}\n\nfunc main() {\n\tresult := add(1, 2)\n\tprintln(result)\n}"

	// Parse the source code
	let __goscriptTuple1: any = await parser.ParseFile(fset, "test.go", src, 4)
	let file: ast.File | $.VarRef<ast.File> | null = __goscriptTuple1[0]
	let err: $.GoError = __goscriptTuple1[1]
	let file$: ast.File = file == null ? $.pointerTarget<ast.File>(file) : (file as any).__isVarRef === true ? (file as any).value : (file as any).__goValue === undefined ? (file as any) : $.pointerTarget<ast.File>(file)
	if (err != null) {
		results = $.appendOne(results, "Error parsing file: " + (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	} else {
		// Extract function names
		for (let __goscriptRangeTarget1 = (file$ as ast.File).Decls, __goscriptRangeWindow1 = $.sliceRange(__goscriptRangeTarget1), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow1.length; __rangeIndex++) {
			let decl = (__goscriptRangeWindow1.backing[__goscriptRangeWindow1.offset + __rangeIndex] as ast.Decl | null)
			{
				let __goscriptTuple2: any = $.typeAssertTuple<ast.FuncDecl | $.VarRef<ast.FuncDecl> | null>(decl, /* @__PURE__ */ $.pointerType("ast.FuncDecl"))
				let fn: ast.FuncDecl | $.VarRef<ast.FuncDecl> | null = __goscriptTuple2[0]
				let ok: boolean = __goscriptTuple2[1]
				if (ok) {
					results = $.appendOne(results, "Function: " + $.pointerValue<ast.Ident>($.pointerValue<ast.FuncDecl>(fn).Name).Name)
				}
			}
		}

		// Check package name
		results = $.appendOne(results, "Package: " + $.pointerValue<ast.Ident>((file$ as ast.File).Name).Name)
	}

	// Sort results for deterministic output
	slices.Sort(results)

	// Print results
	for (let __goscriptRangeTarget2 = results, __goscriptRangeWindow2 = $.sliceRange(__goscriptRangeTarget2), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow2.length; __rangeIndex++) {
		let result = (__goscriptRangeWindow2.backing[__goscriptRangeWindow2.offset + __rangeIndex] as string)
		await $.println("Parse result:", result)
	}

	await $.println("go/parser test finished")
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ($.typeSwitchSite([/* @__PURE__ */ $.pointerType("ast.BasicLit"), /* @__PURE__ */ $.pointerType("ast.BinaryExpr"), /* @__PURE__ */ $.pointerType("ast.CallExpr"), /* @__PURE__ */ $.pointerType("ast.CompositeLit")]))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
