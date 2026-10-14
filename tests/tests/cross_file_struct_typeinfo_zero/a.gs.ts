// Generated file based on a.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as __goscript_b from "./b.gs.ts"
import "./b.gs.ts"

export class aValue {
	public get next(): __goscript_b.bValue | $.VarRef<__goscript_b.bValue> | null {
		return this._fields.next
	}

	public set next(value: __goscript_b.bValue | $.VarRef<__goscript_b.bValue> | null) {
		this._fields.next = value
	}

	public _fields: {
		next: __goscript_b.bValue | $.VarRef<__goscript_b.bValue> | null
	}

	constructor(init?: Partial<{next?: __goscript_b.bValue | $.VarRef<__goscript_b.bValue> | null}>, __goscriptValue?: boolean) {
		this._fields = {
			next: init?.next ?? (null! as __goscript_b.bValue | $.VarRef<__goscript_b.bValue> | null)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): aValue {
		return new aValue(this, true)
	}

	public __goscriptAssign(source: aValue): void {
		const target = this._fields
		const values = source._fields
		target.next = values.next
	}

	static __typeInfo = $.registerStructType(
		"main.aValue",
		() => new aValue(),
		() => [],
		aValue,
		() => [{ name: "next", key: "next", type: /* @__PURE__ */ $.pointerType("main.bValue") }]
	)
}

export function makeA(): aValue {
	return new aValue(undefined, true)
}
