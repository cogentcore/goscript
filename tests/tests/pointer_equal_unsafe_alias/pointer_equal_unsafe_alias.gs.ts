// Generated file based on pointer_equal_unsafe_alias.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as unsafe from "@goscript/unsafe/index.js"
import "@goscript/unsafe/index.js"

export class first {
	public declare X: number

	constructor(__goscriptValue?: boolean, X$?: number) {
		this.X = X$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): first {
		return new first(true, this.X)
	}

	public __goscriptAssign(source: first): this {
		this.X = source.X
		return this
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
	public declare X: number

	constructor(__goscriptValue?: boolean, X$?: number) {
		this.X = X$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): second {
		return new second(true, this.X)
	}

	public __goscriptAssign(source: second): this {
		this.X = source.X
		return this
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
	let a = new first(false, 1)
	let other = new first(false, 1)
	await $.println("same:", (a === a || $.pointerMayAlias(a) && $.pointerEqual(a, a)), (a !== a && !($.pointerMayAlias(a) && $.pointerEqual(a, a))))
	await $.println("distinct:", (a === other || $.pointerMayAlias(a) && $.pointerEqual(a, other)), (a !== other && !($.pointerMayAlias(a) && $.pointerEqual(a, other))))

	// A view of another type, converted back, is the same pointer.
	let view = (a as any)
	let back = (view as any)
	await $.println("back:", (a === back || $.pointerMayAlias(a) && $.pointerEqual(a, back)), (a !== back && !($.pointerMayAlias(a) && $.pointerEqual(a, back))), (back === a || $.pointerMayAlias(back) && $.pointerEqual(back, a)))
	await $.println("still distinct:", (a === other || $.pointerMayAlias(a) && $.pointerEqual(a, other)), (back !== other && !($.pointerMayAlias(back) && $.pointerEqual(back, other))))

	// Fields and elements reached through the pointers agree.
	$.pointerValue<second>(view).X = 7
	await $.println("shared:", $.pointerValue<first>(a).X, $.pointerValue<first>(back).X)
	let items = $.arrayToSlice<first | $.VarRef<first> | null>([other, a])
	let found = -1
	for (let __goscriptRangeTarget0 = items, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), i = 0; i < __goscriptRangeWindow0.length; i++) {
		let item = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + i] as first | $.VarRef<first> | null)
		if ((item === back || $.pointerMayAlias(item) && $.pointerEqual(item, back))) {
			found = i
		}
	}
	await $.println("found:", found)
}

if ($.isMainScript(import.meta)) {
	await main()
}
