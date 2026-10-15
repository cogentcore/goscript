// Generated file based on b.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as __goscript_a from "./a.gs.ts"

export class bValue {
	public declare inner: __goscript_a.aValue

	constructor(__goscriptValue?: boolean, inner$?: __goscript_a.aValue) {
		this.inner = inner$ ?? new __goscript_a.aValue(true)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): bValue {
		return new bValue(true, this.inner.clone())
	}

	public __goscriptAssign(source: bValue): this {
		this.inner.__goscriptAssign(source.inner)
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.bValue",
		() => new bValue(),
		() => [],
		bValue,
		() => [{ name: "inner", key: "inner", type: "main.aValue" }]
	)
}

export function makeB(): bValue {
	return new bValue(true)
}
