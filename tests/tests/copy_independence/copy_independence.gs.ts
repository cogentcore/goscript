// Generated file based on copy_independence.go
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
	let structPointer: MyStruct | $.VarRef<MyStruct> | null = new MyStruct({MyInt: 4, MyString: "hello world"})
	let dereferencedStructCopy = ($.pointerValue<MyStruct>(structPointer)).clone()
	dereferencedStructCopy.MyString = "original dereferenced copy modified"
	let valueCopy1 = (dereferencedStructCopy).clone()
	valueCopy1.MyString = "value copy 1"
	let valueCopy2 = (dereferencedStructCopy).clone()
	valueCopy2.MyString = "value copy 2"
	let pointerCopy: MyStruct | $.VarRef<MyStruct> | null = structPointer

	// === Verifying Copy Independence ===
	// Expected: "hello world"
	await $.println($.concatString("pointerCopy (points to original structPointer): Expected: hello world, Actual: ", $.pointerValue<MyStruct>(pointerCopy).MyString))
	// Expected: "original dereferenced copy modified"
	await $.println($.concatString("dereferencedStructCopy (modified after copies were made): Expected: original dereferenced copy modified, Actual: ", dereferencedStructCopy.MyString))
	// Expected: "value copy 1"
	await $.println($.concatString("valueCopy1: Expected: value copy 1, Actual: ", valueCopy1.MyString))
	// Expected: "value copy 2"
	await $.println($.concatString("valueCopy2: Expected: value copy 2, Actual: ", valueCopy2.MyString))
}

if ($.isMainScript(import.meta)) {
	await main()
}
