// Generated file based on struct_private_field_ptr.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class MyStruct {
	public get myPrivate(): $.VarRef<number> | null {
		return this._fields.myPrivate
	}

	public set myPrivate(value: $.VarRef<number> | null) {
		this._fields.myPrivate = value
	}

	public _fields: {
		myPrivate: $.VarRef<number> | null
	}

	constructor(init?: Partial<{myPrivate?: $.VarRef<number> | null}>, __goscriptValue?: boolean) {
		this._fields = {
			myPrivate: init?.myPrivate ?? (null! as $.VarRef<number> | null)
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
		() => [{ name: "myPrivate", key: "myPrivate", type: /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int")) }]
	)
}

export async function main(): globalThis.Promise<void> {
	let myStruct: MyStruct | $.VarRef<MyStruct> | null = new MyStruct({myPrivate: null})
	let myStruct$: MyStruct = myStruct == null ? $.pointerTarget<MyStruct>(myStruct) : (myStruct as any).__isVarRef === true ? (myStruct as any).value : (myStruct as any).__goValue === undefined ? (myStruct as any) : $.pointerTarget<MyStruct>(myStruct)
	let intVar: $.VarRef<number> = $.varRef(10);
	;(myStruct$ as MyStruct).myPrivate = intVar
	intVar.value = 15
	await $.println($.pointerValue<number>((myStruct$ as MyStruct).myPrivate))
}

if ($.isMainScript(import.meta)) {
	await main()
}
