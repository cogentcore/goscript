// Generated file based on tx.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

$.registerTypePackagePath("github.com/s4wave/goscript/tests/tests/package_import_embedded_forwarder/dep/tx", ["tx.Tx"])

export class Tx {
	public get Name(): string {
		return this._fields.Name
	}

	public set Name(value: string) {
		this._fields.Name = value
	}

	public _fields: {
		Name: string
	}

	constructor(init?: Partial<{Name?: string}>) {
		this._fields = {
			Name: init?.Name ?? ("" as string)
		}
	}

	public clone(): Tx {
		return $.markAsStructValue(new Tx(this))
	}

	public __goscriptAssign(source: Tx): void {
		const target = this._fields
		const values = source._fields
		target.Name = values.Name
	}

	static __typeInfo = $.registerStructType(
		"tx.Tx",
		() => new Tx(),
		() => [],
		Tx,
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}
