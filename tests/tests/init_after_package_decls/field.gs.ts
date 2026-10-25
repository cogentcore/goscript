// Generated file based on field.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import type * as __goscript__type from "./type.gs.ts"
import * as __goscript_types from "./types.gs.ts"

export class Field {
	public declare Name: string

	constructor(__goscriptValue?: boolean, Name$?: string) {
		this.Name = Name$ ?? ""
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): Field {
		return new Field(true, this.Name)
	}

	public __goscriptAssign(source: Field): this {
		this.Name = source.Name
		return this
	}

	public Owner(): __goscript__type.Type | $.VarRef<__goscript__type.Type> | null {
		const f = this;
		return __goscript_types.TypeByName(f.Name)
	}

	static __typeInfo = $.registerStructType(
		"main.Field",
		() => new Field(),
		() => [{ name: "Owner", args: [], returns: [{ type: /* @__PURE__ */ $.pointerType("main.Type") }] }],
		Field,
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}
