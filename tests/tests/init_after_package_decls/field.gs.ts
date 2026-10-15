// Generated file based on field.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import type * as __goscript__type from "./type.gs.ts"
import * as __goscript_types from "./types.gs.ts"

export class Field {
	public get Name(): string {
		return this._fields.Name
	}

	public set Name(value: string) {
		this._fields.Name = value
	}

	public _fields: {
		Name: string
	}

	constructor(init?: Partial<{Name?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			Name: init?.Name ?? ("" as string)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Field {
		return new Field(this, true)
	}

	public __goscriptAssign(source: Field): void {
		const target = this._fields
		const values = source._fields
		target.Name = values.Name
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
