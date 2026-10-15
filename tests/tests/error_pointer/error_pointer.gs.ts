// Generated file based on error_pointer.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type customErr = string

$.registerNamedValueType(
	"main.customErr",
	{Error: (receiver: any) => (customErr_Error as any)(($.isVarRef(receiver) ? receiver.value : receiver))},
	[$.methodSignature("Error", [], [/* @__PURE__ */ $.basicType("string")])]
);

$.registerNamedValueType(
	"*main.customErr",
	{Error: (receiver: any) => (customErr_Error as any)($.pointerValue(receiver))},
	[$.methodSignature("Error", [], [/* @__PURE__ */ $.basicType("string")])]
);

export function customErr_Error(e: customErr): string {
	return e
}

export function setErr(err: $.VarRef<$.GoError> | null): void {
	err!.value = $.namedValueInterfaceValue<$.GoError>("pointer error", "main.customErr", {"Error": customErr_Error}, /* @__PURE__ */ $.basicType("string", "main.customErr"))
}

export async function main(): globalThis.Promise<void> {
	let err: $.VarRef<$.GoError> = $.varRef(null! as $.GoError)
	setErr(err)
	if (err.value != null) {
		await $.println((__goscriptAwait = $.pointerValue<Exclude<$.GoError, null>>(err.value).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	}
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
