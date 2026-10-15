// Generated file based on value_type_copy_behavior.go
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

export class NestedStruct {
	public declare Value: number

	public declare InnerStruct: MyStruct

	constructor(__goscriptValue?: boolean, Value$?: number, InnerStruct$?: MyStruct) {
		this.Value = Value$ ?? 0
		this.InnerStruct = InnerStruct$ ?? new MyStruct(true)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): NestedStruct {
		return new NestedStruct(true, this.Value, this.InnerStruct.clone())
	}

	public __goscriptAssign(source: NestedStruct): this {
		this.Value = source.Value
		this.InnerStruct.__goscriptAssign(source.InnerStruct)
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.NestedStruct",
		() => new NestedStruct(),
		() => [],
		NestedStruct,
		() => [{ name: "Value", key: "Value", type: /* @__PURE__ */ $.basicType("int") }, { name: "InnerStruct", key: "InnerStruct", type: "main.MyStruct" }]
	)
}

export async function main(): globalThis.Promise<void> {
	// Horizontal line for output clarity
	await $.println("----------------------------------------------------------")
	await $.println("VALUE TYPE COPY BEHAVIOR TEST")
	await $.println("----------------------------------------------------------")

	// original is the starting struct instance.
	// We take its address later for pointerCopy, so it might be allocated on the heap (varrefed).
	let original = $.varRef(new MyStruct(true, 42, "original"))

	// === Value-Type Copy Behavior ===
	// Assigning a struct (value type) creates independent copies.
	// valueCopy1 and valueCopy2 get their own copies of 'original's data.
	let valueCopy1 = (original.value).clone()
	let valueCopy2 = (original.value).clone()
	// pointerCopy holds the memory address of 'original'.
	let pointerCopy = original
	let pointerCopy$: MyStruct = pointerCopy == null ? $.pointerTarget<MyStruct>(pointerCopy) : (pointerCopy as any).__isVarRef === true ? (pointerCopy as any).value : (pointerCopy as any).__goValue === undefined ? (pointerCopy as any) : $.pointerTarget<MyStruct>(pointerCopy)

	// Modifications to value copies do not affect the original or other copies.
	valueCopy1.MyString = "value copy 1"
	// Modify the original struct *after* the value copies were made.
	original.value.MyString = "original modified"
	valueCopy2.MyString = "value copy 2"

	await $.println("Value Copy Test:")
	// valueCopy1 was modified independently.
	await $.println("  valueCopy1.MyString: " + valueCopy1.MyString)
	// original was modified after copies, showing its current state.
	await $.println("  original.MyString: " + original.value.MyString)
	// valueCopy2 was modified independently.
	await $.println("  valueCopy2.MyString: " + valueCopy2.MyString)

	// === Pointer Behavior ===
	// Demonstrate how modifications via a pointer affect the original struct.
	await $.println("\nPointer Behavior Test:")
	// Show the state of 'original' before modification via the pointer.
	await $.println("  Before pointer modification - original.MyString: " + original.value.MyString);

	// Modify the struct 'original' *through* the pointerCopy.
	;(pointerCopy$ as MyStruct).MyString = "modified through pointer";
	;(pointerCopy$ as MyStruct).MyInt = 100

	// Show the state of 'original' *after* modification via the pointer.
	// Both fields reflect the changes made through pointerCopy.
	await $.println("  After pointer modification - original.MyString:", original.value.MyString)
	await $.println("  After pointer modification - original.MyInt:", original.value.MyInt)

	// === Nested Struct Behavior ===
	// Demonstrate copy behavior with structs containing other structs.
	await $.println("\nNested Struct Test:")
	let nestedOriginal = new NestedStruct(true, 10, new MyStruct(true, 20, "inner original"))

	// Create a value copy of the nested struct. This copies both the outer
	// struct's fields (Value) and the inner struct (InnerStruct) by value.
	let nestedCopy = (nestedOriginal).clone()

	// Modify the copy's fields, including fields within the nested InnerStruct.
	nestedCopy.InnerStruct.MyString = "inner modified"
	nestedCopy.Value = 30

	// Show that modifications to nestedCopy did not affect nestedOriginal.
	await $.println("  nestedCopy.Value: ", nestedCopy.Value)
	await $.println("  nestedOriginal.Value: ", nestedOriginal.Value)
	await $.println("  nestedCopy.InnerStruct.MyString: " + nestedCopy.InnerStruct.MyString)
	await $.println("  nestedOriginal.InnerStruct.MyString: " + nestedOriginal.InnerStruct.MyString)

	await $.println("----------------------------------------------------------")
}

if ($.isMainScript(import.meta)) {
	await main()
}
