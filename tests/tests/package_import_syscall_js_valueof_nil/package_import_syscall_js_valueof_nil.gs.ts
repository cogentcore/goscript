// Generated file based on package_import_syscall_js_valueof_nil.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as js from "@goscript/syscall/js/index.js"
import "@goscript/syscall/js/index.js"

export function features(): $.Slice<any> {
	let out: $.Slice<any> = null! as $.Slice<any>
	return out
}

export async function main(): globalThis.Promise<void> {
	// js.ValueOf converts nil []any and map[string]any values to an empty
	// array and an empty object, not to null.
	await $.println("nil slice:", js.Type_String($.markAsStructValue($.cloneStructValue(js.ValueOf($.interfaceValue(null, "[]interface{}", /* @__PURE__ */ $.sliceType({ kind: $.TypeKind.Interface, methods: [] }))))).Type()), $.markAsStructValue($.cloneStructValue(js.ValueOf($.interfaceValue(null, "[]interface{}", /* @__PURE__ */ $.sliceType({ kind: $.TypeKind.Interface, methods: [] }))))).Length())
	await $.println("nil map:", js.Type_String($.markAsStructValue($.cloneStructValue(js.ValueOf($.interfaceValue(null, "map[string]interface{}", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), { kind: $.TypeKind.Interface, methods: [] }))))).Type()))

	let desc: globalThis.Map<string, any> | null = $.makeMap<string, any>([["label", ""], ["requiredFeatures", $.interfaceValue(features(), "[]interface{}", /* @__PURE__ */ $.sliceType({ kind: $.TypeKind.Interface, methods: [] }))], ["limits", $.interfaceValue(null, "map[string]interface{}", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), { kind: $.TypeKind.Interface, methods: [] }))]])
	let v = $.markAsStructValue($.cloneStructValue(js.ValueOf($.interfaceValue(desc, "map[string]interface{}", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), { kind: $.TypeKind.Interface, methods: [] })))))
	await $.println("nested slice:", js.Type_String($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(v)).Get("requiredFeatures"))).Type()), $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(js.Global())).Get("Array"))).Call("isArray", $.interfaceValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(v)).Get("requiredFeatures"))), "js.Value", "js.Value")))).Bool())
	await $.println("nested map:", js.Type_String($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(v)).Get("limits"))).Type()))

	let nothing: any = null! as any
	await $.println("nil interface:", js.Type_String($.markAsStructValue($.cloneStructValue(js.ValueOf(nothing))).Type()))
}

if ($.isMainScript(import.meta)) {
	await main()
}
