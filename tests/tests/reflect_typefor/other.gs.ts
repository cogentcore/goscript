// Generated file based on other.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class OtherStruct {
	public declare Label: string

	constructor(init?: Partial<{Label?: string}>, __goscriptValue?: boolean) {
		this.Label = init?.Label ?? ("" as string)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): OtherStruct {
		return new OtherStruct(this, true)
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
