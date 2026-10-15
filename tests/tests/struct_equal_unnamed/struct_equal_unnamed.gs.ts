// Generated file based on struct_equal_unnamed.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class Point {
	public declare X: number

	public declare Y: number

	constructor(init?: Partial<{X?: number, Y?: number}>, __goscriptValue?: boolean) {
		this.X = init?.X ?? (0 as number)
		this.Y = init?.Y ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Point {
		return new Point(this, true)
	}

	public __goscriptAssign(source: Point): this {
		this.X = source.X
		this.Y = source.Y
		return this
	}

	public Sum(): number {
		const p = this;
		return p.X + p.Y
	}

	static __typeInfo = $.registerStructType(
		"main.Point",
		() => new Point(),
		() => [{ name: "Sum", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }],
		Point,
		() => [{ name: "X", key: "X", type: /* @__PURE__ */ $.basicType("int") }, { name: "Y", key: "Y", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class Box {
	public declare Min: Point

	public declare Max: Point

	public declare Name: string

	constructor(init?: Partial<{Min?: Point, Max?: Point, Name?: string}>, __goscriptValue?: boolean) {
		this.Min = init?.Min ? init.Min.clone() : new Point(undefined, true)
		this.Max = init?.Max ? init.Max.clone() : new Point(undefined, true)
		this.Name = init?.Name ?? ("" as string)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Box {
		return new Box(this, true)
	}

	public __goscriptAssign(source: Box): this {
		this.Min.__goscriptAssign(source.Min)
		this.Max.__goscriptAssign(source.Max)
		this.Name = source.Name
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Box",
		() => new Box(),
		() => [],
		Box,
		() => [{ name: "Min", key: "Min", type: "main.Point" }, { name: "Max", key: "Max", type: "main.Point" }, { name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class Pair {
	public declare A: Point

	public declare B: {"X": number, "Y": number}

	constructor(init?: Partial<{A?: Point, B?: {"X": number, "Y": number}}>, __goscriptValue?: boolean) {
		this.A = init?.A ? init.A.clone() : new Point(undefined, true)
		this.B = init?.B ? $.markAsStructValue($.cloneStructValue(init.B)) : $.anonymousStructValue({"X": 0, "Y": 0}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("X", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("Y", /* @__PURE__ */ $.basicType("int"), [1], 8, true)] })
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Pair {
		return new Pair(this, true)
	}

	public __goscriptAssign(source: Pair): this {
		this.A.__goscriptAssign(source.A)
		$.assignStruct(this.B, source.B)
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Pair",
		() => new Pair(),
		() => [],
		Pair,
		() => [{ name: "A", key: "A", type: "main.Point" }, { name: "B", key: "B", type: { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("X", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("Y", /* @__PURE__ */ $.basicType("int"), [1], 8, true)] } }]
	)
}

export function sum(p: Point): number {
	return p.Sum()
}

export function unnamedPoint(): Point {
	return new Point($.anonymousStructValue({X: 4, Y: 5}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("X", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("Y", /* @__PURE__ */ $.basicType("int"), [1], 8, true)] }), true)
}

export async function main(): globalThis.Promise<void> {
	let p = new Point({X: 1, Y: 2}, true)

	// a named struct value equals an unnamed struct literal of the same
	// underlying type, in both operand orders
	await $.println("named == unnamed:", $.structEqual(p, $.anonymousStructValue({X: 1, Y: 2}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("X", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("Y", /* @__PURE__ */ $.basicType("int"), [1], 8, true)] })))
	await $.println("unnamed == named:", $.structEqual($.anonymousStructValue({X: 1, Y: 2}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("X", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("Y", /* @__PURE__ */ $.basicType("int"), [1], 8, true)] }), p))
	await $.println("named != unnamed:", !$.structEqual(p, $.anonymousStructValue({X: 1, Y: 3}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("X", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("Y", /* @__PURE__ */ $.basicType("int"), [1], 8, true)] })))

	// an unnamed struct variable assigned from a named value compares equal
	let u: {"X": number, "Y": number} = $.markAsStructValue($.cloneStructValue(p))
	await $.println("unnamed var == named:", $.structEqual(u, p))
	u.Y = 5
	await $.println("changed unnamed var == named:", $.structEqual(u, p))

	// nested struct fields compare by fields, also when one side is unnamed
	let b = new Box({Min: new Point({X: 1, Y: 2}, true), Max: new Point({X: 3, Y: 4}, true), Name: "b"}, true)
	await $.println("nested == unnamed:", $.structEqual(b, $.anonymousStructValue({Min: new Point({X: 1, Y: 2}, true), Max: new Point({X: 3, Y: 4}, true), Name: "b"}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("Min", "main.Point", [0], 0, true), /* @__PURE__ */ $.structField("Max", "main.Point", [1], 16, true), /* @__PURE__ */ $.structField("Name", /* @__PURE__ */ $.basicType("string"), [2], 32, true)] })))
	await $.println("nested != unnamed:", $.structEqual(b, $.anonymousStructValue({Min: new Point({X: 1, Y: 2}, true), Max: new Point({X: 3, Y: 5}, true), Name: "b"}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("Min", "main.Point", [0], 0, true), /* @__PURE__ */ $.structField("Max", "main.Point", [1], 16, true), /* @__PURE__ */ $.structField("Name", /* @__PURE__ */ $.basicType("string"), [2], 32, true)] })))

	// a field of unnamed struct type equals a named value of the same
	// underlying type
	let pr = new Pair({A: p, B: $.anonymousStructValue({X: 1, Y: 2}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("X", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("Y", /* @__PURE__ */ $.basicType("int"), [1], 8, true)] })}, true)
	await $.println("unnamed field == named:", $.structEqual(pr.B, p))
	await $.println("named field == unnamed field:", $.structEqual(pr.A, pr.B))
	pr.B.X = 9
	await $.println("changed field:", $.structEqual(pr.A, pr.B))

	// conversions between the named and unnamed type keep the fields
	await $.println("converted:", $.structEqual((() => { const __goscriptConvert0 = pr.B; return $.markAsStructValue(new Point({X: __goscriptConvert0.X, Y: __goscriptConvert0.Y})) })(), new Point({X: 9, Y: 2}, true)))
	await $.println("converted method:", (() => { const __goscriptConvert1 = pr.B; return $.markAsStructValue(new Point({X: __goscriptConvert1.X, Y: __goscriptConvert1.Y})) })().Sum())
	await $.println("assigned method:", sum(new Point(pr.B, true)))

	// unnamed struct values assigned to named struct variables, fields,
	// elements and results get the methods of the named type
	let q: Point = new Point(pr.B, true)
	await $.println("var method:", q.Sum())
	q = q.__goscriptAssign(new Point($.anonymousStructValue({X: 2, Y: 3}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("X", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("Y", /* @__PURE__ */ $.basicType("int"), [1], 8, true)] }), true))
	await $.println("assign method:", q.Sum())
	await $.println("return method:", unnamedPoint().Sum())
	let pr2 = new Pair({A: new Point($.anonymousStructValue({X: 5, Y: 6}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("X", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("Y", /* @__PURE__ */ $.basicType("int"), [1], 8, true)] }), true)}, true)
	await $.println("field method:", pr2.A.Sum())
	let ps = $.arrayToSlice<Point>([new Point($.anonymousStructValue({X: 7, Y: 8}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("X", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("Y", /* @__PURE__ */ $.basicType("int"), [1], 8, true)] }), true)])
	await $.println("element method:", $.arrayIndex(ps!, 0).Sum())
	let m = $.makeMap<string, Point>([["a", new Point($.anonymousStructValue({X: 1, Y: 1}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("X", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("Y", /* @__PURE__ */ $.basicType("int"), [1], 8, true)] }), true)]])
	await $.println("map method:", $.mapGet<string, Point, Point>(m, "a", new Point(undefined, true))[0].Sum())

	// as interface values, the named and unnamed types differ
	let ia: any = $.interfaceValue((p).clone(), "main.Point", "main.Point")
	let ib: any = $.interfaceValue($.anonymousStructValue({X: 1, Y: 2}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("X", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("Y", /* @__PURE__ */ $.basicType("int"), [1], 8, true)] }), "struct{X int; Y int}", { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("X", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("Y", /* @__PURE__ */ $.basicType("int"), [1], 8, true)] })
	await $.println("interfaces differ:", $.comparableEqual(ia, ib))

	// an unnamed struct key finds the entry of a named key
	let keys = $.makeMap<Point, string>([[new Point({X: 1, Y: 2}, true), "one-two"]])
	await $.println("map key:", $.mapGet<Point, string, string>(keys, new Point($.anonymousStructValue({X: 1, Y: 2}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("X", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("Y", /* @__PURE__ */ $.basicType("int"), [1], 8, true)] }), true), "")[0])
}

if ($.isMainScript(import.meta)) {
	await main()
}
