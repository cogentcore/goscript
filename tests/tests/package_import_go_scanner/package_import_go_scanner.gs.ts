// Generated file based on package_import_go_scanner.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as fmt from "@goscript/fmt/index.js"

import * as scanner from "@goscript/go/scanner/index.js"

import * as token from "@goscript/go/token/index.js"
import "@goscript/fmt/index.js"
import "@goscript/go/scanner/index.js"
import "@goscript/go/token/index.js"

export async function main(): globalThis.Promise<void> {
	// Use scanner package functionality that should generate imports
	let errorList: $.VarRef<scanner.ErrorList> = $.varRef(null! as scanner.ErrorList)

	// This should require importing both scanner and token packages
	let pos = $.markAsStructValue(new token.Position({Filename: "test.go", Line: 1, Column: 1}))
	scanner.ErrorList_Add(errorList, $.markAsStructValue($.cloneStructValue(pos)), "test error")

	await fmt.Printf("ErrorList length: %d\n", $.basicInterfaceValue($.sliceLen((errorList.value as scanner.ErrorList)), "int"))

	// End reports the position after the last scanned token.
	let fset = token.NewFileSet()
	let file = token.FileSet.prototype.AddFile.call($.pointerValue<token.FileSet>(fset), "empty.go", -1, 0)
	let s: $.VarRef<scanner.Scanner> = $.varRef($.markAsStructValue(new scanner.Scanner()))
	s.value.Init(file, null, (null as scanner.ErrorHandler | null), 0)
	await fmt.Println("End before Scan:", s.value.End() == 0)
	let [, tok, ] = s.value.Scan()
	await fmt.Println("Scan:", token.Token_String(tok), s.value.End() == token.File.prototype.Pos.call($.pointerValue<token.File>(file), 0))
}

if ($.isMainScript(import.meta)) {
	await main()
}
