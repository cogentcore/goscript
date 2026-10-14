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
	public _fields: {
	}

	constructor(init?: Partial<{}>, __goscriptValue?: boolean) {
		this._fields = {
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): impl {
		return new impl(this, true)
	}

	public __goscriptAssign(source: impl): void {
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
	public get Hidden(): hidden | null {
		return this._fields.Hidden
	}

	public set Hidden(value: hidden | null) {
		this._fields.Hidden = value
	}

	public _fields: {
		Hidden: hidden | null
	}

	constructor(init?: Partial<{Hidden?: hidden | null}>, __goscriptValue?: boolean) {
		this._fields = {
			Hidden: init?.Hidden ?? (null! as hidden | null)
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): Holder {
		return new Holder(this, true)
	}

	public __goscriptAssign(source: Holder): void {
		const target = this._fields
		const values = source._fields
		target.Hidden = $.assignFieldValue(target.Hidden, values.Hidden, "dep.hidden")
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
	return new Holder({Hidden: $.interfaceValue<hidden | null>(new impl(undefined, true), "dep.impl", "dep.impl")}, true)
}
