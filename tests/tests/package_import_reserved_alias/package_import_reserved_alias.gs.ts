// Generated file based on package_import_reserved_alias.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as _unique from "@goscript/github.com/s4wave/goscript/tests/tests/package_import_reserved_alias/unique/index.js"
import "@goscript/github.com/s4wave/goscript/tests/tests/package_import_reserved_alias/unique/index.js"

export class Holder {
	public declare Box: _unique.Box | $.VarRef<_unique.Box> | null

	constructor(init?: Partial<{Box?: _unique.Box | $.VarRef<_unique.Box> | null}>, __goscriptValue?: boolean) {
		this.Box = init?.Box ?? (null! as _unique.Box | $.VarRef<_unique.Box> | null)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Holder {
		return new Holder(this, true)
	}

	public __goscriptAssign(source: Holder): this {
		this.Box = source.Box
		return this
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
	let holder = (() => { const __goscriptLiteralField0 = _unique.NewBox(7); return new Holder({Box: __goscriptLiteralField0}, true) })()
	await $.println("box:", $.pointerValue<_unique.Box>(holder.Box).Value)
}

if ($.isMainScript(import.meta)) {
	await main()
}
