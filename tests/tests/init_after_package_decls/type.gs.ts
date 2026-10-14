// Generated file based on type.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as __goscript_field from "./field.gs.ts"
import "./field.gs.ts"

export class Type {
	public get Name(): string {
		return this._fields.Name
	}

	public set Name(value: string) {
		this._fields.Name = value
	}

	public get Fields(): $.Slice<__goscript_field.Field> {
		return this._fields.Fields
	}

	public set Fields(value: $.Slice<__goscript_field.Field>) {
		this._fields.Fields = value
	}

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

	public __goscriptAssign(source: Type): void {
		const target = this._fields
		const values = source._fields
		target.Name = values.Name
		target.Fields = values.Fields
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

	static __typeInfo = $.registerStructType(
		"main.Type",
		() => new Type(),
		() => [{ name: "FieldNames", args: [], returns: [{ type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string")) }] }],
		Type,
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }, { name: "Fields", key: "Fields", type: /* @__PURE__ */ $.sliceType("main.Field") }]
	)
}
