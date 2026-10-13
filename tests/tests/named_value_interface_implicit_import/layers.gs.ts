// Generated file based on layers.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type layers = $.Slice<number>

$.registerNamedValueType(
	"main.layers",
	{Error: (receiver: any, ...args: any[]) => (layers_Error as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Error", [], [/* @__PURE__ */ $.basicType("string")])]
);

$.registerNamedValueType(
	"*main.layers",
	{Error: (receiver: any, ...args: any[]) => (layers_Error as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Error", [], [/* @__PURE__ */ $.basicType("string")])]
);

export function layers_Error(l: layers): string {
	return "layers"
}
