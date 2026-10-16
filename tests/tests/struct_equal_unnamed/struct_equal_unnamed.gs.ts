// Generated file based on struct_equal_unnamed.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class Point {
	public declare X: number

	public declare Y: number

	constructor(__goscriptValue?: boolean, X$?: number, Y$?: number) {
		this.X = X$ ?? 0
		this.Y = Y$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Point {
		return new Point(true, this.X, this.Y)
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

	constructor(__goscriptValue?: boolean, Min$?: Point, Max$?: Point, Name$?: string) {
		this.Min = Min$ ?? new Point(true)
		this.Max = Max$ ?? new Point(true)
		this.Name = Name$ ?? ""
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Box {
		return new Box(true, this.Min.clone(), this.Max.clone(), this.Name)
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

	constructor(__goscriptValue?: boolean, A$?: Point, B$?: {"X": number, "Y": number}) {
		this.A = A$ ?? new Point(true)
		this.B = B$ ?? $.anonymousStructValue({"X": 0, "Y": 0}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("X", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("Y", /* @__PURE__ */ $.basicType("int"), [1], 8, true)] })
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Pair {
		return new Pair(true, this.A.clone(), $.markAsStructValue($.cloneStructValue(this.B)))
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
	return ((__goscriptSource) => new Point(true, __goscriptSource.X, __goscriptSource.Y))($.anonymousStructValue({X: 4, Y: 5}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("X", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("Y", /* @__PURE__ */ $.basicType("int"), [1], 8, true)] }))
}

export async function main(): globalThis.Promise<void> {
	let p = new Point(true, 1, 2)

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
	let b = new Box(true, new Point(true, 1, 2), new Point(true, 3, 4), "b")
	await $.println("nested == unnamed:", $.structEqual(b, $.anonymousStructValue({Min: new Point(true, 1, 2), Max: new Point(true, 3, 4), Name: "b"}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("Min", "main.Point", [0], 0, true), /* @__PURE__ */ $.structField("Max", "main.Point", [1], 16, true), /* @__PURE__ */ $.structField("Name", /* @__PURE__ */ $.basicType("string"), [2], 32, true)] })))
	await $.println("nested != unnamed:", $.structEqual(b, $.anonymousStructValue({Min: new Point(true, 1, 2), Max: new Point(true, 3, 5), Name: "b"}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("Min", "main.Point", [0], 0, true), /* @__PURE__ */ $.structField("Max", "main.Point", [1], 16, true), /* @__PURE__ */ $.structField("Name", /* @__PURE__ */ $.basicType("string"), [2], 32, true)] })))

	// a field of unnamed struct type equals a named value of the same
	// underlying type
	let pr = new Pair(true, (p).clone(), $.anonymousStructValue({X: 1, Y: 2}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("X", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("Y", /* @__PURE__ */ $.basicType("int"), [1], 8, true)] }))
	await $.println("unnamed field == named:", $.structEqual(pr.B, p))
	await $.println("named field == unnamed field:", $.structEqual(pr.A, pr.B))
	pr.B.X = 9
	await $.println("changed field:", $.structEqual(pr.A, pr.B))

	// conversions between the named and unnamed type keep the fields
	await $.println("converted:", $.structEqual((() => { const __goscriptConvert0 = pr.B; return new Point(true, __goscriptConvert0.X, __goscriptConvert0.Y) })(), new Point(true, 9, 2)))
	await $.println("converted method:", (() => { const __goscriptConvert1 = pr.B; return new Point(true, __goscriptConvert1.X, __goscriptConvert1.Y) })().Sum())
	await $.println("assigned method:", sum(((__goscriptSource) => new Point(true, __goscriptSource.X, __goscriptSource.Y))(pr.B)))

	// unnamed struct values assigned to named struct variables, fields,
	// elements and results get the methods of the named type
	let q: Point = ((__goscriptSource) => new Point(true, __goscriptSource.X, __goscriptSource.Y))(pr.B)
	await $.println("var method:", q.Sum())
	q = q.__goscriptAssign(((__goscriptSource) => new Point(true, __goscriptSource.X, __goscriptSource.Y))($.anonymousStructValue({X: 2, Y: 3}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("X", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("Y", /* @__PURE__ */ $.basicType("int"), [1], 8, true)] })))
	await $.println("assign method:", q.Sum())
	await $.println("return method:", unnamedPoint().Sum())
	let pr2 = new Pair(true, ((__goscriptSource) => new Point(true, __goscriptSource.X, __goscriptSource.Y))($.anonymousStructValue({X: 5, Y: 6}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("X", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("Y", /* @__PURE__ */ $.basicType("int"), [1], 8, true)] })))
	await $.println("field method:", pr2.A.Sum())
	let ps = $.arrayToSlice<Point>([((__goscriptSource) => new Point(true, __goscriptSource.X, __goscriptSource.Y))($.anonymousStructValue({X: 7, Y: 8}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("X", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("Y", /* @__PURE__ */ $.basicType("int"), [1], 8, true)] }))])
	await $.println("element method:", $.arrayIndex(ps!, 0).Sum())
	let m = $.makeMap<string, Point>([["a", ((__goscriptSource) => new Point(true, __goscriptSource.X, __goscriptSource.Y))($.anonymousStructValue({X: 1, Y: 1}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("X", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("Y", /* @__PURE__ */ $.basicType("int"), [1], 8, true)] }))]])
	await $.println("map method:", $.mapGet<string, Point, Point>(m, "a", new Point(true))[0].Sum())

	// as interface values, the named and unnamed types differ
	let ia: any = $.structInterfaceValue(p, "main.Point", "main.Point")
	let ib: any = $.interfaceValue($.anonymousStructValue({X: 1, Y: 2}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("X", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("Y", /* @__PURE__ */ $.basicType("int"), [1], 8, true)] }), "struct{X int; Y int}", { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("X", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("Y", /* @__PURE__ */ $.basicType("int"), [1], 8, true)] })
	await $.println("interfaces differ:", $.comparableEqual(ia, ib))

	// an unnamed struct key finds the entry of a named key
	let keys = $.makeMap<Point, string>([[new Point(true, 1, 2), "one-two"]])
	await $.println("map key:", $.mapGet<Point, string, string>(keys, ((__goscriptSource) => new Point(true, __goscriptSource.X, __goscriptSource.Y))($.anonymousStructValue({X: 1, Y: 2}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("X", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("Y", /* @__PURE__ */ $.basicType("int"), [1], 8, true)] })), "")[0])
}

if ($.isMainScript(import.meta)) {
	await main()
}
