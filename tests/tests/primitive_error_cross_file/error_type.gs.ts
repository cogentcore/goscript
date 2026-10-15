// Generated file based on error_type.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type remoteError = number

$.registerNamedValueType(
	"main.remoteError",
	{Error: (receiver: any) => (remoteError_Error as any)(($.isVarRef(receiver) ? receiver.value : receiver))},
	[$.methodSignature("Error", [], [/* @__PURE__ */ $.basicType("string")])]
);

$.registerNamedValueType(
	"*main.remoteError",
	{Error: (receiver: any) => (remoteError_Error as any)($.pointerValue(receiver))},
	[$.methodSignature("Error", [], [/* @__PURE__ */ $.basicType("string")])]
);

export function remoteError_Error(e: remoteError): string {
	return "remote error"
}
