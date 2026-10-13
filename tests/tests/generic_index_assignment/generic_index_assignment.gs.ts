// Generated file based on generic_index_assignment.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export function modifyGenericSlice(__typeArgs: $.GenericTypeArgs | undefined, s: any, i: number, v: any): void {
	// This line causes the issue: s[i] = v
	// For generic slice types, the compiler should generate proper assignment
	// But currently it may generate: $.indexStringOrBytes(s, i) = v
	// which is invalid TypeScript syntax
	s![i] = $.copyElement(v)
}

export async function main(): globalThis.Promise<void> {
	let slice: $.Slice<number> = $.arrayToSlice<number>([1, 2, 3])
	modifyGenericSlice(__goscriptStatic0(), slice, 1, 42)

	await $.println("slice[0]:", $.arrayIndex(slice!, 0))
	await $.println("slice[1]:", $.arrayIndex(slice!, 1))
	await $.println("slice[2]:", $.arrayIndex(slice!, 2))
	await $.println("test finished")
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, S: { type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")), zero: () => null }, E: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }})
}

if ($.isMainScript(import.meta)) {
	await main()
}
