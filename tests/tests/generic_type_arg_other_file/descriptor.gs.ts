// Generated file based on descriptor.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class descriptor {
	public declare Label: string

	constructor(init?: Partial<{Label?: string}>, __goscriptValue?: boolean) {
		this.Label = init?.Label ?? ("" as string)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): descriptor {
		return new descriptor(this, true)
	}

	public __goscriptAssign(source: descriptor): this {
		this.Label = source.Label
		return this
	}

	public toJS(): any {
		const d: descriptor | $.VarRef<descriptor> | null = this;
		return "descriptor " + $.pointerValue<descriptor>(d).Label
	}

	static __typeInfo = $.registerStructType(
		"main.descriptor",
		() => new descriptor(),
		() => [{ name: "toJS", args: [], returns: [{ type: { kind: $.TypeKind.Interface, methods: [] } }], pointerReceiver: true }],
		descriptor,
		() => [{ name: "Label", key: "Label", type: /* @__PURE__ */ $.basicType("string") }]
	)
}
