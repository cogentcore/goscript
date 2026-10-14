// Generated file based on dep.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class hidden {
	public get label(): string {
		return this._fields.label
	}

	public set label(value: string) {
		this._fields.label = value
	}

	public _fields: {
		label: string
	}

	constructor(init?: Partial<{label?: string}>) {
		this._fields = {
			label: init?.label ?? ("" as string)
		}
	}

	public clone(): hidden {
		return $.markAsStructValue(new hidden(this))
	}

	public __goscriptAssign(source: hidden): void {
		const target = this._fields
		const values = source._fields
		target.label = values.label
	}

	static __typeInfo = $.registerStructType(
		"dep.hidden",
		() => new hidden(),
		() => [],
		hidden,
		() => [{ name: "label", key: "label", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class Public {
	public get Value(): string {
		return this._fields.Value
	}

	public set Value(value: string) {
		this._fields.Value = value
	}

	public get Hidden(): hidden {
		return this._fields.Hidden
	}

	public set Hidden(value: hidden) {
		this._fields.Hidden = value
	}

	public _fields: {
		Value: string
		Hidden: hidden
	}

	constructor(init?: Partial<{Value?: string, Hidden?: hidden}>) {
		this._fields = {
			Value: init?.Value ?? ("" as string),
			Hidden: init?.Hidden ? $.markAsStructValue($.cloneStructValue(init.Hidden)) : $.markAsStructValue(new hidden())
		}
	}

	public clone(): Public {
		return $.markAsStructValue(new Public(this))
	}

	public __goscriptAssign(source: Public): void {
		const target = this._fields
		const values = source._fields
		target.Value = values.Value
		$.assignStruct(target.Hidden, values.Hidden)
	}

	public Label(): string {
		const p: Public | $.VarRef<Public> | null = this;
		return $.pointerValue<Public>(p).Value
	}

	static __typeInfo = $.registerStructType(
		"dep.Public",
		() => new Public(),
		() => [{ name: "Label", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		Public,
		() => [{ name: "Value", key: "Value", type: /* @__PURE__ */ $.basicType("string") }, { name: "Hidden", key: "Hidden", type: "dep.hidden" }]
	)
}
