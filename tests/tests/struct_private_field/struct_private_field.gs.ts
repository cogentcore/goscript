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
		;(this as any)[$.structValueMarker] = __goscriptValue === true
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
	let myStruct = new MyStruct({myPrivate: 4})
	let myStruct$: MyStruct = myStruct == null ? $.pointerTarget<MyStruct>(myStruct) : (myStruct as any).__isVarRef === true ? (myStruct as any).value : (myStruct as any).__goValue === undefined ? (myStruct as any) : $.pointerTarget<MyStruct>(myStruct);
	;(myStruct$ as MyStruct).myPrivate = 10
	await $.println((myStruct$ as MyStruct).myPrivate)
}

if ($.isMainScript(import.meta)) {
	await main()
}
