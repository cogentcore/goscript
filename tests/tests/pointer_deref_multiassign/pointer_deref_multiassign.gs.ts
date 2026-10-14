// Generated file based on pointer_deref_multiassign.go
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

	public get myBool(): boolean {
		return this._fields.myBool
	}

	public set myBool(value: boolean) {
		this._fields.myBool = value
	}

	public _fields: {
		MyInt: number
		MyString: string
		myBool: boolean
	}

	constructor(init?: Partial<{MyInt?: number, MyString?: string, myBool?: boolean}>) {
		this._fields = {
			MyInt: init?.MyInt ?? (0 as number),
			MyString: init?.MyString ?? ("" as string),
			myBool: init?.myBool ?? (false as boolean)
		}
	}

	public clone(): MyStruct {
		return $.markAsStructValue(new MyStruct(this))
	}

	public __goscriptAssign(source: MyStruct): void {
		const target = this._fields
		const values = source._fields
		target.MyInt = values.MyInt
		target.MyString = values.MyString
		target.myBool = values.myBool
	}

	static __typeInfo = $.registerStructType(
		"main.MyStruct",
		() => new MyStruct(),
		() => [],
		MyStruct,
		() => [{ name: "MyInt", key: "MyInt", type: /* @__PURE__ */ $.basicType("int") }, { name: "MyString", key: "MyString", type: /* @__PURE__ */ $.basicType("string") }, { name: "myBool", key: "myBool", type: /* @__PURE__ */ $.basicType("bool") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let structPointer: MyStruct | $.VarRef<MyStruct> | null = new MyStruct({MyInt: 4, MyString: "hello world"})
	// === Pointer Dereference and Multi-Assignment ===
	// Dereference structPointer to get a copy of the struct.
	// Also demonstrates multi-variable assignment and the use of the blank identifier '_'.
	let dereferencedStructCopy = $.markAsStructValue($.cloneStructValue($.pointerValue<MyStruct>(structPointer)))
	let unusedString = "hello"
	unusedString
	dereferencedStructCopy
}

if ($.isMainScript(import.meta)) {
	await main()
}
