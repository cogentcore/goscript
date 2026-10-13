// Generated file based on dep.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

$.registerTypePackagePath("github.com/s4wave/goscript/tests/tests/import_alias_type_assert_shadow/dep", ["dep.Thing"])

export class Thing {
	public declare Value: number

	public _fields: {
		Value: number
	}

	constructor(init?: Partial<{Value?: number}>) {
		this._fields = {
			Value: init?.Value ?? (0 as number)
		}
	}

	public clone(): Thing {
		return $.markAsStructValue(new Thing(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Value"])
	}

	static __typeInfo = $.registerStructType(
		"dep.Thing",
		() => new Thing(),
		() => [],
		Thing,
		() => [{ name: "Value", key: "Value", type: /* @__PURE__ */ $.basicType("int") }]
	)
}
