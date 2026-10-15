// Generated file based on make_slice_array_elems.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type quad = number[]

$.registerNamedType("main.quad", /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int32"), 4));

export class point {
	public declare X: number

	public declare Y: number

	constructor(init?: Partial<{X?: number, Y?: number}>, __goscriptValue?: boolean) {
		this.X = init?.X ?? (0 as number)
		this.Y = init?.Y ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): point {
		return new point(this, true)
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
	$.arrayIndex(a!, 1)[2] = 5
	await $.println("arrays:", $.arrayIndex($.arrayIndex(a!, 0), 0), $.arrayIndex($.arrayIndex(a!, 1), 2), 4)

	// Arrays of structs and named array types too.
	let b = $.makeSlice<point[]>(2, undefined, undefined, () => $.arrayValue(globalThis.Array.from({ length: 2 }, () => new point(undefined, true)), /* @__PURE__ */ $.arrayType("main.point", 2)))
	$.arrayIndex($.arrayIndex(b!, 1), 1).X = 3
	let q = $.makeSlice<quad>(1, undefined, undefined, () => $.arrayValue(globalThis.Array.from({ length: 4 }, () => 0)))
	$.arrayIndex(q!, 0)[3] = 9
	await $.println("struct arrays:", $.arrayIndex($.arrayIndex(b!, 0), 0).X, $.arrayIndex($.arrayIndex(b!, 1), 1).X, $.arrayIndex($.arrayIndex(q!, 0), 3))

	// Unnamed struct elements are zero structs.
	let u = $.makeSlice<{"A": number, "B": number}>(2, undefined, undefined, () => $.anonymousStructValue({"A": 0, "B": 0}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("A", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("B", /* @__PURE__ */ $.basicType("int"), [1], 8, true)] }))
	$.arrayIndex(u!, 1).B = 4
	await $.println("unnamed structs:", $.arrayIndex(u!, 0).A, $.arrayIndex(u!, 1).B)

	// Spare capacity holds zero arrays as well.
	let c: $.Slice<number[]> = $.makeSlice<number[]>(2, 5, undefined, () => $.arrayValue(globalThis.Array.from({ length: 4 }, () => 0)))
	c = $.goSlice(c, undefined, 4)
	$.arrayIndex(c!, 3)[0] = 7
	await $.println("spare capacity:", $.arrayIndex($.arrayIndex(c!, 2), 1), $.arrayIndex($.arrayIndex(c!, 3), 0))

	// Each element is its own array.
	$.arrayIndex(a!, 0)[0] = 1
	await $.println("distinct:", $.arrayIndex($.arrayIndex(a!, 0), 0), $.arrayIndex($.arrayIndex(a!, 2), 0))

	// Clearing a slice of arrays or structs leaves zero values to write to.
	$.clear(a, () => $.arrayValue(globalThis.Array.from({ length: 4 }, () => 0)))
	$.arrayIndex(a!, 2)[1] = 6
	$.clear($.goSlice(u, 1, undefined), () => $.anonymousStructValue({"A": 0, "B": 0}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("A", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("B", /* @__PURE__ */ $.basicType("int"), [1], 8, true)] }))
	$.arrayIndex(u!, 1).A = 8
	await $.println("cleared:", $.arrayIndex($.arrayIndex(a!, 0), 0), $.arrayIndex($.arrayIndex(a!, 1), 2), $.arrayIndex($.arrayIndex(a!, 2), 1), $.arrayIndex(u!, 1).A, $.arrayIndex(u!, 1).B)
}

if ($.isMainScript(import.meta)) {
	await main()
}
