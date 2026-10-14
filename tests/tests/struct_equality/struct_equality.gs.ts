// Generated file based on struct_equality.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Hash = ObjectID

export class ObjectID {
	public declare hash: Uint8Array

	public declare format: number

	public _fields: {
		hash: Uint8Array
		format: number
	}

	constructor(init?: Partial<{hash?: Uint8Array, format?: number}>) {
		this._fields = {
			hash: init?.hash !== undefined ? $.cloneArrayValue(init.hash, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 4)) : $.arrayValue(new Uint8Array(4)),
			format: init?.format ?? (0 as number)
		}
	}

	public clone(): ObjectID {
		return $.markAsStructValue(new ObjectID(this))
	}

	public IsZero(): boolean {
		const s = this;
		return $.structEqual(s, $.markAsStructValue(new ObjectID()))
	}

	public Valid(): boolean {
		const s = this;
		return !$.structEqual(s, $.markAsStructValue(new ObjectID()))
	}

	static {
		$.bindStructFields(this.prototype, ["hash", "format"])
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

	public _fields: {
		A: string
		B: number
	}

	constructor(init?: Partial<{A?: string, B?: number}>) {
		this._fields = {
			A: init?.A ?? ("" as string),
			B: init?.B ?? (0 as number)
		}
	}

	public clone(): S {
		return $.markAsStructValue(new S(this))
	}

	static {
		$.bindStructFields(this.prototype, ["A", "B"])
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

	public _fields: {
		In: S
		N: number
	}

	constructor(init?: Partial<{In?: S, N?: number}>) {
		this._fields = {
			In: init?.In ? $.markAsStructValue($.cloneStructValue(init.In)) : $.markAsStructValue(new S()),
			N: init?.N ?? (0 as number)
		}
	}

	public clone(): Outer {
		return $.markAsStructValue(new Outer(this))
	}

	static {
		$.bindStructFields(this.prototype, ["In", "N"])
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
	let zero: Hash = $.markAsStructValue(new ObjectID())
	let otherZero = $.markAsStructValue(new ObjectID())
	let one = $.markAsStructValue(new ObjectID({hash: $.arrayValue(new Uint8Array([0, 7, 0, 0]))}))
	let otherOne = $.markAsStructValue(new ObjectID({hash: $.arrayValue(new Uint8Array([0, 7, 0, 0]))}))
	let different = $.markAsStructValue(new ObjectID({hash: $.arrayValue(new Uint8Array([0, 0, 7, 0]))}))

	await $.println("zero is zero:", zero.IsZero())
	await $.println("zero valid:", zero.Valid())
	await $.println("zero equals zero:", $.structEqual(zero, otherZero))
	await $.println("one valid:", one.Valid())
	await $.println("one equals other one:", $.structEqual(one, otherOne))
	await $.println("one differs:", !$.structEqual(one, different))

	// struct values compare by fields after passing a pointer as an interface
	let s = $.markAsStructValue(new S({A: "x", B: 1.5}))
	let n: S | $.VarRef<S> | null = new S({A: "x", B: 1.5})
	take($.interfaceValue(n, "*main.S", /* @__PURE__ */ $.pointerType("main.S")))
	await $.println($.structEqual($.pointerValue<S>(n), s))
	let m: S | $.VarRef<S> | null = new S({A: "x", B: 1.5})
	keep($.interfaceValue(m, "*main.S", /* @__PURE__ */ $.pointerType("main.S")))
	await $.println($.structEqual($.pointerValue<S>(m), s), $.structEqual(s, $.pointerValue<S>(m)))
	let v: any = $.interfaceValue($.markAsStructValue($.cloneStructValue(s)), "main.S", "main.S")
	await $.println($.structEqual($.mustTypeAssert<S>(v, "main.S"), s))

	// nested struct field passed as a pointer
	let o1 = $.markAsStructValue(new Outer({In: $.markAsStructValue(new S({A: "y"})), N: 2}))
	let o2 = $.markAsStructValue(new Outer({In: $.markAsStructValue(new S({A: "y"})), N: 2}))
	take($.interfaceValue($.fieldRef(o1._fields, "In"), "*main.S", /* @__PURE__ */ $.pointerType("main.S")))
	await $.println($.structEqual(o1, o2), $.structEqual(o1.In, o2.In))
	o2.In.B = 3
	await $.println($.structEqual(o1, o2))

	// interface comparisons keep dynamic type and pointer identity
	let p1: any = $.interfaceValue(new S({A: "z"}), "*main.S", /* @__PURE__ */ $.pointerType("main.S"))
	let p2: any = $.interfaceValue(new S({A: "z"}), "*main.S", /* @__PURE__ */ $.pointerType("main.S"))
	await $.println($.comparableEqual(p1, p2), $.comparableEqual(p1, p1))
	let i1: any = $.interfaceValue($.markAsStructValue(new S({A: "z"})), "main.S", "main.S")
	let i2: any = $.interfaceValue(new S({A: "z"}), "*main.S", /* @__PURE__ */ $.pointerType("main.S"))
	await $.println($.comparableEqual(i1, i2), $.comparableEqual(i1, $.interfaceValue($.markAsStructValue(new S({A: "z"})), "main.S", "main.S")))
}

if ($.isMainScript(import.meta)) {
	await main()
}
