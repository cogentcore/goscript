// Generated file based on pointer_composite_literal_assignment.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class MyStruct {
	public declare MyInt: number

	public declare MyString: string

	constructor(__goscriptValue?: boolean, MyInt$?: number, MyString$?: string) {
		this.MyInt = MyInt$ ?? 0
		this.MyString = MyString$ ?? ""
		;(this as any)[$.structValueMarker] = __goscriptValue === true
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
	// === Pointer Composite Literal Assignment ===
	// Creating a pointer to a struct directly using a composite literal with &
	let structPointer = new MyStruct(false, 42, "composite literal pointer")
	let structPointer$: MyStruct = structPointer == null ? $.pointerTarget<MyStruct>(structPointer) : (structPointer as any).__isVarRef === true ? (structPointer as any).value : (structPointer as any).__goValue === undefined ? (structPointer as any) : $.pointerTarget<MyStruct>(structPointer)

	// Access fields through the pointer
	// Expected: 42
	await $.println("MyInt via pointer: Expected: 42, Actual:", (structPointer$ as MyStruct).MyInt)
	// Expected: "composite literal pointer"
	await $.println("MyString via pointer: Expected: composite literal pointer, Actual: " + (structPointer$ as MyStruct).MyString);

	// Modify through the pointer
	;(structPointer$ as MyStruct).MyInt = 99
	// Expected: 99
	await $.println("MyInt after modification: Expected: 99, Actual:", (structPointer$ as MyStruct).MyInt)
}

if ($.isMainScript(import.meta)) {
	await main()
}
