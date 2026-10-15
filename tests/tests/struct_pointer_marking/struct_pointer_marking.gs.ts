// Generated file based on struct_pointer_marking.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class MyStruct {
	public get Value(): number {
		return this._fields.Value
	}

	public set Value(value: number) {
		this._fields.Value = value
	}

	public _fields: {
		Value: number
	}

	constructor(init?: Partial<{Value?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			Value: init?.Value ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): MyStruct {
		return new MyStruct(this, true)
	}

	public __goscriptAssign(source: MyStruct): void {
		const target = this._fields
		const values = source._fields
		target.Value = values.Value
	}

	static __typeInfo = $.registerStructType(
		"main.MyStruct",
		() => new MyStruct(),
		() => [],
		MyStruct,
		() => [{ name: "Value", key: "Value", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function main(): globalThis.Promise<void> {
	await $.println("=== Struct Pointer Marking Test ===")

	// Scenario 1: Address-of Composite Literal vs Value Variable
	await $.println("\n--- Scenario 1: Composite Literal vs Value Variable ---")
	let s = new MyStruct({Value: 10}, true)
	let p = new MyStruct({Value: 20})

	// Type assertions - struct value
	let i: any = $.interfaceValue((s).clone(), "main.MyStruct", "main.MyStruct")
	let [, ok1] = $.typeAssertTuple<MyStruct>(i, "main.MyStruct")
	let [, ok2] = $.typeAssertTuple<MyStruct | $.VarRef<MyStruct> | null>(i, /* @__PURE__ */ $.pointerType("main.MyStruct"))
	await $.println("struct value -> MyStruct assertion:", ok1)
	await $.println("struct value -> *MyStruct assertion:", ok2)

	// Type assertions - struct pointer
	let j: any = $.interfaceValue(p, "*main.MyStruct", /* @__PURE__ */ $.pointerType("main.MyStruct"))
	let [, ok3] = $.typeAssertTuple<MyStruct>(j, "main.MyStruct")
	let [, ok4] = $.typeAssertTuple<MyStruct | $.VarRef<MyStruct> | null>(j, /* @__PURE__ */ $.pointerType("main.MyStruct"))
	await $.println("struct pointer -> MyStruct assertion:", ok3)
	await $.println("struct pointer -> *MyStruct assertion:", ok4)

	// Scenario 2: Variable Aliasing
	await $.println("\n--- Scenario 2: Variable Aliasing ---")
	let original = $.varRef(new MyStruct({Value: 30}, true))
	let pAlias = original

	let iOriginal: any = $.interfaceValue((original.value).clone(), "main.MyStruct", "main.MyStruct")
	let jAlias: any = $.interfaceValue(pAlias, "*main.MyStruct", /* @__PURE__ */ $.pointerType("main.MyStruct"))

	let [, ok5] = $.typeAssertTuple<MyStruct>(iOriginal, "main.MyStruct")
	let [, ok6] = $.typeAssertTuple<MyStruct | $.VarRef<MyStruct> | null>(iOriginal, /* @__PURE__ */ $.pointerType("main.MyStruct"))
	await $.println("original value -> MyStruct assertion:", ok5)
	await $.println("original value -> *MyStruct assertion:", ok6)

	let [, ok7] = $.typeAssertTuple<MyStruct>(jAlias, "main.MyStruct")
	let [, ok8] = $.typeAssertTuple<MyStruct | $.VarRef<MyStruct> | null>(jAlias, /* @__PURE__ */ $.pointerType("main.MyStruct"))
	await $.println("alias pointer -> MyStruct assertion:", ok7)
	await $.println("alias pointer -> *MyStruct assertion:", ok8)

	// Scenario 3: Multiple Pointers to Same Variable
	await $.println("\n--- Scenario 3: Multiple Pointers to Same Variable ---")
	let shared = $.varRef(new MyStruct({Value: 40}, true))
	let p1 = shared
	let p2 = shared

	let i1: any = $.interfaceValue(p1, "*main.MyStruct", /* @__PURE__ */ $.pointerType("main.MyStruct"))
	let i2: any = $.interfaceValue(p2, "*main.MyStruct", /* @__PURE__ */ $.pointerType("main.MyStruct"))

	let [, ok9] = $.typeAssertTuple<MyStruct | $.VarRef<MyStruct> | null>(i1, /* @__PURE__ */ $.pointerType("main.MyStruct"))
	let [, ok10] = $.typeAssertTuple<MyStruct | $.VarRef<MyStruct> | null>(i2, /* @__PURE__ */ $.pointerType("main.MyStruct"))
	await $.println("first pointer -> *MyStruct assertion:", ok9)
	await $.println("second pointer -> *MyStruct assertion:", ok10)

	// Verify they point to the same data
	{
		let __goscriptTuple0: any = $.typeAssertTuple<MyStruct | $.VarRef<MyStruct> | null>(i1, /* @__PURE__ */ $.pointerType("main.MyStruct"))
		let structPtr1: MyStruct | $.VarRef<MyStruct> | null = __goscriptTuple0[0]
		let ok = __goscriptTuple0[1]
		if (ok) {
			{
				let __goscriptTuple1: any = $.typeAssertTuple<MyStruct | $.VarRef<MyStruct> | null>(i2, /* @__PURE__ */ $.pointerType("main.MyStruct"))
				let structPtr2: MyStruct | $.VarRef<MyStruct> | null = __goscriptTuple1[0]
				let __goscriptShadow0 = __goscriptTuple1[1]
				if (__goscriptShadow0) {
					$.pointerValue<MyStruct>(structPtr1).Value = 99
					await $.println("shared modification check:", $.pointerValue<MyStruct>(structPtr2).Value)
				}
			}
		}
	}

	// Scenario 4: Mixed Assignment Patterns
	await $.println("\n--- Scenario 4: Mixed Assignment Patterns ---")
	let mixed = $.varRef(new MyStruct({Value: 50}, true))
	let pVar = mixed
	let pLit = new MyStruct({Value: 60})

	let iVar: any = $.interfaceValue(pVar, "*main.MyStruct", /* @__PURE__ */ $.pointerType("main.MyStruct"))
	let iLit: any = $.interfaceValue(pLit, "*main.MyStruct", /* @__PURE__ */ $.pointerType("main.MyStruct"))

	let [, ok11] = $.typeAssertTuple<MyStruct | $.VarRef<MyStruct> | null>(iVar, /* @__PURE__ */ $.pointerType("main.MyStruct"))
	let [, ok12] = $.typeAssertTuple<MyStruct | $.VarRef<MyStruct> | null>(iLit, /* @__PURE__ */ $.pointerType("main.MyStruct"))
	await $.println("variable pointer -> *MyStruct assertion:", ok11)
	await $.println("literal pointer -> *MyStruct assertion:", ok12)

	// Scenario 5: Nested Type Assertions
	await $.println("\n--- Scenario 5: Nested Type Assertions ---")
	let nested1 = new MyStruct({Value: 70})
	let nested2 = $.varRef(new MyStruct({Value: 80}, true))

	// Array of interfaces containing both pointers and values
	let arr = $.arrayToSlice<any>([$.interfaceValue(nested1, "*main.MyStruct", /* @__PURE__ */ $.pointerType("main.MyStruct")), $.interfaceValue((nested2.value).clone(), "main.MyStruct", "main.MyStruct"), $.interfaceValue(nested2, "*main.MyStruct", /* @__PURE__ */ $.pointerType("main.MyStruct"))])

	for (let __goscriptRangeTarget0 = arr, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), i = 0; i < __goscriptRangeWindow0.length; i++) {
		let item = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + i] as any)
		{
			let [val, ok] = $.typeAssertTuple<MyStruct>(item, "main.MyStruct")
			if (ok) {
				await $.println("arr[", i, "] is MyStruct with value:", val.Value)
			} else {
				{
					let __goscriptTuple2: any = $.typeAssertTuple<MyStruct | $.VarRef<MyStruct> | null>(item, /* @__PURE__ */ $.pointerType("main.MyStruct"))
					let ptr: MyStruct | $.VarRef<MyStruct> | null = __goscriptTuple2[0]
					let __goscriptShadow1 = __goscriptTuple2[1]
					if (__goscriptShadow1) {
						await $.println("arr[", i, "] is *MyStruct with value:", $.pointerValue<MyStruct>(ptr).Value)
					} else {
						await $.println("arr[", i, "] is unknown type")
					}
				}
			}
		}
	}

	// Scenario 6: Type Switch with Mixed Types
	await $.println("\n--- Scenario 6: Type Switch ---")
	let testItems = $.arrayToSlice<any>([$.interfaceValue(new MyStruct({Value: 100}, true), "main.MyStruct", "main.MyStruct"), $.interfaceValue(new MyStruct({Value: 200}), "*main.MyStruct", /* @__PURE__ */ $.pointerType("main.MyStruct")), $.basicInterfaceValue(300, "int"), "string"])

	for (let __goscriptRangeTarget1 = testItems, __goscriptRangeWindow1 = $.sliceRange(__goscriptRangeTarget1), i = 0; i < __goscriptRangeWindow1.length; i++) {
		let item = (__goscriptRangeWindow1.backing[__goscriptRangeWindow1.offset + i] as any)
		{
			const __goscriptTypeSwitchValue = item
			switch (true) {
				case $.typeAssert<MyStruct>(__goscriptTypeSwitchValue, "main.MyStruct").ok:
					{
						let v: MyStruct = $.markAsStructValue($.cloneStructValue($.typeAssert<MyStruct>(__goscriptTypeSwitchValue, "main.MyStruct").value))
						await $.println("testItems[", i, "] is MyStruct value:", v.Value)
					}
					break
				case $.typeAssert<MyStruct | $.VarRef<MyStruct> | null>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.pointerType("main.MyStruct")).ok:
					{
						let v: MyStruct | $.VarRef<MyStruct> | null = $.typeAssert<MyStruct | $.VarRef<MyStruct> | null>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.pointerType("main.MyStruct")).value
						await $.println("testItems[", i, "] is *MyStruct pointer:", $.pointerValue<MyStruct>(v).Value)
					}
					break
				case $.typeAssert<number>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("int")).ok:
					{
						let v: number = $.typeAssert<number>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("int")).value
						await $.println("testItems[", i, "] is int:", v)
					}
					break
				case $.typeAssert<string>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("string")).ok:
					{
						let v: string = $.typeAssert<string>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("string")).value
						await $.println("testItems[", i, "] is string:", v)
					}
					break
				default:
					{
						let v: any = __goscriptTypeSwitchValue
						await $.println("testItems[", i, "] is unknown type")
					}
					break
			}
		}
	}

	await $.println("\n=== Test Complete ===")
}

if ($.isMainScript(import.meta)) {
	await main()
}
