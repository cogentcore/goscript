// Generated file based on struct_assign_in_place.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Kind = number

export class Inner {
	public declare X: number

	public declare Y: number

	constructor(init?: Partial<{X?: number, Y?: number}>, __goscriptValue?: boolean) {
		this.X = init?.X ?? (0 as number)
		this.Y = init?.Y ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Inner {
		return new Inner(this, true)
	}

	public __goscriptAssign(source: Inner): this {
		this.X = source.X
		this.Y = source.Y
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Inner",
		() => new Inner(),
		() => [],
		Inner,
		() => [{ name: "X", key: "X", type: /* @__PURE__ */ $.basicType("int") }, { name: "Y", key: "Y", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class Outer {
	public declare In: Inner

	public declare Arr: number[]

	public declare Ptr: Inner | $.VarRef<Inner> | null

	public declare N: number

	constructor(init?: Partial<{In?: Inner, Arr?: number[], Ptr?: Inner | $.VarRef<Inner> | null, N?: number}>, __goscriptValue?: boolean) {
		this.In = init?.In ? init.In.clone() : new Inner(undefined, true)
		this.Arr = init?.Arr !== undefined ? $.cloneArrayValue(init.Arr, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int"), 2)) : $.arrayValue(globalThis.Array.from({ length: 2 }, () => 0))
		this.Ptr = init?.Ptr ?? (null! as Inner | $.VarRef<Inner> | null)
		this.N = init?.N ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Outer {
		return new Outer(this, true)
	}

	public __goscriptAssign(source: Outer): this {
		this.In.__goscriptAssign(source.In)
		this.Arr = $.assignFieldValue(this.Arr, source.Arr, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int"), 2))
		this.Ptr = source.Ptr
		this.N = source.N
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Outer",
		() => new Outer(),
		() => [],
		Outer,
		() => [{ name: "In", key: "In", type: "main.Inner" }, { name: "Arr", key: "Arr", type: /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int"), 2) }, { name: "Ptr", key: "Ptr", type: /* @__PURE__ */ $.pointerType("main.Inner") }, { name: "N", key: "N", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class Pair {
	public declare Key: string

	public declare Val: any

	constructor(init?: Partial<{Key?: string, Val?: any}>, __goscriptValue?: boolean) {
		this.Key = init?.Key ?? ("" as string)
		this.Val = init?.Val !== undefined ? $.copyElement(init.Val) : (null! as any)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Pair {
		return new Pair(this, true)
	}

	public __goscriptAssign(source: Pair): this {
		this.Key = source.Key
		this.Val = $.assignFieldValue(this.Val, source.Val, { kind: $.TypeKind.Interface, methods: [] })
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Pair",
		() => new Pair(),
		() => [],
		Pair,
		() => [{ name: "Key", key: "Key", type: /* @__PURE__ */ $.basicType("string") }, { name: "Val", key: "Val", type: { kind: $.TypeKind.Interface, methods: [] } }]
	)
}

export class Holder {
	public declare P: Pair

	constructor(init?: Partial<{P?: Pair}>, __goscriptValue?: boolean) {
		this.P = init?.P ? $.markAsStructValue($.cloneStructValue(init.P)) : $.markAsStructValue(new Pair({Val: null}))
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Holder {
		return new Holder(this, true)
	}

	public __goscriptAssign(source: Holder): this {
		$.assignStruct(this.P, source.P)
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Holder",
		() => new Holder(),
		() => [],
		Holder,
		() => [{ name: "P", key: "P", type: "main.Pair" }]
	)
}

export class Event {
	public declare Kind: Kind

	constructor(init?: Partial<{Kind?: Kind}>, __goscriptValue?: boolean) {
		this.Kind = init?.Kind ?? (0 as Kind)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Event {
		return new Event(this, true)
	}

	public __goscriptAssign(source: Event): this {
		this.Kind = source.Kind
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Event",
		() => new Event(),
		() => [],
		Event,
		() => [{ name: "Kind", key: "Kind", type: /* @__PURE__ */ $.basicType("int", "main.Kind") }]
	)
}

export const KindStart: Kind = 1

export const KindValue: Kind = 2

export const KindEnd: Kind = 3

export let global: Outer = new Outer(undefined, true)

export function __goscript_set_global(__goscriptValue: Outer): void {
	$.assignStruct(global, __goscriptValue)
}

export function assignGeneric(__typeArgs: $.GenericTypeArgs | undefined, dst: Pair | $.VarRef<Pair> | null, src: Pair): void {
	$.assignStruct($.pointerValue<Pair>(dst), $.markAsStructValue($.cloneStructValue(src)))
}

export function make1(): Outer {
	return new Outer({In: new Inner({X: 1, Y: 2}, true), Arr: $.arrayValue([3, 4]), N: 5}, true)
}

export function nextEvent(k: Kind): [Event, $.GoError] {
	return [new Event({Kind: k}, true), null]
}

export async function main(): globalThis.Promise<void> {
	let a = $.varRef(make1())
	let b = new Outer(undefined, true)
	b = b.__goscriptAssign(a.value)
	a.value.In.X = 10
	a.value.Arr[0] = 30
	await $.println(b.In.X, $.arrayIndex(b.Arr, 0), a.value.In.X, $.arrayIndex(a.value.Arr, 0))

	let p: Outer | $.VarRef<Outer> | null = a
	a.value = a.value.__goscriptAssign($.pointerValue<Outer>(p))
	await $.println(a.value.In.X, a.value.N)

	let s = $.arrayToSlice<Outer>([make1(), make1()])
	$.sliceElems(s!)[$.sliceSlot(s!, 0)].__goscriptAssign($.arrayIndex(s!, 1))
	$.arrayIndex(s!, 1).In.Y = 20
	await $.println($.arrayIndex(s!, 0).In.Y, $.arrayIndex(s!, 1).In.Y)

	let sh = new Inner({X: 7, Y: 8})
	a.value.Ptr = sh
	b = b.__goscriptAssign(a.value)
	$.pointerValue<Inner>(b.Ptr).X = 70
	await $.println($.pointerValue<Inner>(a.value.Ptr).X, $.pointerValue<Inner>(sh).X)

	global.__goscriptAssign(b)
	b.N = 50
	await $.println(global.N, b.N)

	let _in: Inner = new Inner(undefined, true)
	_in = _in.__goscriptAssign(a.value.In)
	a.value.In.Y = 99
	await $.println(_in.Y, a.value.In.Y)
	let g1 = $.markAsStructValue(new Pair({Key: "a", Val: new Inner({X: 1, Y: 2}, true)}))
	let g2: Pair = $.markAsStructValue(new Pair({Val: new Inner(undefined, true)}))
	g2 = $.assignStruct(g2, $.markAsStructValue($.cloneStructValue(g1)))
	g1.Val.X = 11
	await $.println(g2.Val.X, g1.Val.X)
	let g3: $.VarRef<Pair> = $.varRef($.markAsStructValue(new Pair({Val: new Inner(undefined, true)})))
	assignGeneric(__goscriptStatic0(), g3, g1)
	g1.Val.Y = 22
	await $.println(g3.value.Val.Y, g1.Val.Y)
	let h1 = $.markAsStructValue(new Holder({P: $.markAsStructValue($.cloneStructValue(g1))}))
	let h2: Holder = $.markAsStructValue(new Holder())
	h2 = $.assignStruct(h2, $.markAsStructValue($.cloneStructValue(h1)))
	h1.P.Val.X = 33
	await $.println(h2.P.Val.X, h1.P.Val.X)
	let m = $.makeMap<string, Outer>([["k", (a.value).clone()]])
	let c = new Outer(undefined, true)
	c = c.__goscriptAssign($.mapGet<string, Outer, Outer>(m, "k", new Outer(undefined, true))[0])
	c.N = 77
	await $.println($.mapGet<string, Outer, Outer>(m, "k", new Outer(undefined, true))[0].N, c.N)

	// The kind tested before the loop does not decide the kind inside it.
	let [ev, err] = nextEvent(1)
	if (ev.Kind != 1) {
		return
	}
	for (let __goscriptRangeTarget0 = $.arrayToSlice<Kind>([2, 3]), __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let k = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as Kind)
		let __goscriptTuple0: any = nextEvent(k)
		ev = ev.__goscriptAssign(__goscriptTuple0[0])
		err = __goscriptTuple0[1]
		switch (ev.Kind) {
			case 2:
			{
				await $.println("value", err == null)
				break
			}
			case 3:
			{
				await $.println("end")
				break
			}
		}
	}
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.Inner", zero: () => new Inner(undefined, true) }})
}

if ($.isMainScript(import.meta)) {
	await main()
}
