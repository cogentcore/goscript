// Generated file based on package_import_math_rand_global.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as rand from "@goscript/math/rand/index.js"

import * as randv2 from "@goscript/math/rand/v2/index.js"
import "@goscript/math/rand/index.js"
import "@goscript/math/rand/v2/index.js"

export async function main(): globalThis.Promise<void> {
	// The global sources are randomly seeded, so only check properties.
	let seen: globalThis.Map<bigint, boolean> | null = $.makeMap<bigint, boolean>([])
	let nonzero = 0
	let inRange = true
	for (let __rangeIndex = 0; __rangeIndex < 20; __rangeIndex++) {
		let n = await rand.Int63()
		$.mapSet(seen, n, true)
		if (n != 0n) {
			nonzero++
		}
		let f = await rand.Float64()
		let f32 = await rand.Float32()
		if ((((f < 0) || (f >= 1)) || (f32 < 0)) || (f32 >= 1)) {
			inRange = false
		}
	}
	await $.println("v1 distinct:", $.len(seen) > 15, "nonzero:", nonzero > 15, "in range:", inRange)

	let seen2: globalThis.Map<bigint, boolean> | null = $.makeMap<bigint, boolean>([])
	for (let __rangeIndex = 0; __rangeIndex < 20; __rangeIndex++) {
		$.mapSet(seen2, await randv2.Uint64(), true)
	}
	let n = await randv2.IntN(10)
	await $.println("v2 distinct:", $.len(seen2) > 15, "intn in range:", (n >= 0) && (n < 10))
}

if ($.isMainScript(import.meta)) {
	await main()
}
