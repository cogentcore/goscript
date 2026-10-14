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
	public get PointerField(): $.VarRef<number> | null {
		return this._fields.PointerField
	}

	public set PointerField(value: $.VarRef<number> | null) {
		this._fields.PointerField = value
	}

	public get interfaceField(): MyInterface | null {
		return this._fields.interfaceField
	}

	public set interfaceField(value: MyInterface | null) {
		this._fields.interfaceField = value
	}

	public _fields: {
		PointerField: $.VarRef<number> | null
		interfaceField: MyInterface | null
	}

	constructor(init?: Partial<{PointerField?: $.VarRef<number> | null, interfaceField?: MyInterface | null}>, __goscriptValue?: boolean) {
		this._fields = {
			PointerField: init?.PointerField ?? (null! as $.VarRef<number> | null),
			interfaceField: init?.interfaceField ?? (null! as MyInterface | null)
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
		target.PointerField = values.PointerField
		target.interfaceField = $.assignFieldValue(target.interfaceField, values.interfaceField, "main.MyInterface")
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
