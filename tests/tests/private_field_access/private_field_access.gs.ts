// Generated file based on private_field_access.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class MyStruct {
	public declare publicField: string

	public declare privateField: number

	constructor(__goscriptValue?: boolean, publicField$?: string, privateField$?: number) {
		this.publicField = publicField$ ?? ""
		this.privateField = privateField$ ?? 0
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): MyStruct {
		return new MyStruct(true, this.publicField, this.privateField)
	}

	public __goscriptAssign(source: MyStruct): this {
		this.publicField = source.publicField
		this.privateField = source.privateField
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.MyStruct",
		() => new MyStruct(),
		() => [],
		MyStruct,
		() => [{ name: "publicField", key: "publicField", type: /* @__PURE__ */ $.basicType("string") }, { name: "privateField", key: "privateField", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export function NewMyStruct(pub: string, priv: number): MyStruct {
	return new MyStruct(true, pub, priv)
}

export async function accessPrivateField(s: MyStruct): globalThis.Promise<void> {
	// Accessing privateField directly from a function in the same package
	// This should trigger the generation of the _private field
	await $.println("Accessing privateField:", s.privateField)
}

export async function main(): globalThis.Promise<void> {
	let s = NewMyStruct("hello", 123)
	await accessPrivateField(s)
}

if ($.isMainScript(import.meta)) {
	await main()
}
