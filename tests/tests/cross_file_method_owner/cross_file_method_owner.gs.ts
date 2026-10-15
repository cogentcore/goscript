// Generated file based on cross_file_method_owner.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as __goscript_box from "./box.gs.ts"

export function box_total(b: __goscript_box.box): number {
	return __goscript_box.box_base(b) + 1
}

export async function main(): globalThis.Promise<void> {
	await $.println(box_total(3))
	await $.println(__goscript_box.pile.prototype.drain.call((new __goscript_box.pile({step: 2})), $.arrayToSlice<number>([1, 2, 3, 4, 5])))
}

if ($.isMainScript(import.meta)) {
	await main()
}
