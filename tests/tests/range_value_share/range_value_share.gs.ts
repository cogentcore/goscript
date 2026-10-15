// Generated file based on range_value_share.go
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

export class box {
	public declare Min: point

	public declare Max: point

	public declare Name: string

	constructor(init?: Partial<{Min?: point, Max?: point, Name?: string}>, __goscriptValue?: boolean) {
		this.Min = init?.Min ? init.Min.clone() : new point(undefined, true)
		this.Max = init?.Max ? init.Max.clone() : new point(undefined, true)
		this.Name = init?.Name ?? ("" as string)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): box {
		return new box(this, true)
	}

	public __goscriptAssign(source: box): this {
		this.Min.__goscriptAssign(source.Min)
		this.Max.__goscriptAssign(source.Max)
		this.Name = source.Name
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.box",
		() => new box(),
		() => [],
		box,
		() => [{ name: "Min", key: "Min", type: "main.point" }, { name: "Max", key: "Max", type: "main.point" }, { name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export let boxes: $.Slice<box> = null! as $.Slice<box>

export function __goscript_set_boxes(__goscriptValue: $.Slice<box>): void {
	boxes = __goscriptValue
}

export function find(name: string): box {
	for (let __goscriptRangeTarget0 = boxes, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let b = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as box)
		if ($.stringEqual(b.Name, name)) {
			return (b).clone()
		}
	}
	return new box(undefined, true)
}

export function widen(i: number): void {
	$.arrayIndex(boxes!, i).Max.X += 100
}

export async function main(): globalThis.Promise<void> {
	boxes = $.arrayToSlice<box>([new box({Min: new point({X: 1, Y: 2}, true), Max: new point({X: 3, Y: 4}, true), Name: "a"}, true), new box({Min: new point({X: 5, Y: 6}, true), Max: new point({X: 7, Y: 8}, true), Name: "b"}, true)])

	// A value that the body only reads.
	let sum = 0
	for (let __goscriptRangeTarget1 = boxes, __goscriptRangeWindow1 = $.sliceRange(__goscriptRangeTarget1), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow1.length; __rangeIndex++) {
		let b = (__goscriptRangeWindow1.backing[__goscriptRangeWindow1.offset + __rangeIndex] as box)
		sum += (b.Max.X - b.Min.X) + $.stringLen(b.Name)
	}
	await $.println("sum:", sum)

	// A returned value is a copy of the element.
	let found = find("b")
	found.Max.X = 70
	await $.println("found:", found.Max.X, $.arrayIndex(boxes!, 1).Max.X)

	// A store into the element leaves the value as it was.
	for (let __goscriptRangeTarget2 = boxes, __goscriptRangeWindow2 = $.sliceRange(__goscriptRangeTarget2), i = 0; i < __goscriptRangeWindow2.length; i++) {
		let b = ((__goscriptRangeWindow2.backing[__goscriptRangeWindow2.offset + i] as box)).clone();
		;((__goscriptRangeWindow2.backing as any[])[__goscriptRangeWindow2.offset + i] as box).Min.X = 10 * (i + 1)
		await $.println("store:", b.Min.X, ((__goscriptRangeWindow2.backing as any[])[__goscriptRangeWindow2.offset + i] as box).Min.X)
	}

	// A call that changes the element leaves the value as it was.
	for (let __goscriptRangeTarget3 = boxes, __goscriptRangeWindow3 = $.sliceRange(__goscriptRangeTarget3), i = 0; i < __goscriptRangeWindow3.length; i++) {
		let b = ((__goscriptRangeWindow3.backing[__goscriptRangeWindow3.offset + i] as box)).clone()
		widen(i)
		await $.println("call:", b.Max.X, ((__goscriptRangeWindow3.backing as any[])[__goscriptRangeWindow3.offset + i] as box).Max.X)
	}

	// A copy made in the body is its own value.
	let last: box = new box(undefined, true)
	for (let __goscriptRangeTarget4 = boxes, __goscriptRangeWindow4 = $.sliceRange(__goscriptRangeTarget4), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow4.length; __rangeIndex++) {
		let b = ((__goscriptRangeWindow4.backing[__goscriptRangeWindow4.offset + __rangeIndex] as box)).clone()
		let c = (b).clone()
		c.Name = "copy"
		last = last.__goscriptAssign(b)
		await $.println("copy:", b.Name, c.Name)
	}
	last.Min.Y = -1
	await $.println("last:", last.Name, last.Min.Y, $.arrayIndex(boxes!, 1).Min.Y)

	// A changed value is its own copy.
	for (let __goscriptRangeTarget5 = boxes, __goscriptRangeWindow5 = $.sliceRange(__goscriptRangeTarget5), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow5.length; __rangeIndex++) {
		let b = ((__goscriptRangeWindow5.backing[__goscriptRangeWindow5.offset + __rangeIndex] as box)).clone()
		b.Min.Y++
		await $.println("changed:", b.Min.Y, $.arrayIndex(boxes!, 0).Min.Y)
	}

	// Array elements.
	let grid = $.arrayToSlice<number[]>([$.arrayValue([1, 2]), $.arrayValue([3, 4])])
	let total = 0
	for (let __goscriptRangeTarget7 = grid, __goscriptRangeWindow6 = $.sliceRange(__goscriptRangeTarget7), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow6.length; __rangeIndex++) {
		let row = (__goscriptRangeWindow6.backing[__goscriptRangeWindow6.offset + __rangeIndex] as number[])
		for (let __goscriptRangeTarget6 = row, __goscriptRangeWindow7 = $.sliceRange(__goscriptRangeTarget6), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow7.length; __rangeIndex++) {
			let v = (__goscriptRangeWindow7.backing[__goscriptRangeWindow7.offset + __rangeIndex] as number)
			total += v
		}
	}
	await $.println("grid:", total)
	for (let __goscriptRangeTarget8 = grid, __goscriptRangeWindow8 = $.sliceRange(__goscriptRangeTarget8), i = 0; i < __goscriptRangeWindow8.length; i++) {
		let row = $.cloneArrayValue((__goscriptRangeWindow8.backing[__goscriptRangeWindow8.offset + i] as number[]), /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int"), 2));
		;((__goscriptRangeWindow8.backing as any[])[__goscriptRangeWindow8.offset + i] as number[])[0] = 9
		await $.println("grid store:", $.arrayIndex(row, 0), $.arrayIndex(((__goscriptRangeWindow8.backing as any[])[__goscriptRangeWindow8.offset + i] as number[]), 0))
	}

	// Interface values hold copies.
	let held: $.Slice<any> = null! as $.Slice<any>
	for (let __goscriptRangeTarget9 = boxes, __goscriptRangeWindow9 = $.sliceRange(__goscriptRangeTarget9), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow9.length; __rangeIndex++) {
		let b = ((__goscriptRangeWindow9.backing[__goscriptRangeWindow9.offset + __rangeIndex] as box)).clone()
		let v: any = $.interfaceValue((b).clone(), "main.box", "main.box")
		held = $.appendOne(held, v, $.appendZeros.nil)
	}
	$.arrayIndex(boxes!, 0).Name = "z"
	await $.println("held:", $.mustTypeAssert<box>($.arrayIndex(held!, 0), "main.box").Name, $.arrayIndex(boxes!, 0).Name)
}

if ($.isMainScript(import.meta)) {
	await main()
}
