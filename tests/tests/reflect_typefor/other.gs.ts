// Generated file based on other.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class OtherStruct {
	public declare Label: string

	constructor(__goscriptValue?: boolean, Label$?: string) {
		this.Label = Label$ ?? ""
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): OtherStruct {
		return new OtherStruct(true, this.Label)
	}

	public __goscriptAssign(source: OtherStruct): this {
		this.Label = source.Label
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.OtherStruct",
		() => new OtherStruct(),
		() => [],
		OtherStruct,
		() => [/* @__PURE__ */ $.structField("Label", /* @__PURE__ */ $.basicType("string"), [0], 0, true)]
	)
}
