// Generated file based on interface_subset_type_switch.go
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

export async function processInterface(i: any): globalThis.Promise<void> {
	{
		const __goscriptTypeSwitchValue = i
		switch (true) {
			case $.typeAssert<MyInterface1 | null>(__goscriptTypeSwitchValue, "main.MyInterface1").ok:
				{
					let v: MyInterface1 | null = $.typeAssert<MyInterface1 | null>(__goscriptTypeSwitchValue, "main.MyInterface1").value
					await $.println("MyInterface1:", (__goscriptAwait = (v !== null && (v as any).__isVarRef !== true && ((v as any).__goValue === undefined || (v as any).__goType?.charCodeAt(0) !== 42) ? (v as Exclude<MyInterface1, null>) : $.pointerValue<Exclude<MyInterface1, null>>(v)).MyString1(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = (v !== null && (v as any).__isVarRef !== true && ((v as any).__goValue === undefined || (v as any).__goType?.charCodeAt(0) !== 42) ? (v as Exclude<MyInterface1, null>) : $.pointerValue<Exclude<MyInterface1, null>>(v)).MyString2(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
				}
				break
			case $.typeAssert<MyInterface2 | null>(__goscriptTypeSwitchValue, "main.MyInterface2").ok:
				{
					let v: MyInterface2 | null = $.typeAssert<MyInterface2 | null>(__goscriptTypeSwitchValue, "main.MyInterface2").value
					await $.println("MyInterface2:", (__goscriptAwait = (v !== null && (v as any).__isVarRef !== true && ((v as any).__goValue === undefined || (v as any).__goType?.charCodeAt(0) !== 42) ? (v as Exclude<MyInterface2, null>) : $.pointerValue<Exclude<MyInterface2, null>>(v)).MyString1(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
				}
				break
			default:
				{
					let v: any = __goscriptTypeSwitchValue
					await $.println("Unknown type")
				}
				break
		}
	}
}

export async function main(): globalThis.Promise<void> {
	let s = new MyStruct({Value1: "hello", Value2: "world"}, true)

	// Test with MyInterface1
	let i1: MyInterface1 | null = $.interfaceValue<MyInterface1 | null>((s).clone(), "main.MyStruct", "main.MyStruct")
	await processInterface((i1 as any))

	// Test with MyInterface2
	let i2: MyInterface2 | null = $.interfaceValue<MyInterface2 | null>((s).clone(), "main.MyStruct", "main.MyStruct")
	await processInterface((i2 as any))

	// Test with concrete type
	await processInterface($.interfaceValue((s).clone(), "main.MyStruct", "main.MyStruct"))

	// Type switch with subset casting
	let i3: any = (i1 as any)
	{
		const __goscriptTypeSwitchValue = i3
		switch (true) {
			case $.typeAssert<MyInterface2 | null>(__goscriptTypeSwitchValue, "main.MyInterface2").ok:
				{
					let v: MyInterface2 | null = $.typeAssert<MyInterface2 | null>(__goscriptTypeSwitchValue, "main.MyInterface2").value
					await $.println("Matched MyInterface2 from i1:", (__goscriptAwait = (v !== null && (v as any).__isVarRef !== true && ((v as any).__goValue === undefined || (v as any).__goType?.charCodeAt(0) !== 42) ? (v as Exclude<MyInterface2, null>) : $.pointerValue<Exclude<MyInterface2, null>>(v)).MyString1(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
				}
				break
			case $.typeAssert<MyInterface1 | null>(__goscriptTypeSwitchValue, "main.MyInterface1").ok:
				{
					let v: MyInterface1 | null = $.typeAssert<MyInterface1 | null>(__goscriptTypeSwitchValue, "main.MyInterface1").value
					await $.println("Matched MyInterface1 from i1:", (__goscriptAwait = (v !== null && (v as any).__isVarRef !== true && ((v as any).__goValue === undefined || (v as any).__goType?.charCodeAt(0) !== 42) ? (v as Exclude<MyInterface1, null>) : $.pointerValue<Exclude<MyInterface1, null>>(v)).MyString1(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = (v !== null && (v as any).__isVarRef !== true && ((v as any).__goValue === undefined || (v as any).__goType?.charCodeAt(0) !== 42) ? (v as Exclude<MyInterface1, null>) : $.pointerValue<Exclude<MyInterface1, null>>(v)).MyString2(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
				}
				break
			default:
				{
					let v: any = __goscriptTypeSwitchValue
					await $.println("No match")
				}
				break
		}
	}
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
