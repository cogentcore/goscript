// Generated file based on generic_struct_value_copy.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class Value {
	public get V(): number {
		return this._fields.V
	}

	public set V(value: number) {
		this._fields.V = value
	}

	public get U(): number {
		return this._fields.U
	}

	public set U(value: number) {
		this._fields.U = value
	}

	public _fields: {
		V: number
		U: number
	}

	constructor(init?: Partial<{V?: number, U?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			V: init?.V ?? (0 as number),
			U: init?.U ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Value {
		return new Value(this, true)
	}

	public __goscriptAssign(source: Value): void {
		const target = this._fields
		const values = source._fields
		target.V = values.V
		target.U = values.U
	}

	public Set(x: number): void {
		let v: Value | $.VarRef<Value> | null = this;
		$.pointerValue<Value>(v).V = x
	}

	static __typeInfo = $.registerStructType(
		"main.Value",
		() => new Value(),
		() => [{ name: "Set", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }],
		Value,
		() => [{ name: "V", key: "V", type: /* @__PURE__ */ $.basicType("float32") }, { name: "U", key: "U", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class Sides {
	public get Top(): any {
		return this._fields.Top
	}

	public set Top(value: any) {
		this._fields.Top = value
	}

	public get Right(): any {
		return this._fields.Right
	}

	public set Right(value: any) {
		this._fields.Right = value
	}

	public get Bottom(): any {
		return this._fields.Bottom
	}

	public set Bottom(value: any) {
		this._fields.Bottom = value
	}

	public get Left(): any {
		return this._fields.Left
	}

	public set Left(value: any) {
		this._fields.Left = value
	}

	public _fields: {
		Top: any
		Right: any
		Bottom: any
		Left: any
	}

	constructor(init?: Partial<{Top?: any, Right?: any, Bottom?: any, Left?: any}>, __goscriptValue?: boolean) {
		this._fields = {
			Top: init?.Top !== undefined ? $.copyElement(init.Top) : (null! as any),
			Right: init?.Right !== undefined ? $.copyElement(init.Right) : (null! as any),
			Bottom: init?.Bottom !== undefined ? $.copyElement(init.Bottom) : (null! as any),
			Left: init?.Left !== undefined ? $.copyElement(init.Left) : (null! as any)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Sides {
		return new Sides(this, true)
	}

	public __goscriptAssign(source: Sides): void {
		const target = this._fields
		const values = source._fields
		target.Top = $.assignFieldValue(target.Top, values.Top, { kind: $.TypeKind.Interface, methods: [] })
		target.Right = $.assignFieldValue(target.Right, values.Right, { kind: $.TypeKind.Interface, methods: [] })
		target.Bottom = $.assignFieldValue(target.Bottom, values.Bottom, { kind: $.TypeKind.Interface, methods: [] })
		target.Left = $.assignFieldValue(target.Left, values.Left, { kind: $.TypeKind.Interface, methods: [] })
	}

	public SetAll(__typeArgs: $.GenericTypeArgs | undefined, val: any): void {
		let s: Sides | $.VarRef<Sides> | null = this;
		const s$: Sides = s == null ? $.pointerTarget<Sides>(s) : (s as any).__isVarRef === true ? (s as any).value : (s as any).__goValue === undefined ? (s as any) : $.pointerTarget<Sides>(s);
		;(s$ as Sides).Top = $.copyElement(val);
		;(s$ as Sides).Right = $.copyElement(val);
		;(s$ as Sides).Bottom = $.copyElement(val);
		;(s$ as Sides).Left = $.copyElement(val)
	}

	public SetHorizontal(__typeArgs: $.GenericTypeArgs | undefined, val: any): void {
		let s: Sides | $.VarRef<Sides> | null = this;
		const s$: Sides = s == null ? $.pointerTarget<Sides>(s) : (s as any).__isVarRef === true ? (s as any).value : (s as any).__goValue === undefined ? (s as any) : $.pointerTarget<Sides>(s);
		;(s$ as Sides).Right = $.copyElement(val);
		;(s$ as Sides).Left = $.copyElement(val)
	}

	static __typeInfo = $.registerStructType(
		"main.Sides",
		() => new Sides(),
		() => [{ name: "SetAll", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }, { name: "SetHorizontal", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }],
		Sides,
		() => [{ name: "Top", key: "Top", type: { kind: $.TypeKind.Interface, methods: [] } }, { name: "Right", key: "Right", type: { kind: $.TypeKind.Interface, methods: [] } }, { name: "Bottom", key: "Bottom", type: { kind: $.TypeKind.Interface, methods: [] } }, { name: "Left", key: "Left", type: { kind: $.TypeKind.Interface, methods: [] } }]
	)
}

export class box {
	public get A(): any {
		return this._fields.A
	}

	public set A(value: any) {
		this._fields.A = value
	}

	public get B(): any {
		return this._fields.B
	}

	public set B(value: any) {
		this._fields.B = value
	}

	public _fields: {
		A: any
		B: any
	}

	constructor(init?: Partial<{A?: any, B?: any}>, __goscriptValue?: boolean) {
		this._fields = {
			A: init?.A !== undefined ? $.copyElement(init.A) : (null! as any),
			B: init?.B !== undefined ? $.copyElement(init.B) : (null! as any)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): box {
		return new box(this, true)
	}

	public __goscriptAssign(source: box): void {
		const target = this._fields
		const values = source._fields
		target.A = $.assignFieldValue(target.A, values.A, { kind: $.TypeKind.Interface, methods: [] })
		target.B = $.assignFieldValue(target.B, values.B, { kind: $.TypeKind.Interface, methods: [] })
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
	$.genericPointerRef(dst).value = $.copyElement(v)
}

export function fill<T>(__typeArgs: $.GenericTypeArgs | undefined, n: number, v: any): $.Slice<T> {
	let r: $.Slice<T> = $.makeSlice<T>(n, undefined, undefined, () => ($.genericZero(__typeArgs, "T", null) as T))
	for (let __goscriptRangeTarget0 = r, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), i = 0; i < __goscriptRangeWindow0.length; i++) {
		;(__goscriptRangeWindow0.backing as any[])[__goscriptRangeWindow0.offset + i] = $.copyElement(v)
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
	let s: $.VarRef<Sides> = $.varRef($.markAsStructValue(new Sides({Top: new Value(undefined, true), Right: new Value(undefined, true), Bottom: new Value(undefined, true), Left: new Value(undefined, true)})))
	s.value.SetHorizontal(__goscriptStatic0(), new Value({V: 24}, true))
	s.value.Left.Set(16)
	await $.println("horizontal:", s.value.Left.V, s.value.Right.V)

	s.value.SetAll(__goscriptStatic0(), new Value({V: 10}, true))
	s.value.Top.Set(1)
	s.value.Left.Set(2)
	await $.println("all:", s.value.Top.V, s.value.Right.V, s.value.Bottom.V, s.value.Left.V)

	let v = new Value({V: 1}, true)
	let c = $.varRef(((copyOf(__goscriptStatic0(), (v).clone())).clone() as Value))
	c.value.Set(2)
	await $.println("copyOf:", v.V, c.value.V)

	let __goscriptTuple0: any = twoCopies(__goscriptStatic0(), new Value({V: 15}, true))
	let a1 = $.varRef((__goscriptTuple0[0] as Value))
	let b1 = (__goscriptTuple0[1] as Value)
	a1.value.Set(16)
	await $.println("twoCopies:", a1.value.V, b1.V)

	let d: $.VarRef<Value> = $.varRef(new Value(undefined, true))
	store(__goscriptStatic0(), d, (v).clone())
	d.value.Set(3)
	await $.println("store:", v.V, d.value.V)

	let xs: $.Slice<Value> = (fill(__goscriptStatic0(), 2, new Value({V: 5}, true)) as $.Slice<Value>)
	$.arrayIndex(xs!, 0).Set(6)
	await $.println("fill:", $.arrayIndex(xs!, 0).V, $.arrayIndex(xs!, 1).V)

	let ys: $.Slice<Value> = (appendTwice(__goscriptStatic0(), null, new Value({V: 7}, true)) as $.Slice<Value>)
	$.arrayIndex(ys!, 0).Set(8)
	await $.println("append:", $.arrayIndex(ys!, 0).V, $.arrayIndex(ys!, 1).V)

	let m: globalThis.Map<string, Value> | null = $.makeMap<string, Value>([])
	setTwo(__goscriptStatic0(), m, new Value({V: 9}, true))
	let a = $.varRef(($.mapGet<string, Value, Value>(m, "a", new Value(undefined, true))[0]).clone())
	a.value.Set(10)
	$.mapSet(m, "a", (a.value).clone())
	await $.println("map:", $.mapGet<string, Value, Value>(m, "a", new Value(undefined, true))[0].V, $.mapGet<string, Value, Value>(m, "b", new Value(undefined, true))[0].V)

	let p = (pair(__goscriptStatic0(), new Value({V: 11}, true)) as Value[])
	$.arrayIndex(p, 0).Set(12)
	await $.println("pair:", $.arrayIndex(p, 0).V, $.arrayIndex(p, 1).V)

	let b = (makeBox(__goscriptStatic0(), new Value({V: 13}, true)) as box)
	b.A.Set(14)
	await $.println("box:", b.A.V, b.B.V)

	// Copying a generic struct copies its struct-typed fields, so assigning
	// to a field of the original leaves the copy unchanged.
	let orig = $.markAsStructValue(new Sides({Bottom: new Value({V: 1}, true), Top: new Value(undefined, true), Right: new Value(undefined, true), Left: new Value(undefined, true)}))
	let cp = $.markAsStructValue($.cloneStructValue(orig))
	$.assignStruct(cp.Bottom, new Value({V: 2}, true))
	$.assignStruct(orig.Bottom, new Value({V: 3}, true))
	await $.println("struct copy:", orig.Bottom.V, cp.Bottom.V)
	let orig2 = $.markAsStructValue(new Sides({Top: new Value({V: 4}, true), Right: new Value(undefined, true), Bottom: new Value(undefined, true), Left: new Value(undefined, true)}))
	let cp2 = $.markAsStructValue($.cloneStructValue(orig2))
	orig2.Top.Set(5)
	await $.println("struct copy method:", orig2.Top.V, cp2.Top.V)

	let si: $.VarRef<Sides> = $.varRef($.markAsStructValue(new Sides({Top: 0, Right: 0, Bottom: 0, Left: 0})))
	si.value.SetAll(__goscriptStatic1(), 4)
	si.value.Left = 5
	await $.println("ints:", si.value.Top, si.value.Left)
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.Value", zero: () => new Value(undefined, true) }})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }})
}

if ($.isMainScript(import.meta)) {
	await main()
}
