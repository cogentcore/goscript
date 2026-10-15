// Generated file based on comments_struct.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class TestStruct {
	// IntField is a commented integer field.
	public declare IntField: number

	// StringField is a commented string field.
	public declare StringField: string

	constructor(__goscriptValue?: boolean, IntField$?: number, StringField$?: string) {
		this.IntField = IntField$ ?? 0
		this.StringField = StringField$ ?? ""
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): TestStruct {
		return new TestStruct(true, this.IntField, this.StringField)
	}

	public __goscriptAssign(source: TestStruct): this {
		this.IntField = source.IntField
		this.StringField = source.StringField
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.TestStruct",
		() => new TestStruct(),
		() => [],
		TestStruct,
		() => [{ name: "IntField", key: "IntField", type: /* @__PURE__ */ $.basicType("int") }, { name: "StringField", key: "StringField", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let s = new TestStruct(true, 42, "hello")
	await $.println("IntField:", s.IntField)
	await $.println("StringField:", s.StringField)
}

if ($.isMainScript(import.meta)) {
	await main()
}
