// Generated file based on struct_assign_in_place.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Kind = number

export class Inner {
	public get X(): number {
		return this._fields.X
	}

	public set X(value: number) {
		this._fields.X = value
	}

	public get Y(): number {
		return this._fields.Y
	}

	public set Y(value: number) {
		this._fields.Y = value
	}

	public _fields: {
		X: number
		Y: number
	}

	constructor(init?: Partial<{X?: number, Y?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			X: init?.X ?? (0 as number),
			Y: init?.Y ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Inner {
		return new Inner(this, true)
	}

	public __goscriptAssign(source: Inner): void {
		const target = this._fields
		const values = source._fields
		target.X = values.X
		target.Y = values.Y
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
	public get In(): Inner {
		return this._fields.In
	}

	public set In(value: Inner) {
		this._fields.In = value
	}

	public get Arr(): number[] {
		return this._fields.Arr
	}

	public set Arr(value: number[]) {
		this._fields.Arr = value
	}

	public get Ptr(): Inner | $.VarRef<Inner> | null {
		return this._fields.Ptr
	}

	public set Ptr(value: Inner | $.VarRef<Inner> | null) {
		this._fields.Ptr = value
	}

	public get N(): number {
		return this._fields.N
	}

	public set N(value: number) {
		this._fields.N = value
	}

	public _fields: {
		In: Inner
		Arr: number[]
		Ptr: Inner | $.VarRef<Inner> | null
		N: number
	}

	constructor(init?: Partial<{In?: Inner, Arr?: number[], Ptr?: Inner | $.VarRef<Inner> | null, N?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			In: init?.In ? init.In.clone() : new Inner(undefined, true),
			Arr: init?.Arr !== undefined ? $.cloneArrayValue(init.Arr, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int"), 2)) : $.arrayValue(globalThis.Array.from({ length: 2 }, () => 0)),
			Ptr: init?.Ptr ?? (null! as Inner | $.VarRef<Inner> | null),
			N: init?.N ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Outer {
		return new Outer(this, true)
	}

	public __goscriptAssign(source: Outer): void {
		const target = this._fields
		const values = source._fields
		$.assignStruct(target.In, values.In)
		target.Arr = $.assignFieldValue(target.Arr, values.Arr, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int"), 2))
		target.Ptr = values.Ptr
		target.N = values.N
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
	public get Key(): string {
		return this._fields.Key
	}

	public set Key(value: string) {
		this._fields.Key = value
	}

	public get Val(): any {
		return this._fields.Val
	}

	public set Val(value: any) {
		this._fields.Val = value
	}

	public _fields: {
		Key: string
		Val: any
	}

	constructor(init?: Partial<{Key?: string, Val?: any}>, __goscriptValue?: boolean) {
		this._fields = {
			Key: init?.Key ?? ("" as string),
			Val: init?.Val !== undefined ? $.copyElement(init.Val) : (null! as any)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Pair {
		return new Pair(this, true)
	}

	public __goscriptAssign(source: Pair): void {
		const target = this._fields
		const values = source._fields
		target.Key = values.Key
		target.Val = $.assignFieldValue(target.Val, values.Val, { kind: $.TypeKind.Interface, methods: [] })
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
	public get P(): Pair {
		return this._fields.P
	}

	public set P(value: Pair) {
		this._fields.P = value
	}

	public _fields: {
		P: Pair
	}

	constructor(init?: Partial<{P?: Pair}>, __goscriptValue?: boolean) {
		this._fields = {
			P: init?.P ? init.P.clone() : $.markAsStructValue(new Pair({Val: null}))
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Holder {
		return new Holder(this, true)
	}

	public __goscriptAssign(source: Holder): void {
		const target = this._fields
		const values = source._fields
		$.assignStruct(target.P, values.P)
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
	public get Kind(): Kind {
		return this._fields.Kind
	}

	public set Kind(value: Kind) {
		this._fields.Kind = value
	}

	public _fields: {
		Kind: Kind
	}

	constructor(init?: Partial<{Kind?: Kind}>, __goscriptValue?: boolean) {
		this._fields = {
			Kind: init?.Kind ?? (0 as Kind)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Event {
		return new Event(this, true)
	}

	public __goscriptAssign(source: Event): void {
		const target = this._fields
		const values = source._fields
		target.Kind = values.Kind
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
	$.assignStruct($.pointerValue<Pair>(dst), (src).clone())
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
	b = $.assignStruct(b, a.value)
	a.value.In.X = 10
	a.value.Arr[0] = 30
	await $.println(b.In.X, $.arrayIndex(b.Arr, 0), a.value.In.X, $.arrayIndex(a.value.Arr, 0))

	let p: Outer | $.VarRef<Outer> | null = a
	a.value = $.assignStruct(a.value, $.pointerValue<Outer>(p))
	await $.println(a.value.In.X, a.value.N)

	let s = $.arrayToSlice<Outer>([make1(), make1()])
	$.assignStruct($.sliceElems(s!)[$.sliceSlot(s!, 0)], $.arrayIndex(s!, 1))
	$.arrayIndex(s!, 1).In.Y = 20
	await $.println($.arrayIndex(s!, 0).In.Y, $.arrayIndex(s!, 1).In.Y)

	let sh = new Inner({X: 7, Y: 8})
	a.value.Ptr = sh
	b = $.assignStruct(b, a.value)
	$.pointerValue<Inner>(b.Ptr).X = 70
	await $.println($.pointerValue<Inner>(a.value.Ptr).X, $.pointerValue<Inner>(sh).X)

	$.assignStruct(global, b)
	b.N = 50
	await $.println(global.N, b.N)

	let _in: Inner = new Inner(undefined, true)
	_in = $.assignStruct(_in, a.value.In)
	a.value.In.Y = 99
	await $.println(_in.Y, a.value.In.Y)
	let g1 = $.markAsStructValue(new Pair({Key: "a", Val: new Inner({X: 1, Y: 2}, true)}))
	let g2: Pair = $.markAsStructValue(new Pair({Val: new Inner(undefined, true)}))
	g2 = $.assignStruct(g2, (g1).clone())
	g1.Val.X = 11
	await $.println(g2.Val.X, g1.Val.X)
	let g3: $.VarRef<Pair> = $.varRef($.markAsStructValue(new Pair({Val: new Inner(undefined, true)})))
	assignGeneric(__goscriptStatic0(), g3, g1)
	g1.Val.Y = 22
	await $.println(g3.value.Val.Y, g1.Val.Y)
	let h1 = $.markAsStructValue(new Holder({P: (g1).clone()}))
	let h2: Holder = $.markAsStructValue(new Holder())
	h2 = $.assignStruct(h2, (h1).clone())
	h1.P.Val.X = 33
	await $.println(h2.P.Val.X, h1.P.Val.X)
	let m = $.makeMap<string, Outer>([["k", (a.value).clone()]])
	let c = new Outer(undefined, true)
	c = $.assignStruct(c, $.mapGet<string, Outer, Outer>(m, "k", new Outer(undefined, true))[0])
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
		ev = $.assignStruct(ev, __goscriptTuple0[0])
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
