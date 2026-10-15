// Generated file based on struct_assign_interface_fields.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

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

export class holder {
	public declare Any: any

	public declare Name: string

	constructor(init?: Partial<{Any?: any, Name?: string}>, __goscriptValue?: boolean) {
		this.Any = init?.Any ?? (null! as any)
		this.Name = init?.Name ?? ("" as string)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): holder {
		return new holder(this, true)
	}

	public __goscriptAssign(source: holder): this {
		this.Any = $.assignFieldValue(this.Any, source.Any)
		this.Name = source.Name
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.holder",
		() => new holder(),
		() => [],
		holder,
		() => [{ name: "Any", key: "Any", type: { kind: $.TypeKind.Interface, methods: [] } }, { name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class pair {
	public declare A: any

	public declare B: any

	constructor(init?: Partial<{A?: any, B?: any}>, __goscriptValue?: boolean, __goscriptFresh?: boolean) {
		this.A = init?.A !== undefined ? (__goscriptFresh === true ? init.A : $.copyElement(init.A)) : (null! as any)
		this.B = init?.B !== undefined ? (__goscriptFresh === true ? init.B : $.copyElement(init.B)) : (null! as any)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): pair {
		return new pair(this, true)
	}

	public __goscriptAssign(source: pair): this {
		this.A = $.assignFieldValue(this.A, source.A)
		this.B = $.assignFieldValue(this.B, source.B)
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.pair",
		() => new pair(),
		() => [],
		pair,
		() => [{ name: "A", key: "A", type: { kind: $.TypeKind.Interface, methods: [] } }, { name: "B", key: "B", type: { kind: $.TypeKind.Interface, methods: [] } }]
	)
}

export class outer {
	public declare P: pair

	constructor(init?: Partial<{P?: pair}>, __goscriptValue?: boolean) {
		this.P = init?.P ? init.P.clone() : $.markAsStructValue(new pair({A: $.arrayValue(globalThis.Array.from({ length: 2 }, () => 0)), B: $.arrayValue(globalThis.Array.from({ length: 2 }, () => 0))}, undefined, true))
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): outer {
		return new outer(this, true)
	}

	public __goscriptAssign(source: outer): this {
		this.P.__goscriptAssign(source.P)
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.outer",
		() => new outer(),
		() => [],
		outer,
		() => [{ name: "P", key: "P", type: "main.pair" }]
	)
}

export async function main(): globalThis.Promise<void> {
	// Interface fields keep their values through an assignment through a pointer.
	let h = new holder({Any: $.interfaceValue(new point({X: 1, Y: 2}, true), "main.point", "main.point"), Name: "h"}, true)
	let g: $.VarRef<holder> = $.varRef(new holder(undefined, true))
	let pg = g
	let pg$: holder = pg == null ? $.pointerTarget<holder>(pg) : (pg as any).__isVarRef === true ? (pg as any).value : (pg as any).__goValue === undefined ? (pg as any) : $.pointerTarget<holder>(pg);
	;(pg$ as holder).__goscriptAssign(h)
	await $.println($.mustTypeAssert<point>((pg$ as holder).Any, "main.point").X, (pg$ as holder).Name)

	// Array values in type parameter fields are copied.
	let o = new outer({P: $.markAsStructValue(new pair({A: $.arrayValue([1, 2]), B: $.arrayValue([3, 4])}))}, true)
	let c: $.VarRef<outer> = $.varRef(new outer(undefined, true))
	let pc = c
	let pc$: outer = pc == null ? $.pointerTarget<outer>(pc) : (pc as any).__isVarRef === true ? (pc as any).value : (pc as any).__goValue === undefined ? (pc as any) : $.pointerTarget<outer>(pc);
	;(pc$ as outer).__goscriptAssign((o).clone());
	;(pc$ as outer).P.A[0] = 10
	await $.println($.arrayIndex(o.P.A, 0), $.arrayIndex((pc$ as outer).P.A, 0), $.arrayIndex((pc$ as outer).P.B, 1))

	// Struct values in type parameter fields are copied.
	let s = $.markAsStructValue(new pair({A: new point({X: 5, Y: 6}, true), B: new point(undefined, true)}))
	let t = new pair({A: new point(undefined, true), B: new point(undefined, true)})
	let t$: pair = t == null ? $.pointerTarget<pair>(t) : (t as any).__isVarRef === true ? (t as any).value : (t as any).__goValue === undefined ? (t as any) : $.pointerTarget<pair>(t)
	$.assignStruct((t$ as pair), (s).clone());
	;(t$ as pair).A.X = 50
	await $.println(s.A.X, (t$ as pair).A.X)

	// An array held by an interface field is not shared.
	let a = new holder({Any: $.arrayValue([7, 8])}, true)
	let b: $.VarRef<holder> = $.varRef(new holder(undefined, true))
	let pb = b
	$.pointerValue<holder>(pb).__goscriptAssign(a)
	await $.println($.arrayIndex($.mustTypeAssert<number[]>($.pointerValue<holder>(pb).Any, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int"), 2)), 1))
}

if ($.isMainScript(import.meta)) {
	await main()
}
