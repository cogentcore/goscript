// Generated file based on b.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as __goscript_a from "./a.gs.ts"
import "./a.gs.ts"

export class bValue {
	public declare inner: __goscript_a.aValue

	constructor(init?: Partial<{inner?: __goscript_a.aValue}>, __goscriptValue?: boolean) {
		this.inner = init?.inner ? init.inner.clone() : new __goscript_a.aValue(undefined, true)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): bValue {
		return new bValue(this, true)
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
	return new bValue(undefined, true)
}
