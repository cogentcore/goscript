// Generated file based on dep.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

$.registerTypePackagePath("github.com/s4wave/goscript/tests/tests/package_import_dot_qualified/dep", ["dep.Box"])

export class Box {
	public get N(): number {
		return this._fields.N
	}

	public set N(value: number) {
		this._fields.N = value
	}

	public _fields: {
		N: number
	}

	constructor(init?: Partial<{N?: number}>) {
		this._fields = {
			N: init?.N ?? (0 as number)
		}
	}

	public clone(): Box {
		return $.markAsStructValue(new Box(this))
	}

	static __typeInfo = $.registerStructType(
		"dep.Box",
		() => new Box(),
		() => [],
		Box,
		() => [{ name: "N", key: "N", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export let Value: number = 5

export function __goscript_set_Value(__goscriptValue: number): void {
	Value = __goscriptValue
}

export function Double(v: number): number {
	return v * 2
}

export function NewBox(n: number): Box {
	return $.markAsStructValue(new Box({N: n}))
}
