// Generated file based on range_index_window_access.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class P {
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

	public clone(): P {
		return $.markAsStructValue(new P(this))
	}

	public __goscriptAssign(source: P): void {
		const target = this._fields
		const values = source._fields
		target.X = values.X
		target.Y = values.Y
	}

	static __typeInfo = $.registerStructType(
		"main.P",
		() => new P(),
		() => [],
		P,
		() => [{ name: "X", key: "X", type: /* @__PURE__ */ $.basicType("float32") }, { name: "Y", key: "Y", type: /* @__PURE__ */ $.basicType("float32") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let xs: $.Slice<number> = $.arrayToSlice<number>([1, 2, 3, 4])
	for (let __goscriptRangeTarget0 = xs, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), i = 0; i < __goscriptRangeWindow0.length; i++) {
		(__goscriptRangeWindow0.backing as any[])[__goscriptRangeWindow0.offset + i] = (((__goscriptRangeWindow0.backing as any[])[__goscriptRangeWindow0.offset + i] as number) * 2) + 1
	}
	await $.println($.arrayIndex(xs!, 0), $.arrayIndex(xs!, 3))

	let sub: $.Slice<number> = $.goSlice(xs, 1, 3)
	for (let __goscriptRangeTarget1 = sub, __goscriptRangeWindow1 = $.sliceRange(__goscriptRangeTarget1), i = 0; i < __goscriptRangeWindow1.length; i++) {
		(__goscriptRangeWindow1.backing as any[])[__goscriptRangeWindow1.offset + i] = (__goscriptRangeWindow1.backing as any[])[__goscriptRangeWindow1.offset + i] + (100)
	}
	await $.println($.arrayIndex(xs!, 1), $.arrayIndex(xs!, 2), $.sliceLen(sub))

	let ps: $.Slice<P> = $.arrayToSlice<P>([$.markAsStructValue(new P({X: 1, Y: 2})), $.markAsStructValue(new P({X: 3, Y: 4}))])
	for (let __goscriptRangeTarget2 = ps, __goscriptRangeWindow2 = $.sliceRange(__goscriptRangeTarget2), i = 0; i < __goscriptRangeWindow2.length; i++) {
		let p = $.markAsStructValue($.cloneStructValue((__goscriptRangeWindow2.backing[__goscriptRangeWindow2.offset + i] as P)));
		((__goscriptRangeWindow2.backing as any[])[__goscriptRangeWindow2.offset + i] as P).X = globalThis.Math.fround(p.Y * 2)
		let q = $.markAsStructValue($.cloneStructValue(((__goscriptRangeWindow2.backing as any[])[__goscriptRangeWindow2.offset + i] as P)))
		q.Y = 99
	}
	await $.println($.arrayIndex(ps!, 0).X, $.arrayIndex(ps!, 0).Y, $.arrayIndex(ps!, 1).X)

	let m: $.Slice<$.Slice<number>> = $.arrayToSlice<$.Slice<number>>([$.arrayToSlice<number>([1, 2]), $.arrayToSlice<number>([3, 4])])
	for (let __goscriptRangeTarget4 = m, __goscriptRangeWindow3 = $.sliceRange(__goscriptRangeTarget4), i = 0; i < __goscriptRangeWindow3.length; i++) {
		for (let __goscriptRangeTarget3 = ((__goscriptRangeWindow3.backing as any[])[__goscriptRangeWindow3.offset + i] as $.Slice<number>), __goscriptRangeWindow4 = $.sliceRange(__goscriptRangeTarget3), j = 0; j < __goscriptRangeWindow4.length; j++) {
			((__goscriptRangeWindow3.backing as any[])[__goscriptRangeWindow3.offset + i] as $.Slice<number>)![j] = ((__goscriptRangeWindow3.backing as any[])[__goscriptRangeWindow3.offset + i] as $.Slice<number>)![j] * (10)
		}
	}
	await $.println($.arrayIndex($.arrayIndex(m!, 0)!, 1), $.arrayIndex($.arrayIndex(m!, 1)!, 0))

	let ys: $.Slice<number> = $.arrayToSlice<number>([1, 2, 3])
	let grow: (() => void) | null = $.functionValue((): void => {
		ys = $.append(ys, 9)
	}, ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo))
	for (let __goscriptRangeTarget5 = ys, __goscriptRangeWindow5 = $.sliceRange(__goscriptRangeTarget5), i = 0; i < __goscriptRangeWindow5.length; i++) {
		if (i == 0) {
			void (__goscriptAwait = grow!(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
		}
		ys![i] = ys![i] + (1)
	}
	await $.println($.sliceLen(ys), $.arrayIndex(ys!, 0), $.arrayIndex(ys!, 2), $.arrayIndex(ys!, 3))

	let bs: $.Slice<number> = new Uint8Array([250, 251]) as $.Slice<number>
	for (let __goscriptRangeTarget6 = bs, __goscriptRangeWindow6 = $.sliceRange(__goscriptRangeTarget6), i = 0; i < __goscriptRangeWindow6.length; i++) {
		(__goscriptRangeWindow6.backing as any[])[__goscriptRangeWindow6.offset + i] = $.uint((__goscriptRangeWindow6.backing as any[])[__goscriptRangeWindow6.offset + i] + (10), 8)
	}
	await $.println($.uint($.arrayIndex(bs!, 0), 8), $.uint($.arrayIndex(bs!, 1), 8))

	let f32: number = 1
	for (let i = 0; i < 3; i++) {
		f32 = globalThis.Math.fround((globalThis.Math.fround(f32 * 1.100000023841858)) + (globalThis.Math.fround(globalThis.Math.fround(i) / 3)))
	}
	await $.println($.int(globalThis.Math.fround(f32 * 1e+06)))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
