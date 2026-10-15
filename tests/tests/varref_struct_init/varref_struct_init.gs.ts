// Generated file based on varref_struct_init.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class MyStruct {
	public get MyInt(): number {
		return this._fields.MyInt
	}

	public set MyInt(value: number) {
		this._fields.MyInt = value
	}

	public _fields: {
		MyInt: number
	}

	constructor(init?: Partial<{MyInt?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			MyInt: init?.MyInt ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): MyStruct {
		return new MyStruct(this, true)
	}

	public __goscriptAssign(source: MyStruct): void {
		const target = this._fields
		const values = source._fields
		target.MyInt = values.MyInt
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
	let val = $.varRef(new MyStruct({MyInt: 10}, true))
	let ptrToVal = val
	let ptrToVal$: MyStruct = ptrToVal == null ? $.pointerTarget<MyStruct>(ptrToVal) : (ptrToVal as any).__isVarRef === true ? (ptrToVal as any).value : (ptrToVal as any).__goValue === undefined ? (ptrToVal as any) : $.pointerTarget<MyStruct>(ptrToVal)

	// Accessing field on varrefed value type: Should generate val.value.MyInt
	val.value.MyInt = 20

	// Scenario 2: Pointer type
	// We never take the address of ptr so it should not be varrefed.
	let ptr = new MyStruct({MyInt: 30})
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
