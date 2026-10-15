// Generated file based on generic_struct_field_copy.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class Value {
	public declare V: number

	public declare Unit: number

	constructor(init?: Partial<{V?: number, Unit?: number}>, __goscriptValue?: boolean) {
		this.V = init?.V ?? (0 as number)
		this.Unit = init?.Unit ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Value {
		return new Value(this, true)
	}

	public __goscriptAssign(source: Value): this {
		this.V = source.V
		this.Unit = source.Unit
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Value",
		() => new Value(),
		() => [],
		Value,
		() => [{ name: "V", key: "V", type: /* @__PURE__ */ $.basicType("int") }, { name: "Unit", key: "Unit", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class Sides {
	public declare Top: any

	public declare Right: any

	public declare Bottom: any

	public declare Left: any

	constructor(init?: Partial<{Top?: any, Right?: any, Bottom?: any, Left?: any}>, __goscriptValue?: boolean, __goscriptFresh?: boolean) {
		this.Top = init?.Top !== undefined ? (__goscriptFresh === true ? init.Top : $.copyElement(init.Top)) : (null! as any)
		this.Right = init?.Right !== undefined ? (__goscriptFresh === true ? init.Right : $.copyElement(init.Right)) : (null! as any)
		this.Bottom = init?.Bottom !== undefined ? (__goscriptFresh === true ? init.Bottom : $.copyElement(init.Bottom)) : (null! as any)
		this.Left = init?.Left !== undefined ? (__goscriptFresh === true ? init.Left : $.copyElement(init.Left)) : (null! as any)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Sides {
		return new Sides(this, true)
	}

	public __goscriptAssign(source: Sides): this {
		this.Top = $.assignFieldValue(this.Top, source.Top, { kind: $.TypeKind.Interface, methods: [] })
		this.Right = $.assignFieldValue(this.Right, source.Right, { kind: $.TypeKind.Interface, methods: [] })
		this.Bottom = $.assignFieldValue(this.Bottom, source.Bottom, { kind: $.TypeKind.Interface, methods: [] })
		this.Left = $.assignFieldValue(this.Left, source.Left, { kind: $.TypeKind.Interface, methods: [] })
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Sides",
		() => new Sides(),
		() => [],
		Sides,
		() => [{ name: "Top", key: "Top", type: { kind: $.TypeKind.Interface, methods: [] } }, { name: "Right", key: "Right", type: { kind: $.TypeKind.Interface, methods: [] } }, { name: "Bottom", key: "Bottom", type: { kind: $.TypeKind.Interface, methods: [] } }, { name: "Left", key: "Left", type: { kind: $.TypeKind.Interface, methods: [] } }]
	)
}

export class Values {
	public declare Sides: Sides

	constructor(init?: Partial<{Sides?: Sides}>, __goscriptValue?: boolean) {
		this.Sides = init?.Sides ? init.Sides.clone() : $.markAsStructValue(new Sides({Top: new Value(undefined, true), Right: new Value(undefined, true), Bottom: new Value(undefined, true), Left: new Value(undefined, true)}, undefined, true))
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Values {
		return new Values(this, true)
	}

	public __goscriptAssign(source: Values): this {
		this.Sides.__goscriptAssign(source.Sides)
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Values",
		() => new Values(),
		() => [],
		Values,
		() => [{ name: "Sides", key: "Sides", type: "main.Sides", anonymous: true }]
	)
}

export class Pair {
	public declare Key: any

	public declare Val: any

	constructor(init?: Partial<{Key?: any, Val?: any}>, __goscriptValue?: boolean, __goscriptFresh?: boolean) {
		this.Key = init?.Key ?? (null! as any)
		this.Val = init?.Val !== undefined ? (__goscriptFresh === true ? init.Val : $.copyElement(init.Val)) : (null! as any)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Pair {
		return new Pair(this, true)
	}

	public __goscriptAssign(source: Pair): this {
		this.Key = $.assignFieldValue(this.Key, source.Key, { kind: $.TypeKind.Interface, methods: [] })
		this.Val = $.assignFieldValue(this.Val, source.Val, { kind: $.TypeKind.Interface, methods: [] })
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Pair",
		() => new Pair(),
		() => [],
		Pair,
		() => [{ name: "Key", key: "Key", type: { kind: $.TypeKind.Interface, methods: [] } }, { name: "Val", key: "Val", type: { kind: $.TypeKind.Interface, methods: [] } }]
	)
}

export class withClone {
	public declare clone: (() => number | globalThis.Promise<number>) | null

	public declare n: number

	constructor(init?: Partial<{clone?: (() => number | globalThis.Promise<number>) | null, n?: number}>, __goscriptValue?: boolean) {
		this.clone = init?.clone ?? (null! as (() => number | globalThis.Promise<number>) | null)
		this.n = init?.n ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public __goscriptClone(): withClone {
		return new withClone(this, true)
	}

	public __goscriptAssign(source: withClone): this {
		this.clone = source.clone
		this.n = source.n
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.withClone",
		() => new withClone(),
		() => [],
		withClone,
		() => [{ name: "clone", key: "clone", type: ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo) }, { name: "n", key: "n", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function main(): globalThis.Promise<void> {
	// the zero value of an instance holds zero values of its type argument
	let v: Values = new Values(undefined, true)
	v.Sides.Top.V = 1
	let w = (v).clone()
	w.Sides.Top.V = 2
	w.Sides.Right.Unit = 3
	await $.println("zero copy:", v.Sides.Top.V, w.Sides.Top.V, v.Sides.Right.Unit, w.Sides.Right.Unit)

	// each zero value is its own
	let s: Sides = $.markAsStructValue(new Sides({Top: new Value(undefined, true), Right: new Value(undefined, true), Bottom: new Value(undefined, true), Left: new Value(undefined, true)}, undefined, true))
	s.Top.V = 4
	await $.println("own zero:", s.Top.V, s.Right.V, s.Bottom.V, s.Left.V)

	// copies of type argument fields of struct, array, pointer and unnamed
	// struct types
	let arr = $.markAsStructValue(new Sides({Top: $.arrayValue([1, 2]), Right: $.arrayValue(globalThis.Array.from({ length: 2 }, () => 0)), Bottom: $.arrayValue(globalThis.Array.from({ length: 2 }, () => 0)), Left: $.arrayValue(globalThis.Array.from({ length: 2 }, () => 0))}))
	let arr2 = (arr).clone()
	arr2.Top[0] = 9
	await $.println("array:", $.arrayIndex(arr.Top, 0), $.arrayIndex(arr2.Top, 0))
	let p = new Value({V: 5})
	let ptr = $.markAsStructValue(new Sides({Top: p, Right: null! as Value | $.VarRef<Value> | null, Bottom: null! as Value | $.VarRef<Value> | null, Left: null! as Value | $.VarRef<Value> | null}))
	let ptr2 = (ptr).clone()
	$.pointerValue<Value>(ptr2.Top).V = 6
	await $.println("pointer:", $.pointerValue<Value>(p).V, (ptr.Top === ptr2.Top || $.pointerAliasesMade && $.pointerEqual(ptr.Top, ptr2.Top)))
	let anon = $.markAsStructValue(new Sides({Top: $.anonymousStructValue({A: 1, B: 2}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("A", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("B", /* @__PURE__ */ $.basicType("int"), [1], 8, true)] }), Right: $.anonymousStructValue({"A": 0, "B": 0}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("A", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("B", /* @__PURE__ */ $.basicType("int"), [1], 8, true)] }), Bottom: $.anonymousStructValue({"A": 0, "B": 0}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("A", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("B", /* @__PURE__ */ $.basicType("int"), [1], 8, true)] }), Left: $.anonymousStructValue({"A": 0, "B": 0}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("A", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("B", /* @__PURE__ */ $.basicType("int"), [1], 8, true)] })}))
	let anon2 = (anon).clone()
	anon2.Top.A = 7
	await $.println("unnamed:", anon.Top.A, anon2.Top.A)

	// a struct type argument with a field named clone
	let wc = $.markAsStructValue(new Sides({Top: $.markAsStructValue(new withClone({clone: $.functionValue((): number => {
		return 8
	}, ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo)), n: 1})), Right: $.markAsStructValue(new withClone()), Bottom: $.markAsStructValue(new withClone()), Left: $.markAsStructValue(new withClone())}))
	let wc2 = (wc).clone()
	wc2.Top.n = 2
	await $.println("field named clone:", wc.Top.n, wc2.Top.n, (__goscriptAwait = wc2.Top.clone!(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	// nested generic instances
	let pr: Pair = $.markAsStructValue(new Pair({Key: "", Val: $.markAsStructValue(new Sides({Top: new Value(undefined, true), Right: new Value(undefined, true), Bottom: new Value(undefined, true), Left: new Value(undefined, true)}, undefined, true))}, undefined, true))
	pr.Val.Left.V = 10
	let pr2 = (pr).clone()
	pr2.Val.Left.V = 11
	await $.println("nested:", pr.Val.Left.V, pr2.Val.Left.V, pr2.Val.Top.Unit)

	// slices of instances grow with zero values of their own
	let vals: $.Slice<Values> = $.makeSlice<Values>(2, undefined, undefined, () => new Values(undefined, true))
	vals = $.appendOne(vals, new Values(undefined, true))
	$.arrayIndex(vals!, 0).Sides.Top.V = 12
	await $.println("slice:", $.arrayIndex(vals!, 0).Sides.Top.V, $.arrayIndex(vals!, 1).Sides.Top.V, $.arrayIndex(vals!, 2).Sides.Top.V)
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
