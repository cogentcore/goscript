// Generated file based on private_field_access.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class MyStruct {
	public declare publicField: string

	public declare privateField: number

	constructor(init?: Partial<{publicField?: string, privateField?: number}>, __goscriptValue?: boolean) {
		this.publicField = init?.publicField ?? ("" as string)
		this.privateField = init?.privateField ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): MyStruct {
		return new MyStruct(this, true)
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
	return new MyStruct({publicField: pub, privateField: priv}, true)
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
