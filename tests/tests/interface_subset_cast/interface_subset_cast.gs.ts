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
	public get Value1(): string {
		return this._fields.Value1
	}

	public set Value1(value: string) {
		this._fields.Value1 = value
	}

	public get Value2(): string {
		return this._fields.Value2
	}

	public set Value2(value: string) {
		this._fields.Value2 = value
	}

	public _fields: {
		Value1: string
		Value2: string
	}

	constructor(init?: Partial<{Value1?: string, Value2?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			Value1: init?.Value1 ?? ("" as string),
			Value2: init?.Value2 ?? ("" as string)
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): MyStruct {
		return new MyStruct(this, true)
	}

	public __goscriptAssign(source: MyStruct): void {
		const target = this._fields
		const values = source._fields
		target.Value1 = values.Value1
		target.Value2 = values.Value2
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
	let i1: MyInterface1 | null = $.interfaceValue<MyInterface1 | null>((s).clone(), "main.MyStruct", "main.MyStruct")

	// Cast from larger interface to smaller interface (subset)
	let i2: MyInterface2 | null = (i1 as MyInterface2 | null)

	await $.println("i1.MyString1():", (__goscriptAwait = $.pointerValue<Exclude<MyInterface1, null>>(i1).MyString1(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println("i1.MyString2():", (__goscriptAwait = $.pointerValue<Exclude<MyInterface1, null>>(i1).MyString2(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println("i2.MyString1():", (__goscriptAwait = $.pointerValue<Exclude<MyInterface2, null>>(i2).MyString1(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	// Type assertion from larger to smaller interface
	let [i3, ok] = $.typeAssertTuple<MyInterface2 | null>(i1, "main.MyInterface2")
	if (ok) {
		await $.println("Type assertion successful")
		await $.println("i3.MyString1():", (__goscriptAwait = $.pointerValue<Exclude<MyInterface2, null>>(i3).MyString1(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	} else {
		await $.println("Type assertion failed")
	}
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
