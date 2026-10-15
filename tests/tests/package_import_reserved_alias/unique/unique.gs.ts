// Generated file based on unique.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

$.registerTypePackagePath("github.com/s4wave/goscript/tests/tests/package_import_reserved_alias/unique", ["unique.Box"])

export class Box {
	public declare Value: number

	constructor(__goscriptValue?: boolean, Value$?: number) {
		this.Value = Value$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Box {
		return new Box(true, this.Value)
	}

	public __goscriptAssign(source: Box): this {
		this.Value = source.Value
		return this
	}

	static __typeInfo = $.registerStructType(
		"unique.Box",
		() => new Box(),
		() => [],
		Box,
		() => [{ name: "Value", key: "Value", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export function NewBox(value: number): Box | $.VarRef<Box> | null {
	return new Box(false, value)
}
