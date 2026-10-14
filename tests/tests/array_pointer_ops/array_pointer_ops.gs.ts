// Generated file based on array_pointer_ops.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class item {
	public get value(): number {
		return this._fields.value
	}

	public set value(value: number) {
		this._fields.value = value
	}

	public _fields: {
		value: number
	}

	constructor(init?: Partial<{value?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			value: init?.value ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): item {
		return new item(this, true)
	}

	public __goscriptAssign(source: item): void {
		const target = this._fields
		const values = source._fields
		target.value = values.value
	}

	static __typeInfo = $.registerStructType(
		"main.item",
		() => new item(),
		() => [],
		item,
		() => [{ name: "value", key: "value", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class arrays {
	public get slices(): $.Slice<number>[] {
		return this._fields.slices
	}

	public set slices(value: $.Slice<number>[]) {
		this._fields.slices = value
	}

	public get items(): item[] {
		return this._fields.items
	}

	public set items(value: item[]) {
		this._fields.items = value
	}

	public _fields: {
		slices: $.Slice<number>[]
		items: item[]
	}

	constructor(init?: Partial<{slices?: $.Slice<number>[], items?: item[]}>, __goscriptValue?: boolean) {
		this._fields = {
			slices: init?.slices !== undefined ? $.cloneArrayValue(init.slices, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")), 1)) : $.arrayValue(globalThis.Array.from({ length: 1 }, () => null)),
			items: init?.items !== undefined ? $.cloneArrayValue(init.items, /* @__PURE__ */ $.arrayType("main.item", 1)) : $.arrayValue(globalThis.Array.from({ length: 1 }, () => new item(undefined, true)), /* @__PURE__ */ $.arrayType("main.item", 1))
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): arrays {
		return new arrays(this, true)
	}

	public __goscriptAssign(source: arrays): void {
		const target = this._fields
		const values = source._fields
		target.slices = $.assignFieldValue(target.slices, values.slices, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")), 1))
		target.items = $.assignFieldValue(target.items, values.items, /* @__PURE__ */ $.arrayType("main.item", 1))
	}

	static __typeInfo = $.registerStructType(
		"main.arrays",
		() => new arrays(),
		() => [],
		arrays,
		() => [{ name: "slices", key: "slices", type: /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")), 1) }, { name: "items", key: "items", type: /* @__PURE__ */ $.arrayType("main.item", 1) }]
	)
}

export function fillArray(dst: $.VarRef<Uint8Array> | null): void {
	for (let __goscriptRangeTarget0 = $.pointerValue<Uint8Array>(dst), __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), i = 0; i < __goscriptRangeWindow0.length; i++) {
		$.pointerValue<Uint8Array>(dst)[i] = $.uint($.uint(i + 1, 8), 8)
	}
}

export function sumArray(src: $.VarRef<Uint8Array> | null): number {
	let sum = 0
	for (let __goscriptRangeTarget1 = $.pointerValue<Uint8Array>(src), __goscriptRangeWindow1 = $.sliceRange(__goscriptRangeTarget1), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow1.length; __rangeIndex++) {
		let v = $.uint((__goscriptRangeWindow1.backing[__goscriptRangeWindow1.offset + __rangeIndex] as number), 8)
		sum = sum + ($.int(v))
	}
	return sum
}

export function closureArrayAddress(): number {
	let result = 0
	void ((): void => {
		let table = $.varRef($.arrayValue(new Uint8Array([6, 7, 8, 9])))
		let ptr: $.VarRef<Uint8Array> | null = table
		result = $.int($.arrayIndex($.pointerValue<Uint8Array>(ptr), 2))
	})()
	return result
}

export async function main(): globalThis.Promise<void> {
	let slices = $.arrayValue([$.arrayToSlice<number>([1])])
	let slicesCopy = $.cloneArrayValue(slices, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")), 1))
	$.arrayIndex(slicesCopy, 0)![0] = 7
	await $.println("slice sharing:", $.arrayIndex($.arrayIndex(slices, 0)!, 0))

	let structs = $.arrayValue([new item({value: 1}, true)], /* @__PURE__ */ $.arrayType("main.item", 1))
	let structsCopy = $.cloneArrayValue(structs, /* @__PURE__ */ $.arrayType("main.item", 1))
	$.arrayIndex(structsCopy, 0).value = 7
	await $.println("struct copy:", $.arrayIndex(structs, 0).value, $.arrayIndex(structsCopy, 0).value)

	let pointers = $.arrayValue([new item({value: 1})])
	let pointersCopy = $.cloneArrayValue(pointers, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.pointerType("main.item"), 1))
	$.pointerValue<item>($.arrayIndex(pointersCopy, 0)).value = 7
	await $.println("pointer sharing:", $.pointerValue<item>($.arrayIndex(pointers, 0)).value, $.pointerEqual($.arrayIndex(pointers, 0), $.arrayIndex(pointersCopy, 0)))

	let original = new arrays({slices: $.cloneArrayValue(slices, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")), 1)), items: $.cloneArrayValue(structs, /* @__PURE__ */ $.arrayType("main.item", 1))}, true)
	let copied = (original).clone()
	$.arrayIndex(copied.slices, 0)![0] = 8
	$.arrayIndex(copied.items, 0).value = 8
	await $.println("array fields:", $.arrayIndex($.arrayIndex(original.slices, 0)!, 0), $.arrayIndex(original.items, 0).value, $.arrayIndex(copied.items, 0).value)

	// Assigning an array element copies its value instead of aliasing the row.
	let rows = $.arrayValue([$.arrayValue([1, 2]), $.arrayValue([3, 4])], /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int32"), 2), 2))
	rows[1] = $.cloneArrayValue($.arrayIndex(rows, 0), /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int32"), 2))
	$.arrayIndex(rows, 1)[0] = 9
	await $.println("row copy:", $.int($.arrayIndex($.arrayIndex(rows, 0), 0), 32), $.int($.arrayIndex($.arrayIndex(rows, 0), 1), 32), $.int($.arrayIndex($.arrayIndex(rows, 1), 0), 32), $.int($.arrayIndex($.arrayIndex(rows, 1), 1), 32))

	let buckets: bigint[][] = $.arrayValue(globalThis.Array.from({ length: 2 }, () => $.arrayValue(globalThis.Array.from({ length: 3 }, () => 0n))), /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint64"), 3), 2))
	let cache: $.VarRef<bigint[]> | null = $.indexRef(buckets, 1)

	await $.println("len:", 3)

	$.pointerValue<bigint[]>(cache)[0] = 5n
	$.pointerValue<bigint[]>(cache)[1] = 7n
	await $.println("index:", $.arrayIndex($.pointerValue<bigint[]>(cache), 0), $.arrayIndex($.pointerValue<bigint[]>(cache), 1))

	for (let __goscriptRangeTarget2 = $.pointerValue<bigint[]>(cache), __goscriptRangeWindow2 = $.sliceRange(__goscriptRangeTarget2), i = 0; i < __goscriptRangeWindow2.length; i++) {
		let x = (__goscriptRangeWindow2.backing[__goscriptRangeWindow2.offset + i] as bigint)
		await $.println("range:", i, x)
	}

	let view: $.Slice<bigint> = $.goSlice($.pointerValue<bigint[]>(cache), undefined, undefined)
	await $.println("slice:", $.sliceLen(view), $.arrayIndex(view!, 2))

	let buf: $.Slice<number> = new Uint8Array([9, 0, 0, 0, 0]) as $.Slice<number>
	fillArray(($.sliceToArrayPointer<number>($.goSlice(buf, 1, undefined), 4, "byte") as $.VarRef<Uint8Array> | null))
	await $.println("converted:", $.uint($.arrayIndex(buf!, 0), 8), $.uint($.arrayIndex(buf!, 1), 8), $.uint($.arrayIndex(buf!, 2), 8), $.uint($.arrayIndex(buf!, 3), 8), $.uint($.arrayIndex(buf!, 4), 8))
	await $.println("converted sum:", sumArray(($.sliceToArrayPointer<number>($.goSlice(buf, 1, undefined), 4, "byte") as $.VarRef<Uint8Array> | null)))

	let literal: $.VarRef<Uint8Array> | null = $.varRef($.arrayValue(new Uint8Array([4, 3, 2, 1])))
	await $.println("literal sum:", sumArray(literal))
	fillArray(literal)
	await $.println("literal filled:", $.uint($.arrayIndex($.pointerValue<Uint8Array>(literal), 0), 8), $.uint($.arrayIndex($.pointerValue<Uint8Array>(literal), 1), 8), $.uint($.arrayIndex($.pointerValue<Uint8Array>(literal), 2), 8), $.uint($.arrayIndex($.pointerValue<Uint8Array>(literal), 3), 8))
	await $.println("closure ptr:", closureArrayAddress())
}

if ($.isMainScript(import.meta)) {
	await main()
}
