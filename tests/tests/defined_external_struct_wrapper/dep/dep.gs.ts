// Generated file based on dep.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

$.registerTypePackagePath("github.com/s4wave/goscript/tests/tests/defined_external_struct_wrapper/dep", ["dep.hidden", "dep.Public"])

export class hidden {
	public declare label: string

	constructor(init?: Partial<{label?: string}>, __goscriptValue?: boolean) {
		this.label = init?.label ?? ("" as string)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): hidden {
		return new hidden(this, true)
	}

	public __goscriptAssign(source: hidden): this {
		this.label = source.label
		return this
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
	public declare Value: string

	public declare Hidden: hidden

	constructor(init?: Partial<{Value?: string, Hidden?: hidden}>, __goscriptValue?: boolean) {
		this.Value = init?.Value ?? ("" as string)
		this.Hidden = init?.Hidden ? init.Hidden.clone() : new hidden(undefined, true)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Public {
		return new Public(this, true)
	}

	public __goscriptAssign(source: Public): this {
		this.Value = source.Value
		this.Hidden.__goscriptAssign(source.Hidden)
		return this
	}

	public Label(): string {
		const p: Public | $.VarRef<Public> | null = this;
		return $.pointerValue<Public>(p).Value
	}

	static __typeInfo = $.registerStructType(
		"dep.Public",
		() => new Public(),
		() => [{ name: "Label", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }],
		Public,
		() => [{ name: "Value", key: "Value", type: /* @__PURE__ */ $.basicType("string") }, { name: "Hidden", key: "Hidden", type: "dep.hidden" }]
	)
}
