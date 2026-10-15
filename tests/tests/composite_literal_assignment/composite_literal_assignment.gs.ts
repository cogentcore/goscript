// Generated file based on composite_literal_assignment.go
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

export async function main(): globalThis.Promise<void> {
	// === Composite Literal Assignment (Value Copy) ===
	// Creating a struct directly using a composite literal.
	let structLiteral = new MyStruct({MyString: "composite literal"}, true)
	// Assigning it creates another independent copy.
	let structLiteralCopy = (structLiteral).clone()
	structLiteralCopy.MyString = "modified composite literal copy"
	// Expected: "composite literal"
	await $.println("Original struct literal: Expected: composite literal, Actual: " + structLiteral.MyString)
	// Expected: "modified composite literal copy"
	await $.println("Modified struct literal copy: Expected: modified composite literal copy, Actual: " + structLiteralCopy.MyString)
}

if ($.isMainScript(import.meta)) {
	await main()
}
