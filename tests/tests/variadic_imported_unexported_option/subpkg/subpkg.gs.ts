// Generated file based on subpkg.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

$.registerTypePackagePath("github.com/s4wave/goscript/tests/tests/variadic_imported_unexported_option/subpkg", ["subpkg.option", "subpkg.Thing"])

export type option = ((_p0: Thing | $.VarRef<Thing> | null) => void) | null

export class Thing {
	public declare Value: number

	public declare Label: string

	constructor(__goscriptValue?: boolean, Value$?: number, Label$?: string) {
		this.Value = Value$ ?? 0
		this.Label = Label$ ?? ""
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Thing {
		return new Thing(true, this.Value, this.Label)
	}

	public __goscriptAssign(source: Thing): this {
		this.Value = source.Value
		this.Label = source.Label
		return this
	}

	static __typeInfo = $.registerStructType(
		"subpkg.Thing",
		() => new Thing(),
		() => [],
		Thing,
		() => [{ name: "Value", key: "Value", type: /* @__PURE__ */ $.basicType("int") }, { name: "Label", key: "Label", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export function WithValue(v: number): option | null {
	return $.functionValue((t: Thing | $.VarRef<Thing> | null) => {
		$.pointerValue<Thing>(t).Value = v
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.pointerType("subpkg.Thing")], results: [] } as $.FunctionTypeInfo))
}

export function WithLabel(l: string): option | null {
	return $.functionValue((t: Thing | $.VarRef<Thing> | null) => {
		$.pointerValue<Thing>(t).Label = l
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.pointerType("subpkg.Thing")], results: [] } as $.FunctionTypeInfo))
}

export function New(opts: $.Slice<option | null>): Thing | $.VarRef<Thing> | null {
	let t = new Thing()
	for (let __goscriptRangeTarget0 = opts, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let opt = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as option | null)
		opt!(t)
	}
	return t
}
