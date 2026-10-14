// Generated file based on b.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as __goscript_a from "./a.gs.ts"
import "./a.gs.ts"

export class bValue {
	public get inner(): __goscript_a.aValue {
		return this._fields.inner
	}

	public set inner(value: __goscript_a.aValue) {
		this._fields.inner = value
	}

	public _fields: {
		inner: __goscript_a.aValue
	}

	constructor(init?: Partial<{inner?: __goscript_a.aValue}>, __goscriptValue?: boolean) {
		this._fields = {
			inner: init?.inner ? init.inner.clone() : new __goscript_a.aValue(undefined, true)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): bValue {
		return new bValue(this, true)
	}

	public __goscriptAssign(source: bValue): void {
		const target = this._fields
		const values = source._fields
		$.assignStruct(target.inner, values.inner)
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
