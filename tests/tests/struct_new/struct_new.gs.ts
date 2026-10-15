// Generated file based on struct_new.go
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

export async function main(): globalThis.Promise<void> {
	// Test new(MyStruct)
	let ptr = new MyStruct()
	let ptr$: MyStruct = ptr == null ? $.pointerTarget<MyStruct>(ptr) : (ptr as any).__isVarRef === true ? (ptr as any).value : (ptr as any).__goValue === undefined ? (ptr as any) : $.pointerTarget<MyStruct>(ptr)
	await $.println("ptr.MyInt (default):", (ptr$ as MyStruct).MyInt)
	await $.println("ptr.MyString (default):", (ptr$ as MyStruct).MyString)
	await $.println("ptr.myBool (default):", (ptr$ as MyStruct).myBool);

	;(ptr$ as MyStruct).MyInt = 42;
	;(ptr$ as MyStruct).MyString = "hello";
	;(ptr$ as MyStruct).myBool = true

	await $.println("ptr.MyInt (assigned):", (ptr$ as MyStruct).MyInt)
	await $.println("ptr.MyString (assigned):", (ptr$ as MyStruct).MyString)
	await $.println("ptr.myBool (assigned):", (ptr$ as MyStruct).myBool)

	// Test assignment to a dereferenced new struct
	let s: MyStruct = ($.pointerValue<MyStruct>(new MyStruct())).clone()
	await $.println("s.MyInt (default):", s.MyInt)
	await $.println("s.MyString (default):", s.MyString)
	await $.println("s.myBool (default):", s.myBool)

	s.MyInt = 100
	s.MyString = "world"
	s.myBool = false

	await $.println("s.MyInt (assigned):", s.MyInt)
	await $.println("s.MyString (assigned):", s.MyString)
	await $.println("s.myBool (assigned):", s.myBool)
}

if ($.isMainScript(import.meta)) {
	await main()
}
