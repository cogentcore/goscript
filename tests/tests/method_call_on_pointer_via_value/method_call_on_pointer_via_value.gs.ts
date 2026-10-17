// Generated file based on method_call_on_pointer_via_value.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class MyStruct {
	public declare MyInt: number

	constructor(__goscriptValue?: boolean, MyInt$?: number) {
		this.MyInt = MyInt$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
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

	public SetValue(v: number): void {
		const m: MyStruct | $.VarRef<MyStruct> | null = this;
		$.pointerValue<MyStruct>(m).MyInt = v
	}

	static __typeInfo = $.registerStructType(
		"main.MyStruct",
		() => new MyStruct(),
		() => [{ name: "GetValue", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }, { name: "SetValue", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }],
		MyStruct,
		() => [{ name: "MyInt", key: "MyInt", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function main(): globalThis.Promise<void> {
	// Create a struct value
	let msValue = $.varRef(new MyStruct(true, 100))

	// === Method Call on Pointer Receiver via Value ===
	// Call the pointer-receiver method using the value variable.
	// Go implicitly takes the address of msValue (&msValue) to call SetValue.
	msValue.value.SetValue(200)

	// Verify the value was modified through the method call.
	// Expected: 200
	await $.println("Value after pointer method call via value: Expected: 200, Actual:", msValue.value.GetValue())
}

if ($.isMainScript(import.meta)) {
	await main()
}
