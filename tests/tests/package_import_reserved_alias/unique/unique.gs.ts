// Generated file based on unique.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

$.registerTypePackagePath("github.com/s4wave/goscript/tests/tests/package_import_reserved_alias/unique", ["unique.Box"])

export class Box {
	public get Value(): number {
		return this._fields.Value
	}

	public set Value(value: number) {
		this._fields.Value = value
	}

	public _fields: {
		Value: number
	}

	constructor(init?: Partial<{Value?: number}>) {
		this._fields = {
			Value: init?.Value ?? (0 as number)
		}
	}

	public clone(): Box {
		return $.markAsStructValue(new Box(this))
	}

	public __goscriptAssign(source: Box): void {
		const target = this._fields
		const values = source._fields
		target.Value = values.Value
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
	return new Box({Value: value})
}
