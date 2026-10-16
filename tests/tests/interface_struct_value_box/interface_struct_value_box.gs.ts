// Generated file based on interface_struct_value_box.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Summer = {
	Sum(): number
}

$.registerInterfaceType(
	"main.Summer",
	null,
	[{ name: "Sum", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("float32") }] }]
);

export class Vec {
	public declare X: number

	public declare Y: number

	constructor(__goscriptValue?: boolean, X$?: number, Y$?: number) {
		this.X = X$ ?? 0
		this.Y = Y$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Vec {
		return new Vec(true, this.X, this.Y)
	}

	public __goscriptAssign(source: Vec): this {
		this.X = source.X
		this.Y = source.Y
		return this
	}

	public Sum(): number {
		const v = this;
		return globalThis.Math.fround(v.X + v.Y)
	}

	static __typeInfo = $.registerStructType(
		"main.Vec",
		() => new Vec(),
		() => [{ name: "Sum", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("float32") }] }],
		Vec,
		() => [{ name: "X", key: "X", type: /* @__PURE__ */ $.basicType("float32") }, { name: "Y", key: "Y", type: /* @__PURE__ */ $.basicType("float32") }]
	)
}

export class Named {
	public declare Name: string

	public declare Tags: $.Slice<string>

	public declare Next: Named | $.VarRef<Named> | null

	constructor(__goscriptValue?: boolean, Name$?: string, Tags$?: $.Slice<string>, Next$?: Named | $.VarRef<Named> | null) {
		this.Name = Name$ ?? ""
		this.Tags = Tags$ ?? (null! as $.Slice<string>)
		this.Next = Next$ ?? (null! as Named | $.VarRef<Named> | null)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Named {
		return new Named(true, this.Name, this.Tags, this.Next)
	}

	public __goscriptAssign(source: Named): this {
		this.Name = source.Name
		this.Tags = source.Tags
		this.Next = source.Next
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Named",
		() => new Named(),
		() => [],
		Named,
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }, { name: "Tags", key: "Tags", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string")) }, { name: "Next", key: "Next", type: /* @__PURE__ */ $.pointerType("main.Named") }]
	)
}

export class Outer {
	public declare In: Vec

	public declare N: number

