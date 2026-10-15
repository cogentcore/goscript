// Generated file based on imported_interface_field.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as io from "@goscript/io/index.js"
import "@goscript/io/index.js"

export class holder {
	public declare w: io.Writer | null

	constructor(init?: Partial<{w?: io.Writer | null}>, __goscriptValue?: boolean) {
		this.w = init?.w ?? (null! as io.Writer | null)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): holder {
		return new holder(this, true)
	}

	public __goscriptAssign(source: holder): this {
		this.w = $.assignFieldValue(this.w, source.w, "io.Writer")
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.holder",
		() => new holder(),
		() => [],
		holder,
		() => [{ name: "w", key: "w", type: "io.Writer" }]
	)
}

export function newHolder(w: io.Writer | null): holder | $.VarRef<holder> | null {
	return new holder({w: w})
}

export async function main(): globalThis.Promise<void> {
	let h = newHolder(null)
	if ($.pointerValue<holder>(h).w == null) {
		await $.println("nil writer")
		return
	}
	await $.println("writer present")
}

if ($.isMainScript(import.meta)) {
	await main()
}
