// Generated file based on make_slice_struct_zero.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class code {
	public get len(): number {
		return this._fields.len
	}

	public set len(value: number) {
		this._fields.len = value
	}

	public _fields: {
		len: number
	}

	constructor(init?: Partial<{len?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			len: init?.len ?? (0 as number)
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): code {
		return new code(this, true)
	}

	public __goscriptAssign(source: code): void {
		const target = this._fields
		const values = source._fields
		target.len = values.len
	}

	static __typeInfo = $.registerStructType(
		"main.code",
		() => new code(),
		() => [],
		code,
		() => [{ name: "len", key: "len", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let codes: $.Slice<code> = $.makeSlice<code>(2, undefined, undefined, () => new code(undefined, true))
	$.arrayIndex(codes!, 0).len = 3
	await $.println("first:", $.arrayIndex(codes!, 0).len)
	await $.println("second:", $.arrayIndex(codes!, 1).len)
}

if ($.isMainScript(import.meta)) {
	await main()
}
