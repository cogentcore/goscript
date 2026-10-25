// Generated file based on pointer_deref_multiassign.go
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
		;(this as any).__goStructValue = __goscriptValue === true
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

export async function main(): globalThis.Promise<void> {
	let structPointer = new MyStruct(false, 4, "hello world")
	let structPointer$: MyStruct = structPointer == null ? $.pointerTarget<MyStruct>(structPointer) : (structPointer as any).__isVarRef === true ? (structPointer as any).value : (structPointer as any).__goValue === undefined ? (structPointer as any) : $.pointerTarget<MyStruct>(structPointer)
	// === Pointer Dereference and Multi-Assignment ===
	// Dereference structPointer to get a copy of the struct.
	// Also demonstrates multi-variable assignment and the use of the blank identifier '_'.
	let dereferencedStructCopy = ((structPointer$ as MyStruct)).clone();
	;(structPointer$ as MyStruct).myBool;
	;(structPointer$ as MyStruct).MyInt
	let unusedString = "hello"
	unusedString
	dereferencedStructCopy
}

if ($.isMainScript(import.meta)) {
	await main()
}
