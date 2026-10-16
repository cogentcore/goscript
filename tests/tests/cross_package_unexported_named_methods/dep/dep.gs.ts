// Generated file based on dep.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

$.registerTypePackagePath("github.com/s4wave/goscript/tests/tests/cross_package_unexported_named_methods/dep", ["dep.list", "dep.adder"])

export type list = $.Slice<number>

$.registerNamedType("dep.list", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")));

$.registerNamedValueType(
	"*dep.list",
	{Len: (receiver: any) => (list_Len as any)(receiver), add: (receiver: any, ...args: any[]) => (list_add as any)(receiver, ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Len", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("add", [["v", /* @__PURE__ */ $.basicType("int")]])]
);

export type adder = {
	Len(): number
	add(v: number): void
}

$.registerInterfaceType(
	"dep.adder",
	null,
	[{ name: "Len", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }, { name: "add", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [] }]
);

export function list_add(l: $.VarRef<list> | null, v: number): void {
	l!.value = ($.appendOne(($.pointerValue<list>(l) as list), v) as list)
}

export function list_Len(l: $.VarRef<list> | null): number {
	return $.sliceLen(($.pointerValue<list>(l) as list))
}

export let All: $.VarRef<list> = $.varRef(null! as list)

export function __goscript_set_All(__goscriptValue: list): void {
	All.value = __goscriptValue
}

export function Add(v: any, n: number): number {
	let a = $.mustTypeAssert<adder | null>(v, "dep.adder")
	void (a !== null && (a as any).__isVarRef !== true && ((a as any).__goValue === undefined || (a as any).__goType?.charCodeAt(0) !== 42) ? (a as Exclude<adder, null>) : $.pointerValue<Exclude<adder, null>>(a)).add(n)
	return (a !== null && (a as any).__isVarRef !== true && ((a as any).__goValue === undefined || (a as any).__goType?.charCodeAt(0) !== 42) ? (a as Exclude<adder, null>) : $.pointerValue<Exclude<adder, null>>(a)).Len()
}
