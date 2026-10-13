// Generated file based on interface_compare_named_basic_value.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type FormatError = string

export type Code = number

export const errConst: FormatError = "const"

export function FormatError_Error(e: FormatError): string {
	return "format: " + e
}

export function Code_Error(c: Code): string {
	return "code"
}

export let errMissing: FormatError = "missing"

export function __goscript_set_errMissing(__goscriptValue: FormatError): void {
	errMissing = __goscriptValue
}

export function _get(i: number): $.GoError {
	switch (i) {
		case 0:
		{
			return $.namedValueInterfaceValue<$.GoError>(errMissing, "main.FormatError", {"Error": FormatError_Error}, /* @__PURE__ */ $.basicType("string", "main.FormatError"))
			break
		}
		case 1:
		{
			return $.namedValueInterfaceValue<$.GoError>("const", "main.FormatError", {"Error": FormatError_Error}, /* @__PURE__ */ $.basicType("string", "main.FormatError"))
			break
		}
		case 2:
		{
			return $.namedValueInterfaceValue<$.GoError>(3, "main.Code", {"Error": Code_Error}, /* @__PURE__ */ $.basicType("int", "main.Code"))
			break
		}
	}
	return null
}

export async function main(): globalThis.Promise<void> {
	let err = _get(0)
	await $.println("var eq:", $.comparableEqual(err, $.namedValueInterfaceValue<$.GoError>(errMissing, "main.FormatError", {"Error": FormatError_Error}, /* @__PURE__ */ $.basicType("string", "main.FormatError"))), !$.comparableEqual(err, $.namedValueInterfaceValue<$.GoError>(errMissing, "main.FormatError", {"Error": FormatError_Error}, /* @__PURE__ */ $.basicType("string", "main.FormatError"))), $.comparableEqual($.namedValueInterfaceValue<$.GoError>(errMissing, "main.FormatError", {"Error": FormatError_Error}, /* @__PURE__ */ $.basicType("string", "main.FormatError")), err))
	await $.println("const eq:", $.comparableEqual(_get(1), $.namedValueInterfaceValue<$.GoError>("const", "main.FormatError", {"Error": FormatError_Error}, /* @__PURE__ */ $.basicType("string", "main.FormatError"))), !$.comparableEqual(_get(1), $.namedValueInterfaceValue<$.GoError>("const", "main.FormatError", {"Error": FormatError_Error}, /* @__PURE__ */ $.basicType("string", "main.FormatError"))))
	await $.println("other:", $.comparableEqual(_get(1), $.namedValueInterfaceValue<$.GoError>(errMissing, "main.FormatError", {"Error": FormatError_Error}, /* @__PURE__ */ $.basicType("string", "main.FormatError"))), $.comparableEqual(_get(2), $.namedValueInterfaceValue<$.GoError>(3, "main.Code", {"Error": Code_Error}, /* @__PURE__ */ $.basicType("int", "main.Code"))), $.comparableEqual(_get(2), $.namedValueInterfaceValue<$.GoError>(4, "main.Code", {"Error": Code_Error}, /* @__PURE__ */ $.basicType("int", "main.Code"))))
	let e2: $.GoError = $.namedValueInterfaceValue<$.GoError>("missing", "main.FormatError", {"Error": FormatError_Error}, /* @__PURE__ */ $.basicType("string", "main.FormatError"))
	await $.println("boxed eq:", $.comparableEqual(err, e2))
	let a: any = $.namedValueInterfaceValue<any>(errMissing, "main.FormatError", {Error: (receiver: any, ...args: any[]) => (FormatError_Error as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))}, /* @__PURE__ */ $.basicType("string", "main.FormatError"), [$.methodSignature("Error", [], [/* @__PURE__ */ $.basicType("string")])])
	await $.println("any eq:", $.comparableEqual(a, $.namedValueInterfaceValue<any>(errMissing, "main.FormatError", {Error: (receiver: any, ...args: any[]) => (FormatError_Error as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))}, /* @__PURE__ */ $.basicType("string", "main.FormatError"), [$.methodSignature("Error", [], [/* @__PURE__ */ $.basicType("string")])])), $.comparableEqual(a, "missing"))
}

if ($.isMainScript(import.meta)) {
	await main()
}
