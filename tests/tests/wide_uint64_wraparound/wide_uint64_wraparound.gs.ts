// Generated file based on wide_uint64_wraparound.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class BigInt {
	constructor(__goscriptValue?: boolean) {
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): BigInt {
		return new BigInt(true)
	}

	public __goscriptAssign(source: BigInt): this {
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.BigInt",
		() => new BigInt(),
		() => [],
		BigInt,
		() => []
	)
}

export async function main(): globalThis.Promise<void> {
	let value = 18446744073709551615n
	await $.println($.uint64Add(value, 1n))
}

if ($.isMainScript(import.meta)) {
	await main()
}
