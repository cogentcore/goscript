// Generated file based on generic_struct_value_copy.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class Value {
	public declare V: number

	public declare U: number

	public _fields: {
		V: number
		U: number
	}

	constructor(init?: Partial<{V?: number, U?: number}>) {
		this._fields = {
			V: init?.V ?? (0 as number),
			U: init?.U ?? (0 as number)
		}
	}

	public clone(): Value {
		return $.markAsStructValue(new Value(this))
	}

	public Set(x: number): void {
		let v: Value | $.VarRef<Value> | null = this;
		$.pointerValue<Value>(v).V = x
	}

	static {
		$.bindStructFields(this.prototype, ["V", "U"])
	}

	static __typeInfo = $.registerStructType(
		"main.Value",
		() => new Value(),
		() => [{ name: "Set", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [] }],
		Value,
		() => [{ name: "V", key: "V", type: /* @__PURE__ */ $.basicType("float32") }, { name: "U", key: "U", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class Sides {
	public declare Top: any

	public declare Right: any

	public declare Bottom: any

	public declare Left: any

	public _fields: {
		Top: any
		Right: any
		Bottom: any
		Left: any
	}

	constructor(init?: Partial<{Top?: any, Right?: any, Bottom?: any, Left?: any}>) {
		this._fields = {
			Top: init?.Top !== undefined ? $.copyElement(init.Top) : (null! as any),
			Right: init?.Right !== undefined ? $.copyElement(init.Right) : (null! as any),
			Bottom: init?.Bottom !== undefined ? $.copyElement(init.Bottom) : (null! as any),
			Left: init?.Left !== undefined ? $.copyElement(init.Left) : (null! as any)
		}
	}

	public clone(): Sides {
		return $.markAsStructValue(new Sides(this))
	}

	public SetAll(__typeArgs: $.GenericTypeArgs | undefined, val: any): void {
		let s: Sides | $.VarRef<Sides> | null = this;
		$.pointerValue<Sides>(s).Top = $.copyElement(val)
		$.pointerValue<Sides>(s).Right = $.copyElement(val)
		$.pointerValue<Sides>(s).Bottom = $.copyElement(val)
		$.pointerValue<Sides>(s).Left = $.copyElement(val)
	}

	public SetHorizontal(__typeArgs: $.GenericTypeArgs | undefined, val: any): void {
		let s: Sides | $.VarRef<Sides> | null = this;
		$.pointerValue<Sides>(s).Right = $.copyElement(val)
		$.pointerValue<Sides>(s).Left = $.copyElement(val)
	}

	static {
		$.bindStructFields(this.prototype, ["Top", "Right", "Bottom", "Left"])
	}

	static __typeInfo = $.registerStructType(
		"main.Sides",
		() => new Sides(),
		() => [{ name: "SetAll", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [] }, { name: "SetHorizontal", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [] }],
		Sides,
		() => [{ name: "Top", key: "Top", type: { kind: $.TypeKind.Interface, methods: [] } }, { name: "Right", key: "Right", type: { kind: $.TypeKind.Interface, methods: [] } }, { name: "Bottom", key: "Bottom", type: { kind: $.TypeKind.Interface, methods: [] } }, { name: "Left", key: "Left", type: { kind: $.TypeKind.Interface, methods: [] } }]
	)
}

export class box {
	public declare A: any

	public declare B: any

	public _fields: {
		A: any
		B: any
	}

	constructor(init?: Partial<{A?: any, B?: any}>) {
		this._fields = {
			A: init?.A !== undefined ? $.copyElement(init.A) : (null! as any),
			B: init?.B !== undefined ? $.copyElement(init.B) : (null! as any)
		}
	}

	public clone(): box {
		return $.markAsStructValue(new box(this))
	}

	static {
		$.bindStructFields(this.prototype, ["A", "B"])
	}

	static __typeInfo = $.registerStructType(
		"main.box",
		() => new box(),
		() => [],
		box,
		() => [{ name: "A", key: "A", type: { kind: $.TypeKind.Interface, methods: [] } }, { name: "B", key: "B", type: { kind: $.TypeKind.Interface, methods: [] } }]
	)
}

export function copyOf(__typeArgs: $.GenericTypeArgs | undefined, v: any): any {
	let c: any = $.copyElement(v)
	return $.copyElement(c)
}

export function twoCopies(__typeArgs: $.GenericTypeArgs | undefined, v: any): [any, any] {
	let a: any = $.copyElement(v)
	let b: any = $.copyElement(v)
	return [$.copyElement(a), $.copyElement(b)]
}

export function store(__typeArgs: $.GenericTypeArgs | undefined, dst: any, v: any): void {
	dst!.value = $.copyElement(v)
}

export function fill<T>(__typeArgs: $.GenericTypeArgs | undefined, n: number, v: any): $.Slice<T> {
	let r: $.Slice<T> = $.makeSlice<T>(n, undefined, undefined, () => ($.genericZero(__typeArgs, "T", null) as T))
	for (let __goscriptRangeTarget0 = r, i = 0; i < $.len(__goscriptRangeTarget0); i++) {
		r![i] = $.copyElement(v)
	}
	return r
}

export function appendTwice<T>(__typeArgs: $.GenericTypeArgs | undefined, s: $.Slice<T>, v: any): $.Slice<T> {
	return $.append(s, v, v, $.appendZero(() => ($.genericZero(__typeArgs, "T", null) as T)))
}

export function setTwo(__typeArgs: $.GenericTypeArgs | undefined, m: globalThis.Map<string, any> | null, v: any): void {
	$.mapSet(m, "a", $.copyElement(v))
	$.mapSet(m, "b", $.copyElement(v))
}

export function pair(__typeArgs: $.GenericTypeArgs | undefined, v: any): any[] {
	return $.arrayValue([$.copyElement(v), $.copyElement(v)])
}

export function makeBox(__typeArgs: $.GenericTypeArgs | undefined, v: any): box {
	return $.markAsStructValue(new box({A: $.copyElement(v), B: $.copyElement(v)}))
}

export async function main(): globalThis.Promise<void> {
	let s: $.VarRef<Sides> = $.varRef($.markAsStructValue(new Sides({Top: $.markAsStructValue(new Value()), Right: $.markAsStructValue(new Value()), Bottom: $.markAsStructValue(new Value()), Left: $.markAsStructValue(new Value())})))
	s.value.SetHorizontal({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.Value", zero: () => $.markAsStructValue(new Value()) }}, $.markAsStructValue(new Value({V: 24})))
	s.value.Left.Set(16)
	await $.println("horizontal:", s.value.Left.V, s.value.Right.V)

	s.value.SetAll({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.Value", zero: () => $.markAsStructValue(new Value()) }}, $.markAsStructValue(new Value({V: 10})))
	s.value.Top.Set(1)
	s.value.Left.Set(2)
	await $.println("all:", s.value.Top.V, s.value.Right.V, s.value.Bottom.V, s.value.Left.V)

	let v = $.markAsStructValue(new Value({V: 1}))
	let c = $.varRef(($.markAsStructValue($.cloneStructValue(copyOf({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.Value", zero: () => $.markAsStructValue(new Value()) }}, $.markAsStructValue($.cloneStructValue(v))))) as Value))
	c.value.Set(2)
	await $.println("copyOf:", v.V, c.value.V)

	let __goscriptTuple0: any = twoCopies({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.Value", zero: () => $.markAsStructValue(new Value()) }}, $.markAsStructValue(new Value({V: 15})))
	let a1 = $.varRef((__goscriptTuple0[0] as Value))
	let b1 = (__goscriptTuple0[1] as Value)
	a1.value.Set(16)
	await $.println("twoCopies:", a1.value.V, b1.V)

	let d: $.VarRef<Value> = $.varRef($.markAsStructValue(new Value()))
	store({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.Value", zero: () => $.markAsStructValue(new Value()) }}, d, $.markAsStructValue($.cloneStructValue(v)))
	d.value.Set(3)
	await $.println("store:", v.V, d.value.V)

	let xs: $.Slice<Value> = (fill({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.Value", zero: () => $.markAsStructValue(new Value()) }}, 2, $.markAsStructValue(new Value({V: 5}))) as $.Slice<Value>)
	$.arrayIndex(xs!, 0).Set(6)
	await $.println("fill:", $.arrayIndex(xs!, 0).V, $.arrayIndex(xs!, 1).V)

	let ys: $.Slice<Value> = (appendTwice({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.Value", zero: () => $.markAsStructValue(new Value()) }}, null, $.markAsStructValue(new Value({V: 7}))) as $.Slice<Value>)
	$.arrayIndex(ys!, 0).Set(8)
	await $.println("append:", $.arrayIndex(ys!, 0).V, $.arrayIndex(ys!, 1).V)

	let m: globalThis.Map<string, Value> | null = $.makeMap<string, Value>([])
	setTwo({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.Value", zero: () => $.markAsStructValue(new Value()) }}, m, $.markAsStructValue(new Value({V: 9})))
	let a = $.varRef($.markAsStructValue($.cloneStructValue($.mapGet<string, Value, Value>(m, "a", $.markAsStructValue(new Value()))[0])))
	a.value.Set(10)
	$.mapSet(m, "a", $.markAsStructValue($.cloneStructValue(a.value)))
	await $.println("map:", $.mapGet<string, Value, Value>(m, "a", $.markAsStructValue(new Value()))[0].V, $.mapGet<string, Value, Value>(m, "b", $.markAsStructValue(new Value()))[0].V)

	let p = ($.cloneArrayValue(pair({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.Value", zero: () => $.markAsStructValue(new Value()) }}, $.markAsStructValue(new Value({V: 11}))), /* @__PURE__ */ $.arrayType("main.Value", 2)) as Value[])
	$.arrayIndex(p, 0).Set(12)
	await $.println("pair:", $.arrayIndex(p, 0).V, $.arrayIndex(p, 1).V)

	let b = ($.markAsStructValue($.cloneStructValue(makeBox({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.Value", zero: () => $.markAsStructValue(new Value()) }}, $.markAsStructValue(new Value({V: 13}))))) as box)
	b.A.Set(14)
	await $.println("box:", b.A.V, b.B.V)

	// Copying a generic struct copies its struct-typed fields, so assigning
	// to a field of the original leaves the copy unchanged.
	let orig = $.markAsStructValue(new Sides({Bottom: $.markAsStructValue(new Value({V: 1})), Top: $.markAsStructValue(new Value()), Right: $.markAsStructValue(new Value()), Left: $.markAsStructValue(new Value())}))
	let cp = $.markAsStructValue($.cloneStructValue(orig))
	$.assignStruct(cp.Bottom, $.markAsStructValue(new Value({V: 2})))
	$.assignStruct(orig.Bottom, $.markAsStructValue(new Value({V: 3})))
	await $.println("struct copy:", orig.Bottom.V, cp.Bottom.V)
	let orig2 = $.markAsStructValue(new Sides({Top: $.markAsStructValue(new Value({V: 4})), Right: $.markAsStructValue(new Value()), Bottom: $.markAsStructValue(new Value()), Left: $.markAsStructValue(new Value())}))
	let cp2 = $.markAsStructValue($.cloneStructValue(orig2))
	orig2.Top.Set(5)
	await $.println("struct copy method:", orig2.Top.V, cp2.Top.V)

	let si: $.VarRef<Sides> = $.varRef($.markAsStructValue(new Sides({Top: 0, Right: 0, Bottom: 0, Left: 0})))
	si.value.SetAll({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }}, 4)
	si.value.Left = 5
	await $.println("ints:", si.value.Top, si.value.Left)
}

if ($.isMainScript(import.meta)) {
	await main()
}
