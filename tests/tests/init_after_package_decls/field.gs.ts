// Generated file based on field.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import type * as __goscript__type from "./type.gs.ts"

import * as __goscript_types from "./types.gs.ts"
import "./types.gs.ts"

export class Field {
	public declare Name: string

	public _fields: {
		Name: string
	}

	constructor(init?: Partial<{Name?: string}>) {
		this._fields = {
			Name: init?.Name ?? ("" as string)
		}
	}

	public clone(): Field {
		return $.markAsStructValue(new Field(this))
	}

	public Owner(): __goscript__type.Type | $.VarRef<__goscript__type.Type> | null {
		const f = this;
		return __goscript_types.TypeByName(f.Name)
	}

	static {
		$.bindStructFields(this.prototype, ["Name"])
	}

	static __typeInfo = $.registerStructType(
		"main.Field",
		() => new Field(),
		() => [{ name: "Owner", args: [], returns: [{ type: /* @__PURE__ */ $.pointerType("main.Type") }] }],
		Field,
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}
