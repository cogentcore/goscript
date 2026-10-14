// Generated file based on comments_struct.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class TestStruct {
	// IntField is a commented integer field.
	public get IntField(): number {
		return this._fields.IntField
	}

	public set IntField(value: number) {
		this._fields.IntField = value
	}

	// StringField is a commented string field.
	public get StringField(): string {
		return this._fields.StringField
	}

	public set StringField(value: string) {
		this._fields.StringField = value
	}

	public _fields: {
		IntField: number
		StringField: string
	}

	constructor(init?: Partial<{IntField?: number, StringField?: string}>) {
		this._fields = {
			IntField: init?.IntField ?? (0 as number),
			StringField: init?.StringField ?? ("" as string)
		}
	}

	public clone(): TestStruct {
		return $.markAsStructValue(new TestStruct(this))
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
	let s = $.markAsStructValue(new TestStruct({IntField: 42, StringField: "hello"}))
	await $.println("IntField:", s.IntField)
	await $.println("StringField:", s.StringField)
}

if ($.isMainScript(import.meta)) {
	await main()
}
