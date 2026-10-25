// Generated file based on pointer_composite_literal_untyped.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export async function main(): globalThis.Promise<void> {
	// The address of an anonymous struct literal points at a copy.
	let ptr: $.VarRef<{"x": number}> | null = null! as $.VarRef<{"x": number}> | null
	ptr = $.varRef($.anonymousStructValue({x: 42}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("x", /* @__PURE__ */ $.basicType("int"), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/pointer_composite_literal_untyped" })] }))
	await $.println("Pointer value x:", $.pointerValue<{"x": number}>(ptr).x)

	// An elided element of pointer type takes the address of its literal.
	let data = $.arrayToSlice<$.VarRef<{"x": number}> | null>([$.varRef($.anonymousStructValue({x: 42}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("x", /* @__PURE__ */ $.basicType("int"), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/pointer_composite_literal_untyped" })] })), $.varRef($.anonymousStructValue({x: 43}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("x", /* @__PURE__ */ $.basicType("int"), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/pointer_composite_literal_untyped" })] }))])
	$.pointerValue<{"x": number}>($.plainSliceIndex(data!, 1)).x++
	await $.println("First element x:", $.pointerValue<{"x": number}>($.plainSliceIndex(data!, 0)).x)
	await $.println("Second element x:", $.pointerValue<{"x": number}>($.plainSliceIndex(data!, 1)).x)

	// The elided literal may be an array or a map too.
	let pairs = $.arrayToSlice<$.VarRef<number[]> | null>([$.varRef($.arrayValue([1, 2]))])
	$.pointerValue<number[]>($.plainSliceIndex(pairs!, 0))[1] = 5
	await $.println("Pair:", $.arrayIndex($.pointerValue<number[]>($.plainSliceIndex(pairs!, 0)), 0), $.arrayIndex($.pointerValue<number[]>($.plainSliceIndex(pairs!, 0)), 1))
	let names = $.arrayToSlice<$.VarRef<globalThis.Map<string, number> | null> | null>([$.varRef($.makeMap<string, number>([["a", 1]]))])
	$.mapSet(($.pointerValue<globalThis.Map<string, number> | null>($.plainSliceIndex(names!, 0))), "b", 2)
	await $.println("Names:", $.len($.pointerValue<globalThis.Map<string, number> | null>($.plainSliceIndex(names!, 0))))
}

if ($.isMainScript(import.meta)) {
	await main()
}
