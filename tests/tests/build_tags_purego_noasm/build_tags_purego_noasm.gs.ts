// Generated file based on build_tags_purego_noasm.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as __goscript_noasm from "./noasm.gs.ts"

import * as __goscript_purego from "./purego.gs.ts"
import "./noasm.gs.ts"
import "./purego.gs.ts"

export async function main(): globalThis.Promise<void> {
	await $.println("haveArchSqrt:", false)
	await $.println("purego:", __goscript_purego.puregoImpl())
	await $.println("sqrt(16):", sqrt(16))
}

export function sqrt(x: number): number {
	if (false) {
		return __goscript_noasm.archSqrt(x)
	}
	let z = x / 2
	for (let __rangeIndex = 0; __rangeIndex < 20; __rangeIndex++) {
		z -= ((z * z) - x) / (2 * z)
	}
	return z
}

if ($.isMainScript(import.meta)) {
	await main()
}
