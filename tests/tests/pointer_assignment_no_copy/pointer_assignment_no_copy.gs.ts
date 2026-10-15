// Generated file based on pointer_assignment_no_copy.go
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
	let original = new MyStruct(false, 10, "original")
	let original$: MyStruct = original == null ? $.pointerTarget<MyStruct>(original) : (original as any).__isVarRef === true ? (original as any).value : (original as any).__goValue === undefined ? (original as any) : $.pointerTarget<MyStruct>(original)

	// === Pointer Assignment (No Copy) ===
	// Assigning a pointer variable to another pointer variable.
	let pointerCopy = original
	let pointerCopy$: MyStruct = pointerCopy == null ? $.pointerTarget<MyStruct>(pointerCopy) : (pointerCopy as any).__isVarRef === true ? (pointerCopy as any).value : (pointerCopy as any).__goValue === undefined ? (pointerCopy as any) : $.pointerTarget<MyStruct>(pointerCopy);

	// Modify the struct through the original pointer.
	;(original$ as MyStruct).MyString = "modified original"

	// The change should be reflected when accessing through the copied pointer.
	// Expected: "modified original"
	await $.println("Pointer copy value: Expected: modified original, Actual: " + (pointerCopy$ as MyStruct).MyString);

	// Modify the struct through the copied pointer.
	;(pointerCopy$ as MyStruct).MyInt = 20

	// The change should be reflected when accessing through the original pointer.
	// Expected: 20
	await $.println("Original value after pointer copy modification: Expected: 20, Actual:", (original$ as MyStruct).MyInt)
}

if ($.isMainScript(import.meta)) {
	await main()
}
