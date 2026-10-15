// Generated file based on dep.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

$.registerTypePackagePath("github.com/s4wave/goscript/tests/tests/cross_package_unexported_interface_field/dep", ["dep.hidden", "dep.impl", "dep.Holder"])

export type hidden = {
	Ping(): string
}

$.registerInterfaceType(
	"dep.hidden",
	null,
	[{ name: "Ping", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }]
);

export class impl {
	constructor(__goscriptValue?: boolean) {
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): impl {
		return new impl(true)
	}

	public __goscriptAssign(source: impl): this {
		return this
	}

	public Ping(): string {
		return "pong"
	}

	static __typeInfo = $.registerStructType(
		"dep.impl",
		() => new impl(),
		() => [{ name: "Ping", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		impl,
		() => []
	)
}

export class Holder {
	public declare Hidden: hidden | null

	constructor(__goscriptValue?: boolean, Hidden$?: hidden | null) {
		this.Hidden = Hidden$ ?? (null! as hidden | null)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Holder {
		return new Holder(true, this.Hidden)
	}

	public __goscriptAssign(source: Holder): this {
		this.Hidden = $.assignFieldValue(this.Hidden, source.Hidden, "dep.hidden")
		return this
	}

	static __typeInfo = $.registerStructType(
		"dep.Holder",
		() => new Holder(),
		() => [],
		Holder,
		() => [{ name: "Hidden", key: "Hidden", type: "dep.hidden" }]
	)
}

export function NewHolder(): Holder {
	return new Holder(true, $.interfaceValue<hidden | null>(new impl(true), "dep.impl", "dep.impl"))
}
