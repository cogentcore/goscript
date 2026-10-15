// Generated file based on interface_subset_cast.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type MyInterface1 = {
	MyString1(): string
	MyString2(): string
}

$.registerInterfaceType(
	"main.MyInterface1",
	null,
	[{ name: "MyString1", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }, { name: "MyString2", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }]
);

export type MyInterface2 = {
	MyString1(): string
}

$.registerInterfaceType(
	"main.MyInterface2",
	null,
	[{ name: "MyString1", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }]
);

export class MyStruct {
	public declare Value1: string

	public declare Value2: string

	constructor(init?: Partial<{Value1?: string, Value2?: string}>, __goscriptValue?: boolean) {
		this.Value1 = init?.Value1 ?? ("" as string)
		this.Value2 = init?.Value2 ?? ("" as string)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): MyStruct {
		return new MyStruct(this, true)
	}

	public __goscriptAssign(source: MyStruct): this {
		this.Value1 = source.Value1
		this.Value2 = source.Value2
		return this
	}

	public MyString1(): string {
		const m = this;
		return m.Value1
	}

	public MyString2(): string {
		const m = this;
		return m.Value2
	}

	static __typeInfo = $.registerStructType(
		"main.MyStruct",
		() => new MyStruct(),
		() => [{ name: "MyString1", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }, { name: "MyString2", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		MyStruct,
		() => [{ name: "Value1", key: "Value1", type: /* @__PURE__ */ $.basicType("string") }, { name: "Value2", key: "Value2", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let s = new MyStruct({Value1: "hello", Value2: "world"}, true)
	let i1: MyInterface1 | null = $.interfaceValue<MyInterface1 | null>(s, "main.MyStruct", "main.MyStruct")

	// Cast from larger interface to smaller interface (subset)
	let i2: MyInterface2 | null = (i1 as MyInterface2 | null)

	await $.println("i1.MyString1():", (__goscriptAwait = (i1 !== null && (i1 as any).__isVarRef !== true && ((i1 as any).__goValue === undefined || (i1 as any).__goType?.charCodeAt(0) !== 42) ? (i1 as Exclude<MyInterface1, null>) : $.pointerValue<Exclude<MyInterface1, null>>(i1)).MyString1(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println("i1.MyString2():", (__goscriptAwait = (i1 !== null && (i1 as any).__isVarRef !== true && ((i1 as any).__goValue === undefined || (i1 as any).__goType?.charCodeAt(0) !== 42) ? (i1 as Exclude<MyInterface1, null>) : $.pointerValue<Exclude<MyInterface1, null>>(i1)).MyString2(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println("i2.MyString1():", (__goscriptAwait = (i2 !== null && (i2 as any).__isVarRef !== true && ((i2 as any).__goValue === undefined || (i2 as any).__goType?.charCodeAt(0) !== 42) ? (i2 as Exclude<MyInterface2, null>) : $.pointerValue<Exclude<MyInterface2, null>>(i2)).MyString1(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	// Type assertion from larger to smaller interface
	let [i3, ok] = $.typeAssertTuple<MyInterface2 | null>(i1, "main.MyInterface2")
	if (ok) {
		await $.println("Type assertion successful")
		await $.println("i3.MyString1():", (__goscriptAwait = (i3 !== null && (i3 as any).__isVarRef !== true && ((i3 as any).__goValue === undefined || (i3 as any).__goType?.charCodeAt(0) !== 42) ? (i3 as Exclude<MyInterface2, null>) : $.pointerValue<Exclude<MyInterface2, null>>(i3)).MyString1(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	} else {
		await $.println("Type assertion failed")
	}
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
