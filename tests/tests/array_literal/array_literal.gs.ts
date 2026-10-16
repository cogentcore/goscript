// Generated file based on array_literal.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export async function main(): globalThis.Promise<void> {
	// Test basic array literal
	let a: number[] = $.arrayValue([1, 2, 3])
	await $.println(a[0], a[1], a[2])

	// Test array literal with inferred length
	let b = $.arrayValue(["hello", "world"])
	await $.println(b[0], b[1])

	// Test array literal with specific element initialization
	let c = $.arrayValue([0, 10, 0, 30, 0])
	await $.println(c[0], c[1], c[2], c[3], c[4])

	// Test empty byte array literal
	let d = $.arrayValue(new Uint8Array(4))
	await $.println(4, d[0], d[3])

	// Empty struct-array elements and repeated literals retain independent values.
	let e = $.arrayValue(globalThis.Array.from({ length: 4096 }, () => $.anonymousStructValue({"value": 0}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("value", /* @__PURE__ */ $.basicType("int"), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/array_literal" })] })), /* @__PURE__ */ $.arrayType({ kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("value", /* @__PURE__ */ $.basicType("int"), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/array_literal" })] }, 4096))
	let f = $.arrayValue(globalThis.Array.from({ length: 4096 }, () => $.anonymousStructValue({"value": 0}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("value", /* @__PURE__ */ $.basicType("int"), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/array_literal" })] })), /* @__PURE__ */ $.arrayType({ kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("value", /* @__PURE__ */ $.basicType("int"), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/array_literal" })] }, 4096))
	e[0].value = 7
	e[4095].value = 9
	await $.println(4096, e[0].value, e[1].value, e[4095].value, f[0].value)

	// Nested arrays allocate separate inner arrays for each element.
	let g = $.arrayValue(globalThis.Array.from({ length: 2 }, () => $.arrayValue(globalThis.Array.from({ length: 3 }, () => 0))), /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int"), 3), 2))
	g[0][1] = 11
	await $.println((g[0])[1], (g[1])[1])
}

if ($.isMainScript(import.meta)) {
	await main()
}
