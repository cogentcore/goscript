// Generated file based on dep.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

$.registerTypePackagePath("github.com/s4wave/goscript/tests/tests/import_alias_type_assert_shadow/dep", ["dep.Thing"])

export class Thing {
	public declare Value: number

	constructor(__goscriptValue?: boolean, Value$?: number) {
		this.Value = Value$ ?? 0
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): Thing {
		return new Thing(true, this.Value)
	}

	public __goscriptAssign(source: Thing): this {
		this.Value = source.Value
		return this
	}

	static __typeInfo = $.registerStructType(
		"dep.Thing",
		() => new Thing(),
		() => [],
		Thing,
		() => [{ name: "Value", key: "Value", type: /* @__PURE__ */ $.basicType("int") }]
	)
}
