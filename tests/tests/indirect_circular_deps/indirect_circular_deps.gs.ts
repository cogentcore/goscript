// Generated file based on indirect_circular_deps.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class A {
	public get BB(): $.Slice<B> {
		return this._fields.BB
	}

	public set BB(value: $.Slice<B>) {
		this._fields.BB = value
	}

	public _fields: {
		BB: $.Slice<B>
	}

	constructor(init?: Partial<{BB?: $.Slice<B>}>, __goscriptValue?: boolean) {
		this._fields = {
			BB: init?.BB ?? (null! as $.Slice<B>)
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): A {
		return new A(this, true)
	}

	public __goscriptAssign(source: A): void {
		const target = this._fields
		const values = source._fields
		target.BB = values.BB
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
	public get AA(): $.Slice<A> {
		return this._fields.AA
	}

	public set AA(value: $.Slice<A>) {
		this._fields.AA = value
	}

	public _fields: {
		AA: $.Slice<A>
	}

	constructor(init?: Partial<{AA?: $.Slice<A>}>, __goscriptValue?: boolean) {
		this._fields = {
			AA: init?.AA ?? (null! as $.Slice<A>)
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): B {
		return new B(this, true)
	}

	public __goscriptAssign(source: B): void {
		const target = this._fields
		const values = source._fields
		target.AA = values.AA
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
