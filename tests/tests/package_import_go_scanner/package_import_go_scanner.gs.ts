// Generated file based on package_import_go_scanner.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as fmt from "@goscript/fmt/index.js"
import * as scanner from "@goscript/go/scanner/index.js"
import * as token from "@goscript/go/token/index.js"

export async function main(): globalThis.Promise<void> {
	// Use scanner package functionality that should generate imports
	let errorList: $.VarRef<scanner.ErrorList> = $.varRef(null! as scanner.ErrorList)

	// This should require importing both scanner and token packages
	let pos = $.markAsStructValue(new token.Position({Filename: "test.go", Line: 1, Column: 1}))
	scanner.ErrorList_Add(errorList, pos, "test error")

	fmt.Printf("ErrorList length: %d\n", $.basicInterfaceValue($.sliceLen((errorList.value as scanner.ErrorList)), "int"))

	// End reports the position after the last scanned token.
	let fset = token.NewFileSet()
	let file: token.File | $.VarRef<token.File> | null = token.FileSet.prototype.AddFile.call($.pointerValue<token.FileSet>(fset), "empty.go", -1, 0)
	let s: $.VarRef<scanner.Scanner> = $.varRef(new scanner.Scanner(true))
	s.value.Init(file, null, (null as scanner.ErrorHandler | null), 0)
	fmt.Println("End before Scan:", s.value.End() == 0)
	let [, tok, ] = s.value.Scan()
	fmt.Println("Scan:", token.Token_String(tok), s.value.End() == token.File.prototype.Pos.call($.pointerValue<token.File>(file), 0))

	// Scan reads each token of a statement.
	let src = new Uint8Array([120, 32, 58, 61, 32, 52, 50, 32, 47, 47, 32, 97, 110, 115, 119, 101, 114])
	file = token.FileSet.prototype.AddFile.call($.pointerValue<token.FileSet>(fset), "stmt.go", -1, $.sliceLen(src))
	s.value.Init(file, src, (null as scanner.ErrorHandler | null), 1)
	while (true) {
		let [__goscriptShadow0, __goscriptShadow1, lit] = s.value.Scan()
		if (__goscriptShadow1 == 1) {
			break
		}
		fmt.Printf("%s %s %q\n", $.interfaceValue($.markAsStructValue($.cloneStructValue(token.FileSet.prototype.Position.call($.pointerValue<token.FileSet>(fset), __goscriptShadow0))), "token.Position", "token.Position"), $.namedValueInterfaceValue<any>(__goscriptShadow1, "token.Token", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()), lit)
	}
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({IsKeyword: (receiver: any) => (token.Token_IsKeyword as any)(($.isVarRef(receiver) ? receiver.value : receiver)), IsLiteral: (receiver: any) => (token.Token_IsLiteral as any)(($.isVarRef(receiver) ? receiver.value : receiver)), IsOperator: (receiver: any) => (token.Token_IsOperator as any)(($.isVarRef(receiver) ? receiver.value : receiver)), Precedence: (receiver: any) => (token.Token_Precedence as any)(($.isVarRef(receiver) ? receiver.value : receiver)), String: (receiver: any) => (token.Token_String as any)(($.isVarRef(receiver) ? receiver.value : receiver))})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= (/* @__PURE__ */ $.basicType("int", "token.Token"))
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ([$.methodSignature("IsKeyword", [], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("IsLiteral", [], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("IsOperator", [], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Precedence", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])])
}

if ($.isMainScript(import.meta)) {
	await main()
}
