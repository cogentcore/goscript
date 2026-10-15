// Generated file based on subpkg.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

$.registerTypePackagePath("github.com/s4wave/goscript/tests/tests/type_alias_cross_file/subpkg", ["subpkg.Value"])

export type Value = $.Slice<number>

$.registerNamedType("subpkg.Value", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")));

$.registerNamedValueType(
	"subpkg.Value",
	{Clone: (receiver: any, ...args: any[]) => (Value_Clone as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Clone", [], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"), "subpkg.Value")])]
);

$.registerNamedValueType(
	"*subpkg.Value",
	{Clone: (receiver: any, ...args: any[]) => (Value_Clone as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Clone", [], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"), "subpkg.Value")])]
);

export function Value_Clone(v: Value): Value {
	if (v == null) {
		return (null as Value)
	}
	let p = ($.makeSlice<number>($.sliceLen((v as Value)), undefined, "byte") as Value)
	$.copy((p as Value), (v as Value))
	return (p as Value)
}
