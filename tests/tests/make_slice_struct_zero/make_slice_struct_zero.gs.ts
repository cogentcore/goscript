// Generated file based on make_slice_struct_zero.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class code {
	public declare len: number

	constructor(__goscriptValue?: boolean, len$?: number) {
		this.len = len$ ?? 0
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): code {
		return new code(true, this.len)
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
	let codes = $.makeSlice<code>(2, undefined, undefined, () => new code(true))
	$.arrayIndex(codes!, 0).len = 3
	await $.println("first:", $.arrayIndex(codes!, 0).len)
	await $.println("second:", $.arrayIndex(codes!, 1).len)
}

if ($.isMainScript(import.meta)) {
	await main()
}
