// Generated file based on struct_assign_in_place.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

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

	constructor(init?: Partial<{X?: number, Y?: number}>) {
		this._fields = {
			X: init?.X ?? (0 as number),
			Y: init?.Y ?? (0 as number)
		}
	}

	public clone(): Inner {
		return $.markAsStructValue(new Inner(this))
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

	constructor(init?: Partial<{In?: Inner, Arr?: number[], Ptr?: Inner | $.VarRef<Inner> | null, N?: number}>) {
		this._fields = {
			In: init?.In ? $.markAsStructValue($.cloneStructValue(init.In)) : $.markAsStructValue(new Inner()),
			Arr: init?.Arr !== undefined ? $.cloneArrayValue(init.Arr, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int"), 2)) : $.arrayValue(globalThis.Array.from({ length: 2 }, () => 0)),
			Ptr: init?.Ptr ?? (null! as Inner | $.VarRef<Inner> | null),
			N: init?.N ?? (0 as number)
		}
	}

	public clone(): Outer {
		return $.markAsStructValue(new Outer(this))
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

export let global: Outer = $.markAsStructValue(new Outer())

export function __goscript_set_global(__goscriptValue: Outer): void {
	$.assignStruct(global, __goscriptValue)
}

export function make1(): Outer {
	return $.markAsStructValue(new Outer({In: $.markAsStructValue(new Inner({X: 1, Y: 2})), Arr: $.arrayValue([3, 4]), N: 5}))
}

export async function main(): globalThis.Promise<void> {
	let a = $.varRef($.markAsStructValue($.cloneStructValue(make1())))
	let b = $.markAsStructValue(new Outer())
	$.assignStruct(b, a.value)
	a.value.In.X = 10
	a.value.Arr[0] = 30
	await $.println(b.In.X, $.arrayIndex(b.Arr, 0), a.value.In.X, $.arrayIndex(a.value.Arr, 0))

	let p: Outer | $.VarRef<Outer> | null = a
	$.assignStruct(a.value, $.pointerValue<Outer>(p))
	await $.println(a.value.In.X, a.value.N)

	let s: $.Slice<Outer> = $.arrayToSlice<Outer>([$.markAsStructValue($.cloneStructValue(make1())), $.markAsStructValue($.cloneStructValue(make1()))])
	$.assignStruct(s![0], $.arrayIndex(s!, 1))
	$.arrayIndex(s!, 1).In.Y = 20
	await $.println($.arrayIndex(s!, 0).In.Y, $.arrayIndex(s!, 1).In.Y)

	let sh: Inner | $.VarRef<Inner> | null = new Inner({X: 7, Y: 8})
	a.value.Ptr = sh
	$.assignStruct(b, a.value)
	$.pointerValue<Inner>(b.Ptr).X = 70
	await $.println($.pointerValue<Inner>(a.value.Ptr).X, $.pointerValue<Inner>(sh).X)

	$.assignStruct(global, b)
	b.N = 50
	await $.println(global.N, b.N)

	let _in: Inner = $.markAsStructValue(new Inner())
	$.assignStruct(_in, a.value.In)
	a.value.In.Y = 99
	await $.println(_in.Y, a.value.In.Y)
	let m: globalThis.Map<string, Outer> | null = $.makeMap<string, Outer>([["k", $.markAsStructValue($.cloneStructValue(a.value))]])
	let c = $.markAsStructValue(new Outer())
	$.assignStruct(c, $.mapGet<string, Outer, Outer>(m, "k", $.markAsStructValue(new Outer()))[0])
	c.N = 77
	await $.println($.mapGet<string, Outer, Outer>(m, "k", $.markAsStructValue(new Outer()))[0].N, c.N)
}

if ($.isMainScript(import.meta)) {
	await main()
}
