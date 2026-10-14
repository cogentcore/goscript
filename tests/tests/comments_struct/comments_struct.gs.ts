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

	constructor(init?: Partial<{IntField?: number, StringField?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			IntField: init?.IntField ?? (0 as number),
			StringField: init?.StringField ?? ("" as string)
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): TestStruct {
		return new TestStruct(this, true)
	}

	public __goscriptAssign(source: TestStruct): void {
		const target = this._fields
		const values = source._fields
		target.IntField = values.IntField
		target.StringField = values.StringField
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
