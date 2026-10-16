// Generated file based on cross_package_unexported_named_methods.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as dep from "@goscript/github.com/s4wave/goscript/tests/tests/cross_package_unexported_named_methods/dep/index.js"

export async function main(): globalThis.Promise<void> {
	// The method table of the boxed pointer includes the unexported methods
	// of dep's type, so dep can assert it to its own interface.
	let v: any = $.namedValueInterfaceValue<any>(dep.All, "*dep.list", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2())
	await $.println(dep.Add(v, 3))
	await $.println(dep.Add(v, 4))
	await $.println(dep.list_Len(dep.All))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({Len: (receiver: any) => (dep.list_Len as any)(receiver), add: (receiver: any, ...args: any[]) => (dep.list_add as any)(receiver, ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= (/* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"), "dep.list")))
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ([$.methodSignature("Len", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("add", [["v", /* @__PURE__ */ $.basicType("int")]])])
}

if ($.isMainScript(import.meta)) {
	await main()
}
