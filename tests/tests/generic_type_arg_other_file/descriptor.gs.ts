// Generated file based on descriptor.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class descriptor {
	public get Label(): string {
		return this._fields.Label
	}

	public set Label(value: string) {
		this._fields.Label = value
	}

	public _fields: {
		Label: string
	}

	constructor(init?: Partial<{Label?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			Label: init?.Label ?? ("" as string)
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): descriptor {
		return new descriptor(this, true)
	}

	public __goscriptAssign(source: descriptor): void {
		const target = this._fields
		const values = source._fields
		target.Label = values.Label
	}

	public toJS(): any {
		const d: descriptor | $.VarRef<descriptor> | null = this;
		return $.concatString("descriptor ", $.pointerValue<descriptor>(d).Label)
	}

	static __typeInfo = $.registerStructType(
		"main.descriptor",
		() => new descriptor(),
		() => [{ name: "toJS", args: [], returns: [{ type: { kind: $.TypeKind.Interface, methods: [] } }], pointerReceiver: true }],
		descriptor,
		() => [{ name: "Label", key: "Label", type: /* @__PURE__ */ $.basicType("string") }]
	)
}
