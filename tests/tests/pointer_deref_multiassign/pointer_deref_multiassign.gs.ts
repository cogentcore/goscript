// Generated file based on pointer_deref_multiassign.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class MyStruct {
	public declare MyInt: number

	public declare MyString: string

	public declare myBool: boolean

	constructor(init?: Partial<{MyInt?: number, MyString?: string, myBool?: boolean}>, __goscriptValue?: boolean) {
		this.MyInt = init?.MyInt ?? (0 as number)
		this.MyString = init?.MyString ?? ("" as string)
		this.myBool = init?.myBool ?? (false as boolean)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): MyStruct {
		return new MyStruct(this, true)
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
	let structPointer = new MyStruct({MyInt: 4, MyString: "hello world"})
	let structPointer$: MyStruct = structPointer == null ? $.pointerTarget<MyStruct>(structPointer) : (structPointer as any).__isVarRef === true ? (structPointer as any).value : (structPointer as any).__goValue === undefined ? (structPointer as any) : $.pointerTarget<MyStruct>(structPointer)
	// === Pointer Dereference and Multi-Assignment ===
	// Dereference structPointer to get a copy of the struct.
	// Also demonstrates multi-variable assignment and the use of the blank identifier '_'.
	let dereferencedStructCopy = ((structPointer$ as MyStruct)).clone()
	let unusedString = "hello"
	unusedString
	dereferencedStructCopy
}

if ($.isMainScript(import.meta)) {
	await main()
}
