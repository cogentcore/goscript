// Generated file based on slices_sortfunc_nil.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as slices from "@goscript/slices/index.js"

export class field {
	public declare name: string

	constructor(__goscriptValue?: boolean, name$?: string) {
		this.name = name$ ?? ""
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): field {
		return new field(true, this.name)
	}

	public __goscriptAssign(source: field): this {
		this.name = source.name
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.field",
		() => new field(),
		() => [],
		field,
		() => [{ name: "name", key: "name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let fields: $.Slice<field> = null! as $.Slice<field>
	await $.println("fields before:", fields)

	slices.SortFunc(fields, $.functionValue((a: field, b: field): number => {
		if ($.stringCompare(a.name, b.name) < 0) {
			return -1
		}
		if ($.stringCompare(a.name, b.name) > 0) {
			return 1
		}
		return 0
	}, ({ kind: $.TypeKind.Function, params: ["main.field", "main.field"], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo)))

	await $.println("fields after:", fields)
}

if ($.isMainScript(import.meta)) {
	await main()
}
