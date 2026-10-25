// Generated file based on struct_field_access.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class MyStruct {
	public declare MyInt: number

	public declare MyString: string

	constructor(__goscriptValue?: boolean, MyInt$?: number, MyString$?: string) {
		this.MyInt = MyInt$ ?? 0
		this.MyString = MyString$ ?? ""
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): MyStruct {
		return new MyStruct(true, this.MyInt, this.MyString)
	}

	public __goscriptAssign(source: MyStruct): this {
		this.MyInt = source.MyInt
		this.MyString = source.MyString
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.MyStruct",
		() => new MyStruct(),
		() => [],
		MyStruct,
		() => [{ name: "MyInt", key: "MyInt", type: /* @__PURE__ */ $.basicType("int") }, { name: "MyString", key: "MyString", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export async function main(): globalThis.Promise<void> {
	// === Struct Field Access ===
	let ms = new MyStruct(true, 42, "foo")
	await $.println("MyInt: Expected: 42, Actual:", ms.MyInt)
	await $.println("MyString: Expected: foo, Actual:", ms.MyString)
}

if ($.isMainScript(import.meta)) {
	await main()
}
