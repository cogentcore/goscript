// Generated file based on struct_equal_after_interface.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

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
