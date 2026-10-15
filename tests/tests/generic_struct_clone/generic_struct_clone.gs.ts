// Generated file based on generic_struct_clone.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class unit {
	public declare V: number

	public declare U: string

	constructor(init?: Partial<{V?: number, U?: string}>, __goscriptValue?: boolean) {
		this.V = init?.V ?? (0 as number)
		this.U = init?.U ?? ("" as string)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): unit {
		return new unit(this, true)
	}

	public __goscriptAssign(source: unit): this {
		this.V = source.V
		this.U = source.U
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.unit",
		() => new unit(),
		() => [],
		unit,
		() => [{ name: "V", key: "V", type: /* @__PURE__ */ $.basicType("float32") }, { name: "U", key: "U", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class sides {
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

	public clone(): sides {
		return new sides(this, true)
	}

	public __goscriptAssign(source: sides): this {
		this.Top = $.assignFieldValue(this.Top, source.Top)
		this.Right = $.assignFieldValue(this.Right, source.Right)
		this.Bottom = $.assignFieldValue(this.Bottom, source.Bottom)
		this.Left = $.assignFieldValue(this.Left, source.Left)
		return this
	}

	public setAll(__typeArgs: $.GenericTypeArgs | undefined, v: any): void {
		let s: sides | $.VarRef<sides> | null = this;
		const s$: sides = s == null ? $.pointerTarget<sides>(s) : (s as any).__isVarRef === true ? (s as any).value : (s as any).__goValue === undefined ? (s as any) : $.pointerTarget<sides>(s)
		let __goscriptAssign0_0: any = $.copyElement(v)
		let __goscriptAssign0_1: any = $.copyElement(v)
		let __goscriptAssign0_2: any = $.copyElement(v)
		let __goscriptAssign0_3: any = $.copyElement(v);
		;(s$ as sides).Top = __goscriptAssign0_0;
		;(s$ as sides).Right = __goscriptAssign0_1;
		;(s$ as sides).Bottom = __goscriptAssign0_2;
		;(s$ as sides).Left = __goscriptAssign0_3
	}

	static __typeInfo = $.registerStructType(
		"main.sides",
		() => new sides(),
		() => [{ name: "setAll", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }],
		sides,
		() => [{ name: "Top", key: "Top", type: { kind: $.TypeKind.Interface, methods: [] } }, { name: "Right", key: "Right", type: { kind: $.TypeKind.Interface, methods: [] } }, { name: "Bottom", key: "Bottom", type: { kind: $.TypeKind.Interface, methods: [] } }, { name: "Left", key: "Left", type: { kind: $.TypeKind.Interface, methods: [] } }]
	)
}

export class values {
	public declare sides: sides

	public declare Name: string

	constructor(init?: Partial<{sides?: sides, Name?: string}>, __goscriptValue?: boolean) {
		this.sides = init?.sides ? init.sides.clone() : $.markAsStructValue(new sides({Top: new unit(undefined, true), Right: new unit(undefined, true), Bottom: new unit(undefined, true), Left: new unit(undefined, true)}, undefined, true))
		this.Name = init?.Name ?? ("" as string)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): values {
		return new values(this, true)
	}

	public __goscriptAssign(source: values): this {
		this.sides.__goscriptAssign(source.sides)
		this.Name = source.Name
		return this
	}

	public setAll(v: any): any {
		return $.pointerValue<sides>(this.sides).setAll(__goscriptStatic0(), v)
	}

	static __typeInfo = $.registerStructType(
		"main.values",
		() => new values(),
		() => [{ name: "setAll", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }],
		values,
		() => [{ name: "sides", key: "sides", type: "main.sides", anonymous: true }, { name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class pair {
	public declare Key: any

	public declare Val: any

	constructor(init?: Partial<{Key?: any, Val?: any}>, __goscriptValue?: boolean, __goscriptFresh?: boolean) {
		this.Key = init?.Key ?? (null! as any)
		this.Val = init?.Val !== undefined ? (__goscriptFresh === true ? init.Val : $.copyElement(init.Val)) : (null! as any)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): pair {
		return new pair(this, true)
	}

	public __goscriptAssign(source: pair): this {
		this.Key = $.assignFieldValue(this.Key, source.Key)
		this.Val = $.assignFieldValue(this.Val, source.Val)
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.pair",
		() => new pair(),
		() => [],
		pair,
		() => [{ name: "Key", key: "Key", type: { kind: $.TypeKind.Interface, methods: [] } }, { name: "Val", key: "Val", type: { kind: $.TypeKind.Interface, methods: [] } }]
	)
}

export function copySides(__typeArgs: $.GenericTypeArgs | undefined, s: sides): sides {
	let c = (s).clone()
	return c
}

export async function main(): globalThis.Promise<void> {
	// A struct that embeds an instance of a generic struct copies it.
	let a = $.varRef(new values({Name: "a"}, true))
	a.value.sides.setAll(__goscriptStatic0(), new unit({V: 1, U: "px"}, true))
	let b = (a.value).clone()
	b.sides.Top.V = 5
	b.sides.Left.U = "em"
	await $.println("copy:", a.value.sides.Top.V, a.value.sides.Left.U, b.sides.Top.V, b.sides.Left.U)

	// Instances are copied when assigned, passed and returned.
	let s = $.markAsStructValue(new sides({Top: new unit({V: 2, U: "dp"}, true), Right: new unit(undefined, true), Bottom: new unit(undefined, true), Left: new unit(undefined, true)}))
	let t = (copySides(__goscriptStatic0(), s) as sides)
	t.Top.V = 9
	let u = (s).clone()
	u.Right.__goscriptAssign(new unit({V: 3, U: "x"}, true))
	await $.println("instance:", s.Top.V, t.Top.V, $.stringEqual(s.Right.U, ""), u.Right.U)

	// Instances with type arguments of other kinds.
	let p = $.markAsStructValue(new pair({Key: "k", Val: $.markAsStructValue(new sides({Top: 1, Right: 2, Bottom: 3, Left: 4}))}))
	let q = (p).clone()
	q.Val.Left = 40
	let ps = $.arrayToSlice<pair>([(p).clone(), (q).clone()])
	$.arrayIndex(ps!, 0).Val.Top = 10
	await $.println("pair:", p.Val.Left, q.Val.Left, $.arrayIndex(ps!, 0).Val.Top, p.Val.Top, $.arrayIndex(ps!, 1).Val.Left)
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.unit", zero: () => new unit(undefined, true) }})
}

if ($.isMainScript(import.meta)) {
	await main()
}
