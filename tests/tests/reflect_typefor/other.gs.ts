// Generated file based on other.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class OtherStruct {
	public get Label(): string {
		return this._fields.Label
	}

	public set Label(value: string) {
		this._fields.Label = value
	}

	public _fields: {
		Label: string
	}

	constructor(init?: Partial<{Label?: string}>) {
		this._fields = {
			Label: init?.Label ?? ("" as string)
		}
	}

	public clone(): OtherStruct {
		return $.markAsStructValue(new OtherStruct(this))
	}

	static __typeInfo = $.registerStructType(
		"main.OtherStruct",
		() => new OtherStruct(),
		() => [],
		OtherStruct,
		() => [/* @__PURE__ */ $.structField("Label", /* @__PURE__ */ $.basicType("string"), [0], 0, true)]
	)
}
