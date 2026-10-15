// Generated file based on make_slice_struct_zero.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class code {
	public declare len: number

	constructor(init?: Partial<{len?: number}>, __goscriptValue?: boolean) {
		this.len = init?.len ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): code {
		return new code(this, true)
	}

	public __goscriptAssign(source: code): this {
		this.len = source.len
		return this
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
	let codes = $.makeSlice<code>(2, undefined, undefined, () => new code(undefined, true))
	$.arrayIndex(codes!, 0).len = 3
	await $.println("first:", $.arrayIndex(codes!, 0).len)
	await $.println("second:", $.arrayIndex(codes!, 1).len)
}

if ($.isMainScript(import.meta)) {
	await main()
}
