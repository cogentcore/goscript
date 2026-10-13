// Generated file based on conversion_operand_grouping.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as math from "@goscript/math/index.js"
import "@goscript/math/index.js"

export type celsius = number

export async function main(): globalThis.Promise<void> {
	let n = 4194368
	let ny = 2
	let threads = 64
	await $.println("divide:", $.int(math.Ceil(n / (ny * threads))))
	await $.println("subtract:", (n - (ny - threads)) == 4194430)
	await $.println("multiply:", (2 * (ny + threads)) == 132)
	await $.println("int:", Math.trunc(100 / $.int(Math.trunc((ny * threads) / ny))))
	await $.println("named:", (n / (ny + threads)) > 63550)
	let f: number = 10
	await $.println("float:", $.int(f / (ny + 3)) == 2)
	await $.println("unary:", -(ny + threads) == -66)
}

if ($.isMainScript(import.meta)) {
	await main()
}
