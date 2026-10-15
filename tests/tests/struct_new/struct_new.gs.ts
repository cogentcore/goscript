// Generated file based on struct_new.go
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
	// Test new(MyStruct)
	let ptr = new MyStruct()
	let ptr$: MyStruct = ptr == null ? $.pointerTarget<MyStruct>(ptr) : (ptr as any).__isVarRef === true ? (ptr as any).value : (ptr as any).__goValue === undefined ? (ptr as any) : $.pointerTarget<MyStruct>(ptr)
	await $.println("ptr.MyInt (default):", (ptr$ as MyStruct).MyInt)
	await $.println("ptr.MyString (default):", (ptr$ as MyStruct).MyString)
	await $.println("ptr.myBool (default):", (ptr$ as MyStruct).myBool);

	;(ptr$ as MyStruct).MyInt = 42;
	;(ptr$ as MyStruct).MyString = "hello";
	;(ptr$ as MyStruct).myBool = true

	await $.println("ptr.MyInt (assigned):", (ptr$ as MyStruct).MyInt)
	await $.println("ptr.MyString (assigned):", (ptr$ as MyStruct).MyString)
	await $.println("ptr.myBool (assigned):", (ptr$ as MyStruct).myBool)

	// Test assignment to a dereferenced new struct
	let s: MyStruct = ($.pointerValue<MyStruct>(new MyStruct())).clone()
	await $.println("s.MyInt (default):", s.MyInt)
	await $.println("s.MyString (default):", s.MyString)
	await $.println("s.myBool (default):", s.myBool)

	s.MyInt = 100
	s.MyString = "world"
	s.myBool = false

	await $.println("s.MyInt (assigned):", s.MyInt)
	await $.println("s.MyString (assigned):", s.MyString)
	await $.println("s.myBool (assigned):", s.myBool)
}

if ($.isMainScript(import.meta)) {
	await main()
}
