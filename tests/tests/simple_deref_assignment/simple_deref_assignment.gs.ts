// Generated file based on simple_deref_assignment.go
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
	let structPointer = new MyStruct(false, 4, "hello world")
	// === Simple Dereference Assignment (Value Copy) ===
	let simpleDereferencedCopy = ($.pointerValue<MyStruct>(structPointer)).clone()
	// Modifying the copy does not affect the original struct pointed to by structPointer.
	simpleDereferencedCopy.MyString = "modified dereferenced copy"
	// Expected: "hello world"
	await $.println("Original structPointer after modifying simpleDereferencedCopy: Expected: hello world, Actual: " + $.pointerValue<MyStruct>(structPointer).MyString)
	// Expected: "modified dereferenced copy"
	await $.println("Simple Dereferenced Copy: Expected: modified dereferenced copy, Actual: " + simpleDereferencedCopy.MyString)
}

if ($.isMainScript(import.meta)) {
	await main()
}
