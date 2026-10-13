// Generated file based on errlist.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type ErrorList = $.Slice<string>

$.registerNamedValueType(
	"errlist.ErrorList",
	{Add: (receiver: any, ...args: any[]) => (ErrorList_Add as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Add", [["msg", /* @__PURE__ */ $.basicType("string")]], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string"), "errlist.ErrorList")])]
);

$.registerNamedValueType(
	"*errlist.ErrorList",
	{Add: (receiver: any, ...args: any[]) => (ErrorList_Add as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Add", [["msg", /* @__PURE__ */ $.basicType("string")]], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string"), "errlist.ErrorList")])]
);

export function ErrorList_Add(p: ErrorList, msg: string): ErrorList {
	return ($.append((p as ErrorList), msg) as ErrorList)
}
