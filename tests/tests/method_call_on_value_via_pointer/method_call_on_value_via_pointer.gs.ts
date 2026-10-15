// Generated file based on method_call_on_value_via_pointer.go
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
	let msValue = $.varRef(new MyStruct({MyInt: 100}, true))
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
