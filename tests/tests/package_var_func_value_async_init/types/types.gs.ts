// Generated file based on types.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as sync from "@goscript/sync/index.js"
import "@goscript/sync/index.js"

export class Type {
	public declare Ext: string

	public declare MIME: string

	public _fields: {
		Ext: string
		MIME: string
	}

	constructor(init?: Partial<{Ext?: string, MIME?: string}>) {
		this._fields = {
			Ext: init?.Ext ?? ("" as string),
			MIME: init?.MIME ?? ("" as string)
		}
	}

	public clone(): Type {
		return $.markAsStructValue(new Type(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Ext", "MIME"])
	}

	static __typeInfo = $.registerStructType(
		"types.Type",
		() => new Type(),
		() => [],
		Type,
		() => [{ name: "Ext", key: "Ext", type: /* @__PURE__ */ $.basicType("string") }, { name: "MIME", key: "MIME", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export let Types: $.VarRef<sync.Map> = $.varRef($.markAsStructValue(new sync.Map()))

export function __goscript_set_Types(__goscriptValue: sync.Map): void {
	$.assignStruct(Types.value, __goscriptValue)
}

export async function NewType(ext: string, mime: string): globalThis.Promise<Type> {
	let t = $.markAsStructValue(new Type({Ext: ext, MIME: mime}))
	await Types.value.Store(ext, $.interfaceValue($.markAsStructValue($.cloneStructValue(t)), "types.Type", "types.Type"))
	return $.markAsStructValue($.cloneStructValue(t))
}

export async function Get(ext: string): globalThis.Promise<Type> {
	{
		let [t, ok] = await Types.value.Load(ext)
		if (ok) {
			return $.markAsStructValue($.cloneStructValue($.mustTypeAssert<Type>(t, "types.Type")))
		}
	}
	return $.markAsStructValue(new Type())
}
