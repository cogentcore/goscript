// Generated file based on function_call_result_assignment.go
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

	constructor(init?: Partial<{MyInt?: number, MyString?: string, myBool?: boolean}>, __goscriptValue?: boolean) {
		this._fields = {
			MyInt: init?.MyInt ?? (0 as number),
			MyString: init?.MyString ?? ("" as string),
			myBool: init?.myBool ?? (false as boolean)
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

export function NewMyStruct(s: string): MyStruct {
	return new MyStruct({MyString: s}, true)
}

export async function main(): globalThis.Promise<void> {
	// === Function Call Result Assignment (Value Copy) ===
	// Assigning the result of a function that returns a struct creates a copy.
	let structFromFunc = NewMyStruct("function result")
	let structFromFuncCopy = (structFromFunc).clone()
	structFromFuncCopy.MyString = "modified function result copy"
	// Expected: "function result"
	await $.println("Original struct from function: Expected: function result, Actual: " + structFromFunc.MyString)
	// Expected: "modified function result copy"
	await $.println("Modified struct from function copy: Expected: modified function result copy, Actual: " + structFromFuncCopy.MyString)
}

if ($.isMainScript(import.meta)) {
	await main()
}
