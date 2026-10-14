// Generated file based on imported_interface_field.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as io from "@goscript/io/index.js"
import "@goscript/io/index.js"

export class holder {
	public get w(): io.Writer | null {
		return this._fields.w
	}

	public set w(value: io.Writer | null) {
		this._fields.w = value
	}

	public _fields: {
		w: io.Writer | null
	}

	constructor(init?: Partial<{w?: io.Writer | null}>, __goscriptValue?: boolean) {
		this._fields = {
			w: init?.w ?? (null! as io.Writer | null)
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): holder {
		return new holder(this, true)
	}

	public __goscriptAssign(source: holder): void {
		const target = this._fields
		const values = source._fields
		target.w = $.assignFieldValue(target.w, values.w, "io.Writer")
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
	let h: holder | $.VarRef<holder> | null = newHolder(null)
	if ($.pointerValue<holder>(h).w == null) {
		await $.println("nil writer")
		return
	}
	await $.println("writer present")
}

if ($.isMainScript(import.meta)) {
	await main()
}
