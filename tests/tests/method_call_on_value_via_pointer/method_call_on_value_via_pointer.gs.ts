// Generated file based on method_call_on_value_via_pointer.go
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

	public GetValue(): number {
		const m = this;
		return m.MyInt
	}

	static __typeInfo = $.registerStructType(
		"main.MyStruct",
		() => new MyStruct(),
		() => [{ name: "GetValue", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }],
		MyStruct,
		() => [{ name: "MyInt", key: "MyInt", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function main(): globalThis.Promise<void> {
	// Create a struct value
	let msValue = $.varRef(new MyStruct(true, 100))
	// Create a pointer to the struct value
	let msPointer = msValue

	// === Method Call on Value Receiver via Pointer ===
	// Call the value-receiver method using the pointer variable.
	// Go implicitly dereferences msPointer to call GetValue on the value.
	// Expected: 100
	await $.println("Value via pointer call: Expected: 100, Actual:", $.pointerValue<MyStruct>(msPointer).GetValue())

	// Modify the value through the original value variable
	msValue.value.MyInt = 200

	// The pointer still points to the modified value
	// Expected: 200
	await $.println("Value via pointer call after modification: Expected: 200, Actual:", $.pointerValue<MyStruct>(msPointer).GetValue())
}

if ($.isMainScript(import.meta)) {
	await main()
}
