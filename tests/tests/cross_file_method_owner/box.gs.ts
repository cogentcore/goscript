// Generated file based on box.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as __goscript_cross_file_method_owner from "./cross_file_method_owner.gs.ts"
import "./cross_file_method_owner.gs.ts"

export type box = number

$.registerNamedValueType(
	"main.box",
	{base: (receiver: any, ...args: any[]) => (box_base as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), total: (receiver: any, ...args: any[]) => (__goscript_cross_file_method_owner.box_total as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("base", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("total", [], [/* @__PURE__ */ $.basicType("int")])]
);

$.registerNamedValueType(
	"*main.box",
	{base: (receiver: any, ...args: any[]) => (box_base as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args)), total: (receiver: any, ...args: any[]) => (__goscript_cross_file_method_owner.box_total as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("base", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("total", [], [/* @__PURE__ */ $.basicType("int")])]
);

export function box_base(b: box): number {
	return $.int(b)
}
