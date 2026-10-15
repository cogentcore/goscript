// Generated file based on layers.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type layers = $.Slice<number>

$.registerNamedType("main.layers", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")));

$.registerNamedValueType(
	"main.layers",
	{Error: (receiver: any) => (layers_Error as any)(($.isVarRef(receiver) ? receiver.value : receiver))},
	[$.methodSignature("Error", [], [/* @__PURE__ */ $.basicType("string")])]
);

$.registerNamedValueType(
	"*main.layers",
	{Error: (receiver: any) => (layers_Error as any)($.pointerValue(receiver))},
	[$.methodSignature("Error", [], [/* @__PURE__ */ $.basicType("string")])]
);

export function layers_Error(l: layers): string {
	return "layers"
}
