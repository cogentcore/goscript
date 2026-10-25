// Generated file based on tx.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

$.registerTypePackagePath("github.com/s4wave/goscript/tests/tests/package_import_embedded_forwarder/dep/tx", ["tx.Tx"])

export class Tx {
	public declare Name: string

	constructor(__goscriptValue?: boolean, Name$?: string) {
		this.Name = Name$ ?? ""
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): Tx {
		return new Tx(true, this.Name)
	}

	public __goscriptAssign(source: Tx): this {
		this.Name = source.Name
		return this
	}

	static __typeInfo = $.registerStructType(
		"tx.Tx",
		() => new Tx(),
		() => [],
		Tx,
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}
