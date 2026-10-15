// Generated file based on pointer_equal_unsafe_alias.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as unsafe from "@goscript/unsafe/index.js"
import "@goscript/unsafe/index.js"

export class first {
	public get X(): number {
		return this._fields.X
	}

	public set X(value: number) {
		this._fields.X = value
	}

	public _fields: {
		X: number
	}

	constructor(init?: Partial<{X?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			X: init?.X ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): first {
		return new first(this, true)
	}

	public __goscriptAssign(source: first): void {
		const target = this._fields
		const values = source._fields
		target.X = values.X
	}

	static __typeInfo = $.registerStructType(
		"main.first",
		() => new first(),
		() => [],
		first,
		() => [{ name: "X", key: "X", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class second {
	public get X(): number {
		return this._fields.X
	}

	public set X(value: number) {
		this._fields.X = value
	}

	public _fields: {
		X: number
	}

	constructor(init?: Partial<{X?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			X: init?.X ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): second {
		return new second(this, true)
	}

	public __goscriptAssign(source: second): void {
		const target = this._fields
		const values = source._fields
		target.X = values.X
	}

	static __typeInfo = $.registerStructType(
		"main.second",
		() => new second(),
		() => [],
		second,
		() => [{ name: "X", key: "X", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function main(): globalThis.Promise<void> {
	// Distinct pointers before and after an unsafe view is made.
	let a = new first({X: 1})
	let other = new first({X: 1})
	await $.println("same:", (a === a || $.pointerAliasesMade && $.pointerEqual(a, a)), (a !== a && !($.pointerAliasesMade && $.pointerEqual(a, a))))
	await $.println("distinct:", (a === other || $.pointerAliasesMade && $.pointerEqual(a, other)), (a !== other && !($.pointerAliasesMade && $.pointerEqual(a, other))))

	// A view of another type, converted back, is the same pointer.
	let view = (a as any)
	let back = (view as any)
	await $.println("back:", (a === back || $.pointerAliasesMade && $.pointerEqual(a, back)), (a !== back && !($.pointerAliasesMade && $.pointerEqual(a, back))), (back === a || $.pointerAliasesMade && $.pointerEqual(back, a)))
	await $.println("still distinct:", (a === other || $.pointerAliasesMade && $.pointerEqual(a, other)), (back !== other && !($.pointerAliasesMade && $.pointerEqual(back, other))))

	// Fields and elements reached through the pointers agree.
	$.pointerValue<second>(view).X = 7
	await $.println("shared:", $.pointerValue<first>(a).X, $.pointerValue<first>(back).X)
	let items = $.arrayToSlice<first | $.VarRef<first> | null>([other, a])
	let found = -1
	for (let __goscriptRangeTarget0 = items, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), i = 0; i < __goscriptRangeWindow0.length; i++) {
		let item = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + i] as first | $.VarRef<first> | null)
		if ((item === back || $.pointerAliasesMade && $.pointerEqual(item, back))) {
			found = i
		}
	}
	await $.println("found:", found)
}

if ($.isMainScript(import.meta)) {
	await main()
}
