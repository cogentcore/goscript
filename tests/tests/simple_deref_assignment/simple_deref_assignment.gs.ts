// Generated file based on simple_deref_assignment.go
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

	constructor(init?: Partial<{MyInt?: number, MyString?: string}>) {
		this._fields = {
			MyInt: init?.MyInt ?? (0 as number),
			MyString: init?.MyString ?? ("" as string)
		}
	}

	public clone(): MyStruct {
		return $.markAsStructValue(new MyStruct(this))
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
	// === Simple Dereference Assignment (Value Copy) ===
	let simpleDereferencedCopy = $.markAsStructValue($.cloneStructValue($.pointerValue<MyStruct>(structPointer)))
	// Modifying the copy does not affect the original struct pointed to by structPointer.
	simpleDereferencedCopy.MyString = "modified dereferenced copy"
	// Expected: "hello world"
	await $.println($.concatString("Original structPointer after modifying simpleDereferencedCopy: Expected: hello world, Actual: ", $.pointerValue<MyStruct>(structPointer).MyString))
	// Expected: "modified dereferenced copy"
	await $.println($.concatString("Simple Dereferenced Copy: Expected: modified dereferenced copy, Actual: ", simpleDereferencedCopy.MyString))
}

if ($.isMainScript(import.meta)) {
	await main()
}
