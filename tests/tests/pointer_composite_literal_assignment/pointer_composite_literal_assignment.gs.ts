// Generated file based on pointer_composite_literal_assignment.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class MyStruct {
	public get MyInt(): number {
		return this._fields.MyInt
	}

	public set MyInt(value: number) {
		this._fields.MyInt = value
	}

	public get MyString(): string {
		return this._fields.MyString
	}

	public set MyString(value: string) {
		this._fields.MyString = value
	}

	public _fields: {
		MyInt: number
		MyString: string
	}

	constructor(init?: Partial<{MyInt?: number, MyString?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			MyInt: init?.MyInt ?? (0 as number),
			MyString: init?.MyString ?? ("" as string)
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
		target.MyString = values.MyString
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
	// === Pointer Composite Literal Assignment ===
	// Creating a pointer to a struct directly using a composite literal with &
	let structPointer: MyStruct | $.VarRef<MyStruct> | null = new MyStruct({MyInt: 42, MyString: "composite literal pointer"})

	// Access fields through the pointer
	// Expected: 42
	await $.println("MyInt via pointer: Expected: 42, Actual:", $.pointerValue<MyStruct>(structPointer).MyInt)
	// Expected: "composite literal pointer"
	await $.println($.concatString("MyString via pointer: Expected: composite literal pointer, Actual: ", $.pointerValue<MyStruct>(structPointer).MyString))

	// Modify through the pointer
	$.pointerValue<MyStruct>(structPointer).MyInt = 99
	// Expected: 99
	await $.println("MyInt after modification: Expected: 99, Actual:", $.pointerValue<MyStruct>(structPointer).MyInt)
}

if ($.isMainScript(import.meta)) {
	await main()
}
