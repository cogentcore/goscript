// Generated file based on errlist.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

$.registerTypePackagePath("github.com/s4wave/goscript/tests/tests/import_type_methods/errlist", ["errlist.ErrorList"])

export type ErrorList = $.Slice<string>

$.registerNamedType("errlist.ErrorList", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string")));

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
	return ($.appendOne((p as ErrorList), msg) as ErrorList)
}
