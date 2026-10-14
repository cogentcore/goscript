// Generated file based on package_import_reserved_alias.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as _unique from "@goscript/github.com/s4wave/goscript/tests/tests/package_import_reserved_alias/unique/index.js"
import "@goscript/github.com/s4wave/goscript/tests/tests/package_import_reserved_alias/unique/index.js"

export class Holder {
	public get Box(): _unique.Box | $.VarRef<_unique.Box> | null {
		return this._fields.Box
	}

	public set Box(value: _unique.Box | $.VarRef<_unique.Box> | null) {
		this._fields.Box = value
	}

	public _fields: {
		Box: _unique.Box | $.VarRef<_unique.Box> | null
	}

	constructor(init?: Partial<{Box?: _unique.Box | $.VarRef<_unique.Box> | null}>) {
		this._fields = {
			Box: init?.Box ?? (null! as _unique.Box | $.VarRef<_unique.Box> | null)
		}
	}

	public clone(): Holder {
		return $.markAsStructValue(new Holder(this))
	}

	public __goscriptAssign(source: Holder): void {
		const target = this._fields
		const values = source._fields
		target.Box = values.Box
	}

	static __typeInfo = $.registerStructType(
		"main.Holder",
		() => new Holder(),
		() => [],
		Holder,
		() => [{ name: "Box", key: "Box", type: /* @__PURE__ */ $.pointerType("unique.Box") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let holder = (() => { const __goscriptLiteralField0 = _unique.NewBox(7); return $.markAsStructValue(new Holder({Box: __goscriptLiteralField0})) })()
	await $.println("box:", $.pointerValue<_unique.Box>(holder.Box).Value)
}

if ($.isMainScript(import.meta)) {
	await main()
}
