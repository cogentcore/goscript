// Generated file based on dep.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

$.registerTypePackagePath("github.com/s4wave/goscript/tests/tests/defined_external_struct_wrapper/dep", ["dep.hidden", "dep.Public"])

export class hidden {
	public declare label: string

	constructor(__goscriptValue?: boolean, label$?: string) {
		this.label = label$ ?? ""
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): hidden {
		return new hidden(true, this.label)
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

	constructor(__goscriptValue?: boolean, Value$?: string, Hidden$?: hidden) {
		this.Value = Value$ ?? ""
		this.Hidden = Hidden$ ?? new hidden(true)
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): Public {
		return new Public(true, this.Value, this.Hidden.clone())
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
