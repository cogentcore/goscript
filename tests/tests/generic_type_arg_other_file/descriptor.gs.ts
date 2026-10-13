// Generated file based on descriptor.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class descriptor {
	public declare Label: string

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

	public toJS(): any {
		const d: descriptor | $.VarRef<descriptor> | null = this;
		return $.concatString("descriptor ", $.pointerValue<descriptor>(d).Label)
	}

	static {
		$.bindStructFields(this.prototype, ["Label"])
	}

	static __typeInfo = $.registerStructType(
		"main.descriptor",
		() => new descriptor(),
		() => [{ name: "toJS", args: [], returns: [{ type: { kind: $.TypeKind.Interface, methods: [] } }] }],
		descriptor,
		() => [{ name: "Label", key: "Label", type: /* @__PURE__ */ $.basicType("string") }]
	)
}
