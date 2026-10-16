// Generated file based on float_constant_fraction.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as math from "@goscript/math/index.js"
import "@goscript/math/index.js"

export const third: number = 0.3333333333333333

export const digitsToBitsRatio: number = 3.321928094887362

export async function main(): globalThis.Promise<void> {
	let bits = 296
	let three = 3.0
	await $.println("third", $.int(three / 0.3333333333333333), $.int((three * 0.3333333333333333) * 3))
	await $.println("digits", $.int(bits / 3.321928094887362))
}

if ($.isMainScript(import.meta)) {
	await main()
}
