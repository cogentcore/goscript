// Generated file based on generic_struct_value_copy.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class Value {
	public declare V: number

	public declare U: number

	constructor(init?: Partial<{V?: number, U?: number}>, __goscriptValue?: boolean) {
		this.V = init?.V ?? (0 as number)
		this.U = init?.U ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Value {
		return new Value(this, true)
	}

	public __goscriptAssign(source: Value): this {
		this.V = source.V
		this.U = source.U
		return this
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
	public declare A: any

	public declare B: any

	constructor(init?: Partial<{A?: any, B?: any}>, __goscriptValue?: boolean, __goscriptFresh?: boolean) {
		this.A = init?.A !== undefined ? (__goscriptFresh === true ? init.A : $.copyElement(init.A)) : (null! as any)
		this.B = init?.B !== undefined ? (__goscriptFresh === true ? init.B : $.copyElement(init.B)) : (null! as any)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): box {
		return new box(this, true)
	}

	public __goscriptAssign(source: box): this {
		this.A = $.assignFieldValue(this.A, source.A, { kind: $.TypeKind.Interface, methods: [] })
		this.B = $.assignFieldValue(this.B, source.B, { kind: $.TypeKind.Interface, methods: [] })
		return this
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
	let r = $.makeSlice<T>(n, undefined, $.genericSliceTypeHint(__typeArgs, "T"), () => ($.genericZero(__typeArgs, "T", null) as T))
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
	let s: $.VarRef<Sides> = $.varRef($.markAsStructValue(new Sides({Top: new Value(undefined, true), Right: new Value(undefined, true), Bottom: new Value(undefined, true), Left: new Value(undefined, true)}, undefined, true)))
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

	let xs = (fill(__goscriptStatic0(), 2, new Value({V: 5}, true)) as $.Slice<Value>)
	$.arrayIndex(xs!, 0).Set(6)
	await $.println("fill:", $.arrayIndex(xs!, 0).V, $.arrayIndex(xs!, 1).V)

	let ys = (appendTwice(__goscriptStatic0(), null, new Value({V: 7}, true)) as $.Slice<Value>)
	$.arrayIndex(ys!, 0).Set(8)
	await $.println("append:", $.arrayIndex(ys!, 0).V, $.arrayIndex(ys!, 1).V)

	let m = $.makeMap<string, Value>([])
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
	let cp = (orig).clone()
	cp.Bottom.__goscriptAssign(new Value({V: 2}, true))
	orig.Bottom.__goscriptAssign(new Value({V: 3}, true))
	await $.println("struct copy:", orig.Bottom.V, cp.Bottom.V)
	let orig2 = $.markAsStructValue(new Sides({Top: new Value({V: 4}, true), Right: new Value(undefined, true), Bottom: new Value(undefined, true), Left: new Value(undefined, true)}))
	let cp2 = (orig2).clone()
	orig2.Top.Set(5)
	await $.println("struct copy method:", orig2.Top.V, cp2.Top.V)

	let si: $.VarRef<Sides> = $.varRef($.markAsStructValue(new Sides({Top: 0, Right: 0, Bottom: 0, Left: 0}, undefined, true)))
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
