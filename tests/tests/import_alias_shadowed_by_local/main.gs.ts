// Generated file based on main.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as drbg2 from "@goscript/github.com/s4wave/goscript/tests/tests/import_alias_shadowed_by_local/drbg/index.js"
import "@goscript/github.com/s4wave/goscript/tests/tests/import_alias_shadowed_by_local/drbg/index.js"

export class local {
	public declare value: number

	constructor(init?: Partial<{value?: number}>, __goscriptValue?: boolean) {
		this.value = init?.value ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): local {
		return new local(this, true)
	}

	public __goscriptAssign(source: local): this {
		this.value = source.value
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.local",
		() => new local(),
		() => [],
		local,
		() => [{ name: "value", key: "value", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export function newLocal(value: number): local | $.VarRef<local> | null {
	return new local({value: value})
}

export async function main(): globalThis.Promise<void> {
	{
		let err = drbg2.Read()
		if (err != null) {
			await $.println("error")
			return
		}
	}

	let __goscriptShadow0 = newLocal(7)
	await $.println($.pointerValue<local>(__goscriptShadow0).value)
}

if ($.isMainScript(import.meta)) {
	await main()
}
