// Generated file based on dep.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

$.registerTypePackagePath("github.com/s4wave/goscript/tests/tests/package_import_dot_qualified/dep", ["dep.Box"])

export class Box {
	public declare N: number

	constructor(init?: Partial<{N?: number}>, __goscriptValue?: boolean) {
		this.N = init?.N ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Box {
		return new Box(this, true)
	}

	public __goscriptAssign(source: Box): this {
		this.N = source.N
		return this
	}

	static __typeInfo = $.registerStructType(
		"dep.Box",
		() => new Box(),
		() => [],
		Box,
		() => [{ name: "N", key: "N", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export let Value = 5

export function __goscript_set_Value(__goscriptValue: number): void {
	Value = __goscriptValue
}

export function Double(v: number): number {
	return v * 2
}

export function NewBox(n: number): Box {
	return new Box({N: n}, true)
}
