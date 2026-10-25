// Generated file based on switch_statement.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export async function main(): globalThis.Promise<void> {
	let i = 2
	await $.println("Integer switch:")
	switch (i) {
		case 1:
		{
			await $.println("one")
			break
		}
		case 2:
		{
			await $.println("two")
			break
		}
		case 3:
		{
			await $.println("three")
			break
		}
		default:
		{
			await $.println("other integer")
			break
		}
	}

	let s = "hello"
	await $.println("\nString switch:")
	switch (s) {
		case "world":
		{
			await $.println("world")
			break
		}
		case "hello":
		{
			await $.println("hello")
			break
		}
		default:
		{
			await $.println("other string")
			break
		}
	}
	let x = -5
	await $.println("\nSwitch without expression:")
	switch ((true as boolean)) {
		case x < 0:
		{
			await $.println("negative")
			break
		}
		case x == 0:
		{
			await $.println("zero")
			break
		}
		default:
		{
			await $.println("positive")
			break
		}
	}

	x = 0
	await $.println("\nSwitch without expression (zero):")
	switch ((true as boolean)) {
		case x < 0:
		{
			await $.println("negative")
			break
		}
		case x == 0:
		{
			await $.println("zero")
			break
		}
		default:
		{
			await $.println("positive")
			break
		}
	}

	x = 10
	await $.println("\nSwitch without expression (positive):")
	switch ((true as boolean)) {
		case x < 0:
		{
			await $.println("negative")
			break
		}
		case x == 0:
		{
			await $.println("zero")
			break
		}
		default:
		{
			await $.println("positive")
			break
		}
	}

	// Conditions set only inside a callback are still runtime values.
	let data: $.Slice<number> = null! as $.Slice<number>
	let rejected = false
	hold($.functionValue(() => {
		data = new Uint8Array([120])
		rejected = true
	}, ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo)))
	await $.println("\nSwitch on conditions set in a callback:")
	switch ((true as boolean)) {
		case (data == null) && rejected:
		{
			await $.println("rejected")
			break
		}
		case data == null:
		{
			await $.println("missing")
			break
		}
		default:
		{
			await $.println("found")
			break
		}
	}

	// Arrays, structs, and complex numbers match their cases by value.
	let slots = $.arrayToSlice<bigint[]>([$.arrayValue([3n, 4n]), $.arrayValue(globalThis.Array.from({ length: 2 }, () => 0n))])
	await $.println("\nArray switch:")
	for (let __goscriptRangeTarget0 = slots, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let slot = $.cloneArrayValue((__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as bigint[]), /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint64"), 2))
		{
			let __goscriptSwitch0 = slot
			switch ((true as boolean)) {
				case $.arrayEqual(__goscriptSwitch0, $.arrayValue([3n, 4n])):
				{
					await $.println("three four")
					break
				}
				case $.arrayEqual(__goscriptSwitch0, $.arrayValue(globalThis.Array.from({ length: 2 }, () => 0n))):
				{
					await $.println("empty")
					break
				}
			}
		}
	}
	class point {
		public declare x: number

		public declare y: number

		constructor(init?: Partial<{x?: number, y?: number}>, __goscriptValue?: boolean) {
			this.x = init?.x ?? (0 as number)
			this.y = init?.y ?? (0 as number)
			;(this as any).__goStructValue = __goscriptValue === true
		}

		public clone(): point {
			return new point(this, true)
		}

		public __goscriptAssign(source: point): this {
			this.x = source.x
			this.y = source.y
			return this
		}

		static __typeInfo = $.registerStructType(
			"main.point",
			() => new point(),
			() => [],
			point,
			() => [{ name: "x", key: "x", type: /* @__PURE__ */ $.basicType("int") }, { name: "y", key: "y", type: /* @__PURE__ */ $.basicType("int") }]
		)
	}
	await $.println("\nStruct switch:")
	{
		let p = ($.markAsStructValue(new point({x: 1, y: 2})))
		let __goscriptSwitch1 = p
		switch ((true as boolean)) {
			case $.structEqual(__goscriptSwitch1, $.markAsStructValue(new point({x: 2, y: 1}))):
			{
				await $.println("two one")
				break
			}
			case $.structEqual(__goscriptSwitch1, $.markAsStructValue(new point({x: 1, y: 2}))):
			{
				await $.println("one two")
				break
			}
		}
	}
	await $.println("\nComplex switch:")
	{
		let c = $.complex(1, 2)
		let __goscriptSwitch2 = c
		switch ((true as boolean)) {
			case $.arrayEqual(__goscriptSwitch2, $.complex(1, 2)):
			{
				await $.println("one plus two i")
				break
			}
			default:
			{
				await $.println("other complex")
				break
			}
		}
	}

	// A string built from bytes that are not UTF-8 matches its constant.
	let binary = $.bytesToString(new Uint8Array([255, 97]) as $.Slice<number>)
	await $.println("\nBinary string switch:")
	switch (binary) {
		case "\xffa":
		{
			await $.println("binary")
			break
		}
		default:
		{
			await $.println("other binary")
			break
		}
	}

	let ptr: $.VarRef<number> | null = null! as $.VarRef<number> | null
	let err: $.GoError = null! as $.GoError
	await $.println("\nNil pointer and interface switch:")
	{
		let __goscriptSwitch3 = ptr
		switch ((true as boolean)) {
			case __goscriptSwitch3 == null:
			{
				await $.println("nil pointer")
				break
			}
			default:
			{
				await $.println("pointer")
				break
			}
		}
	}
	{
		let __goscriptSwitch4 = err
		switch ((true as boolean)) {
			case __goscriptSwitch4 == null:
			{
				await $.println("nil error")
				break
			}
			default:
			{
				await $.println("error")
				break
			}
		}
	}
}

export function hold(fn: (() => void) | null): void {
	fn!()
}

if ($.isMainScript(import.meta)) {
	await main()
}
