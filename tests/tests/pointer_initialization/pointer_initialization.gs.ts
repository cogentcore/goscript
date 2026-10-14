// Generated file based on pointer_initialization.go
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
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
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
	// === Pointer Initialization ===
	// Create a pointer to a MyStruct instance using a composite literal.
	let structPointer: MyStruct | $.VarRef<MyStruct> | null = new MyStruct({MyInt: 4, MyString: "hello world"})
	// Expected: "hello world"
	await $.println($.concatString("Initial MyString (via pointer): Expected: hello world, Actual: ", $.pointerValue<MyStruct>(structPointer).MyString))
}

if ($.isMainScript(import.meta)) {
	await main()
}
