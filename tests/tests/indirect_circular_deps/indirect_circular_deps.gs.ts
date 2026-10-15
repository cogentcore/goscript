// Generated file based on indirect_circular_deps.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class A {
	public declare BB: $.Slice<B>

	constructor(init?: Partial<{BB?: $.Slice<B>}>, __goscriptValue?: boolean) {
		this.BB = init?.BB ?? (null! as $.Slice<B>)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): A {
		return new A(this, true)
	}

	public __goscriptAssign(source: A): this {
		this.BB = source.BB
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.A",
		() => new A(),
		() => [],
		A,
		() => [{ name: "BB", key: "BB", type: /* @__PURE__ */ $.sliceType("main.B") }]
	)
}

export class B {
	public declare AA: $.Slice<A>

	constructor(init?: Partial<{AA?: $.Slice<A>}>, __goscriptValue?: boolean) {
		this.AA = init?.AA ?? (null! as $.Slice<A>)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): B {
		return new B(this, true)
	}

	public __goscriptAssign(source: B): this {
		this.AA = source.AA
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.B",
		() => new B(),
		() => [],
		B,
		() => [{ name: "AA", key: "AA", type: /* @__PURE__ */ $.sliceType("main.A") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let a1 = new A(undefined, true)
	let b1 = new B(undefined, true)

	let a2 = new A({BB: $.arrayToSlice<B>([(b1).clone()])}, true)
	let b2 = new B({AA: $.arrayToSlice<A>([(a1).clone()])}, true)

	await $.println("a1:", a1.BB == null)
	await $.println("b1:", b1.AA == null)
	await $.println("a2 has", $.sliceLen(a2.BB), "B items")
	await $.println("b2 has", $.sliceLen(b2.AA), "A items")
}

if ($.isMainScript(import.meta)) {
	await main()
}
