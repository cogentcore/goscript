// Generated file based on struct_private_field.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class MyStruct {
	public get myPrivate(): number {
		return this._fields.myPrivate
	}

	public set myPrivate(value: number) {
		this._fields.myPrivate = value
	}

	public _fields: {
		myPrivate: number
	}

	constructor(init?: Partial<{myPrivate?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			myPrivate: init?.myPrivate ?? (0 as number)
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
		target.myPrivate = values.myPrivate
	}

	static __typeInfo = $.registerStructType(
		"main.MyStruct",
		() => new MyStruct(),
		() => [],
		MyStruct,
		() => [{ name: "myPrivate", key: "myPrivate", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let myStruct: MyStruct | $.VarRef<MyStruct> | null = new MyStruct({myPrivate: 4})
	$.pointerValue<MyStruct>(myStruct).myPrivate = 10
	await $.println($.pointerValue<MyStruct>(myStruct).myPrivate)
}

if ($.isMainScript(import.meta)) {
	await main()
}
