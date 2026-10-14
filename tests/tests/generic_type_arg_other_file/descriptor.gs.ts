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

	constructor(init?: Partial<{Label?: string}>) {
		this._fields = {
			Label: init?.Label ?? ("" as string)
		}
	}

	public clone(): descriptor {
		return $.markAsStructValue(new descriptor(this))
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
