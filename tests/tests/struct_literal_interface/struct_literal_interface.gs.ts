// Generated file based on struct_literal_interface.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as reflect from "@goscript/reflect/index.js"

export async function main(): globalThis.Promise<void> {
	// Test creating reflect.SelectCase struct literals
	let cases = $.arrayToSlice<reflect.SelectCase>([$.markAsStructValue(new reflect.SelectCase({Dir: 3}))])
	await $.println("Cases len:", $.sliceLen(cases))
	await $.println("First case dir:", $.plainSliceIndex(cases!, 0).Dir)
}

if ($.isMainScript(import.meta)) {
	await main()
}
