// Generated file based on struct_pointer_interface_fields.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type MyInterface = {
	Method(): void
}

$.registerInterfaceType(
	"main.MyInterface",
	null,
	[{ name: "Method", args: [], returns: [] }]
);

export class MyStruct {
	public declare PointerField: $.VarRef<number> | null

	public declare interfaceField: MyInterface | null

	constructor(init?: Partial<{PointerField?: $.VarRef<number> | null, interfaceField?: MyInterface | null}>, __goscriptValue?: boolean) {
		this.PointerField = init?.PointerField ?? (null! as $.VarRef<number> | null)
		this.interfaceField = init?.interfaceField ?? (null! as MyInterface | null)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): MyStruct {
		return new MyStruct(this, true)
	}

	public __goscriptAssign(source: MyStruct): this {
		this.PointerField = source.PointerField
		this.interfaceField = $.assignFieldValue(this.interfaceField, source.interfaceField)
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.MyStruct",
		() => new MyStruct(),
		() => [],
		MyStruct,
		() => [{ name: "PointerField", key: "PointerField", type: /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int")) }, { name: "interfaceField", key: "interfaceField", type: "main.MyInterface" }]
	)
}

export async function main(): globalThis.Promise<void> {
	let s = new MyStruct(undefined, true)
	await $.println(s.PointerField == null)
	await $.println(s.interfaceField == null)

	let i = $.varRef(10)
	s.PointerField = i
	await $.println(s.PointerField != null)
	await $.println($.pointerValue<number>(s.PointerField))
	i.value = 15
	await $.println($.pointerValue<number>(s.PointerField))

	let mi: MyInterface | null = null! as MyInterface | null
	s.interfaceField = mi
	await $.println(s.interfaceField == null)
}

if ($.isMainScript(import.meta)) {
	await main()
}
