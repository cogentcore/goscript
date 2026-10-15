// Generated file based on function_call_result_assignment.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class MyStruct {
	public declare MyInt: number

	public declare MyString: string

	public declare myBool: boolean

	constructor(__goscriptValue?: boolean, MyInt$?: number, MyString$?: string, myBool$?: boolean) {
		this.MyInt = MyInt$ ?? 0
		this.MyString = MyString$ ?? ""
		this.myBool = myBool$ ?? false
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): MyStruct {
		return new MyStruct(true, this.MyInt, this.MyString, this.myBool)
	}

	public __goscriptAssign(source: MyStruct): this {
		this.MyInt = source.MyInt
		this.MyString = source.MyString
		this.myBool = source.myBool
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.MyStruct",
		() => new MyStruct(),
		() => [],
		MyStruct,
		() => [{ name: "MyInt", key: "MyInt", type: /* @__PURE__ */ $.basicType("int") }, { name: "MyString", key: "MyString", type: /* @__PURE__ */ $.basicType("string") }, { name: "myBool", key: "myBool", type: /* @__PURE__ */ $.basicType("bool") }]
	)
}

export function NewMyStruct(s: string): MyStruct {
	return new MyStruct(true, undefined, s)
}

export async function main(): globalThis.Promise<void> {
	// === Function Call Result Assignment (Value Copy) ===
	// Assigning the result of a function that returns a struct creates a copy.
	let structFromFunc = NewMyStruct("function result")
	let structFromFuncCopy = (structFromFunc).clone()
	structFromFuncCopy.MyString = "modified function result copy"
	// Expected: "function result"
	await $.println("Original struct from function: Expected: function result, Actual: " + structFromFunc.MyString)
	// Expected: "modified function result copy"
	await $.println("Modified struct from function copy: Expected: modified function result copy, Actual: " + structFromFuncCopy.MyString)
}

if ($.isMainScript(import.meta)) {
	await main()
}
