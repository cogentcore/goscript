// Generated file based on struct_private_field_ptr.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class MyStruct {
	public declare myPrivate: $.VarRef<number> | null

	constructor(__goscriptValue?: boolean, myPrivate$?: $.VarRef<number> | null) {
		this.myPrivate = myPrivate$ ?? (null! as $.VarRef<number> | null)
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): MyStruct {
		return new MyStruct(true, this.myPrivate)
	}

	public __goscriptAssign(source: MyStruct): this {
		this.myPrivate = source.myPrivate
		return this
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
	let myStruct = new MyStruct(false, null)
	let myStruct$: MyStruct = myStruct == null ? $.pointerTarget<MyStruct>(myStruct) : (myStruct as any).__isVarRef === true ? (myStruct as any).value : (myStruct as any).__goValue === undefined ? (myStruct as any) : $.pointerTarget<MyStruct>(myStruct)
	let intVar = $.varRef(10);
	;(myStruct$ as MyStruct).myPrivate = intVar
	intVar.value = 15
	await $.println($.pointerValue<number>((myStruct$ as MyStruct).myPrivate))
}

if ($.isMainScript(import.meta)) {
	await main()
}