	constructor(__goscriptValue?: boolean, In$?: Vec, N$?: number) {
		this.In = In$ ?? new Vec(true)
		this.N = N$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Outer {
		return new Outer(true, this.In.clone(), this.N)
	}

	public __goscriptAssign(source: Outer): this {
		this.In.__goscriptAssign(source.In)
		this.N = source.N
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Outer",
		() => new Outer(),
		() => [],
		Outer,
		() => [{ name: "In", key: "In", type: "main.Vec" }, { name: "N", key: "N", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class Celsius {
	public declare X: number

	public declare Y: number

	constructor(__goscriptValue?: boolean, X$?: number, Y$?: number) {
		this.X = X$ ?? 0
		this.Y = Y$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Celsius {
		return new Celsius(true, this.X, this.Y)
	}

	public __goscriptAssign(source: Celsius): this {
		this.X = source.X
		this.Y = source.Y
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Celsius",
		() => new Celsius(),
		() => [],
		Celsius,
		() => [{ name: "X", key: "X", type: /* @__PURE__ */ $.basicType("float32") }, { name: "Y", key: "Y", type: /* @__PURE__ */ $.basicType("float32") }]
	)
}

export async function main(): globalThis.Promise<void> {
	// A box holds a copy of the value, which later writes do not change.
	let v = new Vec(true, 1, 2)
	let a: any = $.structInterfaceValue((v).clone(), "main.Vec", "main.Vec")
	v.X = 10
	let b = ($.mustTypeAssert<Vec>(a, "main.Vec")).clone()
	b.Y = 20
	await $.println($.mustTypeAssert<Vec>(a, "main.Vec").X, $.mustTypeAssert<Vec>(a, "main.Vec").Y, v.X, b.Y)

	// The box has the dynamic type of the value and its methods.
	let s: Summer | null = $.structInterfaceValue<Summer | null>(new Vec(true, 3, 4), "main.Vec", "main.Vec")
	let [, isVec] = $.typeAssertTuple<Vec>(s, "main.Vec")
	let [, isPtr] = $.typeAssertTuple<Vec | $.VarRef<Vec> | null>(s, /* @__PURE__ */ $.pointerType("main.Vec"))
	let [, isCelsius] = $.typeAssertTuple<Celsius>($.structInterfaceValue(new Vec(true), "main.Vec", "main.Vec"), "main.Celsius")
	await $.println((__goscriptAwait = (s !== null && (s as any).__isVarRef !== true && ((s as any).__goValue === undefined || (s as any).__goType?.charCodeAt(0) !== 42) ? (s as Exclude<Summer, null>) : $.pointerValue<Exclude<Summer, null>>(s)).Sum(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), isVec, isPtr, isCelsius)

	// Boxes compare by type and value, also as map keys.
	await $.println($.comparableEqual($.structInterfaceValue(new Vec(true, 1, 2), "main.Vec", "main.Vec"), $.structInterfaceValue(new Vec(true, 1, 2), "main.Vec", "main.Vec")), $.comparableEqual($.structInterfaceValue(new Vec(true, 1, 2), "main.Vec", "main.Vec"), $.structInterfaceValue(new Vec(true, 2, 1), "main.Vec", "main.Vec")), $.comparableEqual($.structInterfaceValue(new Vec(true), "main.Vec", "main.Vec"), $.structInterfaceValue(new Celsius(true), "main.Celsius", "main.Celsius")))
	let m = $.makeMap<any, number>([])
	for (let i = 0; i < 5; i++) {
		$.mapSet(m, $.structInterfaceValue(new Vec(true, globalThis.Math.fround(i), 1), "main.Vec", "main.Vec"), i)
		$.mapSet(m, $.structInterfaceValue(new Celsius(true, globalThis.Math.fround(i), 1), "main.Celsius", "main.Celsius"), 10 + i)
	}
	await $.println($.len(m), $.mapGet<any, number, number>(m, $.structInterfaceValue(new Vec(true, 3, 1), "main.Vec", "main.Vec"), 0)[0], $.mapGet<any, number, number>(m, $.structInterfaceValue(new Celsius(true, 3, 1), "main.Celsius", "main.Celsius"), 0)[0])

	// Values with slice, pointer and nested struct fields box too.
	let n = new Named(true, "a", $.arrayToSlice<string>(["x"]), new Named(false, "b"))
	let na: any = $.structInterfaceValue((n).clone(), "main.Named", "main.Named")
	n.Name = "changed"
	$.sliceElems(n.Tags!)[$.sliceSlot(n.Tags!, 0)] = "y"
	let got = ($.mustTypeAssert<Named>(na, "main.Named")).clone()
	await $.println(got.Name, $.arrayIndex(got.Tags!, 0), $.pointerValue<Named>(got.Next).Name)
	let o = new Outer(true, new Vec(true, 5, 6), 7)
	let oa: any = $.structInterfaceValue((o).clone(), "main.Outer", "main.Outer")
	o.In.X = 50
	await $.println($.mustTypeAssert<Outer>(oa, "main.Outer").In.X, $.mustTypeAssert<Outer>(oa, "main.Outer").N)

	// A type switch and a value method on a boxed value.
	for (let __goscriptRangeTarget0 = $.arrayToSlice<any>([$.structInterfaceValue(new Vec(true, 1, 1), "main.Vec", "main.Vec"), $.structInterfaceValue(new Celsius(true, 2, 2), "main.Celsius", "main.Celsius"), $.interfaceValue(new Vec(false, 3, 3), "*main.Vec", /* @__PURE__ */ $.pointerType("main.Vec")), $.structInterfaceValue(new Outer(true), "main.Outer", "main.Outer")]), __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let x = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as any)
		{
			const __goscriptTypeSwitchValue = x
			switch (true) {
				case $.typeAssert<Vec>(__goscriptTypeSwitchValue, "main.Vec").ok:
					{
						let t: Vec = $.markAsStructValue($.cloneStructValue($.typeAssert<Vec>(__goscriptTypeSwitchValue, "main.Vec").value))
						await $.println("Vec", t.Sum())
					}
					break
				case $.typeAssert<Celsius>(__goscriptTypeSwitchValue, "main.Celsius").ok:
					{
						let t: Celsius = $.markAsStructValue($.cloneStructValue($.typeAssert<Celsius>(__goscriptTypeSwitchValue, "main.Celsius").value))
						await $.println("Celsius", t.X)
					}
					break
				case $.typeAssert<Vec | $.VarRef<Vec> | null>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.pointerType("main.Vec")).ok:
					{
						let t: Vec | $.VarRef<Vec> | null = $.typeAssert<Vec | $.VarRef<Vec> | null>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.pointerType("main.Vec")).value
						await $.println("*Vec", $.pointerValue<Vec>(t).Sum())
					}
					break
				default:
					{
						let t: any = __goscriptTypeSwitchValue
						await $.println("other")
					}
					break
			}
		}
	}
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
