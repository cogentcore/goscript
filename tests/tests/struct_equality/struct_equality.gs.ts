// Generated file based on struct_equality.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Hash = ObjectID

export class ObjectID {
	public declare hash: Uint8Array

	public declare format: number

	constructor(init?: Partial<{hash?: Uint8Array, format?: number}>, __goscriptValue?: boolean) {
		this.hash = init?.hash !== undefined ? $.cloneArrayValue(init.hash, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 4)) : $.arrayValue(new Uint8Array(4))
		this.format = init?.format ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): ObjectID {
		return new ObjectID(this, true)
	}

	public __goscriptAssign(source: ObjectID): this {
		this.hash = $.assignFieldValue(this.hash, source.hash, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 4))
		this.format = source.format
		return this
	}

	public IsZero(): boolean {
		const s = this;
		return $.structEqual(s, new ObjectID(undefined, true))
	}

	public Valid(): boolean {
		const s = this;
		return !$.structEqual(s, new ObjectID(undefined, true))
	}

	static __typeInfo = $.registerStructType(
		"main.ObjectID",
		() => new ObjectID(),
		() => [{ name: "IsZero", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }] }, { name: "Valid", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }] }],
		ObjectID,
		() => [{ name: "hash", key: "hash", type: /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 4) }, { name: "format", key: "format", type: /* @__PURE__ */ $.basicType("uint8") }]
	)
}

export class S {
	public declare A: string

	public declare B: number

	constructor(init?: Partial<{A?: string, B?: number}>, __goscriptValue?: boolean) {
		this.A = init?.A ?? ("" as string)
		this.B = init?.B ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): S {
		return new S(this, true)
	}

	public __goscriptAssign(source: S): this {
		this.A = source.A
		this.B = source.B
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.S",
		() => new S(),
		() => [],
		S,
		() => [{ name: "A", key: "A", type: /* @__PURE__ */ $.basicType("string") }, { name: "B", key: "B", type: /* @__PURE__ */ $.basicType("float64") }]
	)
}

export class Outer {
	public declare In: S

	public declare N: number

	constructor(init?: Partial<{In?: S, N?: number}>, __goscriptValue?: boolean) {
		this.In = init?.In ? init.In.clone() : new S(undefined, true)
		this.N = init?.N ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Outer {
		return new Outer(this, true)
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
		() => [{ name: "In", key: "In", type: "main.S" }, { name: "N", key: "N", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export function take(x: any): void {
	{
		const __goscriptTypeSwitchValue = x
		switch (true) {
			case $.typeAssert<S | $.VarRef<S> | null>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.pointerType("main.S")).ok:
				{
				}
				break
		}
	}
}

export function keep(x: any): any {
	return x
}

export async function main(): globalThis.Promise<void> {
	let zero: Hash = new ObjectID(undefined, true)
	let otherZero = new ObjectID(undefined, true)
	let one = new ObjectID({hash: $.arrayValue(new Uint8Array([0, 7, 0, 0]))}, true)
	let otherOne = new ObjectID({hash: $.arrayValue(new Uint8Array([0, 7, 0, 0]))}, true)
	let different = new ObjectID({hash: $.arrayValue(new Uint8Array([0, 0, 7, 0]))}, true)

	await $.println("zero is zero:", zero.IsZero())
	await $.println("zero valid:", zero.Valid())
	await $.println("zero equals zero:", $.structEqual(zero, otherZero))
	await $.println("one valid:", one.Valid())
	await $.println("one equals other one:", $.structEqual(one, otherOne))
	await $.println("one differs:", !$.structEqual(one, different))

	// struct values compare by fields after passing a pointer as an interface
	let s = new S({A: "x", B: 1.5}, true)
	let n = new S({A: "x", B: 1.5})
	take($.interfaceValue(n, "*main.S", /* @__PURE__ */ $.pointerType("main.S")))
	await $.println($.structEqual($.pointerValue<S>(n), s))
	let m = new S({A: "x", B: 1.5})
	keep($.interfaceValue(m, "*main.S", /* @__PURE__ */ $.pointerType("main.S")))
	await $.println($.structEqual($.pointerValue<S>(m), s), $.structEqual(s, $.pointerValue<S>(m)))
	let v: any = $.interfaceValue((s).clone(), "main.S", "main.S")
	await $.println($.structEqual($.mustTypeAssert<S>(v, "main.S"), s))

	// nested struct field passed as a pointer
	let o1 = new Outer({In: new S({A: "y"}, true), N: 2}, true)
	let o2 = new Outer({In: new S({A: "y"}, true), N: 2}, true)
	take($.interfaceValue($.fieldRef(o1, "In"), "*main.S", /* @__PURE__ */ $.pointerType("main.S")))
	await $.println($.structEqual(o1, o2), $.structEqual(o1.In, o2.In))
	o2.In.B = 3
	await $.println($.structEqual(o1, o2))

	// interface comparisons keep dynamic type and pointer identity
	let p1: any = $.interfaceValue(new S({A: "z"}), "*main.S", /* @__PURE__ */ $.pointerType("main.S"))
	let p2: any = $.interfaceValue(new S({A: "z"}), "*main.S", /* @__PURE__ */ $.pointerType("main.S"))
	await $.println($.comparableEqual(p1, p2), $.comparableEqual(p1, p1))
	let i1: any = $.interfaceValue(new S({A: "z"}, true), "main.S", "main.S")
	let i2: any = $.interfaceValue(new S({A: "z"}), "*main.S", /* @__PURE__ */ $.pointerType("main.S"))
	await $.println($.comparableEqual(i1, i2), $.comparableEqual(i1, $.interfaceValue(new S({A: "z"}, true), "main.S", "main.S")))
}

if ($.isMainScript(import.meta)) {
	await main()
}
