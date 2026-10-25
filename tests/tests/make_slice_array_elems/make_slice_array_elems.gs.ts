// Generated file based on make_slice_array_elems.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type quad = number[]

$.registerNamedType("main.quad", /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int32"), 4));

export class point {
	public declare X: number

	public declare Y: number

	constructor(__goscriptValue?: boolean, X$?: number, Y$?: number) {
		this.X = X$ ?? 0
		this.Y = Y$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): point {
		return new point(true, this.X, this.Y)
	}

	public __goscriptAssign(source: point): this {
		this.X = source.X
		this.Y = source.Y
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.point",
		() => new point(),
		() => [],
		point,
		() => [{ name: "X", key: "X", type: /* @__PURE__ */ $.basicType("int") }, { name: "Y", key: "Y", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function main(): globalThis.Promise<void> {
	// Elements of a made slice of arrays are zero arrays that can be written.
	let a = $.makeSlice<number[]>(3, undefined, undefined, () => $.arrayValue(globalThis.Array.from({ length: 4 }, () => 0)))
	$.plainSliceIndex(a!, 1)[2] = 5
	await $.println("arrays:", ($.plainSliceIndex(a!, 0))[0], ($.plainSliceIndex(a!, 1))[2], 4)

	// Arrays of structs and named array types too.
	let b = $.makeSlice<point[]>(2, undefined, undefined, () => $.arrayValue(globalThis.Array.from({ length: 2 }, () => new point(true)), /* @__PURE__ */ $.arrayType("main.point", 2)));
	;($.plainSliceIndex(b!, 1))[1].X = 3
	let q = $.makeSlice<quad>(1, undefined, undefined, () => $.arrayValue(globalThis.Array.from({ length: 4 }, () => 0)))
	$.plainSliceIndex(q!, 0)[3] = 9
	await $.println("struct arrays:", ($.plainSliceIndex(b!, 0))[0].X, ($.plainSliceIndex(b!, 1))[1].X, ($.plainSliceIndex(q!, 0))[3])

	// Unnamed struct elements are zero structs.
	let u = $.makeSlice<{"A": number, "B": number}>(2, undefined, undefined, () => $.anonymousStructValue({"A": 0, "B": 0}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("A", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("B", /* @__PURE__ */ $.basicType("int"), [1], 8, true)] }))
	$.plainSliceIndex(u!, 1).B = 4
	await $.println("unnamed structs:", $.plainSliceIndex(u!, 0).A, $.plainSliceIndex(u!, 1).B)

	// Spare capacity holds zero arrays as well.
	let c: $.Slice<number[]> = $.makeSlice<number[]>(2, 5, undefined, () => $.arrayValue(globalThis.Array.from({ length: 4 }, () => 0)))
	c = $.goSlice(c, undefined, 4)
	$.plainSliceIndex(c!, 3)[0] = 7
	await $.println("spare capacity:", ($.plainSliceIndex(c!, 2))[1], ($.plainSliceIndex(c!, 3))[0])

	// Each element is its own array.
	$.plainSliceIndex(a!, 0)[0] = 1
	await $.println("distinct:", ($.plainSliceIndex(a!, 0))[0], ($.plainSliceIndex(a!, 2))[0])

	// Clearing a slice of arrays or structs leaves zero values to write to.
	$.clear(a, () => $.arrayValue(globalThis.Array.from({ length: 4 }, () => 0)))
	$.plainSliceIndex(a!, 2)[1] = 6
	$.clear($.goSlice(u, 1, undefined), () => $.anonymousStructValue({"A": 0, "B": 0}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("A", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("B", /* @__PURE__ */ $.basicType("int"), [1], 8, true)] }))
	$.plainSliceIndex(u!, 1).A = 8
	await $.println("cleared:", ($.plainSliceIndex(a!, 0))[0], ($.plainSliceIndex(a!, 1))[2], ($.plainSliceIndex(a!, 2))[1], $.plainSliceIndex(u!, 1).A, $.plainSliceIndex(u!, 1).B)
}

if ($.isMainScript(import.meta)) {
	await main()
}
