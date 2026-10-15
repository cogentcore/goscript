// Generated file based on interface_to_interface_type_assertion.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type MyInterface = {
	Method1(): number
}

$.registerInterfaceType(
	"main.MyInterface",
	null,
	[{ name: "Method1", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }]
);

export type MyOtherInterface = {
	Method1(): number
}

$.registerInterfaceType(
	"main.MyOtherInterface",
	null,
	[{ name: "Method1", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }]
);

export class MyStruct {
	public declare Value: number

	constructor(__goscriptValue?: boolean, Value$?: number) {
		this.Value = Value$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): MyStruct {
		return new MyStruct(true, this.Value)
	}

	public __goscriptAssign(source: MyStruct): this {
		this.Value = source.Value
		return this
	}

	public Method1(): number {
		const m = this;
		return m.Value
	}

	static __typeInfo = $.registerStructType(
		"main.MyStruct",
		() => new MyStruct(),
		() => [{ name: "Method1", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }],
		MyStruct,
		() => [{ name: "Value", key: "Value", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let i: MyInterface | null = null! as MyInterface | null
	let s = new MyStruct(true, 10)
	i = $.interfaceValue<MyInterface | null>((s).clone(), "main.MyStruct", "main.MyStruct")

	let [, ok] = $.typeAssertTuple<MyOtherInterface | null>(i, "main.MyOtherInterface")
	if (ok) {
		await $.println("Type assertion successful")
	} else {
		await $.println("Type assertion failed")
	}
}

if ($.isMainScript(import.meta)) {
	await main()
}
