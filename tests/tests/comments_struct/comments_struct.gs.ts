// Generated file based on comments_struct.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class TestStruct {
	// IntField is a commented integer field.
	public declare IntField: number

	// StringField is a commented string field.
	public declare StringField: string

	constructor(init?: Partial<{IntField?: number, StringField?: string}>, __goscriptValue?: boolean) {
		this.IntField = init?.IntField ?? (0 as number)
		this.StringField = init?.StringField ?? ("" as string)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): TestStruct {
		return new TestStruct(this, true)
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
	let s = new TestStruct({IntField: 42, StringField: "hello"}, true)
	await $.println("IntField:", s.IntField)
	await $.println("StringField:", s.StringField)
}

if ($.isMainScript(import.meta)) {
	await main()
}
