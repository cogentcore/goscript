// Generated file based on type.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as __goscript_field from "./field.gs.ts"
import "./field.gs.ts"

export class Type {
	public declare Name: string

	public declare Fields: $.Slice<__goscript_field.Field>

	public _fields: {
		Name: string
		Fields: $.Slice<__goscript_field.Field>
	}

	constructor(init?: Partial<{Name?: string, Fields?: $.Slice<__goscript_field.Field>}>) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			Fields: init?.Fields ?? (null! as $.Slice<__goscript_field.Field>)
		}
	}

	public clone(): Type {
		return $.markAsStructValue(new Type(this))
	}

	public FieldNames(): $.Slice<string> {
		const t: Type | $.VarRef<Type> | null = this;
		let names: $.Slice<string> = $.arrayToSlice<string>([])
		for (let __goscriptRangeTarget0 = $.pointerValue<Type>(t).Fields, __rangeIndex = 0; __rangeIndex < $.len(__goscriptRangeTarget0); __rangeIndex++) {
			let f = $.markAsStructValue($.cloneStructValue(__goscriptRangeTarget0![__rangeIndex]))
			names = $.append(names, f.Name)
		}
		return names
	}

	static {
		$.bindStructFields(this.prototype, ["Name", "Fields"])
	}

	static __typeInfo = $.registerStructType(
		"main.Type",
		() => new Type(),
		() => [{ name: "FieldNames", args: [], returns: [{ type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string")) }] }],
		Type,
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }, { name: "Fields", key: "Fields", type: /* @__PURE__ */ $.sliceType("main.Field") }]
	)
}
