// Generated file based on varref_struct_init.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class MyStruct {
	public declare MyInt: number

	constructor(__goscriptValue?: boolean, MyInt$?: number) {
		this.MyInt = MyInt$ ?? 0
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): MyStruct {
		return new MyStruct(true, this.MyInt)
	}

	public __goscriptAssign(source: MyStruct): this {
		this.MyInt = source.MyInt
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.MyStruct",
		() => new MyStruct(),
		() => [],
		MyStruct,
		() => [{ name: "MyInt", key: "MyInt", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function main(): globalThis.Promise<void> {
	// Scenario 1: Value type that NeedsVarRef
	// 'val' is a value type, but its address is taken, so it should be varrefed in TS.
	let val = $.varRef(new MyStruct(true, 10))
	let ptrToVal = val
	let ptrToVal$: MyStruct = ptrToVal == null ? $.pointerTarget<MyStruct>(ptrToVal) : (ptrToVal as any).__isVarRef === true ? (ptrToVal as any).value : (ptrToVal as any).__goValue === undefined ? (ptrToVal as any) : $.pointerTarget<MyStruct>(ptrToVal)

	// Accessing field on varrefed value type: Should generate val.value.MyInt
	val.value.MyInt = 20

	// Scenario 2: Pointer type
	// We never take the address of ptr so it should not be varrefed.
	let ptr = new MyStruct(false, 30)
	let ptr$: MyStruct = ptr == null ? $.pointerTarget<MyStruct>(ptr) : (ptr as any).__isVarRef === true ? (ptr as any).value : (ptr as any).__goValue === undefined ? (ptr as any) : $.pointerTarget<MyStruct>(ptr);

	// Accessing field on pointer type: Should generate ptr.MyInt
	;(ptr$ as MyStruct).MyInt = 40
	await $.println("ptr.MyInt:", (ptr$ as MyStruct).MyInt)

	// Accessing pointer value, should use .value
	await $.println("ptrToVal.MyInt:", (ptrToVal$ as MyStruct).MyInt)

	let myIntVal = (ptrToVal$ as MyStruct).MyInt
	await $.println("myIntVal:", myIntVal)
}

if ($.isMainScript(import.meta)) {
	await main()
}
